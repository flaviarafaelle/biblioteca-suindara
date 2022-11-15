import swaggerJsDoc from "swagger-jsdoc";

import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  userSchema,
} from "./schemas/auth.js";
import bookSchema from "./schemas/book.js";
import categorySchema from "./schemas/category.js";
import bookCategorySchema from "./schemas/bookcategory.js";
import commentSchema from "./schemas/comment.js";
import favoriteBookSchema from "./schemas/favoritebook.js";
import permissionSchema from "./schemas/permission.js";
import rentSchema from "./schemas/rent.js";
import roleSchema from "./schemas/role.js";
import rolePermissionSchema from "./schemas/rolepermission.js";
import userRoleSchema from "./schemas/userrole.js";
import userInfoSchema from "./schemas/userinfo.js";

export const definition = {
  openapi: "3.0.0.",
  info: {
    title: "biblioteca-suindara",
    version: "0.0.1",
    description: "A REST+JSON API service",
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1",
    },
  ],
  components: {
    schemas: {
      loginSchema,
      registerSchema,
      changePasswordSchema,
      User: userSchema,
      Book: bookSchema,
      Category: categorySchema,
      BookCategory: bookCategorySchema,
      Comment: commentSchema,
      FavoriteBook: favoriteBookSchema,
      Permission: permissionSchema,
      Rent: rentSchema,
      Role: roleSchema,
      RolePermission: rolePermissionSchema,
      UserRole: userRoleSchema,
      UserInfo: userInfoSchema,
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        description: "Simple bearer token",
        scheme: "bearer",
        bearerFormat: "simple",
      },
    },
  },
};

const options = {
  definition,
  apis: ["./src/api/routes/*.js"],
};

const spec = swaggerJsDoc(options);

export default spec;
