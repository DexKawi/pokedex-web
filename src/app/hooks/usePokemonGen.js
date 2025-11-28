import { useState, useEffect } from "react";

export function useGenerations() {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/pokemon/generations");
        if (!response.ok) throw new Error("Failed to fetch generations");
        const data = await response.json();
        setGenerations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { generations, loading, error };
}
