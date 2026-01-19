import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://borrowww.com/api";

export const fetchAllSessions = async (token: string) => {
    const res = await axios.get(`${API_URL}/sessions/all/grouped`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });
    return res.data;
};
