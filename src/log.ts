import * as vscode from 'vscode';

const output = vscode.window.createOutputChannel('Am I Behind');

export function log (message: string) {
    output.appendLine(message);
    console.log(`[Am I Behind] ${message}`);
}
