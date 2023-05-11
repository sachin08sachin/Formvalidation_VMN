import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './testcaselist.css'

function TestCaseForm() {
  const { dataId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    testcase_id:'',
    name: '',
    component: '',
    topology: '',
    configuration: '',
    test_steps: '',
    test_log: '',
    log_analysis: '',
    result: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5001/api/form/test-case-data/${dataId}`);
        setData(response.data);
        setFormData(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:5001/api/form/test-case-data/${dataId}`);
      setData(null);
    } catch (error) {
      setError(error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/form/test-case-data/${dataId}`, formData);
      alert('Form data updated successfully');
    } catch (error) {
      setError(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (!data) {
    return <p>Form Data deleted</p>;
  }

  return (
    <div className='container'>
      <div className='formModel'>
        <form onSubmit={handleSubmit}>
          <div className='formdata'>
            <h2>Test Case Details for {data.testcase_id}</h2>
          </div>
          <div className='formdata'>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className='formdata'>
            <label>Component:</label>
            <input type="text" name="component" value={formData.component} placeholder={data.component} onChange={handleChange} />
          </div>
          <div className='formdata'>
            <label>Configuration:</label>
            <textarea name="configuration" value={formData.configuration} placeholder={data.configuration} onChange={handleChange} />
          </div>
          <div className='formdata'>
            <label>Test Steps:</label>
            <textarea name="test_steps" value={formData.test_steps} placeholder={data.test_steps} onChange={handleChange} />
          </div>
          <div className='formdata'>
            <label>Test Log:</label>
            <textarea name="test_log" value={formData.test_log} placeholder={data.test_log} onChange={handleChange} />
          </div>
          <div className='formdata'>
            <label>Log Analysis:</label>
            <textarea name="log_analysis" value={formData.log_analysis} onChange={handleChange} />
          </div>
          <div className='formdata'>
            <label>Result:</label>
            <select className='selectResult' name="result" value={formData.result} onChange={handleChange}>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
              <option value="holdOn">holdOn</option>
              <option value="waiting">Waiting</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
          {data.topology && (
            <div className='formdata'>
              <h3>Topology:</h3>
              <ul>
                {data.topology.toString('utf-8').split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className='Buttonforedit'>
            <button type="submit">Update</button>
            <button type="button" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestCaseForm;

