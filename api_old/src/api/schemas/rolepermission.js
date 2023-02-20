export default {
  type: "object",
  properties: {
    roleId: { type: "integer" },
    permissionId: { type: "integer" },
    createDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["roleId", "createDate"],
  additionalProperties: false,
};
