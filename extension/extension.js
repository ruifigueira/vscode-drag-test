const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
	context.subscriptions.push([
		vscode.commands.registerCommand('example.dragndrop', (viewName) => {
			const panel = vscode.window.createWebviewPanel('example.dragndrop', 'Drag and drop', {}, { enableScripts: true });
			panel.webview.html = `
				<!DOCTYPE HTML>
				<html>
				<head>
				<style>
				#droppable { width: 200px; height: 70px; padding: 10px; border: 1px dashed black; }
				#draggable { width: 180px; height: 50px; padding: 10px; border: 1px solid black; background: lightgray; }
				</style>
				<script>
				function allowDrop(ev) {
					ev.preventDefault();
				}

				function drag(ev) {
					ev.dataTransfer.setData("text", ev.target.id);
				}

				function drop(ev) {
					ev.preventDefault();
					var data = ev.dataTransfer.getData("text");
					ev.target.appendChild(document.getElementById(data));
				}
				</script>
				</head>
				<body>
				<div id="droppable" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
				<br>
				<div id="draggable" draggable="true" ondragstart="drag(event)">Drag into rectangle</div>
				</body>
				</html>`;
			context.subscriptions.push(panel);
		}),
	]);
}

module.exports = { activate };
