import { ExtensionContext } from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import StateManager from "../managers/state-manager";

export class SetWorkspaceStoragePath extends Command {
  identifier = DevNotesCommands.setWorkspaceStoragePath;

  run() {
    this.stateManager.setWorkspaceStoragePath();
  }
}
