import styles from "./index.module.css";
import Message from "../Message";
import Spinner from "../Spinner";
import CityItem from "../CityItem";

export default function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    const msg = "Add your first city by clicking on a city on the map!";
    return <Message message={msg} />;
  }

  // console.log(isLoading);
  // console.log(cities);

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}
