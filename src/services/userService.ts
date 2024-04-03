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

    async updatePassword(userId: any, newPassword: any) {
        return this.updateUser(userId, { password: newPassword });
    }

    async updateEmail(userId: any, newEmail: any) {
        return this.updateUser(userId, { email: newEmail });
    }

    async updateFirstName(userId: any, newFirstName: any) {
        return this.updateUser(userId, { firstname: newFirstName });
    }

    async updateLastName(userId: any, newLastName: any) {
        return this.updateUser(userId, { lastname: newLastName });
    }
}

export default new UserService();
