import { useEffect, useState } from "react";

export default function useFetchChars(id = null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chars, setChars] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/chars/${id ? id : ""}`,
          { credentials: "include" },
        );
        if (!response.ok) throw new Error("Server Error");
        const data = await response.json();
        setChars(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, error, chars };
}
