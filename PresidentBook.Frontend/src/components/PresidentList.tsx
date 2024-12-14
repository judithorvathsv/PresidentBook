import { useEffect, useState } from "react";
import PresidentDetail from "./PresidentDetail";
import { PresidentProps } from "../interfaces";
import PresidentForm from "./PresidentForm";

const PresidentList = () => {
  const [presidents, setPresidents] = useState<PresidentProps[]>([]);
  const [error, setError] = useState("");

  const fetchPresidents = async () => {
    try {
      const response = await fetch("http://localhost:5241/api/v1/presidents");
      if (!response.ok) {
        throw new Error("Backend is not available");
      }
      const data = await response.json();
      setPresidents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  useEffect(() => {
    fetchPresidents();
  }, []);

  return (
    <div className="justify-items-center">
      <h1 className="text-xl font-bold mb-4 mt-4">
        All Presidents in the United States
      </h1>

      <PresidentForm handleAddPresident={fetchPresidents} />

      <ul>
        {!error &&
          presidents.map((president) => (
            <li key={president.id}>
              <PresidentDetail
                id={president.id}
                firstName={president.firstName}
                lastName={president.lastName}
                startYear={president.startYear}
                endYear={president.endYear}
                handleGetPresident={fetchPresidents}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PresidentList;
