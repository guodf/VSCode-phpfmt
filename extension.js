// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var cp = require('child_process');
var StringDecoder = require('string_decoder').StringDecoder;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-phpfmt" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.sayHello', function() {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });
    var format = vscode.languages.registerDocumentFormattingEditProvider('php', {
        provideDocumentFormattingEdits: function(document, fmtOption, token) {
            console.log("format file:" + document.fileName);           
            var cmd =`php /home/guodf/workspace/vscode-plugin/php-test/fmt.8.9.0.phar ${document.fileName}`;          
            cp.exec(cmd, function(error, stdout, stderr) {
                decoder = new StringDecoder('ascii');
                console.log(`stdout: ${decoder.write(stdout)}`);
                console.log(`stderr: ${decoder.write(stderr)}`);
                if (error !== null) {
                    console.log(`exec error: ${decoder.write(error)}`);
                }

            });
        }
    });
    context.subscriptions.push(format);

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;