import api from "./api";

export const getUsers = async (params) => {
    const res = await api.get("/admin/users", {
        params,
    });

    return res.data;
};

export const updateUser = async (id, user) => {
    const response = await api.put(`/admin/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
};

export const getUserStats = async () => {
    const res = await api.get("/admin/users/stats");
    return res.data;
};

export const getUserStats = async () => {
    const { data } = await api.get("/admin/users/stats");
    return data;
};