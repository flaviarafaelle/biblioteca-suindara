import { Router } from "express";
import swaggerUI from "swagger-ui-express";

import { authenticateWithToken } from "../middlewares/auth.js";
import { handle404, handleError } from "../middlewares/errors.js";
import authRouter from "./auth.js";
import bookRouter from "./book.js";
import categoryRouter from "./category.js";
import bookCategoryRouter from "./bookcategory.js";
import commentRouter from "./comment.js";
import favoriteBookRouter from "./favoritebook.js";
import permissionRouter from "./permission.js";
import rentRouter from "./rent.js";
import roleRouter from "./role.js";
import rolePermissionRouter from "./rolepermission.js";
import userRoleRouter from "./userrole.js";
import userInfoRouter from "./userinfo.js";
import urls from "../urls.js";
import spec from "../openapi.js";

const router = Router();

// Swagger API docs
const swaggerSpecPath = `${urls.swagger.path}/${urls.swagger.spec}`;
const swaggerUIOptions = {
  swaggerOptions: {
    url: swaggerSpecPath,
  },
};
router.get(swaggerSpecPath, (req, res) => res.json(spec));
router.use(
  urls.swagger.path,
  swaggerUI.serve,
  swaggerUI.setup(null, swaggerUIOptions)
);

// Authentication
router.use(authenticateWithToken);
router.use(urls.apiPrefix + urls.auth.path, authRouter);

// CRUD API
router.use(urls.apiPrefix + urls.book.path, bookRouter);
router.use(urls.apiPrefix + urls.category.path, categoryRouter);
router.use(urls.apiPrefix + urls.bookCategory.path, bookCategoryRouter);
router.use(urls.apiPrefix + urls.comment.path, commentRouter);
router.use(urls.apiPrefix + urls.favoriteBook.path, favoriteBookRouter);
router.use(urls.apiPrefix + urls.permission.path, permissionRouter);
router.use(urls.apiPrefix + urls.rent.path, rentRouter);
router.use(urls.apiPrefix + urls.role.path, roleRouter);
router.use(urls.apiPrefix + urls.rolePermission.path, rolePermissionRouter);
router.use(urls.apiPrefix + urls.userRole.path, userRoleRouter);
router.use(urls.apiPrefix + urls.userInfo.path, userInfoRouter);

// Redirect browsers from index to API docs
router.get("/", (req, res, next) => {
  if (req.accepts("text/html")) {
    res.redirect(urls.swagger.path);
  } else {
    next();
  }
});

// Error handlers
router.use(handle404);
router.use(handleError);

export default router;
