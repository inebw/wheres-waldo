import { useEffect, useRef, useState } from "react";
import useFetchSettings from "../helper/useFetchSettings";
import useFetchChars from "../helper/useFetchChars";
import ShowChar from "./ShowChar";
import useFetchCords from "../helper/useFetchCords";
import { useStopwatch } from "react-timer-hook";
import TopScores from "./TopScores";
import { useOutletContext, useParams } from "react-router";
import CharBoard from "./CharBoard";
import useCharStyles from "../helper/useCharStyles";

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
  const [username, setUsername] = useOutletContext();
  const { styles, setCharStyles } = useCharStyles();

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
      pause();
      postScore().then((res) => {
        setWon(true);
      });
    }
  }, [correctChoice]);

  const postScore = async () => {
    const data = {
      username: username,
      setting_id: id,
      seconds: `${totalSeconds}.${milliseconds}`,
    };
    const response = await fetch("http://localhost:3000/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  };

  const increaseChoice = (charId) => {
    if (usedChars.has(charId)) return;
    const prevUsedChars = new Set(usedChars);
    prevUsedChars.add(charId);
    setUsedChars(prevUsedChars);
    setCorrectChoice((prev) => prev + 1);
  };

  const toggleCharClass = () => {
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
      <div className="flex gap-2 justify-between shadow-lg p-2 m-2 ml-100 mr-100">
        <h1 className="text-4xl font-bold">{settings.name}</h1>
        <div>
          <p>
            {totalSeconds}.{milliseconds} seconds
          </p>
          <p>{username}</p>
        </div>
      </div>
      {chars && (
        <CharBoard
          chars={chars}
          styles={styles}
          setCharStyles={setCharStyles}
          correctChoice={correctChoice}
        />
      )}
      <img
        ref={imgRef}
        className="rounded-md w-1/1"
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
        styles={styles}
        setCharStyles={setCharStyles}
      />
    </div>
  );
}
