import React, { useState } from "react";

export default function App() {
  return (
    <div>
      <Form />
    </div>
  );
}

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
  });
  const [record, setRecords] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.contact.trim()) {
      validationErrors.contact = "Contact is required";
    } else if (!/^\s*\d{10}\s*$/.test(formData.contact)) {
      validationErrors.contact = "Contact is invalid";
    }
    if (!formData.gender.trim()) {
      validationErrors.gender = "Gender is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newRecord = { ...formData, id: new Date().getTime().toString() };
      setRecords((prevRecords) => [...prevRecords, newRecord]);
      setFormData({ name: "", email: "", contact: "", gender: "" });
    }
  };

  return (
    <div>
      <div>
        <h1>Form</h1>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInput}
            placeholder="Enter your name"
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            placeholder="Enter your email"
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label>Contact: </label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleInput}
            placeholder="Enter your contact"
          />
          {errors.contact && <span>{errors.contact}</span>}
        </div>

        <div>
          <label>Gender: </label>
          <select name="gender" value={formData.gender} onChange={handleInput}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span>{errors.gender}</span>}
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div>
        {record.map((curEl) => (
          <div key={curEl.id}>
            <h3>User Data</h3>
            <p>Name: {curEl.name}</p>
            <p>Email: {curEl.email}</p>
            <p>Contact: {curEl.contact}</p>
            <p>Gender: {curEl.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
