class Auth {

  /**
   * Authenticate a user. Save the token string in Local Storage
   *
   * @param {string} token
   *
   **/

 static authenticateUser(token, user){
   localStorage.setItem('token', token);
   localStorage.setItem('user', JSON.stringify(user));
 }

 /**
  * Check if a user is authenticated - check if a token is saved in Local Storage
  *
  * @returns {boolean}
  *
  */

 static isAuthenticated(){
   return localStorage.getItem('token')!== null;
 }

 /**
  *
  * De-authnticate a user. Remove the token from local storage
  *
  */

 static deauthenticateUser() {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
 }

 /**
  * Get a token Value
  *
  * @returns {string}
  */

 static getToken() {
   return localStorage.getItem('token');
 }

 /**
 * Return the user value
 *
 * @returns {object}
 */
 static getUser() {
   return JSON.parse(localStorage.getItem('user'));
 }

}


export default Auth;
