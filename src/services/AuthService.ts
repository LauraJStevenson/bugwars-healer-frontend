import axios from 'axios';

const API_URL = 'https://stage-bugwars-healer.onrender.com/api/v1/bug-data';

interface LoginResponse {
    token: string;
    user: {
        username: string;
    };
}

interface RegisterResponse {
    message: string;
}

export const AuthService = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const response = await axios.post(`${API_URL}/api/v1/login`, { username, password });
        return response.data;
    },

    register: async (userData: any): Promise<RegisterResponse> => {
        const response = await axios.post(`${API_URL}/api/v1/users`, userData);
        return response.data;
    },
};
