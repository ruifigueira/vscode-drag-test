import { test, expect } from 'vscode-test-playwright';

test('should drag in webview', async ({ evaluateInVSCode, workbox }) => {
  await evaluateInVSCode(vscode => vscode.commands.executeCommand('example.dragndrop'));
  
  const webview = workbox.locator('iframe').contentFrame().locator('iframe').contentFrame();
  await expect(webview.locator('#droppable')).not.toHaveText("Drag into rectangle");
  await webview.locator('#draggable').dragTo(webview.locator('#droppable'));
  await expect(webview.locator('#droppable')).toHaveText("Drag into rectangle");
});
