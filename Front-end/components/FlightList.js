import React, { useState, useEffect } from "react";
import FlightDataService from "../services/FlightService";
import { Link } from "react-router-dom";

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveFlights();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveFlights = () => {
    FlightDataService.getAll()
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFlights();
    setCurrentFlight(null);
    setCurrentIndex(-1);
  };

  const setActiveFlight = (flight, index) => {
    setCurrentFlight(flight);
    setCurrentIndex(index);
  };

  const removeAllFlights = () => {
    FlightDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    FlightDataService.findByTitle(searchTitle)
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Flights List</h4>

        <ul className="list-group">
          {flights &&
            flights.map((flight, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFlight(flight, index)}
                key={index}
              >
                {flight.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllFlights}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentFlight ? (
          <div>
            <h4>Flight</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentFlight.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentFlight.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentFlight.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/flights/" + currentFlight.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Flight...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsList;