import useFetchScores from "../helper/useFetchScores";

export default function TopScores() {
  const { loading, error, scores } = useFetchScores();

  if (loading) return <p>Loadging...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <table>
      <th>Position</th>
      <th>Username</th>
      <th>Time</th>
      {scores.map((score, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{score.username}</td>
          <td>{score.seconds} seconds</td>
        </tr>
      ))}
    </table>
  );
}
