import "./App.css";
import React, { useState, useEffect } from "react";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";
import AddItemModel from "../AddItemModel/AddItemModel";

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

  const handleCardClick = (selectedCard) => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseClick = () => {
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

    const newClothingItem = {
      ...formData,
      weather: selectedOption,
      _id: Math.random(),
    };
    setClothingItems([newClothingItem, ...clothingItems]);
    console.log(clothingItems);
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);

        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
            handleCloseClick={handleCloseClick}
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
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            ></Route>
          </Routes>

          <Footer />
        </div>

        <AddItemModel
          isOpened={activeModal === "add-garment"}
          handleCloseClick={handleCloseClick}
          handleOptionChange={handleOptionChange}
          handleAddItem={handleAddItem}
          selectedOption={selectedOption}
        />

        <ItemModal
          isOpened={activeModal === "preview"}
          selectedCard={selectedCard}
          handleCloseClick={handleCloseClick}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
