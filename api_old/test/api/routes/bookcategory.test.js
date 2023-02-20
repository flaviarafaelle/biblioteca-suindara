import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import BookCategoryService from "../../../src/services/bookcategory.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/bookcategory.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/book-category/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/book-category");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    BookCategoryService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/book-category")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(BookCategoryService.list).toHaveBeenCalled();
  });

  test("POST creates a new BookCategory", async () => {
    const data = {
      bookId: 1,
      categoryId: 1,
      createDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    BookCategoryService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/book-category")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(BookCategoryService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new BookCategory without required attributes fails", async () => {
    const data = {};

    BookCategoryService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/book-category")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(BookCategoryService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/book-category/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    BookCategoryService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/book-category/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(BookCategoryService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/book-category/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    BookCategoryService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/book-category/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(BookCategoryService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    BookCategoryService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/book-category/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(BookCategoryService.get).not.toHaveBeenCalled();
  });

  test("BookCategory update", async () => {
    const data = {
      bookId: 1,
      categoryId: 1,
      createDate: "2001-01-01T00:00:00Z",
    };
    BookCategoryService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/book-category/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(BookCategoryService.update).toHaveBeenCalledWith(1, data);
  });

  test("BookCategory deletion", async () => {
    BookCategoryService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/book-category/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(BookCategoryService.delete).toHaveBeenCalledWith(1);
  });
});
