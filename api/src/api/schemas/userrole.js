export default {
  type: "object",
  properties: {
    roleId: { type: "integer" },
    userId: { type: "integer" },
    createDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["roleId", "userId", "createDate"],
  additionalProperties: false,
};
