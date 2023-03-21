import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import "./coverPage.css";

function CoverPage() {
  const [openFilter, setOpenFilter] = useState(false);
  let menuRef = useRef();

  /*Filter useEffect*/
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="homepage">
      <div className="borders">
        <div className="container">
          <div className="header__cover">
            <div>
              <h1 className="title__cover">
                BOOK YOUR NEXT GETAWAY AND LET US <br /> TAKE CARE OF THE REST!
              </h1>
            </div>

            <form className="search">
              <input
                className="search__input"
                type="text"
                id="search"
                placeholder="Search"
              />
              <button
                className="search__filter"
                type="button"
                onClick={() => setOpenFilter(!openFilter)}
              >
                {" "}
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </form>
            <div className="filter-container" ref={menuRef}>
            {openFilter && (
              <div
              
                className={` flex flex-col gap-4 filter__menu ${
                  openFilter ? "active" : "inactive"
                }`}
              >
                <div className="filter__title">
                  <h4>Filter</h4>
                  <hr />
                </div>
                <div className="filter__list">
                  <div className="row row_filter price__filter">
                    <p>PRICE RANGE</p>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      min="0"
                      max="500"
                      step="10"
                    />
                  </div>
                  <div className="row row_filter">
                    <p>TYPE</p>
                    <div className="row">
                      <div className="col">
                        <p>standard</p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                      </div>
                      <div className="col">
                        <p>Premium</p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                      </div>
                      <div className="col">
                        <p>Luxury</p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row_filter">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                      <p>ROOMS</p>
                      <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      min="0"
                      max="7"
                      step="1"
                    />
                    </div>
                    <div className="col-sm"></div>
                  </div>
                </div>
              </div>
            )}
            </div>
            
            <div className="scroll__down">
              <p>SCROLL DOWN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverPage;
