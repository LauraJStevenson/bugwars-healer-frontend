import { defineStore } from 'pinia';
import axios from 'axios';
import blueBugImage from '../assets/bugs/blue/Blue_Up.png';
import redBugImage from '../assets/bugs/red/Red_Up.png';
import greenBugImage from '../assets/bugs/green/Green_Up.png';
import yellowBugImage from '../assets/bugs/yellow/Yellow_Up.png';
import foodImage from '../assets/apple/Apple.png';
import wallImage from '../assets/map/wall/Wall.png';
import floorImage from '../assets/map/floor/Floor.png'
import treasureImage from '../assets/treasure/Treasure_.png';
import type { CellType, ExtendedCell, GameMap, GameState } from '@/types';

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

    getters: {
        currentMapCells: (state): ExtendedCell[][] => {
            if (!state.currentMap || !state.currentMap.serialization) return [];
            return state.currentMap.serialization.split('\n').map((row, rowIndex) =>
                row.split('').map((char, colIndex): ExtendedCell => ({
                    x: colIndex,
                    y: rowIndex,
                    type: char as CellType,
                    image: mapCharacterToImage[char] || undefined,
                    direction: char === 'a' ? 'N' : char === 'b' ? 'E' : char === 'c' ? 'S' : 'W'
                }))
            );
        }
    },

    actions: {
        async fetchMaps() {
            try {
                const response = await axios.get('/maps/');
                this.maps = response.data as GameMap[];
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

            console.log('Selected scripts:', selectedScripts);
            console.log('Available scripts:', this.scripts);

            const selectedMap = this.currentMap.name;
            const selectedScriptBytecodes = selectedScripts.map(index => {
                const script = this.scripts[index];
                if (!script || !script.bytecode) {
                    console.error(`Script at index ${index} is not defined or does not have a bytecode property. Script:`, script);
                    return [];
                }
                return script.bytecode;
            });

            console.log('Selected script bytecodes:', selectedScriptBytecodes);

            const requestBody = {
                map: selectedMap,
                script1: selectedScriptBytecodes[0] || [],
                script2: selectedScriptBytecodes[1] || [],
                script3: selectedScriptBytecodes[2] || [],
                script4: selectedScriptBytecodes[3] || [],
                ticks: this.ticks,
            };

            try {
                const response = await axios.post('/api/v1/game/start', requestBody);
                if (response.status != 200) {
                    console.error('Failed to start battle, response:', response);
                }
            } catch (error) {
                console.error('Error starting battle:', error);
            }
        },

        setCurrentTick(tick: number) {
            this.currentTick = tick;
        },

        updateScores() {
            // Update this.scores based on the current game state
        },

    },
});

const mapCharacterToImage: { [key: string]: string | undefined } = {
    'X': wallImage,
    'a': redBugImage,
    'b': blueBugImage,
    'c': greenBugImage,
    'd': yellowBugImage,
    'f': foodImage,
    't': treasureImage,
    ' ': floorImage,
};
