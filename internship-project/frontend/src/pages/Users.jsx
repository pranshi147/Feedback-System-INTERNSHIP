import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getUsers, deleteUser } from "../api/admin";
import toast from "react-hot-toast";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load users");
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(id);

            toast.success("User deleted successfully!");

            loadUsers();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete user");
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
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
                        {users.map((user) => (
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
                                        onClick={() => handleDelete(user.uuid)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Users;