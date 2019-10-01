// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RepositoryWatcher } from './RepoWatcher';
import { waitForGitExtension } from './git';
import { log } from './log';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "am-i-behind" is now active!');

	waitForGitExtension().then(git => {
		log(`${git.repositories.length} repos found!`);

		const repos: RepositoryWatcher[] = [];

		git.repositories.forEach(repository => {
			log(`setup listener for ${repository.rootUri}...`);

			// TODO: somehow dispose the watchers
			repos.push(new RepositoryWatcher(repository));
		});
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
