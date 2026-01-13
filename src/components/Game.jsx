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
import Clock from "../assets/Clock";
import Loading from "./Loading";

export default function Game() {
  const { id } = useParams();
  const { loading, error, settings } = useFetchSettings(id);
  const { chars } = useFetchChars();
  const { cords } = useFetchCords(id);
  const [won, setWon] = useState(false);
  const [correctChoice, setCorrectChoice] = useState(0);
  const [pos, setPos] = useState([0, 0]);
  const [sel, setSel] = useState([0, 0]);
  const [charClass, setCharClass] = useState("hidden");
  const imgRef = useRef(null);
  const [username, setUsername] = useOutletContext();
  const { styles, setCharStyles, resetCharStyles } = useCharStyles();
  const [scoreId, setScoreId] = useState(null);

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

  const resetGame = () => {
    setWon(false);
    setCorrectChoice(0);
    reset();
    resetCharStyles();
    setCharClass("hidden");
  };

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
    const score = await response.json();
    console.log(score);
    setScoreId(score.scoreId);
  };

  const increaseChoice = (charId) => {
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

    const POPUP_WIDTH = 200;
    const POPUP_HEIGHT = 260;
    const MARGIN = 15;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // clamp right
    if (xPos + POPUP_WIDTH > viewportW) {
      xPos = viewportW - POPUP_WIDTH - MARGIN;
    }

    // clamp bottom
    if (yPos + POPUP_HEIGHT > viewportH) {
      yPos = viewportH - POPUP_HEIGHT - MARGIN;
    }

    // clamp left/top
    xPos = Math.max(MARGIN, xPos);
    yPos = Math.max(MARGIN, yPos);

    setPos([xPos, yPos]);
    setSel([x, y]);
    toggleCharClass();
  };

  if (loading) return <Loading />;

  if (error) return <p>{error.message}</p>;

  if (won)
    return (
      <>
        {scoreId && (
          <TopScores scoreId={scoreId} settingId={id} resetGame={resetGame} />
        )}
      </>
    );

  return (
    <div>
      <div className="flex gap-2 justify-between items-center shadow-lg p-2 m-2 ml-100 mr-100">
        <h1 className="text-4xl font-bold">{settings.name}</h1>
        <div className="flex flex-col gap-1 items-center justify-center border border-gray-400 rounded-md pl-5 pr-5 p-2 bg-green">
          <div className="flex gap-2">
            <Clock className="w-8 fill-dg" />
            <p className="text-2xl">Time</p>
          </div>
          <p className="text-2xl">
            {String(totalSeconds).padStart(3, 0)}.
            {String(milliseconds).padStart(3, 0)}
          </p>
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
      <div>
        <img
          ref={imgRef}
          className="rounded-md w-1/1 cursor-[url('/glowCursor.png')_50_50,auto]"
          src={settings.img}
          alt=""
          onClick={clickHandler}
        />
      </div>

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
