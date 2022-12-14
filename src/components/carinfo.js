import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

/// Car Main Class Page
class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.onChangeuVehicleId = this.onChangeuVehicleId.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    this.onChangeuVehicleId = this.onChangeuVehicleId.bind(this);
    this.ChangeVechileSource = this.ChangeVechileSource.bind(this);

    this.state = {
      vehicleId: "",
      sessionId: "",
      message: [],
      sourceId: "",
      message1: "",
    };
  }

  /// Getting the input from Vichle Id field
  onChangeuVehicleId(e) {
    this.setState({
      vehicleId: e.target.value,
    });
  }

  // getting the input value from timestapm
  onChangetimestamp(e) {
    this.setState({
      timestamp: e.target.value,
    });
  }

  // getting the input value from vehicle source
  ChangeVechileSource(e) {
    this.setState({
      sourceId: e.target.value,
    });
  }

  // reading session Id  from local storage
  componentDidMount() {
    const id = JSON.parse(sessionStorage.getItem("sessionId"));
    this.setState({
      sessionId: id,
    });
  }

  // Submit form function
  onSubmit2(e) {
    e.preventDefault();
    const obj = {
      vehicleId: this.state.vehicleId,
      sessionId: this.state.sessionId,
      sourceId: this.state.sourceId,
    };
    console.log(obj);

    axios
      .post(BASE_URL + "api/v1/sensordata/current", obj)
      .then((response) => {
        this.setState({
          message: response.data.value,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        this.setState({
          message1: JSON.stringify(error.response.data),
        });
      });
  }

  render() {
    const vec = JSON.parse(sessionStorage.getItem("vehicles"));

    return (
      <div>
        <form className="form-signin">
          <div className="row">
            <div className="col">
              <span className="span1">Fahrzeug ID </span>

              <select
                id="inputState"
                class="form-control"
                value={this.state.vehicleId}
                onChange={this.onChangeuVehicleId}
              >
                <option>Choose...</option>

                {vec.map((list) => (
                  <option value={list}>{list}</option>
                ))}
              </select>
              <br />

              <span className="span1">Fahrzeug Eigenschaften</span>
              <select
                id="inputState"
                class="form-control"
                onChange={this.ChangeVechileSource}
                value={this.state.sourceId}
              >
                <option selected>Choose...</option>

                <option> Fahrdaten: </option>
                <option value="journey.speed">
                  - Aktuelle Geschwindigkeit{" "}
                </option>
                <option value="journey.route.distance">
                  - Gefahrene Strecke seit Start
                </option>
                <option value="journey.position.longtitude">
                  - Aktuelle Position L??ngengrad
                </option>
                <option value="journey.position.latitude">
                  - Aktuelle Position Breitengrad
                </option>

                <option> Fahrzeug-Informationen: </option>
                <option value="vehicle.info.construction.manufacturer">
                  - Hersteller
                </option>
                <option value="vehicle.info.construction.model">
                  - Modell
                </option>
                <option value="vehicle.info.construction.year">
                  - Baujahr
                </option>
                <option value="vehicle.info.chassis.number">
                  - Fahrgestellnummer
                </option>
                <option value="vehicle.info.exterior.doors.amount">
                  - Anzahl T??ren
                </option>
                <option value="vehicle.info.fuel.volume">- Tankvolumen</option>
                <option value="vehicle.info.performance.ps">
                  - Leistung in PS
                </option>
                <option value="vehicle.info.performance.kw">
                  - Leistung in KW{" "}
                </option>

                <option> Motor: </option>
                <option value="journey.position.latitude">
                  - Aktuelle Drehzahl{" "}
                </option>
                <option value="engine.cooler.temperature">
                  - Aktuelle ??ltemperatur{" "}
                </option>
                <option value="engine.gear.shift">
                  - Aktuelle K??hlertemperatur
                </option>
                <option value="engine.gear.shift">- Aktueller Gang</option>

                <option> Reifen: </option>
                <option value="tires.front.right.pressure">
                  - Reifendruck vorne rechts{" "}
                </option>
                <option value="tires.front.left.pressure">
                  - Reifendruck vorne links{" "}
                </option>
                <option value="tires.back.right.pressure">
                  - Reifendruck hinten rechts{" "}
                </option>
                <option value="tires.back.left.pressure">
                  - Reifendruck hinten links:{" "}
                </option>

                <option> T??ren: </option>
                <option value="doors.front.left.open">
                  - T??r offen vorne links{" "}
                </option>
                <option value="doors.front.right.open">
                  - T??r offen vorne rechts{" "}
                </option>
                <option value="doors.back.left.open">
                  - T??r offen hinten links{" "}
                </option>
                <option value="doors.back.right.open">
                  - T??r offen hinten rechts{" "}
                </option>
                <option value="doors.trunk.open">- Kofferraum offen: </option>
                <option value="doors.hood.open">- Motorhaube offen </option>

                <option> Fenster: </option>
                <option value="windows.front.left.state">
                  - Fenster-Status vorne links{" "}
                </option>
                <option value="windows.front.right.state">
                  - Fenster-Status vorne rechts{" "}
                </option>
                <option value="windows.back.left.state">
                  - Fenster-Status hinten links{" "}
                </option>
                <option value="windows.back.right.state">
                  - Fenster-Status hinten rechts{" "}
                </option>
              </select>
              <br />

              <Button
                variant="contained"
                className="submit"
                onClick={this.onSubmit2}
              >
                Zeig
              </Button>
              <br />
              <br />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Eigenschaften</th>
                    <th>Wert</th>
                    <th>Time Report</th>
                  </tr>
                </thead>
                <td>{this.state.message.sourceId}</td>
                <td>{this.state.message.value}</td>
                <td>{this.state.message.report_timestamp}</td>
              </table>
              <div class="alert alert-success" role="alert">
                {this.state.message1}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CarInfo;
