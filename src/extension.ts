// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getCommands } from "./commands";
import StateManager from "./managers/state-manager";
import { NotesTreeProvider } from "./trees/notes-tree-provider";
import { TreeProviderIds } from "./trees/provider-ids";
import { messages } from "./constants/messages";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const stateManager = new StateManager(context);
  try {
    await stateManager.loadAppState();
    const treeProvider = NotesTreeProvider.getInstance(
      stateManager.notesManager!
    );
    vscode.window.registerTreeDataProvider(
      TreeProviderIds.notesList,
      treeProvider
    );
  } catch (e) {
    console.error(e);
  }

  const commands = getCommands(context, stateManager);
  const disposables = commands.map((command) =>
    vscode.commands.registerCommand(command.identifier, async (...runArgs) => {
      if (!stateManager.checkStateValidity()) {
        return;
      }

      return command.run(...runArgs);
    })
  );

  disposables.forEach((disposable) => context.subscriptions.push(disposable));

  console.log(messages.common.activationLog);
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log(messages.common.deactivationLog);
}
