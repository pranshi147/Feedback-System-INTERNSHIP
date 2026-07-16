import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 min-h-screen flex-shrink-0 bg-slate-900 text-white p-6">

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

                <Link
                    to="/users"
                    className="block hover:text-blue-400"
                >
                    Users
                </Link>

                <Link
                    to="/survey"
                    className="block hover:text-blue-400"
                >
                    Survey
                </Link>

                <Link
                    to="/survey-analytics"
                    className="block hover:text-blue-400"
                >
                    Survey Analytics
                </Link>

            </nav>

        </div>
    );
}

export default Sidebar;