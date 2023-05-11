import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './retriveData.css'

function RetrieveData() {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5001/api/form/form-data');
        setFormData(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  const handleButtonClick = (data_Id) => {
    navigate(`/test-case-list/${data_Id}`);
  };


  return (
    <>
      <div className='tableContainer'>
        <table className='table' border={1}>
          <thead className='tableHead'>
            <tr>
              <th>Testcase ID</th>
              <th>Name</th>
              <th>   </th>
            </tr>
          </thead>
          <tbody className='tableBody'>
            {error && <p>An error occurred: {error.message}</p>}
            {formData.map((data) => (
              <tr key={data._id}>
                <td>{data.testcase_id}</td>
                <td>{data.name}</td>
                {/* <td>{data.component}</td>
                <td>{data.configuration}</td>
                <td>{data.test_steps}</td>
                <td>{data.test_log}</td>
                <td>{data.log_analysis}</td> */}
                <td>
                  <button onClick={() => handleButtonClick(data._id)}>click</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RetrieveData;


