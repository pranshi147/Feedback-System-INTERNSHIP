import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

            <h1 className="text-2xl font-bold mb-8">
                Feedback System
            </h1>

            <nav className="space-y-4">

                <Link
                    to="/dashboard"
                    className="block hover:text-blue-400"
                >
                    Dashboard
                </Link>

                <Link
                    to="/submit-feedback"
                    className="block hover:text-blue-400"
                >
                    Submit Feedback
                </Link>

                <Link
                    to="/my-feedback"
                    className="block hover:text-blue-400"
                >
                    My Feedback
                </Link>

                <Link
                    to="/manage-feedback"
                    className="block hover:text-blue-400"
                >
                    Manage Feedback
                </Link>

            </nav>

        </div>
    );
}

export default Sidebar;