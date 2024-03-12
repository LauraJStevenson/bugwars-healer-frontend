// User login/register types

export type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles?: string[];
  scripts: Script[];
};

export type LoginDto = {
  username: string;
  password: string;
};

export type RegisterDto = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type ParseDto = {
  code: string;
};


//Script types

export type ScriptDto = {
  name: string;
  raw: string;
};

export type Script = {
  id: number;
  name: string;
  raw: string;
  bytecode: string;
  isBytecodeValid: boolean;
};


// Map types

export type CellType = 'Bug' | 'Treasure' | 'EmptySpace' | 'Food' | 'Wall' | 'Floor';

export type Cell = {
  x: number;
  y: number;
  type: CellType;
};

export type Bug = Cell & {
  type: 'Bug';
  direction: 'N' | 'S' | 'E' | 'W';
  scriptIndex: number;
  bugScript?: number[];
};

export type ExtendedCell = Cell & {
  image?: string;
  direction?: string;
};

export type Treasure = Cell & { type: 'Treasure' };
export type Floor = Cell & { type: 'Floor' };
export type EmptySpace = Cell & { type: 'EmptySpace' };
export type Food = Cell & { type: 'Food' };
export type Wall = Cell & { type: 'Wall' };


export type GameMap = {
  cells: Cell[][];
  serialization: string;
};

export type UpdateMapDto = {
};

// Game play types

export type GameState = {
  maps: GameMap[];
  currentMapIndex: number;
  currentMap: GameMap | null;
  scripts: Script[];
  ticks: number;
  currentTick: number;
  scores: { team1: number; team2: number };
};

export type GameAction = {
  // This could represent actions taken by the player or system within a game tick...
  type: string;
  payload?: any;
};
