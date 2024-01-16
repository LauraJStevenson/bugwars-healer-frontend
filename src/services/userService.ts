import axios from 'axios';

class UserService {
    getUser(userId) {
        return axios.get(`/users/${userId}`);
    }

    updateUser(userId, userData) {
        return axios.put(`/users/${userId}`, userData);
    }

    deleteUser(userId) {
        return axios.delete(`/users/${userId}`);
    }
}

export default new UserService();
