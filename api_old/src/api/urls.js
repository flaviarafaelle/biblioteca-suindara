export default {
  apiPrefix: "/api/v1",
  swagger: {
    path: "/api/docs",
    spec: "openapi.json",
  },
  auth: {
    path: "/auth",
    login: "/login",
    logout: "/logout",
    changePassword: "/password",
    register: "/register",
  },
  book: {
    path: "/book",
  },
  category: {
    path: "/category",
  },
  bookCategory: {
    path: "/book-category",
  },
  comment: {
    path: "/comment",
  },
  favoriteBook: {
    path: "/favorite-book",
  },
  permission: {
    path: "/permission",
  },
  rent: {
    path: "/rent",
  },
  role: {
    path: "/role",
  },
  rolePermission: {
    path: "/role-permission",
  },
  userRole: {
    path: "/user-role",
  },
  userInfo: {
    path: "/user-info",
  },
};
