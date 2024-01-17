import axios from 'axios';

class UserService {
    getUser(userId) {
        return axios.get(`/users/${userId}`);
    }

    async updateUser(userId: string, userDetails: any) {
        try {
            const token = localStorage.getItem('token');
            console.log(token); // For debugging purposes, can be removed later

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.put(`/users/${userId}`, userDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            // Handle errors (e.g., token not found, request failed)
            console.error('Error updating user:', error);
            throw error;
        }
    }


    deleteUser(userId) {
        return axios.delete(`/users/${userId}`);
    }
}

export default new UserService();
