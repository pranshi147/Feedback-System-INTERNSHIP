import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getSurveyStats } from "../api/survey";

function SurveyAnalytics() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        try {
            const data = await getSurveyStats();
            setStats(data);
        } catch (err) {
            console.error(err);
        }
    }

    if (!stats) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>

            <h1 className="text-3xl font-bold mb-8">
                Survey Analytics
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        Total Responses
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {stats.total_responses}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        CSAT Score
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {stats.csat_score}%
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        Overall Rating
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        ⭐ {stats.average_overall}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        Quality
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        ⭐ {stats.average_quality}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        Outcome
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        ⭐ {stats.average_outcome}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        Communication
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        ⭐ {stats.average_communication}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">
                        Recommendation
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        ⭐ {stats.average_recommendation}
                    </p>
                </div>

            </div>

        </Layout>
    );
}

export default SurveyAnalytics;