import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { getUsers, updateUser } from "../api/admin";
import toast from "react-hot-toast";

function EditUser() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("DIRECTOR");

    useEffect(() => {
        async function loadUser() {
            const users = await getUsers();

            const user = users.find(
                (u) => u.uuid === Number(id)
            );

            if (!user) return;

            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        loadUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(id, {
                name,
                email,
                role,
            });

            toast.success("User updated!");

            navigate("/users");
        } catch (err) {
            console.error(err);

            toast.error("Update failed");
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-8">
                Edit User
            </h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-lg space-y-5 bg-white p-8 rounded-xl shadow"
            >
                <input
                    className="w-full border p-3 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />

                <input
                    className="w-full border p-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <select
                    className="w-full border p-3 rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="DIRECTOR">DIRECTOR</option>
                </select>

                <button
                    className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </Layout>
    );
}

export default EditUser;