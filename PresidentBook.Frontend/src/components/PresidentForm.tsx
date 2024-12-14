import { ChangeEvent, useState } from 'react'
import { PresidentFormProps } from '../interfaces';

const PresidentForm = ({ handleAddPresident }: PresidentFormProps) => {
  const [president, setPresident] = useState({
    firstName: "",
    lastName: "",
    startYear: 0,
    endYear: 0,
  });
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const handleForm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setError("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPresident((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5241/api/v1/presidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(president),
      });

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
      await handleAddPresident();
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error");
      console.error("Error:", error);
      return;
    }

    setVisible(false);
  };

  const errorMessages = error
    .split("*")
    .map((message, index) => <p key={index}>{message}</p>);

  if (!visible)
    return (
      <button
        className="mb-8 mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        onClick={handleForm}
      >
        Add President
      </button>
    );

  return (
    <article className="p-4 justify-items-center">
      {error && <div className="text-red-500 mb-4">{errorMessages}</div>}

      <h1 className="font-bold mb-4">Add President</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 justify-center border border-gray-300 rounded p-5"
      >
        <div className="flex flex-wrap gap-1">
          <section className="flex flex-col flex-1">
            <label htmlFor="firstName" className="text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={president.firstName}
              onChange={handleChange}
              placeholder="First Name"
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
              value={president.lastName}
              onChange={handleChange}
              placeholder="Last Name"
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
              type="number"
              name="startYear"
              id="startYear"
              value={president.startYear}
              onChange={handleChange}
              placeholder="Start Year"
              className="border border-gray-300 rounded p-2"
            />
          </section>
          <section className="flex flex-col flex-1">
            <label htmlFor="endYear" className="text-sm font-medium mb-1">
              End Year
            </label>
            <input
              type="number"
              name="endYear"
              id="endYear"
              value={president.endYear}
              onChange={handleChange}
              placeholder="End Year"
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

export default PresidentForm;
