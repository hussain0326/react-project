// return the user data from the session storage
export const getUser1 = () => {
  const userStr = sessionStorage.getItem('userData');
  if (userStr) return JSON.parse(userStr);
  else return null;
}


//// Vechile List 
export const getUser2 = () => {
  return sessionStorage.getItem('vehicles'); 
}
 // return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('sessionId') || null;
}

// return User Info Data 
export const getUser = () => {
  return sessionStorage.getItem('userData'); 
}

// Sensor Data 
export const getUser3 = () => {
  return sessionStorage.getItem('value'); 
}
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('sessionId');
}
 
// set the token and user from the session storage
export const setUserSession = (sessionId) => {
  sessionStorage.setItem('sessionId',JSON.stringify(sessionId));
 
}
// set the User Data  to Session Storage 

export const setUserSession1 = (userData) => {
  sessionStorage.setItem('userData',JSON.stringify(userData));

}
// set the Vehicle Data to Session Storage  
export const setUserSession2 = (vehicles) => {
  sessionStorage.setItem('vehicles',JSON.stringify(vehicles));
 
}
// set the Vehicle Value to Session Storage  

export const setUserSession3 = (value) => {
  sessionStorage.setItem('value',JSON.stringify(value));
 
}