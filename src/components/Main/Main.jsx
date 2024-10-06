import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  isMobileMenuOpened,
  clothingItems,
  handleCardLike,
  setClothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      {isMobileMenuOpened ? <></> : <WeatherCard weatherData={weatherData} />}

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {(clothingItems || [])
            .filter((item) => {
              return item.weather === weatherData?.type;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  setClothingItems={setClothingItems}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
