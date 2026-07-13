import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    getAllFeedback,
    updateStatus,
    replyToFeedback
} from "../api/feedback";

function ManageFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [replies, setReplies] = useState({});

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

    async function handleReply(id) {
    try {
        await replyToFeedback(
            id,
            replies[id] || ""
        );

        loadFeedback();

        alert("Reply sent successfully!");

        setReplies((prev) => ({
            ...prev,
            [id]: ""
        }));
    } catch (err) {
        console.error(err);
        alert("Failed to send reply.");
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
                        <div className="mt-4">
{item.reply && (
    <div className="mt-4 p-3 bg-green-100 rounded">
        <strong>Current Reply:</strong>
        <p>{item.reply}</p>
    </div>
)}
    <textarea
        className="w-full border rounded p-2"
        rows="3"
        placeholder="Write a reply..."
        value={replies[item.id] || ""}
        onChange={(e) =>
            setReplies({
                ...replies,
                [item.id]: e.target.value
            })
        }
    />

    <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => handleReply(item.id)}
    >
        Send Reply
    </button>

</div>

                    </div>
                ))}

            </div>
        </Layout>
    );
}

export default ManageFeedback;