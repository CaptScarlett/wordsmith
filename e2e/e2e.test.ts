import app from "../src/server";
import request from "supertest";
import { faker } from "@faker-js/faker";
import prisma from "../src/db";

describe("User API - CRUD Operations", () => {
  let createdUser;

  afterAll(async () => {
    // Clean up the created user after all tests are finished
    if (createdUser) {
      await prisma.user.delete({ where: { id: createdUser.id } });
    }
    await prisma.$disconnect();
  });

  describe("Create User - POST /api/user", () => {
    it("Success 200", async () => {
      const user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      };

      const res = await request(app)
        .post("/api/user")
        .send(user)
        .set("Accept", "application/json");

      expect(res.body).toEqual(
        expect.objectContaining({
          data: {
            ...user,
            id: expect.any(Number),
          },
        })
      );
      expect(res.status).toEqual(200);

      createdUser = res.body.data; // Save the created user for further testing
    });

    it("Failure 500", async () => {
      const user = {
        name: faker.person.firstName(),
      };

      const res = await request(app)
        .post("/api/user")
        .send(user)
        .set("Accept", "application/json");

      expect(res.status).toEqual(500);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: "Failed to create user.",
        })
      );
    });
  });

  describe("Read (Get) User - GET /api/user/:id", () => {
    it("Success 200", async () => {
      const res = await request(app)
        .get(`/api/user/${createdUser.id}`)
        .set("Accept", "application/json");

      expect(res.body).toEqual(
        expect.objectContaining({
          data: {
            ...createdUser,
          },
        })
      );
      expect(res.status).toEqual(200);
    });

    it("Failure 404", async () => {
      const res = await request(app)
        .get("/api/user/999")
        .set("Accept", "application/json");

      expect(res.status).toEqual(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: "User not found.",
        })
      );
    });
  });

  describe("Update User - PATCH /api/user/:id", () => {
    it("Success 200", async () => {
      const updatedUser = {
        name: faker.person.firstName(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      };

      const res = await request(app)
        .patch(`/api/user/${createdUser.id}`)
        .send(updatedUser)
        .set("Accept", "application/json");

      expect(res.body).toEqual(
        expect.objectContaining({
          data: {
            ...createdUser,
            ...updatedUser,
          },
        })
      );
      expect(res.status).toEqual(200);
      createdUser = res.body.data; // Update the created user for further testing
    });

    it("Failure 500", async () => {
      const res = await request(app)
        .patch("/api/user/999")
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: "Validation Error",
        })
      );
    });
  });

  describe("Delete User - DELETE /api/user/:id", () => {
    it("Success 200", async () => {
      const res = await request(app)
        .delete(`/api/user/${createdUser.id}`)
        .set("Accept", "application/json");

      expect(res.body).toEqual(
        expect.objectContaining({
          data: {
            ...createdUser,
          },
        })
      );
      expect(res.status).toEqual(200);

      // Reset the createdUser variable since it has been deleted
      createdUser = undefined;
    });

    it("Failure 500", async () => {
      const res = await request(app)
        .delete("/api/user/999")
        .set("Accept", "application/json");

      expect(res.status).toEqual(500);
      expect(res.body).toEqual(
        expect.objectContaining({
          error: "Failed to delete user.",
        })
      );
    });
  });
});
