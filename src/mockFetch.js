
const request = require("supertest");
const baseURL = "http://localhost:5000";
const test = require("./mockFetch");
const Login = require("./frontend/components/Login");

export const Urli = async ({name, password}) => {
    const response = await request(baseURL).get(`/api/users/${name}&${password}`);
    if(response.statusCode === 404) {
        return false;
    }
    else if(response.statusCode === 200) {
        return true;
    }
}