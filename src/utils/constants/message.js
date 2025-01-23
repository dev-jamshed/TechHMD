const CONNECTION_ESTABLISHED = "Connection established by";
const CONNECTION_ERROR = "Error while connecting";
const LOGIN_SUCCESS = "Logged in successfully";
const LOGOUT_SUCCESS = "Logged out successfully";
const INVALID_CREDENTIALS = "Invalid email or password";
const INTERNAL_SERVER_ERROR = "Internal Server Error";
const CREATE_SUCCESS = (item) => `${item} created successfully`;
const UPDATE_SUCCESS = (item) => `${item} updated successfully`;
const DELETE_SUCCESS = (item) => `${item} deleted successfully`;

module.exports = {
    CONNECTION_ESTABLISHED,
    CONNECTION_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    INVALID_CREDENTIALS,
    INTERNAL_SERVER_ERROR,
    CREATE_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SUCCESS
};