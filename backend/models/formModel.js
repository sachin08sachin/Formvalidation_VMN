const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  testcase_id: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  component: {
    type: String,
    // required: true,
  },
  topology: {
    type: Buffer,
    // required: true,
  },
  configuration: {
    type: String,
    // required: true,
  },
  test_steps: {
    type: String,
    // required: true,
  },
  test_log: {
    type: String,
    // required: true,
  },
  log_analysis: {
    type: String,
    // required: true,
  },
  result: {
    type: String,
    // required: true,
  },
});

const FormData = mongoose.model("form", formDataSchema);

module.exports = FormData;