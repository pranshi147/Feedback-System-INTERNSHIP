import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import {
    getAllFeedback,
    updateStatus,
    replyToFeedback,
    getDirectors,
    assignFeedback,
} from "../api/feedback";

function ManageFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [replies, setReplies] = useState({});
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const [directors, setDirectors] = useState([]);
    const [assignedDirector, setAssignedDirector] = useState({});

    useEffect(() => {
        loadFeedback();
    }, [search, category, statusFilter, page]);

    useEffect(() => {
        loadDirectors();
    }, []);

    async function loadFeedback() {
        try {
            const data = await getAllFeedback({
    search,
    category,
    status: statusFilter,
    page,
});
            setFeedbacks(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function loadDirectors() {
    try {
        const data = await getDirectors();
        setDirectors(data);
    } catch (err) {
        console.error(err);
        toast.error("Failed to load directors");
    }
}

async function handleAssign(feedbackId) {
    try {
        await assignFeedback(
            feedbackId,
            assignedDirector[feedbackId]
        );

        toast.success("Feedback assigned!");

        loadFeedback();
    } catch (err) {
        console.error(err);
        toast.error("Assignment failed");
    }
}

    async function handleStatus(id, status) {
    try {
        await updateStatus(id, status);

        toast.success("Status updated!");

        loadFeedback();
    } catch (err) {
        console.error(err);

        toast.error("Failed to update status.");
    }
}

    async function handleReply(id) {
    try {
        await replyToFeedback(
            id,
            replies[id] || ""
        );

        loadFeedback();

        toast.success("Reply sent successfully!");

        setReplies((prev) => ({
            ...prev,
            [id]: ""
        }));
    } catch (err) {
        console.error(err);
        toast.error("Failed to send reply.");
    }
    }

    return (
    <Layout>
        <h1 className="text-3xl font-bold mb-6">
            Manage Feedback
        </h1>

        <div className="space-y-4">

            <div className="flex gap-4 mb-6 flex-wrap">

                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded p-2"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <select
                    className="border rounded p-2"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Categories</option>
                    <option value="Bug">Bug</option>
                    <option value="Feature Request">
                        Feature Request
                    </option>
                    <option value="General">General</option>
                </select>

                <select
                    className="border rounded p-2"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">
                        In Progress
                    </option>
                    <option value="Resolved">
                        Resolved
                    </option>
                </select>

            </div>

            {feedbacks.map((item) => (
                <div
                    key={item.id}
                    className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-200"
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

                    <div className="mt-5">

                        <p className="font-semibold mb-2">
                            Assign Director
                        </p>

                        <select
                            className="border rounded p-2 w-full"
                            value={
                                assignedDirector[item.id] ??
                                item.assigned_to ??
                                ""
                            }
                            onChange={(e) =>
                                setAssignedDirector({
                                    ...assignedDirector,
                                    [item.id]: Number(
                                        e.target.value
                                    ),
                                })
                            }
                        >
                            <option value="">
                                Select Director
                            </option>

                            {directors.map((director) => (
                                <option
                                    key={director.uuid}
                                    value={director.uuid}
                                >
                                    {director.name}
                                </option>
                            ))}
                        </select>

                        <button
                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() =>
                                handleAssign(item.id)
                            }
                        >
                            Assign
                        </button>

                    </div>

                    {/* -------- Reply -------- */}

                    <div className="mt-5">

                        {item.reply && (
                            <div className="mb-4 p-3 bg-green-100 rounded">
                                <strong>
                                    Current Reply:
                                </strong>
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
                                    [item.id]:
                                        e.target.value,
                                })
                            }
                        />

                        <button
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() =>
                                handleReply(item.id)
                            }
                        >
                            Send Reply
                        </button>

                    </div>

                </div>
            ))}

        </div>

        <div className="flex justify-center gap-4 mt-8">

            <button
                disabled={page === 1}
                onClick={() =>
                    setPage(page - 1)
                }
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
                Previous
            </button>

            <span className="font-semibold">
                Page {page}
            </span>

            <button
                onClick={() =>
                    setPage(page + 1)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Next
            </button>

        </div>

    </Layout>
);
}

export default ManageFeedback;