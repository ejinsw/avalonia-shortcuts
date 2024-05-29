// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('avalonia-shortcuts.makeNewView', async function () {
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

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
