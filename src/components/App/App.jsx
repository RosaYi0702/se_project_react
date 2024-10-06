import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  postItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signup, signin, getUserInfo, updateUser } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 70 },
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
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleUpdateProfileModal = () => {
    setActiveModal("update-profile");
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
        console.log("new clothing data", data);
        setClothingItems((prevItems) => [data.item, ...prevItems]);
      })
      .then(() => {
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
      })
      .then(() => {
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleUpdateProfile = (formData) => {
    const token = getToken();

    updateUser(token, formData)
      .then((updatedUser) => {
        console.log("Backend response: ", updatedUser);
        setCurrentUser(updatedUser);
      })
      .then(() => {
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup(name, avatar, email, password)
      .then((data) => {
        setIsLoggedIn(true);
        console.log("registration successful:", data);
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((userData) => {
        if (userData && userData.name) {
          setCurrentUser({ name: userData.name });
        }
      })
      .then(() => {
        handleCloseModal();
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
        console.log(data);
        setIsLoggedIn(true);
        setToken(data.token);
        console.log("Token set:", data.token);
        return getUserInfo(data.token);
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Log in fail:", err);
        setIsLoggedIn(false);
      });
  };

  const openDeleteModal = () => {
    setDeleteModal("delete");
  };

  const handleDeleteClose = () => {
    setDeleteModal("");
  };

  const handleCardLike = ({ id, isLiked }) => {
    console.log("ID:", id);
    const token = getToken();

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          console.log("Liked:", updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.item : item))
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          console.log("Unliked:", updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.item : item))
          );
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    console.log("App re-rendering. Current activeModal:", activeModal);
  });
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
        setClothingItems(data.items || []);
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
    const token = getToken();

    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
          console.log("User data retrieved:", userData);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          removeToken();
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser }}
    >
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
                    handleCardLike={handleCardLike}
                    setClothingItems={setClothingItems}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddGarmentModal={handleAddGarmentModal}
                      handleUpdateProfile={handleUpdateProfile}
                      handleUpdateProfileModal={handleUpdateProfileModal}
                      handleCloseModal={handleCloseModal}
                      activeModal={activeModal}
                      handleCardLike={handleCardLike}
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
            isLoading={isLoading}
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
            handleRegisterModal={handleRegisterModal}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpened={activeModal === "register"}
            handleRegister={handleRegister}
            handleCloseModal={handleCloseModal}
            handleLogInModal={handleLogInModal}
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
