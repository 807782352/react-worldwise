import { createContext, useContext, useEffect, useState } from "react";

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

  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
