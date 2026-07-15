import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

import {
    getUsers,
    deleteUser,
    getUserStats,
} from "../api/admin";


function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [sort, setSort] = useState("name");
    const [order, setOrder] = useState("asc");

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const limit = 10;

    const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    directors: 0,
});

    const loadUsers = async () => {
        try {
            setLoading(true);

            const data = await getUsers({
                page,
                limit,
                search,
                role,
                sort,
                order,
            });

            setUsers(data.users);
            setPages(data.pages);
            const statsData = await getUserStats();
            setStats(statsData);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
    try {
        const data = await getUserStats();
        setStats(data);
    } catch (err) {
        console.error(err);
    }
};

    useEffect(() => {
    loadUsers();
    loadStats();
}, [page, search, role, sort, order]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(id);

            toast.success("User deleted successfully!");

            if (users.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                loadUsers();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete user");
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Users</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

    <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500">Total Users</h2>
        <p className="text-3xl font-bold">
            {stats.total}
        </p>
    </div>

    <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500">Admins</h2>
        <p className="text-3xl font-bold text-blue-600">
            {stats.admins}
        </p>
    </div>

    <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500">Directors</h2>
        <p className="text-3xl font-bold text-green-600">
            {stats.directors}
        </p>
    </div>

</div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border rounded px-3 py-2"
                />

                <select
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value);
                        setPage(1);
                    }}
                    className="border rounded px-3 py-2"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="director">Director</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="uuid">ID</option>
                </select>

                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                {loading ? (
                    <div className="p-10 text-center text-gray-500">
                        Loading...
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4">ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.uuid}
                                        className="border-t"
                                    >
                                        <td className="p-4">
                                            {user.uuid}
                                        </td>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>{user.role}</td>

                                        <td className="p-4 space-x-2">
                                            <button
                                                onClick={() =>
                                                    navigate(`/users/edit/${user.uuid}`)
                                                }
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(user.uuid)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-5">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span>
                    Page {page} of {pages}
                </span>

                <button
                    disabled={page === pages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </Layout>
    );
}

export default Users;