import { useNavigate } from "react-router-dom";
import { PresidentProps } from "../interfaces";
import { useState } from "react";

const PresidentDetail = ({
  id,
  firstName,
  lastName,
  startYear,
  endYear,
  handleGetPresident,
}: PresidentProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleEdit = () => {
    navigate(`/api/v1/PresidentBook/presidents/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5241/api/v1/presidents/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      handleGetPresident();
      setError("");
      navigate("/api/v1/PresidentBook/presidents");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error");
      return;
    }
  };

  return (
    <article className="p-4 justify-items-center">
      {error && <p className="text-red-500">{error}</p>}

      <section className="justify-items-center border border-gray-300 rounded p-5">
        <div className="flex space-x-4 mb-2">
          <p className="font-medium">{firstName}</p>
          <p className="font-medium">{lastName}</p>
        </div>

        <div className="flex space-x-4">
          <p>Start Year: {startYear}</p>
          <p>
            End Year:{" "}
            {endYear === 0 || endYear === null ? "-" : endYear.toString()}
          </p>
        </div>

        <section className="mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mr-2"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </section>
      </section>
    </article>
  );
};

export default PresidentDetail;
