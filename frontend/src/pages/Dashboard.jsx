import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import { getDashboardStats } from "../api/dashboard";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        async function loadDashboard() {
            try {
                const data = await getDashboardStats();
                setStats(data);
            }
            catch (error) {
                console.error(error);
            }
        }

        loadDashboard();

    }, []);

    if (!stats) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen">

                <Navbar />

                <div className="p-6">

                    <div className="grid grid-cols-4 gap-6">

                        <StatCard
                            title="Total Feedback"
                            value={stats.total_feedback}
                        />

                        <StatCard
                            title="Pending"
                            value={stats.pending}
                        />

                        <StatCard
                            title="Resolved"
                            value={stats.resolved}
                        />

                        <StatCard
                            title="Rejected"
                            value={stats.rejected}
                        />

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;