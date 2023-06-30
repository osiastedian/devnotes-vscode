import { NoteItem } from "../trees/note-item";

export function isNoteItem(arg: NoteItem | string): arg is NoteItem {
  return (arg as NoteItem).note !== undefined;
}
