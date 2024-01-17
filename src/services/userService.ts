import axios from 'axios';

class UserService {
    getUser(userId) {
        return axios.get(`/users/${userId}`);
    }

    updateUser(userId, userDetails) {

        const token = localStorage.getItem('token');

        console.log('Retrieved token:', token); // Debugging line


        return axios.put(`/users/${userId}`, userDetails, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    deleteUser(userId) {
        return axios.delete(`/users/${userId}`);
    }
}

export default new UserService();
