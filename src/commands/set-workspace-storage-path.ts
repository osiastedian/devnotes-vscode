import { ExtensionContext } from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import StateManager from "../utils/state-manager";

export class SetWorkspaceStoragePath extends Command {
  identifier = DevNotesCommands.setWorkspaceStoragePath;
  #stateManager: StateManager;
  constructor(context: ExtensionContext) {
    super(context);
    this.#stateManager = new StateManager(context);
  }

  run() {
    this.#stateManager.setWorkspaceStoragePath();
  }
}
