import { ExtensionContext } from "vscode";
import StateManager from "../managers/state-manager";

export interface ICommand {
  identifier: DevNotesCommands;
  run: (...args: any[]) => void;
}

export abstract class Command<R = string, S = string, T = string>
  implements ICommand
{
  abstract identifier: DevNotesCommands;
  abstract run(arg: R): void;
  abstract run(arg1: R, arg2: S): void;
  abstract run(arg1: R, arg2: S, arg3: T): void;

  constructor(
    protected context: ExtensionContext,
    protected stateManager: StateManager
  ) {}
}

export enum DevNotesCommands {
  "activate" = "devnotes.activate",
  "addNotes" = "devnotes.addNotes",
  "setGlobalStoragePath" = "devnotes.setGlobalStoragePath",
  "setWorkspaceStoragePath" = "devnotes.setWorkspaceStoragePath",
}
