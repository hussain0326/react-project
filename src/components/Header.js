import logo from './car.svg';
export const Header = () => {
  return (
    <header className="header"> 
    <img src={logo} className="App-logo" alt="logo"/>
    <h3> Vehicle Data Management Portal</h3>
    </header>
  )
}
export default Header;