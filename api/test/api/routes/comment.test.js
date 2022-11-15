import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import CommentService from "../../../src/services/comment.js";
import UserService from "../../../src/services/user.js";

jest.mock("../../../src/services/comment.js");
jest.mock("../../../src/services/user.js");

UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ email: "test@example.com" });

describe("/api/v1/comment/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/comment");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    CommentService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/comment")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(CommentService.list).toHaveBeenCalled();
  });

  test("POST creates a new Comment", async () => {
    const data = {
      bookId: 1,
      userId: 42,
      title: "test",
      comment: "test",
      stars: 3.141592,
      createDate: "2001-01-01T00:00:00Z",
      deletedDate: "2001-01-01T00:00:00Z",
    };

    CommentService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/comment")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(CommentService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Comment without required attributes fails", async () => {
    const data = {};

    CommentService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/comment")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(CommentService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/comment/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    CommentService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/comment/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(CommentService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/comment/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    CommentService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/comment/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(CommentService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    CommentService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/comment/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(CommentService.get).not.toHaveBeenCalled();
  });

  test("Comment update", async () => {
    const data = {
      bookId: 1,
      userId: 42,
      title: "test",
      comment: "test",
      stars: 3.141592,
      createDate: "2001-01-01T00:00:00Z",
    };
    CommentService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/comment/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(CommentService.update).toHaveBeenCalledWith(1, data);
  });

  test("Comment deletion", async () => {
    CommentService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/comment/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(CommentService.delete).toHaveBeenCalledWith(1);
  });
});
