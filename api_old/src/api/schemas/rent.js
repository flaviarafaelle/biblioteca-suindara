export default {
  type: "object",
  properties: {
    userId: { type: "integer" },
    bookId: { type: "integer" },
    penalty: { type: "number" },
    rentDate: { type: "string", format: "date-time" },
    devolutionDate: { type: "string", format: "date-time" },
    createDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["userId", "bookId", "rentDate", "createDate"],
  additionalProperties: false,
};
