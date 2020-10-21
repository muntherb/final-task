import React, { useState, useEffect } from "react";
import FlightDataService from "../services/FlightService";
import { Link } from "react-router-dom";

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchFlight, setSearchFlight] = useState("");

  useEffect(() => {
    retrieveFlights();
  }, []);

  const onChangeSearchFlight = e => {
    const searchFlight = e.target.value;
    setSearchFlight(searchFlight);
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

  const setActiveFlight = (flightN, index) => {
    setCurrentFlight(flightN);
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

  const findByFlight = () => {
    FlightDataService.findByFlight(searchFlight)
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
            placeholder="Search by flightN"
            value={searchFlight}
            onChange={onChangeSearchFlight}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByFlight}
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
            flights.map((flightN, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFlight(flightN, index)}
                key={index}
              >
                {flightN.flightN}
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
                <strong>Flight:</strong>
              </label>{" "}
              {currentFlight.flightN}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}

              {currentFlight.flightD}
            </div>
            <div>
              <label>
                <strong>Takeoff:</strong>
              </label>{" "}
              {currentFlight.takeoff ? "Departed" : "Not yet"}
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