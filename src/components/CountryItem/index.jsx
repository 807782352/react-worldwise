import styles from "./index.module.css";

export default function CountryItem({ countryEl }) {
  const { country, imgUrl } = countryEl;

  return (
    <li className={styles.countryItem}>
      <img src={imgUrl} alt={country} />
      <span>{country}</span>
    </li>
  );
}
