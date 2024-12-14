import { ChangeEvent, useState } from 'react'
import { PresidentFormProps } from '../interfaces';



const PresidentForm = ({handleAddPresident}:PresidentFormProps) => {
    const [president, setPresident] = useState({ firstName: "", lastName: "", startYear: 0, endYear: 0, });
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const handleForm = () =>{
        setVisible(true);
    }

    const handleCancel = () =>{
        setVisible(false);
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPresident((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {  
        try {
            const response = await fetch("http://localhost:5241/api/v1/presidents", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(president),
            });

            if (!response.ok) {
                throw new Error("Backend is not available");
            }

            const result = await response.json();
            console.log("Success:", result);
            await handleAddPresident();
             
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error');
            console.error("Error:", error);
        }
        setVisible(false);
    };

    if (error) return <p>Error: {error}</p>;

    if(!visible) return <button onClick={handleForm}>Add President</button>

    return (
        
            visible &&  <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={president.firstName} onChange={handleChange} />
            <input type="text" name="lastName" value={president.lastName} onChange={handleChange} />
            <input type="number" name="startYear" value={president.startYear} onChange={handleChange} />
            <input type="number" name="endYear" value={president.endYear} onChange={handleChange} />

            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        

    );
};

export default PresidentForm;
