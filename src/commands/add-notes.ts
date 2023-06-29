import * as vscode from "vscode";
import { Command, DevNotesCommands } from "../types/commands";
import { messages } from "../constants/messages";

interface File {
  path: string;
}

const NEW_NOTE = messages.addNotes.noteNameCreateNewNote;

export class AddNotes extends Command<File> {
  identifier = DevNotesCommands.addNotes;

  #retrieveNewNoteName(placeHolder: string): Thenable<string | undefined> {
    return vscode.window.showInputBox({
      title: messages.addNotes.noteName,
      placeHolder,
    });
  }

  #getExistingNotes(): Thenable<string[]> {
    return Promise.resolve(this.stateManager.notesManager?.getNames() ?? []);
  }

  async #retrieveNoteList(): Promise<string | undefined> {
    const notes = await this.#getExistingNotes();
    return await vscode.window.showQuickPick([NEW_NOTE, ...notes]);
  }

  run(file?: File): void {
    const getNoteName = async () => {
      const selected = await this.#retrieveNoteList();
      if (selected === null) {
        return null;
      }
      if (selected === NEW_NOTE) {
        const fileName = file?.path.split("/").pop();
        return this.#retrieveNewNoteName(
          fileName ?? messages.addNotes.noteNameInputPlaceholder
        );
      }
      return selected;
    };

    const getNoteContent = async () => {
      const content = await vscode.window.showInputBox({
        title: messages.addNotes.noteContentInputTitle,
      });
      return content ?? "";
    };

    const retrieveParams = async () => {
      const noteName = await getNoteName();
      const noteContent = await getNoteContent();
      return [noteName, noteContent];
    };

    retrieveParams()
      .then(([noteName, noteContent]) => {
        if (!noteName || !this.stateManager.notesManager) {
          return;
        }

        const notesManager = this.stateManager.notesManager;
        const content = `## ${new Date().toLocaleString()}\n${noteContent}\n`;

        if (notesManager.exists(noteName)) {
          notesManager.updateNote(noteName, content, false);
        } else {
          notesManager.add(noteName, content);
        }
        vscode.window.showInformationMessage(
          messages.addNotes.successMessage.replace("<noteName>", noteName)
        );
      })
      .catch((error) => {
        vscode.window.showErrorMessage(error.message);
      });
  }
}
