import { commands, window } from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import { messages } from "../constants/messages";
import { StateKeys } from "../constants/statekeys";

export class Activate extends Command {
  identifier = DevNotesCommands.activate;

  run(): void {
    this.context.globalState.update(StateKeys.active, true);
    window
      .showInformationMessage(
        messages.activate.message,
        messages.common.workspace,
        messages.common.global
      )
      .then((value) => {
        if (value === messages.common.workspace) {
          commands.executeCommand(DevNotesCommands.setWorkspaceStoragePath);
        } else if (value === messages.common.global) {
          commands.executeCommand(DevNotesCommands.setGlobalStoragePath);
        }
      });
  }
}
