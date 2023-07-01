import { Uri, commands } from "vscode";
import { NoteItem } from "../trees/note-item";
import { Command, DevNotesCommands } from "../types/commands";
import { isNoteItem } from "../utils/is-note-item";

export class PreviewNote extends Command<NoteItem> {
  identifier = DevNotesCommands.preview;

  #previewNoteItem(noteItem: NoteItem) {
    const uri = Uri.file(noteItem.note.path);
    commands.executeCommand("markdown.showPreview", uri);
  }

  run(arg: NoteItem): void {
    if (isNoteItem(arg)) {
      this.#previewNoteItem(arg);
    }
  }
}
