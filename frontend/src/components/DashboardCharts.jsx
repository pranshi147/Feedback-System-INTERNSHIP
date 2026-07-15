import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

function DashboardCharts({ stats }) {
    const statusData = [
        {
            name: "Pending",
            value: stats.pending_feedback || 0,
        },
        {
            name: "In Progress",
            value: stats.in_progress_feedback || 0,
        },
        {
            name: "Resolved",
            value: stats.resolved_feedback || 0,
        },
    ];

    const categoryData = [
        {
            category: "Bug",
            count: stats.bug_count || 0,
        },
        {
            category: "Feature",
            count: stats.feature_count || 0,
        },
        {
            category: "General",
            count: stats.general_count || 0,
        },
    ];

    const COLORS = [
        "#FACC15",
        "#3B82F6",
        "#22C55E",
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                    Feedback Status
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <PieChart>
                        <Pie
                            data={statusData}
                            dataKey="value"
                            outerRadius={100}
                        >
                            {statusData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">

                <h2 className="text-xl font-bold mb-4">
                    Feedback by Category
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="count"
                            fill="#3B82F6"
                        />
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default DashboardCharts;

