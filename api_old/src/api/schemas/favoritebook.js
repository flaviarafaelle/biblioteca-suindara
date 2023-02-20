export default {
  type: "object",
  properties: {
    bookId: { type: "integer" },
    userId: { type: "integer" },
    createDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["bookId", "userId", "createDate"],
  additionalProperties: false,
};
