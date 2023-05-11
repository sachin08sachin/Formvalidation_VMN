const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const FormData = require('../models/formModel'); // Import the FormData model

// POST route to submit form data
router.post('/', asyncHandler(async (req, res) => {
  try {
    const formData = await FormData.create(
       { 
        testcase_id : req.body.testcase_id,
        name : req.body.name,
        component : req.body.component,
        topology : req.body.topology,
        configuration : req.body.configuration,
        test_steps : req.body.test_steps,
        test_log : req.body.test_log,
        log_analysis : req.body.log_analysis,
        result : req.body.result                    
       }
       ); // Create a new FormData document in MongoDB
       console.log(formData)
        
    res.status(201).json({ formData }); // Return the saved form data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}));

router.get("/form-data", async (req, res) => {
  const formData = await FormData.find();
  res.json(formData);
});

// GET route to retrieve form data based on ID
router.get('/test-case-data/:id', asyncHandler(async (req, res) => {
  try {
    const formData = await FormData.findById(req.params.id);
    if (!formData) {
      res.status(404).send('Form data not found');
    } else {
      res.json(formData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}));

router.delete("/test-case-data/:id", async (req, res) => {
  try {
    const deletedData = await FormData.deleteOne({ _id: req.params.id });
    res.json(deletedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT request to update a test case by ID
// PUT request to update a test case by ID
router.put('/test-case-data/:id', asyncHandler(async (req, res) => {
  try {
    const formData = await FormData.findById(req.params.id);
    if (!formData) {
      res.status(404).send('Form data not found');
      return;
    }

    formData.testcase_id = req.body.testcase_id || formData.testcase_id;
    formData.name = req.body.name || formData.name;
    formData.component = req.body.component || formData.component;
    formData.topology = req.body.topology || formData.topology;
    formData.configuration = req.body.configuration || formData.configuration;
    formData.test_steps = req.body.test_steps || formData.test_steps;
    formData.test_log = req.body.test_log || formData.test_log;
    formData.log_analysis = req.body.log_analysis || formData.log_analysis;
    formData.result = req.body.result || formData.result;

    const updatedFormData = await formData.save();
    res.json(updatedFormData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}));



module.exports = router;