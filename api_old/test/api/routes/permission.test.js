import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import PermissionService from "../../../src/services/permission.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/permission.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/permission/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/permission");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    PermissionService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/permission")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(PermissionService.list).toHaveBeenCalled();
  });

  test("POST creates a new Permission", async () => {
    const data = {
      name: "test",
      displayName: "test",
      createDate: "2001-01-01T00:00:00Z",
      updatedDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    PermissionService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/permission")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(PermissionService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Permission without required attributes fails", async () => {
    const data = {};

    PermissionService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/permission")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(PermissionService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/permission/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    PermissionService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/permission/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PermissionService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/permission/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    PermissionService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/permission/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(PermissionService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    PermissionService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/permission/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(PermissionService.get).not.toHaveBeenCalled();
  });

  test("Permission update", async () => {
    const data = {
      name: "test",
      displayName: "test",
      createDate: "2001-01-01T00:00:00Z",
    };
    PermissionService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/permission/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PermissionService.update).toHaveBeenCalledWith(1, data);
  });

  test("Permission deletion", async () => {
    PermissionService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/permission/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(PermissionService.delete).toHaveBeenCalledWith(1);
  });
});
