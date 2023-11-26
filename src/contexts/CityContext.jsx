// All cities operations are written here ...
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const BASE_URL = "http://localhost:9000";

const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // empty space, only render once during the init
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);

      // POST request to the server (9000)
      // const res = await fetch(`${BASE_URL}/cities`, {
      //   method: "POST",
      //   body: JSON.stringify(newCity),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const res = await axios.post(`${BASE_URL}/cities`, newCity, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);
      const data = res.data;

      // sync by rerendering
      // works on small project, but there is a better way to do it as well
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);

      const res = await axios.delete(`${BASE_URL}/cities/${id}`);

      console.log(res.data);
      const data = res.data;

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);

  if (context === undefined) {
    throw new Error("CityContext is used outside of the CityProvider");
  }

  return context;
}

export { CityProvider, useCities };
