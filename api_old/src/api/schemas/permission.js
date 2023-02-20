export default {
  type: "object",
  properties: {
    name: { type: "string" },
    displayName: { type: "string" },
    createDate: { type: "string", format: "date-time" },
    updatedDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["name", "displayName", "createDate"],
  additionalProperties: false,
};
