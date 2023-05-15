import React, { useState } from 'react';
import './formInput.css';
import axios from 'axios';

function FormInput() {
  const [formData, setFormData] = useState({
    testcase_id: '',
    name: '',
    component: '',
    topology: null,
    configuration: '',
    test_steps: '',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    test_log: '',
    log_analysis_01: null,
    log_analysis: '',
    result: '',
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all required fields have been filled
    // if (
    //   formData.testcase_id === '' ||                     
    //   formData.name === '' ||
    //   formData.component === '' ||
    //   formData.result === '' ||
    //   formData.topology === '' ||
    //   formData.configuration === '' ||
    //   formData.test_steps === '' ||
    //   formData.test_log === '' ||
    //   formData.log_analysis === ''
    // ) {
    //   alert('Please fill in all required fields');
    //   return;
    // }

    const alphanumeric = /^[0-9a-zA-Z]+$/;
if (!formData.testcase_id.match(alphanumeric) || formData.testcase_id === '') {
  alert('Test Case ID should contain only alphanumeric characters');
  return;
}
if (!formData.name.match(alphanumeric) || formData.name === '') {
  alert('Name should contain only alphanumeric characters');
  return;
}
if (formData.component === '') {
  alert('Component Involved field is required');
  return;
}
if (formData.configuration.length > 5000) {
  alert('Configuration should not exceed 5000 words');
  return;
}

if (formData.test_steps.length > 5000) {
  alert('Test Steps should not exceed 5000 words');
  return;
}

if (formData.test_log.length > 5000) {
  alert('Test Log should not exceed 5000 words');
  return;
}

if (formData.log_analysis.length > 5000) {
  alert('Log Analysis should not exceed 5000 words');
  return;
}
const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
if (formData.topology) {
  if (!validFileTypes.includes(formData.topology.type)) {
    alert('Topology should be either an image or a pdf file');
    return;
  }

  if (formData.topology.size > 5000000) {
    alert('Topology(img/pdf) should not exceed 5 MB');
    return;
  }
  //for testlog_analysis
  if (formData.log_analysis_01) {
    if (!validFileTypes.includes(formData.log_analysis_01.type)) {
      alert('log_analysis should be either an image or a pdf file');
      return;
    }
  
    if (formData.log_analysis_01.size > 5000000) {
      alert('log_analysis(img/pdf) should not exceed 5 MB');
      return;
    }

}}




    try {
      const data = new URLSearchParams();
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }
    
      const response = await axios.post('http://localhost:5000/api/form', data);
      console.log(response.data);
      alert('Form submitted successfully!');
      console.log(formData);
    } 
    
    catch (error) {
      console.error(error);
      alert('Error submitting form. Please try again later.');
    }
  };
  
    return (
      <div className="container">
        <div className="formModel">

        <div className="background-animation"></div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formdata">
            <label htmlFor="testcase_id">Test Case ID:</label>
            <input
              type="text"
              id="testcase_id"
              name="testcase_id"
              value={formData.testcase_id}
              onChange={handleChange}
              />
          </div>
  
          <div className="formdata">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              />
          </div>
  
          <div className="formdata">
            <label htmlFor="component">Component Involved:</label>
            <input
              type="text"
              id="component"
              name="component"
              value={formData.component}
              onChange={handleChange}
              />
          </div>
  
          <div className="formdata">
            <label htmlFor="topology">Topology:</label>
            <input
              type="file"
              id="topology"  
              name="topology"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
  
          <div className="formdata">
            <label htmlFor="configuration">Configuration (Component-wise):</label>
            <textarea
              id="configuration"
              name="configuration"
              value={formData.configuration}
              onChange={handleChange}
            ></textarea>
          </div>
  
          <div className="formdata">
            <label htmlFor="test_steps">Test Steps (Execution):</label>
            <textarea
              id="test_steps"
              name="test_steps"
              value={formData.test_steps}
              onChange={handleChange}
              ></textarea>
          </div>
  
          <div className="formdata">
            <label htmlFor="test_log">Test Log:</label>
            <textarea
              id="test_log"
              name="test_log"
              value={formData.test_log}
              onChange={handleChange}
              ></textarea>
          </div>

          <div className="formdata">
            <label htmlFor="tlog_analysis_01">Log Analysis(img/pdf):</label>
            <input
              type="file"
              id="log_analysis_01"  
              name="log_analysis_01"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          

          <div className="formdata">
            <label htmlFor="tlog_analysis">Log Analysis:</label>
            <textarea
              id="log_analysis"
              name="log_analysis"
              value={formData.log_analysis}
              onChange={handleChange}
              ></textarea>
          </div>
          
          <div className="formdata">

              <label htmlFor="result">Result:</label>

                  <select className='selectResult' name="result" onChange={handleChange} value={formData.result}>
                    <option value="">-- Select an option --</option>
                    <option value="Pass">Pass</option>
                    <option value="fail">Fail</option>
                    <option value="holdon">Hold On</option>
                    <option value="waiting">Waiting</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>


          </div>
          <div className="buttonSubmit">

                <button type="submit" onSubmit={handleSubmit} >Submit</button>
          </div>

        </form>

        </div>
      </div>
  );
}

export default FormInput 