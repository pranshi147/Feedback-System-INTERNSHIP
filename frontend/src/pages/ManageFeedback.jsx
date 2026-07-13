import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllFeedback, updateStatus } from "../api/feedback";

function ManageFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        loadFeedback();
    }, []);

    async function loadFeedback() {
        try {
            const data = await getAllFeedback();
            setFeedbacks(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleStatus(id, status) {
        try {
            await updateStatus(id, status);
            loadFeedback();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">
                Manage Feedback
            </h1>

            <div className="space-y-4">

                {feedbacks.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded-lg p-5"
                    >
                        <h2 className="text-xl font-bold">
                            {item.title}
                        </h2>

                        <p>{item.description}</p>

                        <p className="mt-2">
                            <strong>Category:</strong> {item.category}
                        </p>

                        <p>
                            <strong>Status:</strong> {item.status}
                        </p>

                        <select
                            className="border p-2 mt-3"
                            value={item.status}
                            onChange={(e) =>
                                handleStatus(
                                    item.id,
                                    e.target.value
                                )
                            }
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">
                                In Progress
                            </option>
                            <option value="Resolved">
                                Resolved
                            </option>
                        </select>

                    </div>
                ))}

            </div>
        </Layout>
    );
}

export default ManageFeedback;