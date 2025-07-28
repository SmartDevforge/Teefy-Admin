import { clsx } from "clsx"
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



const HealthStatusCard = () => {
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchHealth = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL
        const response = await fetch(`${baseURL}/health`); // Replace with your actual backend URL if needed
        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        if (isMounted) {
          setHealthData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Could not fetch health data");
        }
      }
    };

    fetchHealth(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchHealth();
    }, 60000); // Every 60 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-4 rounded shadow bg-white w-full max-w-sm">
      <h3 className="text-sm font-medium mb-2">Server Health</h3>
      {error && <p className="text-red-600">{error}</p>}
      {!error && !healthData && <p>Loading...</p>}
      {healthData && (
        <div>
          <p>Status: <span className="font-semibold text-green-600">{healthData.status}</span></p>
          <p>Uptime: {Math.floor(healthData.uptime)}s</p>
          <p>Last Check: {new Date(healthData.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default HealthStatusCard;
