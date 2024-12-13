import { useEffect, useState } from 'react'
import PresidentDetail from './PresidentDetail';
import { PresidentProps } from '../interfaces';

const PresidentList = () => {
    const [presidents, setPresidents] = useState<PresidentProps[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {    
        const fetchPresidents = async () => {
            try {
                const response = await fetch('http://localhost:5241/api/v1/presidents'); 
                if (!response.ok) {
                    throw new Error("Backend is not available");
                }
                const data = await response.json();
                setPresidents(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error');
            } 
        };

        fetchPresidents();
    }, [])
    


  return (
    <ul>

    {!error && presidents.map((president) => (
        <li ><PresidentDetail firstName={president.firstName} lastName={president.lastName} startYear={president.startYear} endYear={president.endYear}/></li> 
    ))}
    </ul>
  )
}

export default PresidentList
