// src/components/EachCountry.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function EachCountry() {
  const [country, setCountry] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  async function handleSearchCountry(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await res.json();
      setCountry(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a country by its name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="py-3 pl-10 pr-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
            />
            <FontAwesomeIcon
              icon={faSearch}
              onClick={handleSearchCountry}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 cursor-pointer"
            />
          </div>
          <Link
            to="/"
            className="inline-block bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
          >
            &larr; Back
          </Link>
        </div>

        {country.length > 0 ? (
          country.map((item) => (
            <div
              key={item.population}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
            >
              <article>
                <img src={item.flags.svg} alt={item.name.common} />
              </article>

              <article>
                <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl">
                  {item.name.official}
                </h1>

                <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                  <li>Capital: {item.capital[0]}</li>
                  <li>Population: {item.population.toLocaleString()}</li>
                  <li>Region: {item.region}</li>
                  <li>Subregion: {item.subregion}</li>
                </ul>

                {item.borders && (
                  <>
                    <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                      Borders:
                    </h3>
                    <ul className="flex flex-wrap items-start justify-start gap-2">
                      {item.borders.map((border, index) => (
                        <li
                          key={index}
                          className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                        >
                          {border}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            </div>
          ))
        ) : (
          <p className="text-gray-900 dark:text-white text-center">
            No country found
          </p>
        )}
      </section>
    </>
  );
}
