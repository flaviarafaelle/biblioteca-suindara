import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import UserInfoService from "../../../src/services/userinfo.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/userinfo.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/user-info/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/user-info");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    UserInfoService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/user-info")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(UserInfoService.list).toHaveBeenCalled();
  });

  test("POST creates a new UserInfo", async () => {
    const data = {
      name: "test",
      surname: "test",
      address: "test",
      addressNumber: "test",
      addressComplement: "test",
      addressDistrict: "test",
      addressCity: "test",
      addressZipcode: "test",
      createDate: "2001-01-01T00:00:00Z",
      updateDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    UserInfoService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/user-info")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(UserInfoService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new UserInfo without required attributes fails", async () => {
    const data = {};

    UserInfoService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/user-info")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(UserInfoService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/user-info/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    UserInfoService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/user-info/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(UserInfoService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/user-info/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    UserInfoService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/user-info/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(UserInfoService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    UserInfoService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/user-info/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(UserInfoService.get).not.toHaveBeenCalled();
  });

  test("UserInfo update", async () => {
    const data = {
      name: "test",
      surname: "test",
      createDate: "2001-01-01T00:00:00Z",
    };
    UserInfoService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/user-info/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(UserInfoService.update).toHaveBeenCalledWith(1, data);
  });

  test("UserInfo deletion", async () => {
    UserInfoService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/user-info/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(UserInfoService.delete).toHaveBeenCalledWith(1);
  });
});
