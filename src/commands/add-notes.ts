import * as vscode from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import { messages } from "../constants/messages";

interface File {
  path: string;
}

export const NEW_NOTE = "Create a new note";

export class AddNotes extends Command<File> {
  identifier = DevNotesCommands.addNotes;

  #retrieveNewNoteName(placeHolder: string): Thenable<string | undefined> {
    return vscode.window.showInputBox({
      title: messages.addNotes.noteName,
      placeHolder,
    });
  }

  #getExistingNotes(): Thenable<string[]> {
    return Promise.resolve(["BRAND-1743 Abcd was here"]);
  }

  async #retrieveNoteList(): Promise<string | undefined> {
    const notes = await this.#getExistingNotes();
    return await vscode.window.showQuickPick([NEW_NOTE, ...notes]);
  }

  run(file: File): void {
    const runAsync = async () => {
      const selected = await this.#retrieveNoteList();
      if (selected === null) {
        return null;
      }
      if (selected === NEW_NOTE) {
        return this.#retrieveNewNoteName(file.path);
      }
      return selected;
    };

    runAsync().then((noteName) => {
      if (!noteName) {
        return;
      }
      vscode.window.showInformationMessage(
        messages.addNotes.successMessage.replace("<noteName>", noteName)
      );
    });
  }
}
