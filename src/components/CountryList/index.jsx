import Spinner from "../Spinner";
import styles from "./index.module.css";
import CountryItem from "../CountryItem";
import Message from "../Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    const msg = "Add your first country by clicking on a city on the map!";
    return <Message message={msg} />;
  }

  const countries = cities.reduce((prevArr, newCity) => {
    if (!prevArr.map((el) => el.country).includes(newCity.country)) {
      return [...prevArr, { country: newCity.country, imgUrl: newCity.imgUrl }];
    } else return prevArr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((countryItem) => {
        return <CountryItem countryEl={countryItem} key={countryItem.country} />;
      })}
    </ul>
  );
}
