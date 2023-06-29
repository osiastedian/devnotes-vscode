import { Uri, workspace } from "vscode";

export interface NotesManagerListener {
  onSaveNotes: (notes: Record<string, string>) => void;
}

export class NotesManager {
  listeners: NotesManagerListener[] = [];
  constructor(
    private notes: Record<string, string>,
    private basePath: string
  ) {}

  getList(): string[] {
    return Object.keys(this.notes);
  }

  getPath(noteName: string): string {
    return this.notes[noteName];
  }

  exists(noteName: string): boolean {
    return this.notes[noteName] !== undefined;
  }

  async updateNote(noteName: string, content: string, replace = true) {
    if (!this.exists(noteName)) {
      throw new Error(`Note ${noteName} does not exist`);
    }
    const notePath = this.notes[noteName];
    let toSaveContent = content;
    if (!replace) {
      const decoder = new TextDecoder("utf-8");
      const currentContent = decoder.decode(
        await workspace.fs.readFile(Uri.file(notePath))
      );
      toSaveContent = currentContent + "\n" + content;
    }
    const contentAsUnit8Array = new TextEncoder().encode(toSaveContent);
    await workspace.fs.writeFile(Uri.file(notePath), contentAsUnit8Array);
    this.listeners.forEach((listener) => listener.onSaveNotes(this.notes));
    return notePath;
  }

  async add(noteName: string, content = ""): Promise<string> {
    if (this.exists(noteName)) {
      throw new Error(`Note ${noteName} already exists`);
    }
    const notePath = `${this.basePath}/${noteName}.md`;
    const contentWithHeader = `# ${noteName}\n` + content;
    const contentAsUnit8Array = new TextEncoder().encode(contentWithHeader);
    await workspace.fs.writeFile(Uri.file(notePath), contentAsUnit8Array);
    this.notes[noteName] = notePath;
    this.listeners.forEach((listener) => listener.onSaveNotes(this.notes));
    return notePath;
  }

  addListener(listener: NotesManagerListener): void {
    this.listeners.push(listener);
  }
}
