import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component} from "react"
import Button from '@mui/material/Button';

const List = props => (
  <tr>
      <td>{props.user.sourceId}</td>
      <td>{props.user.value}</td>
      <td>{props.user.report_timestamp}</td>
  </tr>
)

class Status extends Component {
  constructor(props) {
    super(props);

   
    this.onSubmit2 = this.onSubmit2.bind(this);
    this.onChangeuVehicleId = this.onChangeuVehicleId.bind(this); 
    this.ChangeVechileSource = this.ChangeVechileSource.bind(this); 
    this.ChangeStart= this.ChangeStart.bind(this); 
    this.ChangeEnd = this.ChangeEnd.bind(this); 
  


    this.state = {users: [],
        vehicleId:'',
        sessionId: '',
        sourceId:'',
        startTimestamp:'',
        endTimestamp:'',
        message: '',
    };
}



componentDidMount() {
    const id = JSON.parse(sessionStorage.getItem("sessionId"));
    const vec= JSON.parse(sessionStorage.getItem("vehicles"));
   
    this.setState({
     sessionId:id,
   });
  
}


// Vechicle Id 
onChangeuVehicleId(e) {
    this.setState({
      vehicleId:e.target.value

    });
}  
/// Source Id 
ChangeVechileSource (e){ 
    this.setState({
      sourceId: e.target.value
    });
  }


// Time STart 
ChangeStart (e){ 
  
 
  let today = new Date(e.target.value);
  let date2= today.toISOString().split('T')[0];
  let time = date2+" "+"02"+":"+"00"+":"+"00"; 
    this.setState({
        startTimestamp:time
    });
  }

  // End Time 
  ChangeEnd(e){ 
  let today = new Date(e.target.value);
  let date2= today.toISOString().split('T')[0];
  let time = date2+" "+"02"+":"+"00"+":"+"00"; 
    this.setState({
        endTimestamp: time
    });
  }

  // Submit 
onSubmit2(e) {
  e.preventDefault();

   const obj2 = {
    vehicleId:this.state.vehicleId,
    sessionId:this.state.sessionId,
    sourceId:this.state.sourceId,
    startTimestamp:this.state.startTimestamp,
    endTimestamp:this.state.endTimestamp
   }
   console.log(obj2);
 

  axios.post('http://192.168.31.238:8080/api/v1/sensordata/history',obj2)
  .then(response => {
    this.setState({users: response.data.values,
        
    });
})
    .catch(error => {
        console.log(error.response.values)
         this.setState({
         message:JSON.stringify(error.response.data)
        });
         
        });

      }

UserList() {
  return this.state.users.map((currentTodo, i)=>{
      return <List user={currentTodo} key={i} />;
  })
}
  
render() {
    const vec= JSON.parse(sessionStorage.getItem("vehicles"));
  return (
////

<div className="container1">          
<h3> Technische Zustände</h3>    
 <form className="form-signin" >
<div className="row">
  <div className="col">
  <span className="span1">Fahrzeug ID </span>
  
  <select 
      id="inputState"
      class="form-control"
      value ={this.state.vehicleId}
      onChange={this.onChangeuVehicleId}
      >
      <option >Choose...</option>

      {vec.map((list) => (
              <option value={list}>{list}</option>
            ))}

          </select>
      <br />

  <span className="span1">Fahrzeug- Eigenschaften</span>
  <select
      id="inputState" 
      class="form-control"
      onChange={this.ChangeVechileSource}
      value={this.state.sourceId}>

<option> Fahrdaten: </option>
        <option value ="journey.speed">- Aktuelle Geschwindigkeit </option>
        <option value ="journey.route.distance">- Gefahrene Strecke seit Start</option>
        <option value="journey.position.longtitude">- Aktuelle Position Längengrad</option>
        <option value="journey.position.latitude">- Aktuelle Position Breitengrad</option>

  
        <option> Fahrzeug-Informationen: </option>
        <option value="vehicle.info.construction.manufacturer">- Hersteller</option>
        <option value="vehicle.info.construction.model">- Modell</option>
        <option value="vehicle.info.construction.year">- Baujahr</option>
        <option value="vehicle.info.chassis.number">- Fahrgestellnummer</option>
        <option value="vehicle.info.exterior.doors.amount">- Anzahl Türen</option>
        <option value="vehicle.info.fuel.volume">- Tankvolumen</option>
        <option value="vehicle.info.performance.ps">- Leistung in PS</option>
        <option value="vehicle.info.performance.kw">- Leistung in KW </option>


        <option> Motor: </option>
        <option value="journey.position.latitude">- Aktuelle Drehzahl </option>
        <option value="engine.cooler.temperature">- Aktuelle Öltemperatur </option>
        <option value="engine.gear.shift">- Aktuelle Kühlertemperatur</option>
        <option value="engine.gear.shift">- Aktueller Gang</option>

        <option> Reifen: </option>
        <option value="tires.front.right.pressure">- Reifendruck vorne rechts </option>
        <option value="tires.front.left.pressure">- Reifendruck vorne links </option>
        <option value="tires.back.right.pressure">- Reifendruck hinten rechts </option>
        <option value="tires.back.left.pressure">- Reifendruck hinten links: </option>

        <option> Türen: </option>
        <option value="doors.front.left.open">- Tür offen vorne links </option>
        <option value="doors.front.right.open">- Tür offen vorne rechts </option>
        <option value="doors.back.left.open">- Tür offen hinten links </option>
        <option value="doors.back.right.open">- Tür offen hinten rechts </option>
        <option value="doors.trunk.open">- Kofferraum offen: </option>
        <option value="doors.hood.open">- Motorhaube offen </option>

        <option> Fenster: </option>
        <option value="windows.front.left.state">- Fenster-Status vorne links </option>
        <option value="windows.front.right.state">- Fenster-Status vorne rechts </option>
        <option value="windows.back.left.state">- Fenster-Status hinten links </option>
        <option value="windows.back.right.state">- Fenster-Status hinten rechts </option>


      </select>
      <br /> 

      <span className='span1'>startTimestamp</span>
      <input
      type="date"
      id="inputState" 
      class="form-control"
      placeholder="2021-10-27 13:27:50"
      onChange={this.ChangeStart}
      value={this.state.startTimestamp}>
      </input>
<br /> 
<span className='span1'>endTimestamp</span>
<input
      type="date"
      value={this.state.endTimestamp}
      placeholder="2021-10-28 13:30:00" required 
      onChange={this.ChangeEnd}
    />
            <br /> 
    
        
        <br/>
<Button 
variant ="contained"
className="submit"
onClick = {this.onSubmit2}
>
 Zeig
</Button>
<br />
<br />

  </div>
</div>
</form>
          <table className="table table-striped"  >
              <thead>
                  <tr>
                      <th>Eigenschaften</th>
                      <th>Wert</th>
                      <th>Time Report</th>
                  </tr>
              </thead>
              <tbody>
                  { this.UserList() }
              </tbody>
          </table>


          <div class="alert alert-success" role="alert">
{this.state.message} 
</div>
      </div>
  )
}
}
export default Status;