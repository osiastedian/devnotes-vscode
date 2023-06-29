import { ExtensionContext, window } from "vscode";

const STATE_STORAGE_PATH_KEY = "storagePath";

export class StateManager {
  constructor(private context: ExtensionContext) {
    this.context = context;
  }

  #showOpenDialog() {
    return window.showOpenDialog({
      canSelectFolders: true,
      canSelectFiles: false,
      canSelectMany: false,
    });
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
    const path = this.#getStatePath();
    if (!path) {
      this.setWorkspaceStoragePath();
      return false;
    }
    return true;
  }

  #getStatePath() {
    let path = this.context.workspaceState.get(STATE_STORAGE_PATH_KEY);
    if (!path) {
      path = this.context.globalState.get(STATE_STORAGE_PATH_KEY);
    }
    return path;
  }
}

export default StateManager;
