const request = require("supertest");
const baseURL = "http://localhost:5000";

const newUser = {
    username: "Vertti.Vainaa",
    password: "KissaKala5",
    email: "vainaavertti@email.com",
}

const oldUser = {
    username: "Matti.Mainio",
    password: "Kissa",
    email: "matti@email.com",
}

export async function mockFetch(url) {
    switch(url) {
        case "http://localhost:5000/api/users/": {
            return {
                ok: true,
                status: 200,
                
            }
        }
        case "http://localhost:5000/api/users/post/": {
            
        }
    }
}
describe("GET from api", () => {

    describe("not found", () => {
        

        test("should return 404", async () => {
            const response = await request(baseURL).get(`/api/users/${user.username}&${user.password}`);
            expect(response.statusCode).toBe(404);
        })
    })
    describe("found", () => {

        test("return 200", async () => {
            const response = await request(baseURL).get(`/api/users/${user.username}&${user.password}`);
            expect(response.statusCode).toBe(200);
        })
    })
})

describe("POST to api", () => {
    describe("Post failed", () => {
        const user = {
            username: "Matti.Mainio",
            password: "Kissa",
            email: "matti@email.com",
        }

        test("return 400", async () => {
            const response = await request(baseURL).post("/api/users/post/").send(user);
            expect(response.statusCode).toBe(400);
        })
    })

    describe("Post success", () => {
        const user = {
            username: "Vertti.Vainaa",
            password: "KissaKala5",
            email: "vainaavertti@email.com",
        }
        afterAll(async () => {
            await request(baseURL).delete(`/api/users/delete/${user.username}`)
        })

        test("return 200", async () => {
            const response = await request(baseURL).post("/api/users/post/").send(user);
            expect(response.statusCode).toBe(200);
        })
    })
})