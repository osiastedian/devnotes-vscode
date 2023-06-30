import { Uri, window } from "vscode";
import { NoteItem } from "../trees/note-item";
import { Command, DevNotesCommands } from "../types/commands";
import { isNoteItem } from "../utils/is-note-item";

export class EditNote extends Command<NoteItem | string> {
  identifier = DevNotesCommands.edit;

  run(arg: NoteItem | string): void {
    if (isNoteItem(arg)) {
      const { path } = arg.note;
      window.showTextDocument(Uri.file(path), { preview: true });
    }
  }
}
