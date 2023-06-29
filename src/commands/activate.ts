import { window } from "vscode";
import { Command, DevNotesCommands } from "../types/commands";

export class Activate extends Command {
  identifier = DevNotesCommands.activate;

  run(): void {
    this.context.globalState.update("devnote.active", true);
    window.showInformationMessage("DevNotes Activated!");
  }
}
