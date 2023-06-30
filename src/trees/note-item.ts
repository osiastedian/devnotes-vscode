import { TreeItem } from "vscode";
import { Note } from "../types/notes";

export class NoteItem extends TreeItem {
  constructor(public note: Note) {
    super(note.name);
    this.label = note.name;
    this.contextValue = "note";
  }
}
