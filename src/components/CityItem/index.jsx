import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useCities } from "../../contexts/CityContext";

const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
};

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const {
    cityName,
    country,
    imgUrl,
    date,
    id,
    position: { lat, lng },
  } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <img src={imgUrl} alt={country} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
