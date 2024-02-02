import axios from 'axios';

class ScriptService {
    static getScriptsByUserId(userId: any) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            return axios.get(`scripts/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error fetching scripts:', error);
            throw error;
        }
    }

    static getScript(scriptId: any) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            return axios.get(`scripts/${scriptId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error fetching script:', error);
            throw error;
        }
    }

    static createScript(scriptData: any) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            return axios.post(`scripts/`, scriptData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error creating script:', error);
            throw error;
        }
    }

    static updateScript(scriptId: any, scriptData: any) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            return axios.put(`scripts/${scriptId}`, scriptData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error updating script:', error);
            throw error;
        }
    }

    static deleteScript(scriptId: any) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            return axios.delete(`scripts/${scriptId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error deleting script:', error);
            throw error;
        }
    }
}

export default ScriptService;
