export default {
  type: "object",
  properties: {
    bookId: { type: "integer" },
    userId: { type: "integer" },
    title: { type: "string" },
    comment: { type: "string" },
    stars: { type: "number" },
    createDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["bookId", "userId", "title", "comment", "stars", "createDate"],
  additionalProperties: false,
};
