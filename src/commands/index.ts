import { ExtensionContext } from "vscode";
import { AddNotes } from "./add-notes";

export const getCommands = (context: ExtensionContext) => [
  new AddNotes(context),
];
