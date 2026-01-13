import { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div className="font-jersey flex flex-col gap-10 p-1 bg-light text-dg min-h-screen relative select-none">
      <div className="flex items-center justify-center">
        <img
          src="https://ik.imagekit.io/luc8h8owi/chars/Headshot_-_Waldo.webp?updatedAt=1768015310931"
          alt=""
        />
        <h1
          className="text-6xl font-bold opacity-80 font-tiny cursor-pointer hover:opacity-100"
          onClick={() => navigate("/")}
        >
          Where's Waldo?
        </h1>
      </div>

      <Outlet context={[username, setUsername]} />
    </div>
  );
}

export default App;
