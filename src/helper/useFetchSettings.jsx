import { useEffect, useState } from "react";

export default function useFetchSettings(id = null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/settings/${id ? id : ""}`,
          { credentials: "include" },
        );
        if (!response.ok) throw new Error("Server Error");
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, error, settings };
}
