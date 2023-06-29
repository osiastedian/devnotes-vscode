export interface Note {
  readonly name: string;
  readonly path: string;
  lastUpdated: number;
}

export type NotesDirectory = Record<string, Note>;
