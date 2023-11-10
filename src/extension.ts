import { homedir, platform } from 'os';
import * as vscode from 'vscode';

const mac = 'darwin';
const win = 'win32';
const linux = 'linux';
const winSettingDirPath = '/Code/User/';
const macSettingDirPath = '/Library/Application Support/Code/User/';
const linuxSettingDirPath = '/.config/Code/User/';

export function activate(context: vscode.ExtensionContext) {

	console.log('extension "open-vscode-settings" is now active!');

	let openSettingsJson = vscode.commands.registerCommand('open-vscode-settings.openSettingsJson', () => {
		let filePath = '';
		switch (platform()) {
			case win:
				filePath = process.env.APPDATA + winSettingDirPath + 'settings.json';
				break;
			case mac:
				filePath = homedir() + macSettingDirPath + 'settings.json';
				break;
			case linux:
				filePath = homedir() + linuxSettingDirPath + 'settings.json';
				break;
			default:
				vscode.window.showErrorMessage('Your platform is not currently supported');
				return;
		}
		const openPath = vscode.Uri.file(filePath);
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc);
		});
	});

	let openKeybindingsJson = vscode.commands.registerCommand('open-vscode-settings.openKeybindingsJson', () => {
		let filePath = '';
		switch (platform()) {
			case win:
				filePath = process.env.APPDATA + winSettingDirPath + 'keybindings.json';
				break;
			case mac:
				filePath = homedir() + macSettingDirPath + 'keybindings.json';
				break;
			case linux:
				filePath = homedir() + linuxSettingDirPath + 'keybindings.json';
				break;
			default:
				vscode.window.showErrorMessage('Your platform is not currently supported');
				return;
		}
		const openPath = vscode.Uri.file(filePath);
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc);
		});
	});

	context.subscriptions.push(openSettingsJson);
	context.subscriptions.push(openKeybindingsJson);
}

export function deactivate() { }
