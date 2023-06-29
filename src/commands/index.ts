import { ExtensionContext } from "vscode";
import { AddNotes } from "./add-notes";
import { ICommand } from "../types/commands";
import { SetGlobalStatePath } from "./set-global-storage-path";
import { SetWorkspaceStoragePath } from "./set-workspace-storage-path";
import StateManager from "../managers/state-manager";
import { Activate } from "./activate";

export const getCommands = (
  context: ExtensionContext,
  stateManager: StateManager
): ICommand[] => [
  new Activate(context, stateManager),
  new AddNotes(context, stateManager),
  new SetGlobalStatePath(context, stateManager),
  new SetWorkspaceStoragePath(context, stateManager),
];
