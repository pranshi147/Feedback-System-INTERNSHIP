import { useState } from "react";
import api from "../api/api";

function SubmitFeedback() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("General");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/feedback", {
                title,
                description,
                category
            });

            alert("Feedback submitted successfully!");

            setTitle("");
            setDescription("");
            setCategory("General");
        } catch (err) {
            console.error(err);
            alert("Failed to submit feedback");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Submit Feedback</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    maxWidth: "500px"
                }}
            >
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    rows="6"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>General</option>
                    <option>Bug</option>
                    <option>Feature Request</option>
                    <option>Complaint</option>
                </select>

                <button type="submit">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

export default SubmitFeedback;