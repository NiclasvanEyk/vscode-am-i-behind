import { workspace } from "vscode";

export type NotificationLevelSettingValue = 'info' | 'error' | 'warning';

/**
 * You can access all settings regarding this extension from this class
 * as getters.
 */
export class Config {
    static readonly SETTINGS_PREFIX = 'am-i-behind';

    private static read<T>(path: string, defaultValue: T): T {
        return workspace
            .getConfiguration(Config.SETTINGS_PREFIX)
            .get<T>(path, defaultValue);
    }

    public static get notificationLevel() {
        return Config.read<NotificationLevelSettingValue>(
            'notificationLevel',
            'info'
        );
    }
}
