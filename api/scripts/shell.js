import repl from "repl";

import config from "../src/utils/config.js";
import app from "../src/app.js";
import {
  User,
  Book,
  Category,
  BookCategory,
  Comment,
  FavoriteBook,
  Permission,
  Rent,
  Role,
  RolePermission,
  UserRole,
  UserInfo,
} from "../src/models/init.js";
import UserService from "../src/services/user.js";
import BookService from "../src/services/book.js";
import CategoryService from "../src/services/category.js";
import BookCategoryService from "../src/services/bookcategory.js";
import CommentService from "../src/services/comment.js";
import FavoriteBookService from "../src/services/favoritebook.js";
import PermissionService from "../src/services/permission.js";
import RentService from "../src/services/rent.js";
import RoleService from "../src/services/role.js";
import RolePermissionService from "../src/services/rolepermission.js";
import UserRoleService from "../src/services/userrole.js";
import UserInfoService from "../src/services/userinfo.js";

const main = async () => {
  process.stdout.write("Database and Express app initialized.\n");
  process.stdout.write("Autoimported modules: config, app, models, services\n");

  const r = repl.start("> ");
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    User,
    Book,
    Category,
    BookCategory,
    Comment,
    FavoriteBook,
    Permission,
    Rent,
    Role,
    RolePermission,
    UserRole,
    UserInfo,
  };
  r.context.services = {
    UserService,
    BookService,
    CategoryService,
    BookCategoryService,
    CommentService,
    FavoriteBookService,
    PermissionService,
    RentService,
    RoleService,
    RolePermissionService,
    UserRoleService,
    UserInfoService,
  };

  r.on("exit", () => {
    process.exit();
  });

  r.setupHistory(".shell_history", () => {});
};

main();
