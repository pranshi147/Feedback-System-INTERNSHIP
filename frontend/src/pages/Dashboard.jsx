import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDashboardStats } from "../api/dashboard";

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

            </div>
        </Layout>
    );
}

export default Dashboard;