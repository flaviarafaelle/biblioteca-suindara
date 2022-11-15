import { Router } from "express";

import RentService from "../../services/rent.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/rent.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: Rent
 *   description: API for managing Rent objects
 *
 * /rent:
 *   get:
 *     tags: [Rent]
 *     summary: Get all the Rent objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of Rent objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await RentService.list();
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
 * /rent:
 *   post:
 *     tags: [Rent]
 *     summary: Create a new Rent
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       201:
 *         description: The created Rent object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await RentService.create(req.validatedBody);
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
 * /rent/{id}:
 *   get:
 *     tags: [Rent]
 *     summary: Get a Rent by id
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
 *         description: Rent object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await RentService.get(req.params.id);
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
 * /rent/{id}:
 *   put:
 *     tags: [Rent]
 *     summary: Update Rent with the specified id
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
 *             $ref: '#/components/schemas/Rent'
 *     responses:
 *       200:
 *         description: The updated Rent object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await RentService.update(req.params.id, req.validatedBody);
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
 * /rent/{id}:
 *   delete:
 *     tags: [Rent]
 *     summary: Delete Rent with the specified id
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
    const success = await RentService.delete(req.params.id);
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
