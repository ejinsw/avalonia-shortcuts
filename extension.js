// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	/* View file creator */
	let makeNewView = vscode.commands.registerCommand('avalonia-shortcuts.makeNewView', async function () {
		// Get the name of the workspace (project)
		const workspaceFolders = vscode.workspace.workspaceFolders;

		if (!workspaceFolders) {
			vscode.window.showInformationMessage('Failed! No project opened!');
			return;
		}

		let workspaceName = "";

		if (workspaceFolders && workspaceFolders.length > 0) {
			workspaceName = workspaceFolders[0].name;
		}

		if (workspaceName === "") {
			vscode.window.showInformationMessage("Failed! Couldn't find project name!");
			return;
		}
		// Wait for file name
		const input = await vscode.window.showInputBox({
			prompt: 'Enter the name'
		});

		if (input !== "") {
			// Create a new terminal
			const terminal = vscode.window.createTerminal(`Terminal: ${input}`);

			// Send the command to the terminal
			terminal.sendText(`dotnet new avalonia.usercontrol -o Views -n ${input}  --namespace ${workspaceName}.Views`);

			// Show the terminal
			terminal.show();
		}

		// Display a message box to the user
		vscode.window.showInformationMessage('Created a view file named: ' + input);
	});

	context.subscriptions.push(makeNewView);


	/* Styles file creator */
	let createStyle = vscode.commands.registerCommand('avalonia-shortcuts.createStyle', async function () {
		// Get the name of the workspace (project)
		const workspaceFolders = vscode.workspace.workspaceFolders;

		if (!workspaceFolders) {
			vscode.window.showInformationMessage('Failed! No project opened!');
			return;
		}

		let workspacePath = '';
		let workspaceName = 'Unknown Project';

		if (workspaceFolders && workspaceFolders.length > 0) {
			workspacePath = workspaceFolders[0].uri.fsPath;
			workspaceName = workspaceFolders[0].name;
		}

		if (!workspacePath || !workspaceName) {
			vscode.window.showInformationMessage("Failed! Couldn't find workspace path or name!");
			return;
		}

		// Prompt for file name
		const fileName = await vscode.window.showInputBox({
			prompt: 'Enter the name'
		});

		// Prompt for file content
		const fileContent = `<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
	<Design.PreviewWith>
		<Border Padding="20">
			<!-- Add controls for previewer here -->
		</Border>
	</Design.PreviewWith>

	<!-- Add styles here -->
</Styles>`;

		if (fileName && fileContent) {
			// Create the file path
			const filePath = path.join(workspacePath, fileName + ".axaml");

			// Write the content to the file
			fs.writeFile(filePath, fileContent, (err) => {
				if (err) {
					vscode.window.showErrorMessage(`Failed to create file: ${err.message}`);
				} else {
					vscode.window.showInformationMessage(`File created successfully: ${fileName}`);
				}
			});
		}
	});

	context.subscriptions.push(createStyle);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
