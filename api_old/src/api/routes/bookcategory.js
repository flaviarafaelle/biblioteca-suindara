import { Router } from "express";

import BookCategoryService from "../../services/bookcategory.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/bookcategory.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: BookCategory
 *   description: API for managing BookCategory objects
 *
 * /book-category:
 *   get:
 *     tags: [BookCategory]
 *     summary: Get all the BookCategory objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of BookCategory objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookCategory'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await BookCategoryService.list();
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
 * /book-category:
 *   post:
 *     tags: [BookCategory]
 *     summary: Create a new BookCategory
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookCategory'
 *     responses:
 *       201:
 *         description: The created BookCategory object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCategory'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await BookCategoryService.create(req.validatedBody);
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
 * /book-category/{id}:
 *   get:
 *     tags: [BookCategory]
 *     summary: Get a BookCategory by id
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
 *         description: BookCategory object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCategory'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await BookCategoryService.get(req.params.id);
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
 * /book-category/{id}:
 *   put:
 *     tags: [BookCategory]
 *     summary: Update BookCategory with the specified id
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
 *             $ref: '#/components/schemas/BookCategory'
 *     responses:
 *       200:
 *         description: The updated BookCategory object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookCategory'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await BookCategoryService.update(
        req.params.id,
        req.validatedBody
      );
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
 * /book-category/{id}:
 *   delete:
 *     tags: [BookCategory]
 *     summary: Delete BookCategory with the specified id
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
    const success = await BookCategoryService.delete(req.params.id);
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

export default router;
