import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import BookService from "../../../src/services/book.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/book.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/book/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/book");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    BookService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req.get("/api/v1/book").set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(BookService.list).toHaveBeenCalled();
  });

  test("POST creates a new Book", async () => {
    const data = {
      title: "test",
      description: "test",
      author: "test",
      publishingCompany: "test",
      publishYear: 42,
      isbn: "test",
      pages: 42,
      isAvailable: true,
      createDate: "2001-01-01T00:00:00Z",
      updatedDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
      rentMaxDays: 42,
    };

    BookService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/book")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(BookService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Book without required attributes fails", async () => {
    const data = {};

    BookService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/book")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(BookService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/book/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    BookService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/book/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(BookService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/book/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    BookService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/book/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(BookService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    BookService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/book/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(BookService.get).not.toHaveBeenCalled();
  });

  test("Book update", async () => {
    const data = {
      title: "test",
      description: "test",
      author: "test",
      publishingCompany: "test",
      publishYear: 42,
      isbn: "test",
      isAvailable: true,
      createDate: "2001-01-01T00:00:00Z",
      rentMaxDays: 42,
    };
    BookService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/book/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(BookService.update).toHaveBeenCalledWith(1, data);
  });

  test("Book deletion", async () => {
    BookService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/book/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(BookService.delete).toHaveBeenCalledWith(1);
  });
});
