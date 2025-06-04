import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth.context";

const CreateAlumini = () => {
  const { Alumini_URL } = useAuth();
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ----------  🔑  Add this ---------- */
  // How many years back you want to show
  const YEARS_TO_SHOW = 30;
  const currentYear = new Date().getFullYear();
  const passoutYears = Array.from(
    { length: YEARS_TO_SHOW },
    (_, i) => currentYear - i
  );
  /* ----------------------------------- */

  useEffect(() => {
    let timeout;
    if (error) timeout = setTimeout(() => setError(""), 3000);
    else if (message) timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [error, message]);

  const handleAlumini = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const form = new FormData(formRef.current);
    const formData = {};
    for (let [key, value] of form.entries()) formData[key] = value.trim();

    if (
      !formData.Name ||
      !formData.passout ||
      !formData.branch ||
      !formData.tel ||
      !formData.company
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const { status } = await axios.post(
        `${Alumini_URL}/CreateAlumini`,
        formData
      );
      if (status === 200) {
        setMessage("Alumini created successfully!");
        formRef.current.reset();
      } else setError("Failed to create alumini.");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "An error occurred while creating the alumini."
      );
    }
  };

  return (
    <div className="alumini-form-wrapper">
      <h1>Create Alumini</h1>
      <hr />
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form ref={formRef} onSubmit={handleAlumini}>
        <input type="text" name="Name" placeholder="Name*" />

        <select name="branch" defaultValue="">
          <option value="">Select Branch</option>
          <option value="CSE">Computer Science and Engineering (CSE)</option>
          <option value="IT">Information Technology (IT)</option>
          <option value="ME">Mechanical Engineering (ME)</option>
          <option value="ECE">
            Electronics and Communication Engineering (ECE)
          </option>
          <option value="CE">Civil Engineering (CE)</option>
        </select>

        <select name="passout" defaultValue="">
          <option value="">Select Passout Year</option>
          {passoutYears.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        <input type="text" name="company" placeholder="Company*" />
        <input type="tel" name="tel" placeholder="Phone*" />
        <input type="text" name="linkedin" placeholder="LinkedIn (optional)" />
        <button className="btn" type="submit">
          Create Alumini
        </button>
      </form>
    </div>
  );
};

export default CreateAlumini;
