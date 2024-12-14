import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PresidentEditForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [president, setPresident] = useState({ firstName: "", lastName: "", startYear: "", endYear: "" });
    const [originalPresident, setOriginalPresident] = useState<{ firstName: string; lastName: string; startYear: number; endYear: number } | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getPresident = async () => {

            try {
                const response = await fetch(`http://localhost:5241/api/v1/presidents/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch the president");
                }

                const result = await response.json();
                setPresident(result);
                setOriginalPresident(result);
                console.log("Success:", result);  
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error');
                console.error("Error:", error);
            }
        };

        getPresident();
    }, [id]);

    const handleSubmit = async (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5241/api/v1/presidents/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(president)
            });

            if (!response.ok) {
                throw new Error("Backend is not available");
            }

            const result = await response.json();
            console.log("Success:", result);
            navigate('/api/v1/PresidentBook/presidents');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPresident((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () =>{
        navigate('/api/v1/PresidentBook/presidents');
    }

    if (error) return <p>Error: {error}</p>;

    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder={originalPresident ? originalPresident.firstName : "First Name"}
                value={president.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder={originalPresident ? originalPresident.lastName : "Last Name"}
                value={president.lastName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="startYear"
                placeholder={originalPresident ? originalPresident.startYear.toString() : "Start Year"}
                value={president.startYear}
                onChange={handleChange}
            />
            <input
                type="text"
                name="endYear"
                placeholder={originalPresident ? originalPresident.endYear.toString() : "End Year"}
                value={president.endYear}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default PresidentEditForm;
