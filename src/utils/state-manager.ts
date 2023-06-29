import { ExtensionContext, Uri, window, workspace } from "vscode";
import { AppState, DEFAULT_APP_STATE } from "../types/app-state";
import { NotesManager, NotesManagerListener } from "./notes-manager";

const STATE_STORAGE_PATH_KEY = "storagePath";

export class StateNotesManagerListener implements NotesManagerListener {
  constructor(private stateManager: StateManager) {}

  onSaveNotes(notes: Record<string, string>): void {
    this.stateManager.updateAppState({ notes });
  }
}

export class StateManager {
  #appState: AppState = DEFAULT_APP_STATE;

  #notesManager?: NotesManager;
  constructor(private context: ExtensionContext) {
    this.context = context;
  }

  async setWorkspaceStoragePath() {
    const value = await this.#showOpenDialog();
    if (!value || value.length === 0) {
      return;
    }
    const [{ path }] = value;
    this.context.workspaceState.update(STATE_STORAGE_PATH_KEY, path);
    window.showInformationMessage(
      `Workspace Storage path set to ${path}. Please reload the window.`
    );
  }

  async setGlobalStoragePath() {
    const value = await this.#showOpenDialog();
    if (!value || value.length === 0) {
      return;
    }
    const [{ path }] = value;
    this.context.globalState.update(STATE_STORAGE_PATH_KEY, path);
    window.showInformationMessage(
      `Global Storage path set to ${path}. Please reload the window.`
    );
  }

  checkStateValidity() {
    const path = this.getStatePath();
    if (!path) {
      this.setWorkspaceStoragePath();
      return false;
    }
    return true;
  }

  getStatePath() {
    let path = this.context.workspaceState.get<string>(STATE_STORAGE_PATH_KEY);
    if (!path) {
      path = this.context.globalState.get<string>(STATE_STORAGE_PATH_KEY);
    }
    return path;
  }

  get notesManager(): NotesManager | undefined {
    return this.#notesManager;
  }

  updateAppState(updates: Partial<AppState>) {
    this.#appState = { ...this.#appState, ...updates, lastUpdated: Date.now() };
    this.#saveAppState();
  }

  #showOpenDialog() {
    return window.showOpenDialog({
      canSelectFolders: true,
      canSelectFiles: false,
      canSelectMany: false,
    });
  }

  #appStatePath(): string {
    const path = this.getStatePath();
    if (!path) {
      throw new Error("Storage path not set");
    }
    return path + "/app-state.json";
  }

  #parseAppState(value: Uint8Array): AppState {
    return JSON.parse(new TextDecoder().decode(value));
  }

  #readAppStateJson(): Promise<Uint8Array> {
    const appStateJson = this.#appStatePath();
    return new Promise((resolve) => {
      workspace.fs.readFile(Uri.file(appStateJson)).then(
        (value) => resolve(value),
        () => {
          const value = new TextEncoder().encode(
            JSON.stringify(DEFAULT_APP_STATE)
          );
          workspace.fs.writeFile(Uri.file(appStateJson), value);
          resolve(value);
        }
      );
    });
  }

  async loadAppState(): Promise<void> {
    const value = await this.#readAppStateJson();
    this.#appState = this.#parseAppState(value);
    const notesPath = this.getStatePath();
    if (notesPath) {
      this.#notesManager = new NotesManager(this.#appState.notes, notesPath);
      this.#notesManager.addListener(new StateNotesManagerListener(this));
    }
  }

  #saveAppState(): void {
    const appStateJson = this.#appStatePath();
    workspace.fs.writeFile(
      Uri.file(appStateJson),
      new TextEncoder().encode(JSON.stringify(this.#appState))
    );
  }
}

export default StateManager;
