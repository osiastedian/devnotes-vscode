import { TreeItem } from "vscode";
import { Note } from "../types/notes";

export class NoteItem extends TreeItem {
  constructor(note: Note) {
    super(note.name);
    this.label = note.name;
  }
}
