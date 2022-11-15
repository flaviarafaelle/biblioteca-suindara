import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import FavoriteBookService from "../../../src/services/favoritebook.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/favoritebook.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/favorite-book/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/favorite-book");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    FavoriteBookService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/favorite-book")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(FavoriteBookService.list).toHaveBeenCalled();
  });

  test("POST creates a new FavoriteBook", async () => {
    const data = {
      bookId: 1,
      userId: 42,
      createDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    FavoriteBookService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/favorite-book")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(FavoriteBookService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new FavoriteBook without required attributes fails", async () => {
    const data = {};

    FavoriteBookService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/favorite-book")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(FavoriteBookService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/favorite-book/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    FavoriteBookService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/favorite-book/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(FavoriteBookService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/favorite-book/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    FavoriteBookService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/favorite-book/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(FavoriteBookService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    FavoriteBookService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/favorite-book/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(FavoriteBookService.get).not.toHaveBeenCalled();
  });

  test("FavoriteBook update", async () => {
    const data = {
      bookId: 1,
      userId: 42,
      createDate: "2001-01-01T00:00:00Z",
    };
    FavoriteBookService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/favorite-book/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(FavoriteBookService.update).toHaveBeenCalledWith(1, data);
  });

  test("FavoriteBook deletion", async () => {
    FavoriteBookService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/favorite-book/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(FavoriteBookService.delete).toHaveBeenCalledWith(1);
  });
});
