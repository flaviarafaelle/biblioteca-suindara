import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import UserRoleService from "../../../src/services/userrole.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/userrole.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/user-role/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/user-role");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    UserRoleService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/user-role")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(UserRoleService.list).toHaveBeenCalled();
  });

  test("POST creates a new UserRole", async () => {
    const data = {
      roleId: 1,
      userId: 42,
      createDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    UserRoleService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/user-role")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(UserRoleService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new UserRole without required attributes fails", async () => {
    const data = {};

    UserRoleService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/user-role")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(UserRoleService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/user-role/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    UserRoleService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/user-role/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(UserRoleService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/user-role/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    UserRoleService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/user-role/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(UserRoleService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    UserRoleService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/user-role/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(UserRoleService.get).not.toHaveBeenCalled();
  });

  test("UserRole update", async () => {
    const data = {
      roleId: 1,
      userId: 42,
      createDate: "2001-01-01T00:00:00Z",
    };
    UserRoleService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/user-role/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(UserRoleService.update).toHaveBeenCalledWith(1, data);
  });

  test("UserRole deletion", async () => {
    UserRoleService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/user-role/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(UserRoleService.delete).toHaveBeenCalledWith(1);
  });
});
