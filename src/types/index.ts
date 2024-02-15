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