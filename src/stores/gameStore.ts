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

        async startBattle(selectedScripts: never[]) {
            try {
                const response = await axios.post('/game/start', { scripts: selectedScripts });
                this.currentMap = response.data;
                this.gameHistory.push(this.currentMap);
                this.ticks = 1;
                this.currentTick = 0;
                this.isPlaying = true;
                this.advanceGameAutomatically(selectedScripts);
            } catch (error) {
                console.error('Failed to start battle:', error);
            }
        },

        async advanceGame(scripts: any[]) {
            try {
                const response = await axios.post('/advance', { scripts });
                this.currentMap = response.data;
                this.gameHistory.push(this.currentMap);
                this.currentTick++;
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
