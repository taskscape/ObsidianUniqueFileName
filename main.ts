import { Plugin, TFile, Menu, Notice } from 'obsidian';

export default class GUIDRenamer extends Plugin {
    onload() {
        this.addCommand({
            id: 'rename-file-to-guid',
            name: 'Rename to GUID',
            callback: () => {
                const currentFile = this.app.workspace.getActiveFile();
                if (currentFile) {
                    this.renameFileToGUID(currentFile);
                }
            },
            hotkeys: [
                {
                    modifiers: ["Mod", "Shift"],
                    key: 'r',
                }
            ]
        });

        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file) => {
                // Add an option in the file context menu
                if (file instanceof TFile) {
                    menu.addItem((item) => {
                        item.setTitle("Rename to GUID")
                            .setIcon('pencil')
                            .onClick(() => {
                                this.renameFileToGUID(file);
                            });
                    });
                }
            })
        );

        this.registerDomEvent(document, 'contextmenu', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target && target.classList.contains('internal-link')) {
                const path = target.getAttribute('href');
                if (path) {
                    const file = this.app.vault.getAbstractFileByPath(path);
                    if (file instanceof TFile) {
                        const menu = new Menu();
                        menu.addItem((item) => {
                            item.setTitle("Rename to GUID")
                                .setIcon('pencil')
                                .onClick(() => {
                                    this.renameFileToGUID(file);
                                });
                        });
                        menu.showAtPosition({ x: event.pageX, y: event.pageY });
                        event.preventDefault();
                    }
                }
            }
        });
    }

    async renameFileToGUID(file: TFile) {
        if (!file) {
            new Notice("No file is selected.");
            return;
        }

        const newFileName = `${this.generateGUID()}.${file.extension}`;
        const newPath = file.parent ? `${file.parent.path}/${newFileName}` : newFileName;

        try {
            await this.app.fileManager.renameFile(file, newPath);
            new Notice(`File renamed to ${newFileName}`);
        } catch (error) {
            new Notice("Failed to rename file.");
        }
    }

    generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
