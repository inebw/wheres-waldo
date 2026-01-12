import { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div className="font-jersey flex flex-col gap-10 m-1 bg-light text-dg min-h-screen relative">
      <h1
        className="text-6xl font-bold font-tiny text-center select-none cursor-pointer hover:translate-y-2"
        onClick={() => navigate("/")}
      >
        Where's Waldo{" "}
      </h1>
      <Outlet context={[username, setUsername]} />
    </div>
  );
}

export default App;
