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
    <form
      className="self-center flex flex-col gap-5 h-80 justify-center border-slate-200 rounded-md border pl-25 pr-25 mt-10"
      method="post"
      onSubmit={submitHandler}
    >
      <label className="w-full max-w-sm min-w-50" htmlFor="username">
        <h2 className="text-2xl text-center">Enter Name</h2>
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-xl border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          type="text"
          id="username"
          onChange={handleChange}
          name="username"
          value={username}
          required
        />
      </label>
      <button
        className="bg-yellow-500 cursor-pointer hover:bg-yellow-400 font-bold text-2xl text-light py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
        type="submit"
      >
        Start!
      </button>
    </form>
  );
}
