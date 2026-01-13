import useFetchScores from "../helper/useFetchScores";
import Loading from "./Loading";

export default function TopScores({ scoreId, settingId }) {
  const { loading, error, scores } = useFetchScores(settingId);

  if (loading) return <Loading />;

  if (error) return <p>{error.message}</p>;

  return (
    <table className="ml-10 mr-10 m-3 flex flex-col gap-5 self-center rounded-md border border-dg p-2">
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
            <td className="w-80 text-xl pl-5 pr-5">{score.seconds} seconds</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
