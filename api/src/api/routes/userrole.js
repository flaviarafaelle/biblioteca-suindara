import { Router } from "express";

import UserRoleService from "../../services/userrole.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/userrole.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: UserRole
 *   description: API for managing UserRole objects
 *
 * /user-role:
 *   get:
 *     tags: [UserRole]
 *     summary: Get all the UserRole objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of UserRole objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRole'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await UserRoleService.list();
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
 * /user-role:
 *   post:
 *     tags: [UserRole]
 *     summary: Create a new UserRole
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRole'
 *     responses:
 *       201:
 *         description: The created UserRole object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await UserRoleService.create(req.validatedBody);
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
 * /user-role/{id}:
 *   get:
 *     tags: [UserRole]
 *     summary: Get a UserRole by id
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
 *         description: UserRole object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await UserRoleService.get(req.params.id);
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
 * /user-role/{id}:
 *   put:
 *     tags: [UserRole]
 *     summary: Update UserRole with the specified id
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
 *             $ref: '#/components/schemas/UserRole'
 *     responses:
 *       200:
 *         description: The updated UserRole object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await UserRoleService.update(
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
 * /user-role/{id}:
 *   delete:
 *     tags: [UserRole]
 *     summary: Delete UserRole with the specified id
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
    const success = await UserRoleService.delete(req.params.id);
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
