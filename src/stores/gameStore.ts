import { defineStore } from 'pinia';
import axios from 'axios';

export const useGameStore = defineStore('game', {
    state: () => ({
        maps: [],
        currentMapIndex: 0,
        currentMap: null,
        scripts: [],
        ticks: 0,
        currentTick: 0,
        scores: { team1: 0, team2: 0 },
        gameMaps: [],
    }),

    actions: {
        async fetchMaps() {
            try {
                const response = await axios.get('/maps/');
                this.maps = response.data;
                this.currentMap = this.maps.length > 0 ? this.maps[0] : null;
            } catch (error) {
                console.error('Failed to fetch maps:', error);
            }
        },

        nextMap() {
            if (this.maps.length > 0) {
                this.currentMapIndex = (this.currentMapIndex + 1) % this.maps.length;
                this.currentMap = this.maps[this.currentMapIndex];
            }
        },

        previousMap() {
            if (this.maps.length > 0) {
                this.currentMapIndex = (this.currentMapIndex - 1 + this.maps.length) % this.maps.length;
                this.currentMap = this.maps[this.currentMapIndex];
            }
        },

        async assignScriptsAndStartBattle(selectedScripts: number[]) {
            if (!this.currentMap) {
                console.error('No current map selected');
                return;
            }

            const selectedMap = this.currentMap.name;
            const selectedScriptIndexes = selectedScripts.map(index => {
                const script = this.scripts[index];
                if (!script || typeof script.compiledScript === 'undefined') {
                    console.error(`Script at index ${index} is not defined or does not have a compiledScript property`);
                    return [];
                }
                return script.compiledScript;
            });

            const requestBody = {
                map: selectedMap,
                script1: selectedScriptIndexes[0] || [],
                script2: selectedScriptIndexes[1] || [],
                script3: selectedScriptIndexes[2] || [],
                script4: selectedScriptIndexes[3] || [],
                ticks: this.ticks,
            };

            try {
                const response = await axios.post('/api/v1/game/start', requestBody);
                if (response.status === 200) {
                    this.setGameMaps(response.data);
                } else {
                    console.error('Failed to start battle');
                }
            } catch (error) {
                console.error('Error starting battle:', error);
            }
        },

        setGameMaps(gameMaps) {
            this.gameMaps = gameMaps;
        },

        setCurrentTick(tick: number) {
            this.currentTick = tick;
        },

        updateScores() {
            // Update this.scores based on the current game state
        },

    },
});
