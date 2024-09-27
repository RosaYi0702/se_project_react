import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, postItem, deleteItem } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { signup, signin, getUserInfo } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [deleteModal, setDeleteModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCardClick = (selectedCard) => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };

  const handleAddGarmentModal = () => {
    setActiveModal("add-garment");
  };

  const handleLogInModal = () => {
    setActiveModal("log-in");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpened((prev) => !prev);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleAddItem = (e, formData) => {
    e.preventDefault();
    const token = getToken();

    const newClothingItem = {
      name: formData.name,
      imageUrl: formData.imageUrl,
      weather: selectedOption,
    };

    postItem(newClothingItem, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error("Failed to post item:", err));
  };

  const handleDeleteItem = (item) => {
    const token = getToken();
    console.log("Item to delete:", item);
    deleteItem(item._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((clothingItem) => clothingItem._id !== item._id)
        );
        handleDeleteClose();
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleRegister = (formData) => {
    signup(formData)
      .then((data) => {
        setIsLoggedIn(true);
        handleCloseModal();
        console.log("registeration succeddful:", data);
      })
      .catch((err) => {
        console.error("registration fail:", err);
      });
  };

  const handleLogIn = (formData) => {
    if (!formData.email || !formData.password) {
      return;
    }
    signin(formData)
      .then((data) => {
        setIsLoggedIn(true);
        handleCloseModal();
        setToken(data.token);
      })
      .catch((err) => {
        console.error("Log in fail:", err);
      });
  };

  const openDeleteModal = () => {
    setDeleteModal("delete");
  };

  const handleDeleteClose = () => {
    setDeleteModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);

        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();

    getItems(token)
      .then((data) => {
        console.log(data.items);
        setClothingItems(data.Items);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        setClothingItems([]);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = setToken();
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setIsLoggedIn(true);
          console.log("User data retrieved:", userData);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          removeToken();
        });
    }
  });

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddGarmentModal={handleAddGarmentModal}
            handleRegisterModal={handleRegisterModal}
            handleLogInModal={handleLogInModal}
            weatherData={weatherData}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
            handleCloseModal={handleCloseModal}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  isMobileMenuOpened={isMobileMenuOpened}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleAddGarmentModal={handleAddGarmentModal}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpened={activeModal === "add-garment"}
          handleCloseModal={handleCloseModal}
          handleOptionChange={handleOptionChange}
          handleAddItem={handleAddItem}
          selectedOption={selectedOption}
        />
        <ItemModal
          isOpened={activeModal === "preview"}
          selectedCard={selectedCard}
          handleCloseModal={handleCloseModal}
          deleteModal={deleteModal}
          openDeleteModal={openDeleteModal}
          handleDeleteClose={handleDeleteClose}
          handleDeleteItem={handleDeleteItem}
        />
        <LoginModal
          isOpened={activeModal === "log-in"}
          handleCloseModal={handleCloseModal}
          handleLogIn={handleLogIn}
        />
        <RegisterModal
          isOpened={activeModal === "register"}
          handleRegister={handleRegister}
          handleCloseModal={handleCloseModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
