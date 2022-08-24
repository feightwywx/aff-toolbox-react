module.exports = {
  id: "chart-offset",
  type: "chart",
  form: [
    {
      type: "aff",
      id: "aff",
      required: true
    },
    {
      type: "number",
      id: "offset",
      format: ["nonNegative", "int"],
      required: true
    }
  ],
};