export default {
  type: "object",
  properties: {
    bookId: { type: "integer" },
    categoryId: { type: "integer" },
    createDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["bookId", "categoryId", "createDate"],
  additionalProperties: false,
};
