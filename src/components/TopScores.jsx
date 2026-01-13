import { useNavigate } from "react-router";
import useFetchScores from "../helper/useFetchScores";
import Loading from "./Loading";

export default function TopScores({ scoreId, settingId, resetGame }) {
  const { loading, error, scores } = useFetchScores(settingId);
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="self-center flex flex-col items-center">
      <table className="ml-10 mr-10 m-3 flex flex-col gap-5 rounded-md border border-dg p-2">
        <caption className="text-2xl">Top Scores</caption>
        <thead>
          <tr className="flex w-150 bg-yellow pl-5 pr-5 p-2 rounded-md">
            <th className="text-xl text-left pl-5 pr-5 w-25">Position</th>
            <th className="text-xl text-left pl-5 pr-5 w-80">Username</th>
            <th className="text-xl text-left pl-5 pr-5 w-80">Time</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-2">
          {scores.map((score, index) => (
            <tr
              className={`flex w-150 pl-5 pr-5 p-2 rounded-md ${index % 2 == 0 ? "bg-light" : "bg-white"} ${scoreId == score.id ? "outline-green outline-2" : ""}`}
              key={index}
            >
              <td className="w-35 text-xl pl-5 pr-5">{index + 1}</td>
              <td className="w-80 text-xl pl-5 pr-5">{score.username}</td>
              <td className="w-80 text-xl pl-5 pr-5">
                {score.seconds} seconds
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={resetGame}
        className="bg-yellow-500 cursor-pointer hover:bg-yellow-400 font-bold text-2xl text-light py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
      >
        Replay
      </button>
    </div>
  );
}
