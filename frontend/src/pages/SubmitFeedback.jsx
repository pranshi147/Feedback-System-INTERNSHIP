import { useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

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

            toast.success("Feedback submitted successfully!");
            setTitle("");
            setDescription("");
            setCategory("General");
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit feedback.");
        }
    };

   return (
    <Layout>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold mb-6">
                Submit Feedback
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    rows="6"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option>General</option>
                    <option>Bug</option>
                    <option>Feature Request</option>
                    <option>Complaint</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Submit Feedback
                </button>

            </form>

        </div>
    </Layout>
);
}

export default SubmitFeedback;