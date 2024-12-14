import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PresidentEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [president, setPresident] = useState({
    firstName: "",
    lastName: "",
    startYear: "",
    endYear: "",
  });
  const [originalPresident, setOriginalPresident] = useState<{
    firstName: string;
    lastName: string;
    startYear: number;
    endYear: number;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`http://localhost:5241/api/v1/presidents/${id}`, { signal })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch the president");
        }
        return res.json();
    })
    .then((data) => {
        setPresident(data);
        setOriginalPresident(data);
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
  }, [id]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPresident = {
      ...president,
      startYear: president.startYear === "" ? 0 : parseInt(president.startYear),
      endYear: president.endYear === "" ? 0 : parseInt(president.endYear),
    };
    try {
      const response = await fetch(
        `http://localhost:5241/api/v1/presidents/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPresident),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          let errorMessage = "";
          for (const [field, messages] of Object.entries(errorData.errors)) {
            if (Array.isArray(messages)) {
              errorMessage += `${field}: ${messages.join(". ")}*`;
            } else {
              errorMessage += `${field}: ${String(messages)}`;
            }
          }
          setError(errorMessage);
        } else {
          setError("Backend is not available");
        }
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      setError("");
      navigate("/api/v1/PresidentBook/presidents");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error");
      console.error("Error:", error);
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPresident((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate("/api/v1/PresidentBook/presidents");
    setError("");
  };

  const errorMessages = error
    .split("*")
    .map((message, index) => <p key={index}>{message}</p>);

  return (
    <article className="p-8 justify-items-center">
      {error && <div className="text-red-500 mb-4">{errorMessages}</div>}

      <h2 className="font-bold mb-4 text-xl">Edit President</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-1">
          <section className="flex flex-col flex-1">
            <label htmlFor="firstName" className="text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder={
                originalPresident ? originalPresident.firstName : "First Name"
              }
              value={president.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </section>
          <section className="flex flex-col flex-1">
            <label htmlFor="lastName" className="text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder={
                originalPresident ? originalPresident.lastName : "Last Name"
              }
              value={president.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </section>
        </div>

        <div className="flex flex-wrap gap-1">
          <section className="flex flex-col flex-1">
            <label htmlFor="startYear" className="text-sm font-medium mb-1">
              Start Year
            </label>
            <input
              type="text"
              name="startYear"
              id="startYear"
              placeholder={
                originalPresident
                  ? originalPresident.startYear.toString()
                  : "Start Year"
              }
              value={president.startYear}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </section>
          <section className="flex flex-col flex-1">
            <label htmlFor="endYear" className="text-sm font-medium mb-1">
              End Year
            </label>
            <input
              type="text"
              name="endYear"
              id="endYear"
              placeholder={
                originalPresident
                  ? originalPresident.endYear.toString()
                  : "End Year"
              }
              value={president.endYear}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </section>
        </div>

        <section className="flex space-x-4 flex-wrap justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </section>
      </form>
    </article>
  );
};

export default PresidentEditForm;
