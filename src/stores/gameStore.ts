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
        scores: { team1: 0, team2: 0 },
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

        // Method to initialize the scripts
        initializeScripts(scripts: Script[]) {
            // Needs actual logic... Not complete... 
            this.scripts = scripts;
        },

        // Method to set script for battle
        //Not complete.... Needs finished....
        setScriptForBug(bugId: number, script: number[]) {
            for (const row of this.map.cells) {
                for (const cell of row) {
                    if (isBug(cell) && cell.scriptIndex === bugId) {
                        cell.bugScript = script;
                        return;
                    }
                }
            }
        },

        //Method to start battle simulation
        async startBattle() {
            this.ticks += 1;
        },

        // Method to set the current tick (when the slider is moved)
        setCurrentTick(tick: number) {
            this.currentTick = tick;
            // Create the logic to uppdate the map state based on the tick?? Not complete...
        },

        // Method to update scores
        updateScores() {
            // Update this.scores based on the current game state?? Not complete... 
        },
    },
});
