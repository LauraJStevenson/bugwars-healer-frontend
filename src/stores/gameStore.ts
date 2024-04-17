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
                return; // Early exit if the map data is not ready
            }

            // Log to verify the scripts
            console.log("Selected Scripts:", selectedScripts);

            // Construct the payload with fallbacks for scripts
            const payload = {
                map: this.currentMap.serialization,
                script1: this.scripts[selectedScripts[0]] || [],
                script2: this.scripts[selectedScripts[1]] || [],
                script3: this.scripts[selectedScripts[2]] || [],
                script4: this.scripts[selectedScripts[3]] || [],
                ticks: this.currentMap.ticks || 1
            };

            // Log the payload to ensure it's correctly formed
            console.log("Sending payload for battle start:", payload);

            try {
                const response = await axios.post('/game/start', payload);

                // Check if the response is valid and has data
                if (response && response.data) {
                    // Safely update currentMap with response data
                    const newMap = response.data;
                    if (newMap && newMap.serialization) { // Validate that newMap is correct
                        this.currentMap = newMap;
                        this.gameHistory.push(newMap);  // Add to history only if it's valid
                        this.ticks = newMap.ticks || 1; // Safely access ticks
                        this.currentTick = 0;
                        this.isPlaying = true;
                        this.advanceGameAutomatically(selectedScripts);
                    } else {
                        console.error("Invalid map data received from the server.");
                    }
                } else {
                    console.error("No data received from the start game endpoint, or invalid response structure.");
                }
            } catch (error: unknown) {
                // Check if it's an AxiosError
                if (axios.isAxiosError(error)) {
                    console.error('Failed to start battle:', error.response ? error.response.data : "No response data");
                } else if (error instanceof Error) {
                    console.error('Failed to start battle:', error.message);
                } else {
                    console.error('Failed to start battle:', 'An unknown error occurred');
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
