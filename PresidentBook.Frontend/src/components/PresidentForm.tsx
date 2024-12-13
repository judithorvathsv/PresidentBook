import { ChangeEvent, FormEvent, useState } from 'react'

const PresidentForm = () => {
    const [president, setPresident] = useState({ firstName: "", lastName: "", startYear: "", endYear: "", });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPresident((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
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
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={president.firstName} onChange={handleChange} />
            <input type="text" name="lastName" value={president.lastName} onChange={handleChange} />
            <input type="number" name="startYear" value={president.startYear} onChange={handleChange} />
            <input type="number" name="endYear" value={president.endYear} onChange={handleChange} />

            <button type="submit">Save</button>
        </form>
    );
};

export default PresidentForm;
