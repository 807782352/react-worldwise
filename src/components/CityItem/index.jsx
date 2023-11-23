import styles from "./index.module.css";

const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
};

export default function CityItem({ city }) {
  const { cityName, country, imgUrl, date } = city;

  return (
    <li className={styles.cityItem}>
      <img src={imgUrl} alt={country}/>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
