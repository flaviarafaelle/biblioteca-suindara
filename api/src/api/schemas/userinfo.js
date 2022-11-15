export default {
  type: "object",
  properties: {
    name: { type: "string" },
    surname: { type: "string" },
    address: { type: "string" },
    addressNumber: { type: "string" },
    addressComplement: { type: "string" },
    addressDistrict: { type: "string" },
    addressCity: { type: "string" },
    addressZipcode: { type: "string" },
    createDate: { type: "string", format: "date-time" },
    updateDate: { type: "string", format: "date-time" },
    deletedDate: { type: "string", format: "date-time" },
  },
  required: ["name", "surname", "createDate"],
  additionalProperties: false,
};
