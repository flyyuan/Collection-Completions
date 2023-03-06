// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getCompletionList } from "./api/completions";
import outputChannel from "./outputChannel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "collection-completions" is now active!'
  );

  const completionList: vscode.CompletionItem[] = [];
  const completionsRes = await getCompletionList();

  completionsRes.data?.map((item) => {
    console.log(item);
    outputChannel.appendLine('[completionList-item]: '+JSON.stringify(item));
    const snippetCompletion = new vscode.CompletionItem(item.label);
    snippetCompletion.insertText = new vscode.SnippetString(item.insertText);
    completionList.push(snippetCompletion);
  });

  console.log(completionList);

  const jsProvider = vscode.languages.registerCompletionItemProvider(
    "javascript",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        return completionList;
      },
    }
  );

  const tsProvider = vscode.languages.registerCompletionItemProvider(
    "typescript",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        return completionList;
      },
    }
  );

  context.subscriptions.push(jsProvider, tsProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
