import axios from 'axios';

class UserService {
    getUser(userId: number) {
        return axios.get(`/users/${userId}`);
    }

    async updateUser(userId: number, userDetails: any) {
        try {
            const token = localStorage.getItem('token');

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

            console.error('Error updating user:', error);
            throw error;
        }
    }


    async deleteUser(userId: number) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.delete(`/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}

export default new UserService();
