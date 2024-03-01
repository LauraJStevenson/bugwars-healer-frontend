// src/stores/gameStore.ts
import type { GameState, Script, Cell, Bug } from '@/types';
import { defineStore } from 'pinia';

// Type guard function to check if a Cell is a Bug
function isBug(cell: Cell): cell is Bug {
    return 'scriptIndex' in cell;
}

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        map: { cells: [] },
        scripts: [],
        ticks: 0,
        currentTick: 0,
        scores: { team1: 0, team2: 0 }
    }),
    actions: {

        // Method to fetch map
        async fetchMap() {
            try {
                const response = await fetch('/api/v1/maps');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.map = { cells: data.cells };
            } catch (error) {
                console.error('Failed to fetch map:', error);
            }
        },

        // Method to initialize the scripts
        initializeScripts(scripts: Script[]) {
            // Example of initializing scripts - replace with actual logic
            this.scripts = scripts;
        },

        // Method to set script for battle
        setScriptForBug(bugId: number, script: number[]) {
            // Iterate through each cell in the map
            for (const row of this.map.cells) {
                for (const cell of row) {
                    // Use the isBug type guard to check if the cell is a Bug
                    if (isBug(cell) && cell.scriptIndex === bugId) {
                        // Now TypeScript knows cell is a Bug, so this assignment is valid
                        cell.bugScript = script;
                        return; // Exit once the script is assigned to the bug
                    }
                }
            }
        },

        //Method to start battle simulation
        async startBattle() {
            // Logic to advance the game by one round
            // This could involve communicating with the backend or directly manipulating the state
            this.ticks += 1;
        },

        // Method to set the current tick (when the slider is moved)
        setCurrentTick(tick: number) {
            this.currentTick = tick;
            // Update the map state based on the tick if necessary
        },

        // Method to update scores (you'll need to define the logic based on your game rules)
        updateScores() {
            // Update this.scores based on the current game state
        },
    },
});
