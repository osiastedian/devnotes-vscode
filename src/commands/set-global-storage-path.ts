import { ExtensionContext } from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import StateManager from "../utils/state-manager";

export class SetGlobalStatePath extends Command {
  identifier = DevNotesCommands.setGlobalStoragePath;
  #stateManager: StateManager;
  constructor(context: ExtensionContext) {
    super(context);
    this.#stateManager = new StateManager(context);
  }

  run() {
    this.#stateManager.setGlobalStoragePath();
  }
}
