import { Uri, window, workspace } from "vscode";
import { NoteItem } from "../trees/note-item";
import { Command, DevNotesCommands } from "../types/commands";
import { isNoteItem } from "../utils/is-note-item";

export class DeleteNote extends Command<NoteItem | string> {
  identifier = DevNotesCommands.delete;

  run(arg: NoteItem | string): void {
    if (isNoteItem(arg)) {
      const { path, name } = arg.note;
      workspace.fs.delete(Uri.file(path)).then(() => {
        window.showInformationMessage(`Deleted Note: ${name}`);
        this.stateManager.notesManager?.remove(arg.note.name);
      });
    }
  }
}
