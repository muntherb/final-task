import React, { useState, useEffect } from "react";
import FlightDataService from "../services/FlightService";

const Flight = props => {
  const initialFlightState = {
    id: null,
    flightN: "",
    flightD: "",
    takeoff: false
  };
  const [currentFlight, setCurrentFlight] = useState(initialFlightState);
  const [message, setMessage] = useState("");

  const getFlight = id => {
    FlightDataService.get(id)
      .then(response => {
        setCurrentFlight(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlight(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { flightN, value } = event.target;
    setCurrentFlight({ ...currentFlight, [flightN]: value });
  };

  const updatetakeoff = status => {
    var data = {
      id: currentFlight.id,
      flightN: currentFlight.flightN,
      flightD: currentFlight.flightD,
      takeoff: status
    };

    FlightDataService.update(currentFlight.id, data)
      .then(response => {
        setCurrentFlight({ ...currentFlight, takeoff: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateFlight = () => {
    FlightDataService.update(currentFlight.id, currentFlight)
      .then(response => {
        console.log(response.data);
        setMessage("The flight was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteFlight = () => {
    FlightDataService.remove(currentFlight.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/flights");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentFlight ? (
        <div className="edit-form">
          <h4>Flight</h4>
          <form>
            <div className="form-group">
              <label htmlFor="flightN">Flight</label>
              <input
                type="text"
                className="form-control"
                id="flightN"
                flightN="flightN"
                value={currentFlight.flightN}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="flightD">Description</label>
              <input
                type="text"
                className="form-control"
                id="flightD"
                flightN="flightD"
                value={currentFlight.flightD}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Take off Status:</strong>
              </label>
              {currentFlight.takeoff ? "Departed" : "Not yet"}
            </div>
          </form>

          {currentFlight.takeoff ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatetakeoff(false)}
            >
              Not Yet
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatetakeoff(true)}
            >
              Departed
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteFlight}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateFlight}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Flight...</p>
        </div>
      )}
    </div>
  );
};

export default Flight;