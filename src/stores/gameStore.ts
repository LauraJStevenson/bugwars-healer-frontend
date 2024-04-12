import type { GameState, Script, Cell, Bug } from '@/types';
import { defineStore } from 'pinia';
import axios from 'axios';

// Type guard function to check if a Cell is a Bug
function isBug(cell: Cell): cell is Bug {
    return 'scriptIndex' in cell;
}

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        maps: [],
        currentMapIndex: 0,
        currentMap: null,
        scripts: [],
        ticks: 0,
        currentTick: 0,
        scores: { team1: 0, team2: 0, team3: 0, team4: 0 },
        isPlaying: false,
        gameHistory: [],
    }),

    actions: {

        // Maps
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

        async startBattle(selectedScripts: any[]) {
            if (!this.currentMap || !this.currentMap.serialization) {
                console.error("No current map selected or map data is incomplete.");
                return;
            }

            try {
                const response = await axios.post('/game/start', {
                    map: this.currentMap.serialization,
                    script1: selectedScripts[0] || [],
                    script2: selectedScripts[1] || [],
                    script3: selectedScripts[2] || [],
                    script4: selectedScripts[3] || [],
                    ticks: this.currentMap.ticks || 1  // Provide a fallback if ticks is not defined
                });

                // Update state with response data if it's valid
                if (response.data) {
                    this.currentMap = response.data;

                    // Check if currentMap is valid before pushing to history
                    if (this.currentMap) {
                        this.gameHistory.push(this.currentMap);
                        this.ticks = this.currentMap.ticks || 1; // Default to 1 if ticks is undefined
                        this.currentTick = 0;
                        this.isPlaying = true;
                        this.advanceGameAutomatically(selectedScripts);
                    } else {
                        console.error("Failed to update currentMap from response.");
                    }
                } else {
                    console.error("No data received from the start game endpoint.");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Failed to start battle:', error.response ? error.response.data : "No response data");
                } else {
                    console.error('Failed to start battle:', error);
                }
            }
        },


        async advanceGame(scripts: any[]) {
            try {
                const response = await axios.post('game/advance', { scripts });
                if (response.data) {
                    this.currentMap = response.data;
                    if (this.currentMap !== null) {
                        this.gameHistory.push(this.currentMap);
                        this.currentTick++;
                    }
                }
            } catch (error) {
                console.error('Failed to advance game:', error);
            }
        },

        async advanceGameAutomatically(selectedScripts: any[]) {
            while (this.isPlaying && this.currentTick < this.ticks) {
                await this.advanceGame(selectedScripts);
            }
        },

        pauseGame() {
            this.isPlaying = false;
        },

        resumeGame(selectedScripts: any[]) {
            this.isPlaying = true;
            this.advanceGameAutomatically(selectedScripts);
        },

        fastForward() {
            if (this.currentTick < this.ticks - 1) {
                this.currentTick++;
                this.currentMap = this.gameHistory[this.currentTick];
            }
        },

        fastBackward() {
            if (this.currentTick > 0) {
                this.currentTick--;
                this.currentMap = this.gameHistory[this.currentTick];
            }
        },

        updateGameStateForTick(tick: number) {
            if (tick >= 0 && tick < this.gameHistory.length) {
                this.currentTick = tick;
                this.currentMap = this.gameHistory[tick];
            }
        },



    },
});
