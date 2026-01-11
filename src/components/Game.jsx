import { useEffect, useRef, useState } from "react";
import useFetchSettings from "../helper/useFetchSettings";
import useFetchChars from "../helper/useFetchChars";
import ShowChar from "./ShowChar";
import useFetchCords from "../helper/useFetchCords";
import { useStopwatch } from "react-timer-hook";
import TopScores from "./TopScores";
import { useParams } from "react-router";

export default function Game() {
  const { id } = useParams();
  const { loading, error, settings } = useFetchSettings(id);
  const { chars } = useFetchChars();
  const { cords } = useFetchCords(id);
  const [won, setWon] = useState(false);
  const [correctChoice, setCorrectChoice] = useState(0);
  const [usedChars, setUsedChars] = useState(new Set());
  const [pos, setPos] = useState([0, 0]);
  const [sel, setSel] = useState([0, 0]);
  const [charClass, setCharClass] = useState("hidden");
  const imgRef = useRef(null);

  const {
    totalSeconds,
    totalMilliseconds,
    milliseconds,
    seconds,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true, interval: 20 });

  useEffect(() => {
    if (correctChoice === 3) {
      setWon(true);
      pause();
    }
  }, [correctChoice]);

  const increaseChoice = (charId) => {
    console.log(charId);
    if (usedChars.has(charId)) return;
    const prevUsedChars = new Set(usedChars);
    prevUsedChars.add(charId);
    setUsedChars(prevUsedChars);
    console.log(prevUsedChars.size);
    setCorrectChoice((prev) => prev + 1);
  };

  const toggleCharClass = () => {
    const curClass = charClass;
    setCharClass(charClass === "hidden" ? "" : "hidden");
  };
  const clickHandler = (event) => {
    const img = imgRef.current;

    const rect = img.getBoundingClientRect();

    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    let xPos = event.clientX;
    let yPos = event.clientY;

    if (rect.right - xPos <= 150) xPos -= 150;
    if (rect.bottom - yPos <= 250) yPos -= 250;

    setPos([xPos, yPos]);
    setSel([x, y]);
    toggleCharClass();
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (won) return <TopScores />;

  return (
    <div>
      <h1>{settings.name}</h1>
      <p>
        {seconds}.{milliseconds} seconds
      </p>
      {won && (
        <p>
          You won in {totalSeconds}.{totalMilliseconds} seconds
        </p>
      )}
      <img
        ref={imgRef}
        className="w-1/1"
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
        increaseChoice={increaseChoice}
      />
    </div>
  );
}
