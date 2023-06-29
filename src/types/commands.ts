import { ExtensionContext } from "vscode";

export abstract class Command<R = string, S = string, T = string> {
  abstract identifier: DevNotesCommands;
  abstract run(arg: R): void;
  abstract run(arg1: R, arg2: S): void;
  abstract run(arg1: R, arg2: S, arg3: T): void;

  constructor(protected context: ExtensionContext) {}
}

export enum DevNotesCommands {
  "addNotes" = "devnotes.addNotes",
}