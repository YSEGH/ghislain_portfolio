import React, { useState } from "react";
import "../../1-css/FilterContainer.css";
import { useDispatch } from "react-redux";
import { getItemsHandler } from "../../3-actions/itemActions";
import { MdClose, MdAdd } from "react-icons/md";

export default function FilterContainer({ content, filters }) {
  const dispatch = useDispatch();

  const [filtersSelected, setFiltersSelected] = useState([]);

  const displayFilter = () => {
    const filterContainer = document.querySelector(
      ".filter-container-absolute"
    );
    const filterButton = document.querySelector(".filters-button");
    if (filterContainer.classList.contains("open")) {
      filterContainer.classList.remove("open");
      filterContainer.classList.add("close");
      filterButton.classList.remove("active");
    } else {
      filterContainer.classList.remove("close");
      filterContainer.classList.add("open");
      filterButton.classList.add("active");
    }
  };
  const selectFilterHandler = (filter, target) => {
    console.log(target.classList);
    const filterDiv = document.querySelectorAll(`.${target.classList[0]}`);
    let filtersArray;
    let filterExist = filtersSelected.find((x) => x === filter.name);

    if (filterExist) {
      for (let i = 0; i < filterDiv.length; i++) {
        filterDiv[i].classList.remove("active");
      }
      filtersArray = filtersSelected.filter((x) => x !== filter.name);
      setFiltersSelected(filtersArray);
      dispatch(getItemsHandler(content, filtersArray));
      return;
    } else {
      for (let i = 0; i < filterDiv.length; i++) {
        filterDiv[i].classList.add("active");
      }
      filtersArray = [...filtersSelected, filter.name];
      setFiltersSelected(filtersArray);
      dispatch(getItemsHandler(content, filtersArray));
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-container-list">
        <ul>
          {filters.map((filter, i) =>
            i < 3 ? (
              <li key={i}>
                <a
                  className={`filter-${filter.name}`}
                  onClick={(e) => selectFilterHandler(filter, e.target)}
                >
                  {filter.name} ({filter.qty})
                </a>
              </li>
            ) : null
          )}
        </ul>
        <button className="filters-button" onClick={() => displayFilter()}>
          Filter <MdAdd />
        </button>
      </div>
      <div className="filter-container-absolute">
        <MdClose
          className="close-icon"
          size={25}
          onClick={() => displayFilter()}
        />
        <h2>Liste des filtres</h2>
        <ul>
          {filters.map((filter, i) => (
            <li key={i}>
              <a
                className={`filter-${filter.name}`}
                onClick={(e) => selectFilterHandler(filter, e.target)}
              >
                {filter.name} ({filter.qty})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
