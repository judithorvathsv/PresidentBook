

import { useNavigate } from 'react-router-dom';
import {PresidentProps} from '../interfaces';
import { useState } from 'react';


const PresidentDetail = ({id, firstName, lastName, startYear, endYear, handleGetPresident}:PresidentProps) => {
  const navigate = useNavigate();
   const [error, setError] = useState("");

  const handleEdit = () => {
    navigate(`/api/v1/PresidentBook/presidents/${id}`)
  }

  const handleDelete = async () => {   
    try {
        const response = await fetch(`http://localhost:5241/api/v1/presidents/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }          
        });

        if (!response.ok) {
            throw new Error("Failed to delete the president");
        }
        await handleGetPresident();
        navigate('/api/v1/PresidentBook/presidents');
    
    } catch (error) {
        setError(error instanceof Error ? error.message : 'Error');
    }

  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{startYear}</p>
        <p>{endYear}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default PresidentDetail
