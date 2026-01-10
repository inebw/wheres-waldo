import { useRef, useState } from "react";
import useFetchSettings from "../helper/useFetchSettings";
import useFetchChars from "../helper/useFetchChars";
import ShowChar from "./ShowChar";
import useFetchCords from "../helper/useFetchCords";

export default function Game({ id }) {
  const { loading, error, settings } = useFetchSettings(id);
  const { chars } = useFetchChars();
  const { cords } = useFetchCords(id);
  const [pos, setPos] = useState([0, 0]);
  const [sel, setSel] = useState([0, 0]);
  const [charClass, setCharClass] = useState("hidden");
  const imgRef = useRef(null);
  const isWally = (x, y) => {
    if (x > 1727.31 && x < 1754.52 && y > 605.95 && y < 616.53) return true;
    return false;
  };
  const clickHandler = (event) => {
    const img = imgRef.current;

    const rect = img.getBoundingClientRect();

    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    setPos([event.clientX, event.clientY]);
    setSel([x, y]);
    setCharClass("visible");
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>{settings.name}</h1>
      <img
        ref={imgRef}
        className="game-img"
        src={settings.img}
        alt=""
        onClick={clickHandler}
      />
      <ShowChar
        sel={sel}
        chars={chars}
        className={charClass}
        pos={pos}
        cords={cords}
      />
    </div>
  );
}
