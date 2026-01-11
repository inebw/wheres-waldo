import { useEffect, useState } from "react";

export default function ShowChar({
  increaseChoice,
  sel,
  chars,
  pos,
  className,
  cords,
}) {
  if (className == "hidden") return <div></div>;

  const clickHandler = (event, charId) => {
    const target = event.currentTarget;
    if (isChar(charId)) {
      increaseChoice(charId);
    } else {
      target.classList.add("outline-2", "outline-red-100", "animate-shake");
      setTimeout((target) => {
        console.log(target);
        target.classList.remove(
          "outline-2",
          "outline-red-100",
          "animate-shake",
        );
      }, 1000);
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
        className + "border flex flex-col gap-2 p-4 rounded-xs bg-white"
      }
      style={{
        position: "fixed",
        top: pos[1],
        left: pos[0],
      }}
    >
      {chars.map((char) => (
        <div
          className="flex gap-5 p-2 cursor-pointer hover:outline-2"
          onClick={(e) => clickHandler(e, char.id)}
        >
          <img className="w-6.25" src={char.img} alt="" />
          <p>{char.name}</p>
        </div>
      ))}
    </div>
  );
}
