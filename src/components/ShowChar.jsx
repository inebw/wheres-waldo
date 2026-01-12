import { useEffect, useState } from "react";
import Check from "../assets/Check";
import useCharStyles from "../helper/useCharStyles";

export default function ShowChar({
  increaseChoice,
  sel,
  chars,
  pos,
  className,
  cords,
}) {
  const { styles, setCharStyles } = useCharStyles();
  if (className == "hidden") return <div></div>;

  const clickHandler = (event, charId) => {
    const target = event.currentTarget;
    if (isChar(charId)) {
      increaseChoice(charId);
      setCharStyles(chars.find((char) => char.id == charId).name);
    } else {
      target.classList.add("outline-2", "outline-red", "animate-shake");
    }
  };

  const getCharCord = (charId) => {
    const charCord = cords.find((cord) => cord.id == charId);
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
          className={`${styles[char.name].box} flex gap-5 justify-between p-2 cursor-pointer rounded-xl hover:outline-2 hover:outline-yellow`}
          onClick={(e) => clickHandler(e, char.id)}
        >
          <img className="w-6.25" src={char.img} alt="" />
          <p>{char.name}</p>
          <Check className={`${styles[char.name].check}`} />
        </div>
      ))}
    </div>
  );
}
