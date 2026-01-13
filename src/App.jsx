import { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div className="font-jersey flex flex-col gap-10 p-1 bg-light text-dg min-h-screen relative select-none">
      <h1
        className="text-6xl font-bold opacity-80 font-tiny text-center select-none cursor-pointer hover:opacity-100"
        onClick={() => navigate("/")}
      >
        Where's Waldo{" "}
      </h1>
      <Outlet context={[username, setUsername]} />
    </div>
  );
}

export default App;
