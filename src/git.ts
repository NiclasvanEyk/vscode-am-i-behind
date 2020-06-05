import * as vscode from 'vscode';
import { GitExtension } from '../libs/git';
import { log } from './log';

export async function waitForGitExtension(
    maxTries = 10,
    checkEveryMs = 1000,
    tries = 0,
    onError: () => void = () => {}
): Promise<GitExtension> {
    log('Waiting for Git Extension to be ready...');

    try {
        const api = vscode
            .extensions
            .getExtension<GitExtension>('vscode.git')!
            .exports;

            log(`Git Extension is ready after ${tries} tries!`);

            return api;
    } catch {
        if (tries <= maxTries) {
            await sleep(checkEveryMs);

            return await waitForGitExtension(
                maxTries,
                checkEveryMs,
                tries + 1,
                onError
            );
        } else {
            throw Error(`Maximum number of tries (${maxTries}) reached while waiting for the Git Extension to activate!`);
        }
    }
}

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
