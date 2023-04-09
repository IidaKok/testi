import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./frontend/components/Login";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";

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
})