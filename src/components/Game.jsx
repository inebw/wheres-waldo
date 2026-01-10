import { useRef } from "react";
import useFetchSettings from "../helper/useFetchSettings";

export default function Game({ id }) {
  const { loading, error, settings } = useFetchSettings(id);

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
    console.log(x, y);
    console.log(isWally(x, y));
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
    </div>
  );
}
