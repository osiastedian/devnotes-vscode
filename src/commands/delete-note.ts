import { Uri, window, workspace } from "vscode";
import { NoteItem } from "../trees/note-item";
import { Command, DevNotesCommands } from "../types/commands";
import { isNoteItem } from "../utils/is-note-item";
import { messages } from "../constants/messages";

export class DeleteNote extends Command<NoteItem | string> {
  identifier = DevNotesCommands.delete;

  run(arg: NoteItem | string): void {
    if (isNoteItem(arg)) {
      const { path, name } = arg.note;
      workspace.fs.delete(Uri.file(path)).then(() => {
        window.showInformationMessage(
          messages.deleteNote.confirmMessage.replace("<noteName>", name)
        );
        this.stateManager.notesManager?.remove(arg.note.name);
      });
    }
  }
}
