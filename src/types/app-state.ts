import { NotesDirectory } from "./notes";

export interface AppState {
  lastUpdated?: number;
  notes: NotesDirectory;
}

export const DEFAULT_APP_STATE: AppState = {
  notes: {},
};
