import { Config } from "./Config";
import { window } from "vscode";

export function showNotification(message: string, ...items: string[]) {
    return getNotificationFunction()(message, ...items);
}

function getNotificationFunction() {
    switch(Config.notificationLevel) {
        case "error":
            return window.showErrorMessage;
        case "warning":
            return window.showWarningMessage;
        case "info":
        default:
            return window.showInformationMessage;
    }
}
