import { useEffect, useState } from "react";
import { getMyFeedback } from "../api/feedback";
import Layout from "../components/Layout";

function MyFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        async function loadFeedback() {
            try {
                const data = await getMyFeedback();
                setFeedbacks(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadFeedback();
    }, []);

    return (
        <Layout>
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                My Feedback
            </h1>

            {feedbacks.length === 0 ? (
                <p>No feedback submitted yet.</p>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-4 shadow"
                        >
                            <h2 className="font-bold text-xl">
                                {item.title}
                            </h2>

                            <p>{item.description}</p>

                            <p className="mt-2">
                                <strong>Category:</strong> {item.category}
                            </p>

                            <p>
                                <strong>Status:</strong> {item.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </Layout>
    );
}

export default MyFeedback;