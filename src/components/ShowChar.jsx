import { useEffect, useState } from "react";
import Check from "../assets/Check";
import Circle from "../assets/Circle";

export default function ShowChar({
  increaseChoice,
  sel,
  chars,
  pos,
  className,
  cords,
  styles,
  setCharStyles,
}) {
  const [usedChars, setUsedChars] = useState(new Set());
  if (className == "hidden") return <div></div>;

  const clickHandler = (event, charId) => {
    const target = event.currentTarget;
    if (usedChars.has(charId)) return;
    if (isChar(charId)) {
      target.classList.add("animate-btn-rare-success");
      setTimeout(() => {
        const prevUsedChars = new Set(usedChars);
        prevUsedChars.add(charId);
        setUsedChars(prevUsedChars);
        increaseChoice(charId);
        setCharStyles(chars.find((char) => char.id == charId).name);
      }, 420);
    } else {
      target.classList.add("outline-2", "outline-red", "animate-btn-error");
      target.lastChild.classList.add("opacity-100");
    }
  };

  const getCharCord = (charId) => {
    const charCord = cords.find((cord) => cord.char_id == charId);
    return [
      parseFloat(charCord.x_min),
      parseFloat(charCord.x_max),
      parseFloat(charCord.y_min),
      parseFloat(charCord.y_max),
    ];
  };

  const isChar = (charId) => {
    const charCord = getCharCord(charId);
    if (
      sel[0] >= charCord[0] &&
      sel[0] <= charCord[1] &&
      sel[1] >= charCord[2] &&
      sel[1] <= charCord[3]
    )
      return true;
    return false;
  };

  return (
    <div
      className={
        className + "border flex flex-col gap-2 p-4 rounded-xl bg-light"
      }
      style={{
        position: "fixed",
        top: pos[1],
        left: pos[0],
      }}
    >
      {chars.map((char) => (
        <div
          key={char.id}
          className={`${styles[char.name].box} btn-3d flex gap-5 justify-between p-2 cursor-pointer rounded-xl `}
          onClick={(e) => clickHandler(e, char.id)}
        >
          <img className="w-6.25" src={char.img} alt="" />
          <p>{char.name}</p>
          <Check className={`${styles[char.name].check}`} />
          <Circle className={`${styles[char.name].wrong}`} />
        </div>
      ))}
    </div>
  );
}
