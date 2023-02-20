import { RolePermission } from "../models/init.js";
import DatabaseError from "../models/error.js";

function prepareData(data) {
  return {
    ...data,
    roleId:
      data.roleId !== undefined
        ? {
            connect: { id: data.roleId },
          }
        : undefined,
    permissionId:
      data.permissionId !== undefined
        ? {
            connect: { id: data.permissionId },
          }
        : undefined,
  };
}

class RolePermissionService {
  static async list() {
    try {
      return RolePermission.findMany();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await RolePermission.findUnique({ where: { id } });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await RolePermission.create({ data: prepareData(data) });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await RolePermission.update({
        where: { id },
        data: prepareData(data),
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      await RolePermission.delete({ where: { id } });
      return true;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default RolePermissionService;
