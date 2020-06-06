import * as vscode from 'vscode';

export function extractRepositoryName(rootUri: vscode.Uri) {
    const parts = rootUri.path.split('/');

    return parts[parts.length - 1];
}