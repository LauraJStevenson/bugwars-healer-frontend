import { defineStore } from 'pinia';
import ScriptService from '../services/scriptService';
import type { Script } from '../types/index';

export const useScriptStore = defineStore('script', {
    state: () => ({
        scripts: [] as Script[],
        currentScript: null as Script | null,
    }),
    getters: {
        getScripts: (state) => state.scripts,
        getCurrentScript: (state) => state.currentScript,
    },
    actions: {
        async fetchScriptsByUserId(userId: number) {
            try {
                const response = await ScriptService.getScriptsByUserId(userId);
                this.scripts = response.data;
            } catch (error) {
                console.error('Failed to fetch scripts by user ID:', error);
            }
        },
        async fetchScript(scriptId: number) {
            try {
                const response = await ScriptService.getScript(scriptId);
                this.currentScript = response.data;
            } catch (error) {
                console.error('Failed to fetch script:', error);
            }
        },
        async updateScript(scriptId: number, scriptDetails: Script) {
            try {
                const response = await ScriptService.updateScript(scriptId, scriptDetails);
                this.currentScript = response.data;
            } catch (error) {
                console.error('Failed to update script:', error);
                throw error;
            }
        },
        async deleteScript(scriptId: number) {
            try {
                const response = await ScriptService.deleteScript(scriptId);
                this.scripts = this.scripts.filter(script => script.id !== scriptId);
            } catch (error) {
                console.error('Failed to delete script:', error);
                throw error;
            }
        },
    },
});
