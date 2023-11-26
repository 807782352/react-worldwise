import { useEffect, useState } from "react";

import styles from "./index.module.css";
import Button from "../Button";
import Message from "../Message";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  // get location from pointed (url) position
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [isErrorGeocode, setIsErrorGeocode] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocode(true);
          setIsErrorGeocode("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");

          if (!data.countryCode) {
            throw new Error(
              "It seems like not a real city, please click to another one! 😏"
            );
          }
          setCountryCode(data.countryCode || "");
        } catch (error) {
          setIsErrorGeocode(error.message);
        } finally {
          setIsLoadingGeocode(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  if (isLoadingGeocode) {
    return <Spinner />;
  }

  if (isErrorGeocode) {
    return <Message message={isErrorGeocode} />;
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <img
          src={`https://flagsapi.com/${countryCode}/flat/32.png`}
          alt={country}
          className={styles.flag}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
