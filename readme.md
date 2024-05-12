# Obsidian rename file

This plugin renames currently selected file by providing it a unique file name based on GUID style pattern.

## Step 1: Set up Your Plugin Environment
First, ensure you have a development environment ready:
- Node.js installed on your system.
- A new or existing Obsidian vault where you can test your plugin.

## Step 2: Create a New Plugin
Create a Plugin Directory: In your Obsidian vault, go to .obsidian/plugins and create a new directory for your plugin, for example, guid-renamer.

Initialize the Plugin:
Navigate into your plugin's directory in the terminal and run:

```bash
npm init -y
```

Install Dependencies:
You will need obsidian package:

```bash
npm install --save obsidian
```

## Step 3: Build the plugin
Transpile TypeScript to JavaScript: Install TypeScript globally if not already installed: 

```bash
npm install -g typescript`
```

Run `tsc main.ts` to get `main.js`.

## Step 4: Load the plugin
Load Your Plugin:
- Go to Obsidian settings, under "Community Plugins", disable Safe Mode.
- Click "Browse" and find your plugin directory, then enable your new plugin.

## Step 5: Test the plugin
- Reload the Obsidian vault.
- Right-click on a file in the file explorer or on a link within a note to see the new context menu option.
- Use the option to rename the file to a GUID.

