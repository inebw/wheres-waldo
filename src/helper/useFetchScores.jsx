import { useEffect, useState } from "react";

export default function useFetchScores(settingId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/scores/${settingId}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();
        setScores(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, error, scores };
}
