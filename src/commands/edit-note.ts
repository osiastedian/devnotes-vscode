import { MarkdownString, Uri, commands, window, workspace } from "vscode";
import { NoteItem } from "../trees/note-item";
import { Command, DevNotesCommands } from "../types/commands";
import { isNoteItem } from "../utils/is-note-item";

export class EditNote extends Command<NoteItem | string> {
  identifier = DevNotesCommands.edit;

  run(arg: NoteItem | string): void {
    if (isNoteItem(arg)) {
      const { path } = arg.note;
      commands.getCommands().then((commands) => {
        console.log({
          commands: commands.filter((c) => c.includes("markdown")),
        });
      });
      window.showTextDocument(Uri.file(path), { preview: true }).then(() => {
        commands.executeCommand("markdown.showLockedPreviewToSide");
      });
    }
  }
}
