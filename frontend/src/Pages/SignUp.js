import React, { useState, useEffect } from 'react';
import '../Css/SignUp.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar.js';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", number: "", UserType: "", selectedInstitute: "", password: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [button, setButton] = useState(true);
  const [error, setError] = useState("");
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {

    const fetchInstitutes = async () => {
      try {
        console.log("Trying to get institute names at the signup page");
        const response = await fetch("http://localhost:7000/api/institutes");
        const data = await response.json();
        console.log(data);
        setInstitutes(data);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    };

    fetchInstitutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, number, UserType, selectedInstitute, password } = credentials;

    if (!name || !email || !number || !UserType || (showDropdown && !selectedInstitute) || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    setButton(false);
    setShowDropdown(false);


    const dataToSend = { name, email, number, UserType, password };
    if (UserType === 'Institute') {
      dataToSend.selectedInstitute = selectedInstitute;
    }

    const response = await fetch("http://localhost:7000/api/CreateUser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
     
      alert(json.message);
      
    } 
    if (json.success) {
     
      alert(json.message);
      navigate("/login")
      
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === 'UserType') {
      setShowDropdown(value === 'Institute');
    }
  };

  return (
    <div className="SignupPage">
      <div className="SignUpPagenavbar">
        <Navbar />
      </div>
      <div className='sign_up_form_main_container'>
        <div className="login_form">
          <h2>Sign Up</h2>
          <div className="input_group">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              className="input_text"
              name="name"
              value={credentials.name}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa-solid fa-square-envelope"></i>
            <input
              type="email"
              placeholder="Type Your E-mail Here"
              className="input_text"
              autoComplete="off"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-address-book" aria-hidden="true"></i>
            <input
              type="text"
              placeholder="Mobile No."
              className="input_text"
              autoComplete="off"
              name="number"
              value={credentials.number}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-key"></i>
            <input
              type="password"
              placeholder="Password"
              className="input_text"
              autoComplete="off"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="input_group">
            <i className="fa fa-building"></i>
            <select
              className="input_text"
              name="UserType"
              value={credentials.UserType}
              onChange={handleChange}
            >
              <option value="" disabled>Select</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Institute">Institute</option>
            </select>
          </div>
          {showDropdown && (
            <div className="input_group input_group_ins_name">
              <i className="fa fa-university"></i>
              <select
                className="input_text"
                name="selectedInstitute"
                value={credentials.selectedInstitute}
                onChange={handleChange}
              >
                <option value="" disabled>Select your Institute</option>
                {institutes.map((institute, index) => (
                  <option className='InstituteNames' key={index} value={institute}>{institute}</option>
                ))}
              </select>
            </div>
          )}
          {error && <div className="SignUp_error">{error}</div>}
          <div className="button_group signupbutton" onClick={handleSubmit} id="login_button">
            <a>Submit</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
