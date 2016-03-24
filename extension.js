// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var cp = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function format(context, document) {
    document.save().then(() => {
        var phpfmt = vscode.workspace.getConfiguration("phpfmt");

        var styleArr = phpfmt.get("style", ["psr2"]);
        var argArr = [];
        for (var index in styleArr) {
            argArr.push("--" + styleArr[index]);
        }

        var indent_with_space = phpfmt.get("indent_with_space", 0);
        if (indent_with_space > 0) {
            argArr.push(`--indent_with_space=${indent_with_space}`);
        }

        var cmd = `php ${context.extensionPath}/fmt.phar ${argArr.join(" ")} ${document.fileName}`;
        console.log(`cmd line:${cmd}`);
        cp.exec(cmd, function(error, stdout, stderr) {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
}
function activate(context) {
    //save file
    context.subscriptions.push(vscode.commands.registerCommand('workbench.action.files.save', function(args) {
        var editor = vscode.window.activeTextEditor
        if (editor) {
            format(context, editor.document);
        }
    }));
    //formar
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('php', {
        provideDocumentFormattingEdits: function(document, fmtOption, token) {
            format(context, document);
        }
    }));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;