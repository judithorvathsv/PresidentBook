import { useEffect, useState } from "react";
import PresidentDetail from "./presidentDetail";
import { PresidentProps } from "../interfaces";
import PresidentForm from "./presidentForm";

const PresidentList = () => {
  const [presidents, setPresidents] = useState<PresidentProps[]>([]);
  const [error, setError] = useState("");

const fetchPresidents = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
 
    fetch("http://localhost:5241/api/v1/presidents", { signal })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch the president");
        }
        return res.json();
    })
    .then((data) => {
        setPresidents(data);     
        console.log("Success:", data);
    })
    .catch((error) => {
        if(error.name === "AbortError"){
            console.log("cancelled");
        }
        else{
            setError(error instanceof Error ? error.message : "Error");
            console.error("Error:", error);
        }
    });

    return () => {
        controller.abort();
    }
}

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
