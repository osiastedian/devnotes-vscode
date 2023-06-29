import { ExtensionContext } from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import StateManager from "../utils/state-manager";

export class SetGlobalStatePath extends Command {
  identifier = DevNotesCommands.setGlobalStoragePath;

  run() {
    this.stateManager.setGlobalStoragePath();
  }
}
