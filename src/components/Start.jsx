import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function Start() {
  const [username, setUsername] = useOutletContext();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/select");
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="username">
        <h2>Enter Name</h2>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          name="username"
          value={username}
        />
      </label>
      <button type="submit">Let's Go</button>
    </form>
  );
}
