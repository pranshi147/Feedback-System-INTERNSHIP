import api from "./api";

export const getMyFeedback = async () => {
    const response = await api.get("/feedback/my");
    return response.data;
};

export const getAllFeedback = async () => {
    const response = await api.get("/feedback");
    return response.data;
};

export const updateStatus = async (id, status) => {
    const response = await api.patch(`/feedback/${id}`, {
        status,
    });

    return response.data;
};

export const replyToFeedback = async (id, reply) => {
    const response = await api.patch(`/feedback/${id}/reply`, {
        reply,
    });

    return response.data;
};