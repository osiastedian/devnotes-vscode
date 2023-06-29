import {
  CancellationToken,
  Event,
  EventEmitter,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
} from "vscode";
import { NotesManager, NotesManagerListener } from "../managers/notes-manager";
import { NoteItem } from "./note-item";

export class NotesTreeProvider
  implements TreeDataProvider<NoteItem>, NotesManagerListener
{
  private static instance: NotesTreeProvider;

  public static getInstance(notesManager: NotesManager) {
    if (NotesTreeProvider.instance) {
      return NotesTreeProvider.instance;
    }
    NotesTreeProvider.instance = new NotesTreeProvider(notesManager);

    return NotesTreeProvider.instance;
  }

  #onChangeEmitter = new EventEmitter<null>();

  onDidChangeTreeData = this.#onChangeEmitter.event;

  private constructor(private notesManager: NotesManager) {
    this.notesManager.addListener(this);
  }

  getTreeItem(element: NoteItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  onSaveNotes() {
    this.#onChangeEmitter.fire(null);
  }

  getChildren(element?: NoteItem | undefined): ProviderResult<NoteItem[]> {
    if (element !== undefined) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      this.notesManager.getNotes().map((note) => new NoteItem(note))
    );
  }
}
