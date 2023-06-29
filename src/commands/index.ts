import { ExtensionContext } from "vscode";
import { AddNotes } from "./add-notes";
import { ICommand } from "../types/commands";
import { SetGlobalStatePath } from "./set-global-storage-path";
import { SetWorkspaceStoragePath } from "./set-workspace-storage-path";

export const getCommands = (context: ExtensionContext): ICommand[] => [
  new AddNotes(context),
  new SetGlobalStatePath(context),
  new SetWorkspaceStoragePath(context),
];
