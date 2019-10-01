import * as vscode from 'vscode';
import { Repository, RepositoryState } from '../libs/git';
import { log } from './log';

enum ModalChoice {
    PULL_NOW = 'Run \'git pull\' now',
}

export class RepositoryWatcher {
    private _behind = 0;
    constructor(
        private repository: Repository,
    ) {
        this.onStateChange(this.repository.state);

        // TODO: somehow dispose the listeners here
        repository.state.onDidChange(() => {
            this.onStateChange(this.repository.state);
        });
    }

    private set behind(behind: number) {
        const before = this._behind;
        this._behind = behind;

        if (before !== behind) {
            log(`behind changed from ${before} to ${behind}!`);
            this.gotBehind(behind);
        }
    }

    private gotBehind(behind: number) {
        // Display a message box to the user
		vscode.window.showErrorMessage(
            `There ${behind === 1
                ? 'is'
                : 'are'
            } ${behind} new ${behind === 1
                ? 'commit'
                : 'commits'
            } available on the remote!`,
            ModalChoice.PULL_NOW
		).then(choice => {
            if (choice === ModalChoice.PULL_NOW) {
                this.repository.pull();
            }
        });
    }

    onStateChange(state: RepositoryState) {
        const head = state.HEAD;
        log(`There were changes for ${this.repository.rootUri}`);

        if (head !== undefined) {
            const behind = head.behind;

            if (behind) {
                this.behind = behind;
            }
        }
    }
}
