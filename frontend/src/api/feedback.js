import api from "./api";

export const getMyFeedback = async () => {
    const response = await api.get("/feedback/my");
    return response.data;
};

export const getAllFeedback = async ({
    search = "",
    category = "",
    status = "",
    page = 1,
    limit = 10,
} = {}) => {
    const response = await api.get("/feedback", {
        params: {
            search,
            category,
            status,
            page,
            limit,
        },
    });

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

export const getDirectors = async () => {
    const response = await api.get("/feedback/directors");
    return response.data;
};

export const assignFeedback = async (feedbackId, directorId) => {
    const response = await api.put(
        `/feedback/${feedbackId}/assign`,
        {
            director_id: directorId,
        }
    );

    return response.data;
};