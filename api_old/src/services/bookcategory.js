import { BookCategory } from "../models/init.js";
import DatabaseError from "../models/error.js";

function prepareData(data) {
  return {
    ...data,
    bookId:
      data.bookId !== undefined
        ? {
            connect: { id: data.bookId },
          }
        : undefined,
    categoryId:
      data.categoryId !== undefined
        ? {
            connect: { id: data.categoryId },
          }
        : undefined,
  };
}

class BookCategoryService {
  static async list() {
    try {
      return BookCategory.findMany();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await BookCategory.findUnique({ where: { id } });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await BookCategory.create({ data: prepareData(data) });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await BookCategory.update({
        where: { id },
        data: prepareData(data),
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      await BookCategory.delete({ where: { id } });
      return true;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default BookCategoryService;
