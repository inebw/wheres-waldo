import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [username, setUsername] = useState("");
  return (
    <>
      <h1>Where's Waldo </h1>
      <Outlet context={[username, setUsername]} />
    </>
  );
}

export default App;
