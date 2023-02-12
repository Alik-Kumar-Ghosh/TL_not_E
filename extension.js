
const vscode = require('vscode');
const fetch = require("node-fetch");

/**
 * @param {vscode.ExtensionContext} context
 */

//var res;
function API_call(text) {
	var res;
	fetch('https://api.openai.com/v1/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer Open_AI_API'
		},
		// body: '{\n  "model": "text-davinci-003",\n  "prompt": "def foo(n, k):\\naccum = 0\\nfor i in range(n):\\n    for l in range(k):\\n        accum += i\\nreturn accum\\n\\"\\"\\"\\nThe time complexity of this function is",\n  "temperature": 0,\n  "max_tokens": 64,\n  "top_p": 1.0,\n  "frequency_penalty": 0.0,\n  "presence_penalty": 0.0,\n  "stop": ["\\n"]\n}',
		body: JSON.stringify({
			'model': 'text-davinci-003',
			'prompt': text+'The time complexity of this code is\n',
			'temperature': 0,
			'max_tokens': 64,
			'top_p': 1,
			'frequency_penalty': 0,
			'presence_penalty': 0,
			'stop': [
				'\n'
			]
		})
		
	})
	//res=data.choices[0].text
	.then((response) => response.json())
	.then((data) =>  vscode.window.showInformationMessage(res=data.choices[0].text));	
	console.log(res);
	return (res);
  }



 function activate(context) {
	//console.log('Congratulations, your extension "tl-not-e" is now active!');

	let disposable = vscode.commands.registerCommand('tl-not-e.ComputeTimeComplexity', function () {
	const editor = vscode.window.activeTextEditor;
	const selectedText = editor.selection
	const text=editor.document.getText(selectedText)

	/*Api calling (Selected text as parameter) */
	console.log(API_call(text))
	vscode.window.showInformationMessage('Calculating . . . .');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
