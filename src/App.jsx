import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="font-jersey flex flex-col gap-10 m-1 bg-light text-dg min-h-screen">
      <h1 className="text-6xl font-bold font-tiny text-center">
        Where's Waldo{" "}
      </h1>
      <Outlet context={[username, setUsername]} />
    </div>
  );
}

export default App;
