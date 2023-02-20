import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import RentService from "../../../src/services/rent.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/rent.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/rent/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/rent");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    RentService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req.get("/api/v1/rent").set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(RentService.list).toHaveBeenCalled();
  });

  test("POST creates a new Rent", async () => {
    const data = {
      userId: 42,
      bookId: 1,
      penalty: 3.141592,
      rentDate: "2001-01-01T00:00:00Z",
      devolutionDate: "2001-01-01T00:00:00Z",
      createDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    RentService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/rent")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(RentService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Rent without required attributes fails", async () => {
    const data = {};

    RentService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/rent")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(RentService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/rent/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    RentService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/rent/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(RentService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/rent/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    RentService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/rent/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(RentService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    RentService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/rent/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(RentService.get).not.toHaveBeenCalled();
  });

  test("Rent update", async () => {
    const data = {
      userId: 42,
      bookId: 1,
      rentDate: "2001-01-01T00:00:00Z",
      createDate: "2001-01-01T00:00:00Z",
    };
    RentService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/rent/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(RentService.update).toHaveBeenCalledWith(1, data);
  });

  test("Rent deletion", async () => {
    RentService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/rent/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(RentService.delete).toHaveBeenCalledWith(1);
  });
});
