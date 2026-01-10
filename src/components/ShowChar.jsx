export default function ShowChar({ sel, chars, pos, className, cords }) {
  if (className == "hidden") return <div></div>;
  const clickHandler = (event, charId) => {
    console.log(event.target, charId);
    console.log(isChar(charId));
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
      className={className}
      style={{
        position: "fixed",
        top: pos[1],
        left: pos[0],
      }}
    >
      {chars.map((char) => (
        <div onClick={(e) => clickHandler(e, char.id)}>
          <img className="char-img" src={char.img} alt="" />
          <p>{char.name}</p>
        </div>
      ))}
    </div>
  );
}
