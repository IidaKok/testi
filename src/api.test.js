/*const request = require("supertest");
const baseURL = "http://localhost:5000";

describe("GEt /api/users", () => {
    const newUser = {
        username: "Matti.Mainio",
        password: "Kissa",
    }
    beforeAll(() => jest.spyOn(window, "fetch"))
    afterAll(() => window.fetch.mockClear())

    test("should return 404", async () => {
        const response = await request(baseURL).get(`/api/users/${newUser.username}&${newUser.password}`);
        expect(response.statusCode).toBe(404);
    })
    test("return 200", async () => {
        const response = await request(baseURL).get(`/api/users/${newUser.username}&${newUser.password}`);
        expect(response.statusCode).toBe(200);
    })
})*/
//import { emptyInput, invalidInput } from "./logintest";

//const inputs = require("./logintest");
//const emptyInput = inputs.emptyInput;
const request = require("supertest");
const baseURL = "http://localhost:5000";



describe("GET from api", () => {
    beforeAll(() => jest.spyOn(window, "fetch"))
    afterAll(() => window.fetch.mockClear())

    describe("not found", () => {
        const user = {
            username: "Vertti.Vainaa",
            password: "KissaKala5",
        }

        test("should return 404", async () => {
            const response = await request(baseURL).get(`/api/users/${user.username}&${user.password}`);
            expect(response.statusCode).toBe(404);
        })
    })
    describe("found", () => {
        const user = {
            username: "Matti.Mainio",
            password: "Kissa",
        }

        test("return 200", async () => {
            const response = await request(baseURL).get(`/api/users/${user.username}&${user.password}`);
            expect(response.statusCode).toBe(200);
        })
    }) 
})


