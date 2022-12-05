import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CarInfo from "./carinfo";

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeuVehicleId = this.onChangeuVehicleId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.onChangeuVehicleId = this.onChangeuVehicleId.bind(this);
    this.ChangeVechileSource = this.ChangeVechileSource.bind(this);
    this.ChnageType = this.ChnageType.bind(this);
    this.ValueChange = this.ValueChange.bind(this);
    this.onChangetimestamp = this.onChangetimestamp.bind(this);
    this.ChangeRadio = this.ChangeRadio.bind(this);

    this.state = {
      vehicleId: "",
      sessionId: "",
      message: "",
      message1: "",
      sourceId: "",
      type: "",
      value: "",
      timestamp: "",
      public: false,
    };
  }

  onChangeuVehicleId(e) {
    this.setState({
      vehicleId: e.target.value,
    });
  }

  /// Value
  ValueChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  // Type
  ChnageType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  /// Vechile ID2 From Database
  ChangeVechileId2(e) {
    this.setState({
      vehicleId: e.target.value,
    });
  }

  onChangetimestamp(e) {
    var date = new Date(e.target.value);
    // Parse a date and get it as Unix time
    var unixTimeStamp = Math.floor(date.getTime() / 1000);
    this.setState({
      timestamp: unixTimeStamp,
    });
  }
  // Source ID
  ChangeVechileSource(e) {
    this.setState({
      sourceId: e.target.value,
    });
  }

  ChangeRadio(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      public: value,
    });
  }

  // reading session Id from local storage
  componentWillMount() {
    const id = JSON.parse(sessionStorage.getItem("sessionId"));
    const vec = JSON.parse(sessionStorage.getItem("vehicles"));
    this.setState({
      sessionId: id,
    });
  }

  /// Vehcile List
  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value,
    });
  }

  // Submit for Vehicle Registeration

  onSubmit2(e) {
    e.preventDefault();
    const obj2 = {
      vehicleId: this.state.vehicleId,
      sessionId: this.state.sessionId,
      sourceId: this.state.sourceId,
      type: this.state.type,
      value: this.state.value,
      timestamp: this.state.timestamp,
      public: this.state.public,
    };
    console.log(obj2);
    axios
      .post("http://192.168.31.238:8080/api/v1/sensordata/submit", obj2)

      .then((response) => {
        console.log(response.data);
        this.setState({
          message: JSON.stringify(response.data),
        });
      })
      .catch((error) => {
        console.log(error.response);

        this.setState({
          message: JSON.stringify(error.response.data),
        });
      });
  }

  // Submit for Vehicle ID
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      vehicleId: this.state.vehicleId,
      sessionId: this.state.sessionId,
    };
    console.log(obj);

    axios
      .post(BASE_URL + "/v1/vehicles/register", obj)

      .then((response) => {
        console.log(response.data);
        this.setState({
          message1: JSON.stringify(response.data),
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          message1: JSON.stringify(error.response.data),
        });
      });
  }

  render() {
    const vec = JSON.parse(sessionStorage.getItem("vehicles"));
    return (
      <div>
        <div className="div">
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h1 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <h4>
                      <Icon.PlusCircleFill /> Fahrzeug ID Hinzufügen{" "}
                      <Icon.Truck />{" "}
                    </h4>
                  </button>
                </h1>
              </div>

              <div
                id="collapseTwo"
                class="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  <div className="container1">
                    <form className="form-signin">
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            value={this.state.vehicleId}
                            placeholder="Fahrzeug Id:W0L000051T2123456"
                            required
                            onChange={this.onChangeuVehicleId}
                          />

                          <Button
                            variant="contained"
                            className="submit"
                            onClick={this.onSubmit}
                          >
                            Registerierung
                          </Button>
                          <br />
                          <br />
                          <div class="alert alert-success" role="alert">
                            {this.state.message1}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <h4>
                    <Icon.PlusCircleFill /> Fahrzeug-Information Hinzufügen{" "}
                    <Icon.Truck />{" "}
                  </h4>
                </button>
              </h5>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <div className="container1">
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
                            - Aktuelle Position Längengrad
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
                            - Anzahl Türen
                          </option>
                          <option value="vehicle.info.fuel.volume">
                            - Tankvolumen
                          </option>
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
                            - Aktuelle Öltemperatur{" "}
                          </option>
                          <option value="engine.gear.shift">
                            - Aktuelle Kühlertemperatur
                          </option>
                          <option value="engine.gear.shift">
                            - Aktueller Gang
                          </option>

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

                          <option> Türen: </option>
                          <option value="doors.front.left.open">
                            - Tür offen vorne links{" "}
                          </option>
                          <option value="doors.front.right.open">
                            - Tür offen vorne rechts{" "}
                          </option>
                          <option value="doors.back.left.open">
                            - Tür offen hinten links{" "}
                          </option>
                          <option value="doors.back.right.open">
                            - Tür offen hinten rechts{" "}
                          </option>
                          <option value="doors.trunk.open">
                            - Kofferraum offen:{" "}
                          </option>
                          <option value="doors.hood.open">
                            - Motorhaube offen{" "}
                          </option>

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

                        <span className="span1">Daten Type</span>
                        <select
                          id="inputState"
                          class="form-control"
                          onChange={this.ChnageType}
                          value={this.state.type}
                        >
                          <option selected>Choose...</option>
                          <option value="INT16">Integer(INT16)</option>
                          <option value="DBL">Double(DBL)</option>
                          <option value="INT8">Integer(INT8)</option>
                          <option value="STR">String</option>
                          <option value="BOOL">Boolean</option>
                        </select>
                        <br />
                        <span className="span1">Wert</span>
                        <input
                          type="text"
                          value={this.state.value}
                          placeholder="Enter value DBL:2,4"
                          required
                          onChange={this.ValueChange}
                        />
                        <br />

                        <span className="span1">Timestamp</span>

                        <input
                          type="date"
                          value={this.state.timestamp}
                          placeholder="Enter Timestamps:1637865783"
                          required
                          onChange={this.onChangetimestamp}
                        />
                        <br />
                        <br />
                        <br />
                        <div class="form-check">
                          <label>
                            <div className="heading">Public?</div>
                            <input
                              type="checkbox"
                              name="public"
                              checked={this.state.public}
                              onChange={this.ChangeRadio}
                            />
                          </label>
                        </div>
                        <br />
                        <Button
                          variant="contained"
                          className="submit"
                          onClick={this.onSubmit2}
                        >
                          Hinzufügen
                        </Button>
                        <br />
                        <br />
                        <div class="alert alert-success" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="div2">
          <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingFour">
                <h1 class="mb-0">
                  <button
                    class="btn btn-link"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <h4>
                      {" "}
                      <Icon.InfoCircle />
                      Fahrzeug-Informationen{" "}
                    </h4>
                  </button>
                </h1>
              </div>
              <div
                id="collapseFour"
                class="collapse show"
                aria-labelledby="headingFour"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <CarInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
