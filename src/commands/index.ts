import { ExtensionContext } from "vscode";
import { AddNotes } from "./add-notes";
import { ICommand } from "../types/commands";

export const getCommands = (context: ExtensionContext): ICommand[] => [
  new AddNotes(context),
];
