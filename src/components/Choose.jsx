import { useState } from "react";
import useFetchSettings from "../helper/useFetchSettings";
import Game from "./Game";

export default function Choose() {
  const [id, setId] = useState(0);
  const { error, loading, settings } = useFetchSettings();

  if (id !== 0) return <Game id={id} />;

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>{error.message}</p>;

  const handleClick = (id) => {
    setId(id);
  };

  return (
    <div>
      <h2>Select your level</h2>
      {settings.map((setting) => (
        <div
          key={setting.id}
          className="setting"
          onClick={() => handleClick(setting.id)}
        >
          <h3 className="text-3xl font-bold">{setting.name}</h3>
          <img className="w-75" src={setting.img} alt="" />
        </div>
      ))}
    </div>
  );
}
