import { ExtensionContext } from "vscode";

export abstract class Command {
  abstract identifier: DevNotesCommands;
  abstract run(args: string[]): void;

  constructor(private context: ExtensionContext) {}
}

export enum DevNotesCommands {
  "addNotes" = "devnotes.addNotes",
}
