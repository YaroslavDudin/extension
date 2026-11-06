import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Регистрация команды
    const disposable = vscode.commands.registerCommand('my-first-extension.sortLines', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showWarningMessage('Сначала выделите текст для сортировки!');
            return;
        }

        // Структура данных: массив строк
        let lines: string[] = text.split('\n'); //разделение текста на строки 
        
        // Алгоритм сортировки
        lines.sort();
        
		// Объединяем отсортированные строки обратно в текст
        const sortedText = lines.join('\n');

        editor.edit(editBuilder => {
            editBuilder.replace(selection, sortedText);
        });
    });
    // Добавляем в подписки, чтобы ресурс освободился при деактивации

    context.subscriptions.push(disposable);
}

// Вызывается при деактивации расширения

export function deactivate() {}