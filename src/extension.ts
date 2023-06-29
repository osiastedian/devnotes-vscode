// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getCommands } from "./commands";
import StateManager from "./utils/state-manager";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const commands = getCommands(context);

  const stateManager = new StateManager(context);

  const disposables = commands.map((command) =>
    vscode.commands.registerCommand(command.identifier, (...runArgs) => {
      if (!stateManager.checkStateValidity()) {
        return;
      }
      return command.run(...runArgs);
    })
  );

  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

// This method is called when your extension is deactivated
export function deactivate() {}
