import { useState } from "react";
import { PresidentFormProps } from "../interfaces";

import { presidentSchema, PresidentFormInput  } from '../schemas/presidentSchema';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const PresidentForm = ({ handleAddPresident }: PresidentFormProps) => {
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<PresidentFormInput>({
    resolver: zodResolver(presidentSchema),
  });

  const onSubmit: SubmitHandler<PresidentFormInput> = async (data) => {
    console.log(data);
    if (data.endYear === ""){
      data.endYear = "0"; 
    }
    try {
      const response = await fetch("http://localhost:5241/api/v1/presidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      handleAddPresident();
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error");
      console.error("Error:", error);
      return;
    }

    setVisible(false);
    handleAddPresident();
  };  

  const handleForm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setError("");
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
        <h1 className="font-bold mb-4">Add President</h1>
  
       
        {error && <div className="text-red-500 mb-4">{errorMessages}</div>}
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 justify-center border border-gray-300 rounded p-5">
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          {errors.startYear && <p className="text-red-500">{errors.startYear.message}</p>}         
          {errors.endYear && <p className="text-red-500">{errors.endYear.message}</p>}
  
          <div className="flex flex-wrap gap-1">
            <section className="flex flex-col flex-1">
              <label htmlFor="firstName" className="text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                id="firstName"
                placeholder="First Name"
                className="border border-gray-300 rounded p-2"
              />
            </section>
            <section className="flex flex-col flex-1">
              <label htmlFor="lastName" className="text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                id="lastName"
                placeholder="Last Name"
                className="border border-gray-300 rounded p-2"
              />
            </section>
          </div>
  
          <div className="flex flex-wrap gap-1">
            <section className="flex flex-col flex-1">
              <label htmlFor="startYear" className="text-sm font-medium mb-1">Start Year</label>
              <input
                type="number"
                {...register("startYear", {                  
                  required: "Start Year is required",                  
                })} 
                id="startYear"
                placeholder="Start Year"
                className="border border-gray-300 rounded p-2"
              />
            </section>
            <section className="flex flex-col flex-1">
              <label htmlFor="endYear" className="text-sm font-medium mb-1">End Year</label>
              <input
                type="number"
                {...register("endYear", {})} 
                id="endYear"
                placeholder="End Year (optional)"
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