import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./frontend/components/Login";
import { Register } from "./frontend/components/Register";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";

describe("T1 Login", () => {
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

describe("T2 Register", () => {
    test("Register: incorrect input values", async () => {
        render(<Register />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByTestId("password1");
        let passwordAgainInput = screen.getByTestId("password2");
        let emailInput = screen.getByPlaceholderText(/Email/);

        //all inputs are empty
        userEvent.type(nameInput, "");
        userEvent.type(passwordInput, "");
        userEvent.type(passwordAgainInput, "");
        userEvent.type(emailInput, "");
        const registerBtn = screen.getByTestId("regBtn");
        fireEvent.click(registerBtn);
        let nameErr = screen.getByTestId("invalidNameError");
        let passErr = screen.getByTestId("invalidPasswordError");
        let emailErr = screen.getByTestId("invalidEmailError");

        expect(nameErr).toBeInTheDocument();
        expect(passErr).toBeInTheDocument();
        expect(emailErr).toBeInTheDocument();
    })
    describe("Register: One correct input", () => {


        test("Username correct", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let nameInput = screen.getByPlaceholderText(/Username/);
            let passwordInput = screen.getByTestId("password1");
            let emailInput = screen.getByPlaceholderText(/Email/);
    
            //all inputs are empty
            userEvent.type(nameInput, "");
            userEvent.type(passwordInput, "");
            userEvent.type(emailInput, "");
            const registerBtn = screen.getByTestId("regBtn");
            fireEvent.click(registerBtn);
    
            let nameErr = screen.getByTestId("invalidNameError");
            let passErr = screen.getByTestId("invalidPasswordError");
            let emailErr = screen.getByTestId("invalidEmailError");
    
            userEvent.type(nameInput, "Maija");
            expect(nameErr).not.toBeInTheDocument();
            expect(passErr).toBeInTheDocument();
            expect(emailErr).toBeInTheDocument();
            userEvent.clear(nameInput);
        })
        test("Password correct", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let nameInput = screen.getByPlaceholderText(/Username/);
            let passwordInput = screen.getByTestId("password1");
            let emailInput = screen.getByPlaceholderText(/Email/);
    
            //all inputs are empty
            userEvent.type(nameInput, "");
            userEvent.type(passwordInput, "");
            userEvent.type(emailInput, "");
            const registerBtn = screen.getByTestId("regBtn");
            fireEvent.click(registerBtn);
    
            let nameErr = screen.getByTestId("invalidNameError");
            let passErr = screen.getByTestId("invalidPasswordError");
            let emailErr = screen.getByTestId("invalidEmailError");
    
            userEvent.type(passwordInput, "Kissa5");
            expect(nameErr).toBeInTheDocument();
            expect(passErr).not.toBeInTheDocument();
            expect(emailErr).toBeInTheDocument();
            userEvent.clear(passwordInput);
        })
        test("Email correct", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let nameInput = screen.getByPlaceholderText(/Username/);
            let passwordInput = screen.getByTestId("password1");
            let emailInput = screen.getByPlaceholderText(/Email/);
    
            //all inputs are empty
            userEvent.type(nameInput, "");
            userEvent.type(passwordInput, "");
            userEvent.type(emailInput, "");
            const registerBtn = screen.getByTestId("regBtn");
            fireEvent.click(registerBtn);
    
            let nameErr = screen.getByTestId("invalidNameError");
            let passErr = screen.getByTestId("invalidPasswordError");
            let emailErr = screen.getByTestId("invalidEmailError");
    
            userEvent.type(emailInput, "maija@email.com");
            expect(nameErr).toBeInTheDocument();
            expect(passErr).toBeInTheDocument();
            expect(emailErr).not.toBeInTheDocument();
            userEvent.clear(emailInput);
        })
    })
   
    describe("Register: two correct inputs", () => {
        test("Username and password correct", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let nameInput = screen.getByPlaceholderText(/Username/);
            let passwordInput = screen.getByTestId("password1");
            let emailInput = screen.getByPlaceholderText(/Email/);
    
            //all inputs are empty
            userEvent.type(nameInput, "");
            userEvent.type(passwordInput, "");
            userEvent.type(emailInput, "");
            const registerBtn = screen.getByTestId("regBtn");
            fireEvent.click(registerBtn);
    
            let nameErr = screen.getByTestId("invalidNameError");
            let passErr = screen.getByTestId("invalidPasswordError");
            let emailErr = screen.getByTestId("invalidEmailError");
    
            userEvent.type(nameInput, "Maija");
            userEvent.type(passwordInput, "Kissa5");
            expect(nameErr).not.toBeInTheDocument();
            expect(passErr).not.toBeInTheDocument();
            expect(emailErr).toBeInTheDocument();
            userEvent.clear(nameInput);
            userEvent.clear(passwordInput);
        })
        test("Username and email correct", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let nameInput = screen.getByPlaceholderText(/Username/);
            let passwordInput = screen.getByTestId("password1");
            let emailInput = screen.getByPlaceholderText(/Email/);
    
            //all inputs are empty
            userEvent.type(nameInput, "");
            userEvent.type(passwordInput, "");
            userEvent.type(emailInput, "");
            const registerBtn = screen.getByTestId("regBtn");
            fireEvent.click(registerBtn);
    
            let nameErr = screen.getByTestId("invalidNameError");
            let passErr = screen.getByTestId("invalidPasswordError");
            let emailErr = screen.getByTestId("invalidEmailError");
    
            userEvent.type(nameInput, "Maija");
            userEvent.type(emailInput, "maija@email.com");
            expect(nameErr).not.toBeInTheDocument();
            expect(passErr).toBeInTheDocument();
            expect(emailErr).not.toBeInTheDocument();
            userEvent.clear(nameInput);
            userEvent.clear(emailInput);
        })
        test("Email and password correct", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let nameInput = screen.getByPlaceholderText(/Username/);
            let passwordInput = screen.getByTestId("password1");
            let emailInput = screen.getByPlaceholderText(/Email/);
    
            //all inputs are empty
            userEvent.type(nameInput, "");
            userEvent.type(passwordInput, "");
            userEvent.type(emailInput, "");
            const registerBtn = screen.getByTestId("regBtn");
            fireEvent.click(registerBtn);
    
            let nameErr = screen.getByTestId("invalidNameError");
            let passErr = screen.getByTestId("invalidPasswordError");
            let emailErr = screen.getByTestId("invalidEmailError");
    
            userEvent.type(emailInput, "maija@email.com");
            userEvent.type(passwordInput, "Kissa5");
            expect(nameErr).toBeInTheDocument();
            expect(passErr).not.toBeInTheDocument();
            expect(emailErr).not.toBeInTheDocument();
            userEvent.clear(emailInput);
            userEvent.clear(passwordInput);
        })
    })
    describe("Register: password check", () => {
        test("Paswords match", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let password1Input = screen.getByTestId("password1");
            let password2Input = screen.getByTestId("password2");

            //checks that passwords don't match error appears when either password input is changed 
            //error disappears when passwords match
            userEvent.type(password1Input, "a");
            let noMatchError = screen.getByTestId("noMatchError");
            expect(noMatchError).toBeInTheDocument();
            userEvent.type(password2Input, "a");
            expect(noMatchError).not.toBeInTheDocument();
            userEvent.clear(password1Input);
            userEvent.clear(password2Input);

            userEvent.type(password2Input, "b");
            let noMatchError2 = screen.getByTestId("noMatchError");
            expect(noMatchError2).toBeInTheDocument();
            userEvent.type(password1Input, "b");
            expect(noMatchError2).not.toBeInTheDocument();
            userEvent.clear(password1Input);
            userEvent.clear(password2Input);
        })
        test("Paswords show", async () => {
            render(<Register />, { wrapper: BrowserRouter });
            let password1Input = screen.getByTestId("password1");
            let password2Input = screen.getByTestId("password2");
            let checkbox = screen.getByTestId("checkbox");

            //checks that input type is password
            expect(checkbox.checked).toEqual(false);
            expect(password1Input.type).toBe("password");
            expect(password2Input.type).toBe("password");

            //clicks checkbox and checks that input type changes to text
            fireEvent.click(checkbox);
            expect(checkbox.checked).toEqual(true);
            expect(password1Input.type).toBe("text");
            expect(password2Input.type).toBe("text");

            //clicks checkbox and checks that input type changes to password
            fireEvent.click(checkbox);
            expect(checkbox.checked).toEqual(false);
            expect(password1Input.type).toBe("password");
            expect(password2Input.type).toBe("password");
        })
    })
})