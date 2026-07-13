import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDashboardStats } from "../api/dashboard";
import DashboardCharts from "../components/DashboardCharts";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaSpinner,
} from "react-icons/fa";

function Dashboard() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadDashboard();
    }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Total Feedback</h2>
                    <p className="text-3xl font-bold">
                        {stats.total_feedback}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Pending</h2>
                    <p className="text-3xl font-bold">
                        {stats.pending_feedback}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Resolved</h2>
                    <p className="text-3xl font-bold">
                        {stats.resolved_feedback}
                    </p>
                </div>

            </div><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500">
                    Total Feedback
                </p>

                <h2 className="text-4xl font-bold mt-2">
                    {stats.total_feedback}
                </h2>
            </div>

            <FaClipboardList
                className="text-blue-500"
                size={42}
            />
        </div>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500">
                    Pending
                </p>

                <h2 className="text-4xl font-bold mt-2 text-yellow-600">
                    {stats.pending_feedback}
                </h2>
            </div>

            <FaClock
                className="text-yellow-500"
                size={42}
            />
        </div>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500">
                    In Progress
                </p>

                <h2 className="text-4xl font-bold mt-2 text-blue-600">
                    {stats.in_progress_feedback || 0}
                </h2>
            </div>

            <FaSpinner
                className="text-blue-500"
                size={42}
            />
        </div>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500">
                    Resolved
                </p>

                <h2 className="text-4xl font-bold mt-2 text-green-600">
                    {stats.resolved_feedback}
                </h2>
            </div>

            <FaCheckCircle
                className="text-green-500"
                size={42}
            />
        </div>
    </div>
    <DashboardCharts stats={stats} />

</div>
        </Layout>
    );
}

export default Dashboard;