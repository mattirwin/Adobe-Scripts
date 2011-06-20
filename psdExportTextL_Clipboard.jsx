// psdExportText - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS3, or higher, OS X only (for now)
// Description: exports current layer (if text) to clipboard
// Version: 0.9.0
// Author: Matt Irwin
// Website: http://www.thunderouscrickets.com
// ============================================================================
// Installation:
// Setup Shell Script
// 1. Run setupClipScript
// -- OR --
// 1. Open Terminal
// 2. Type "echo '' > $HOME/Documents/clipScript.command" and hit enter
// 3. Type "chmod 755 $HOME/Documents/clipScript.command" and hit enter
// Copy Script
// 1. Place script in '/Applications/Adobe\ Photoshop\ CS#/Presets/Scripts/'
// 2. Restart Photoshop
// 3. Choose File > Scripts > psdExportTextL_Clipboard
// ============================================================================

#target photoshop
app.bringToFront();

function main() {
	var showmeCheck;
	var uPath = Folder.userData;
	var kfilePath = uPath + "/ExTextL_Clipboard.txt";
	var kfile = new File(kfilePath);
	var isopen_r = kfile.open("r");
	if (isopen_r) {
		kfile.seek(0,0);
		showmeCheck = kfile.readch();
		kfile.close();
	}
	
	var currentLayer = activeDocument.activeLayer;
	
	if (currentLayer.kind == LayerKind.TEXT) {
		var mTempPath = Folder.myDocuments;
		var cfilePath = mTempPath + "/clipScript.command";
		var cfile = new File(cfilePath);
		cfile.lineFeed = "Unix";
		cfile.open("w");
		cfile.seek(0);
		cfile.writeln('#!/bin/bash');
		cfile.writeln('echo "'+currentLayer.textItem.contents+'" | pbcopy');
		cfile.close();
		cfile.execute();
		var dlg = new Window('dialog', '',{x:100, y:100, width:250, height:140}); 

		dlg.add('statictext', [10,10,390,25], 'Layer Copied!', {multiline:true});
		dlg.checkNoshow = dlg.add('checkbox', [10,35,390,60], 'Don\'t show me this again');
	
		dlg.add('button', {x:10, y:70, width:100, height:20}, 'OK', {name:'ok'});
		
		dlg.checkNoshow.onClick = function() {
			var isopen_w = kfile.open("w");
			if (isopen_w) {
				if (dlg.checkNoshow.value){
					kfile.write("1");	
				} else {
					kfile.write("0");
				}
			}
			kfile.close();
		}
	
		if (showmeCheck != 1) { dlg.show() };

	} else { 
		alert("Current Layer is not text");
	}
}

function isCorrectVersion() {
	if (parseInt(version, 10) >= 10) {
		return true;
	} 
	else if (Folder.fs != "Macintosh") {
		alert('This script only works on a Macintosh.', 'Wrong OS', false);
		return false;
	}
	else {
		alert('This script requires Adobe Photoshop CS3 or higher.', 'Wrong Version', false);
		return false;
	}
}

function isOpenDocs() {
	if (documents.length) {
		return true;
	}
	else {
		alert('There are no documents open.', 'No Documents Open', false);
		return false;
	}
}

function showError(err) {
	if (confirm('An unknown error has occurred.\n' +
		'Would you like to see more information?', true, 'Unknown Error')) {
			alert(err + ': on line ' + err.line, 'Script Error', true);
	}
}

if (isCorrectVersion() && isOpenDocs()) {
	try {
		activeDocument.suspendHistory('Export TextLayer to Clipboard', 'main()');
	}
	catch(e) {
		if (e.number != 8007) { // don't report error on user cancel
			showError(e);
		}
	}
}
