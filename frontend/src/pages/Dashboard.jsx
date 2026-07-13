import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Dashboard() {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen">

                <Navbar />

                <div className="p-6">

                    <div className="grid grid-cols-4 gap-6">

                        <StatCard
                            title="Total Feedback"
                            value="0"
                        />

                        <StatCard
                            title="Pending"
                            value="0"
                        />

                        <StatCard
                            title="Resolved"
                            value="0"
                        />

                        <StatCard
                            title="Rejected"
                            value="0"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;