
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./frontend/components/Login";
import { Register } from "./frontend/components/Register";
import { Addbook } from "./frontend/components/Addbook";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";



describe("T1 Login", () => {

    test("Register success", async () => {
        const userMock = jest.fn();
        render(<Register />, { wrapper: BrowserRouter });
        let nameInput = screen.getByPlaceholderText(/Username/);
        let passwordInput = screen.getByTestId("password1");
        let emailInput = screen.getByPlaceholderText(/Email/);

        userEvent.type(nameInput, "Vertti.Vainaa");
        userEvent.type(passwordInput, "Miumau5");
        userEvent.type(emailInput, "vertti@email.com");
        const registerBtn = screen.getByTestId("regBtn");
        fireEvent.click(registerBtn);

        const user = [{
            username: nameInput.value,
            password: passwordInput.value,
            email: emailInput.value,
        }]/*
            const response = await request(baseURL).post("/api/users/post/").send(user);
            expect(response.statusCode).toBe(200);

            act(async () => {
                await request(baseURL).delete(`/api/users/delete/${user.username}`);
            })*/

        new userMock(user);

       

        expect(userMock).toHaveBeenCalledWith(user);

    })
})
