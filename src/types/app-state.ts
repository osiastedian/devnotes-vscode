export interface AppState {
  lastUpdated?: number;
  notes: Record<string, string>;
}



export const DEFAULT_APP_STATE: AppState = {
  notes: {},
};
