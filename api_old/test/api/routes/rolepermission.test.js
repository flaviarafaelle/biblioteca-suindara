import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import RolePermissionService from "../../../src/services/rolepermission.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/rolepermission.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/role-permission/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/role-permission");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    RolePermissionService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/role-permission")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(RolePermissionService.list).toHaveBeenCalled();
  });

  test("POST creates a new RolePermission", async () => {
    const data = {
      roleId: 1,
      permissionId: 1,
      createDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    RolePermissionService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/role-permission")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(RolePermissionService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new RolePermission without required attributes fails", async () => {
    const data = {};

    RolePermissionService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/role-permission")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(RolePermissionService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/role-permission/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    RolePermissionService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/role-permission/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(RolePermissionService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/role-permission/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    RolePermissionService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/role-permission/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(RolePermissionService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    RolePermissionService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/role-permission/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(RolePermissionService.get).not.toHaveBeenCalled();
  });

  test("RolePermission update", async () => {
    const data = {
      roleId: 1,
      createDate: "2001-01-01T00:00:00Z",
    };
    RolePermissionService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/role-permission/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(RolePermissionService.update).toHaveBeenCalledWith(1, data);
  });

  test("RolePermission deletion", async () => {
    RolePermissionService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/role-permission/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(RolePermissionService.delete).toHaveBeenCalledWith(1);
  });
});
