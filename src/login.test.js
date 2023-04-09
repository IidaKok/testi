import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./frontend/components/Login";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
const request = require("supertest");
const baseURL = "http://localhost:5000";

describe("login", () => {
    test("login: incorrect input values", async () => {
        render(<Login />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByPlaceholderText(/Password/);
    
        //all inputs are empty
        userEvent.type(nameInput, "");
        userEvent.type(passwordInput, "");
        const loginBtn = screen.getByTestId("logBtn");
        fireEvent.click(loginBtn);
        let nameErr = screen.getByTestId("nameError");
        let passErr = screen.getByTestId("passError");
        expect(nameErr.textContent).toBe("Username can't be empty");
        expect(passErr.textContent).toBe("Password can't be empty");
    
        //password input is empty
        userEvent.type(nameInput, "Maija");
        fireEvent.click(loginBtn);
        expect(nameErr.textContent).toBe("");
        expect(passErr.textContent).toBe("Password can't be empty");
        userEvent.clear(nameInput);
    
        //username input is empty
        userEvent.type(passwordInput, "Kissa4");
        fireEvent.click(loginBtn);
        expect(nameErr.textContent).toBe("Username can't be empty");
        expect(passErr.textContent).toBe("");
        userEvent.clear(passwordInput);
    })
})/*
export const invalidInput = () => {
    render(<Login />, { wrapper: BrowserRouter });
    let nameInput = screen.getByPlaceholderText(/Username/);
    let passwordInput = screen.getByPlaceholderText(/Password/);
     userEvent.type(nameInput, "Mat");
     userEvent.type(passwordInput, "Ki");
    const loginBtn = screen.getByTestId("logBtn");
    fireEvent.click(loginBtn);

}
export const validInput = () => {

    render(<Login />, { wrapper: BrowserRouter });
    let nameInput = screen.getByPlaceholderText(/Username/);
    let passwordInput = screen.getByPlaceholderText(/Password/);
    const name = userEvent.type(nameInput, "Matti.Mainio");
    const password = userEvent.type(passwordInput, "Kissa");
    const loginBtn = screen.getByTestId("logBtn");
    fireEvent.click(loginBtn);

    const data = name + "&" + password;
    return data;
}
/*
describe("login", () => {
    test("login: incorrect input values", async () => {
        render(<Login />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByPlaceholderText(/Password/);


        userEvent.type(nameInput, "Mat");
        userEvent.type(passwordInput, "Ki");
        const loginBtn = screen.getByTestId("logBtn");
        fireEvent.click(loginBtn);


        const response = await request(baseURL).get(`/api/users/${nameInput}&${passwordInput}`);
        expect(response.statusCode).toBe(404);

        userEvent.clear(nameInput);
        userEvent.clear(passwordInput);
    })
    test("login: correct input values", async () => {
        render(<Login />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByPlaceholderText(/Password/);


        userEvent.type(nameInput, "Matti.Mainio");
        userEvent.type(passwordInput, "Kissa");
        const loginBtn = screen.getByTestId("logBtn");
        fireEvent.click(loginBtn);

        const response = await request(baseURL).get(`/api/users/${nameInput}&${passwordInput}`);
        expect(response.statusCode).toBe(200);

        userEvent.clear(nameInput);
        userEvent.clear(passwordInput);
       
    })
})
/*import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./frontend/components/Login";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
const request = require("supertest");
const baseURL = "http://localhost:5000";

describe("login", () => {

    test("login: input fields are empty", async () => {
        render(<Login />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByPlaceholderText(/Password/);

        //all inputs are empty
        userEvent.type(nameInput, "");
        userEvent.type(passwordInput, "");
        const loginBtn = screen.getByTestId("logBtn");
        fireEvent.click(loginBtn);
        let nameErr = screen.getByTestId("nameError");
        let passErr = screen.getByTestId("passError");
        expect(nameErr.textContent).toBe("Username can't be empty");
        expect(passErr.textContent).toBe("Password can't be empty");

        //password input is empty
        userEvent.type(nameInput, "Maija");
        fireEvent.click(loginBtn);
        expect(nameErr.textContent).toBe("");
        expect(passErr.textContent).toBe("Password can't be empty");
        userEvent.clear(nameInput);

        //username input is empty
        userEvent.type(passwordInput, "Kissa4");
        fireEvent.click(loginBtn);
        expect(nameErr.textContent).toBe("Username can't be empty");
        expect(passErr.textContent).toBe("");
        userEvent.clear(passwordInput);
    });
});
describe("login", () => {
    test("login: incorrect input values", async () => {
        render(<Login />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByPlaceholderText(/Password/);


        userEvent.type(nameInput, "Mat");
        userEvent.type(passwordInput, "Ki");
        const loginBtn = screen.getByTestId("logBtn");
        fireEvent.click(loginBtn);


        const response = await request(baseURL).get(`/api/users/${nameInput}&${passwordInput}`);
        expect(response.statusCode).toBe(404);

        userEvent.clear(nameInput);
        userEvent.clear(passwordInput);
    })
    test("login: correct input values", async () => {
        render(<Login />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByPlaceholderText(/Password/);


        userEvent.type(nameInput, "Matti.Mainio");
        userEvent.type(passwordInput, "Kissa");
        const loginBtn = screen.getByTestId("logBtn");
        fireEvent.click(loginBtn);

        const response = await request(baseURL).get(`/api/users/${nameInput}&${passwordInput}`);
        expect(response.statusCode).toBe(200);

        userEvent.clear(nameInput);
        userEvent.clear(passwordInput);
       
    })
})*/