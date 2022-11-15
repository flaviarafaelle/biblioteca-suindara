import { Router } from "express";

import FavoriteBookService from "../../services/favoritebook.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/favoritebook.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: FavoriteBook
 *   description: API for managing FavoriteBook objects
 *
 * /favorite-book:
 *   get:
 *     tags: [FavoriteBook]
 *     summary: Get all the FavoriteBook objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of FavoriteBook objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteBook'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await FavoriteBookService.list();
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
 * /favorite-book:
 *   post:
 *     tags: [FavoriteBook]
 *     summary: Create a new FavoriteBook
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteBook'
 *     responses:
 *       201:
 *         description: The created FavoriteBook object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteBook'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await FavoriteBookService.create(req.validatedBody);
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
 * /favorite-book/{id}:
 *   get:
 *     tags: [FavoriteBook]
 *     summary: Get a FavoriteBook by id
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
 *         description: FavoriteBook object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteBook'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await FavoriteBookService.get(req.params.id);
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
 * /favorite-book/{id}:
 *   put:
 *     tags: [FavoriteBook]
 *     summary: Update FavoriteBook with the specified id
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
 *             $ref: '#/components/schemas/FavoriteBook'
 *     responses:
 *       200:
 *         description: The updated FavoriteBook object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteBook'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await FavoriteBookService.update(
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
 * /favorite-book/{id}:
 *   delete:
 *     tags: [FavoriteBook]
 *     summary: Delete FavoriteBook with the specified id
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
    const success = await FavoriteBookService.delete(req.params.id);
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
