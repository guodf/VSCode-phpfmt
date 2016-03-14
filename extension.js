// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var cp = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var format = vscode.languages.registerDocumentFormattingEditProvider('php', {
        provideDocumentFormattingEdits: function(document, fmtOption, token) {
            //console.log([1,document]);
            document.save();          
            var configArr=["--psr2"];
            var cmd =`php ${context.extensionPath}/fmt.8.9.0.phar ${configArr.join(" ")} ${document.fileName}`;
            console.log(`cmd line:${cmd}`);          
            cp.exec(cmd, function(error, stdout, stderr) {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
        }
    });

    var saveFile=vscode.commands.registerCommand('workbench.action.files.save',function (args) {
        var editor=vscode.window.activeTextEditor
        if(editor){
            vscode.commands.executeCommand('editor.action.format',[editor.document]);
        }
    });
    context.subscriptions.push(saveFile);
    context.subscriptions.push(format);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;