import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobileNo: '',
    githubUsername: '',
    rollNo: '',
    collegeName: '',
    accessCode: ''
  });

  const [response, setResponse] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://20.244.56.144/evaluation-service/register', formData);
      console.log('Registration Response:', res.data);
      setResponse(res.data);
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration failed. Please check your details and try again.');
    }
  };

  const handleGetAuthToken = async () => {
    try {
      const { email, name, rollNo, accessCode } = response;
      const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
        email,
        name,
        rollNo,
        accessCode
      });
      console.log('Authorization Token:', res.data);
      setAuthToken(res.data);
    } catch (error) {
      console.error('Auth Token Error:', error);
      alert('Failed to fetch auth token.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register Your Company</h2>
      {["email", "name", "mobileNo", "githubUsername", "rollNo", "collegeName", "accessCode"].map((field) => (
        <div key={field}>
          <input
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            style={{ margin: '5px', padding: '8px' }}
          />
        </div>
      ))}
      <button onClick={handleRegister} style={{ margin: '10px', padding: '10px' }}>Register</button>

      {response && (
        <div>
          <h3>Registration Successful</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <button onClick={handleGetAuthToken} style={{ marginTop: '10px', padding: '10px' }}>
            Get Auth Token
          </button>
        </div>
      )}

      {authToken && (
        <div>
          <h3>Authorization Token</h3>
          <pre>{JSON.stringify(authToken, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Registration;
