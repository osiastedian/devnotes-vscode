import { ExtensionContext } from "vscode";
import { AddNotes } from "./add-notes";
import { ICommand } from "../types/commands";
import { SetGlobalStatePath } from "./set-global-storage-path";
import { SetWorkspaceStoragePath } from "./set-workspace-storage-path";
import StateManager from "../utils/state-manager";

export const getCommands = (
  context: ExtensionContext,
  stateManager: StateManager
): ICommand[] => [
  new AddNotes(context, stateManager),
  new SetGlobalStatePath(context, stateManager),
  new SetWorkspaceStoragePath(context, stateManager),
];
