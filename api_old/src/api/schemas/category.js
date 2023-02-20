export default {
  type: "object",
  properties: {
    name: { type: "string" },
    displayName: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    updatedDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["name", "createdDate"],
  additionalProperties: false,
};
