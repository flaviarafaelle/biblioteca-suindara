import { Router } from "express";

import BookService from "../../services/book.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/book.js";
import fetch from "node-fetch";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: Book
 *   description: API for managing Book objects
 *
 * /book:
 *   get:
 *     tags: [Book]
 *     summary: Get all the Book objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of Book objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await BookService.list();
    res.json(results);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /book:
 *   post:
 *     tags: [Book]
 *     summary: Create a new Book
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The created Book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await BookService.create(req.validatedBody);
    res.status(201).json(obj);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /book/{id}:
 *   get:
 *     tags: [Book]
 *     summary: Get a Book by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await BookService.get(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /book/{id}:
 *   put:
 *     tags: [Book]
 *     summary: Update Book with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated Book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await BookService.update(req.params.id, req.validatedBody);
      if (obj) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      if (error.isClientError()) {
        res.status(400).json({ error });
      } else {
        next(error);
      }
    }
  }
);

/** @swagger
 *
 * /book/{id}:
 *   delete:
 *     tags: [Book]
 *     summary: Delete Book with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *        description: OK, object deleted
 */
router.delete("/:id", requireValidId, async (req, res, next) => {
  try {
    const success = await BookService.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /book/query:
 *   post:
 *     tags: [Book]
 *     summary: Query book in ISBN API
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookAPI'
 *     responses:
 *       201:
 *         description: Query response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookAPIResponse'
 */

router.post("/query", async (req, res, next) => {
  try {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    const url = `${apiUrl}?q=${encodeURI(req.body.query)}`;
    console.log(url);
    const result = await fetch(url);
    const json = await result.json();
    res.status(201).json(json);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ error });
    }
  }
});

export default router;
