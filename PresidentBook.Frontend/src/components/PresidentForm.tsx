import { ChangeEvent, useState } from 'react'
import { PresidentFormProps } from '../interfaces';

const PresidentForm = ({handleAddPresident}:PresidentFormProps) => {
    const [president, setPresident] = useState({ firstName: "", lastName: "", startYear: 0, endYear: 0 });
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const handleForm = () =>{
        setVisible(true);
    }

    const handleCancel = () =>{
        setVisible(false);
        setError("");
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPresident((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e:ChangeEvent<HTMLFormElement>) => {         
        e.preventDefault();
     
        try {
            const response = await fetch("http://localhost:5241/api/v1/presidents", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
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
            setError(error instanceof Error ? error.message : 'Error');
            console.error("Error:", error);
            return; 
        }
 
        setVisible(false);      
    };  

    const errorMessages = error.split("*").map((message, index) => <p key={index}>{message}</p>);

    if(!visible) return <button onClick={handleForm}>Add President</button>

    return (
        
            visible &&
            <div>
                 {error && <div style={{color: 'red'}}>{errorMessages}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" value={president.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" value={president.lastName} onChange={handleChange} />
                    <input type="number" name="startYear" value={president.startYear} onChange={handleChange} />
                    <input type="number" name="endYear" value={president.endYear} onChange={handleChange} />

                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>  
            </div> 
    );
};

export default PresidentForm;
