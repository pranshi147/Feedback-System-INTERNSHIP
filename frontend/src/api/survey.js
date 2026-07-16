import api from "./api";

export const submitSurvey = async (survey) => {
    const response = await api.post("/survey", survey);
    return response.data;
};

export const getMySurveys = async () => {
    const response = await api.get("/survey/my");
    return response.data;
};

export const getAllSurveys = async () => {
    const response = await api.get("/survey");
    return response.data;
};

export const getSurveyStats = async () => {
    const response = await api.get("/survey/stats");
    return response.data;
};