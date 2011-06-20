// outputEvLayerFront - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS3, or higher
// Description: exports all visible layers or layersets via save for web
// Version: 0.5.0
// Author: Matt Irwin
// Website: http://www.irwinone.com
// ============================================================================
// Installation:
// 1. Place script in '/Applications/Adobe\ Photoshop\ CS#/Presets/Scripts/' for mac 
//    or 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\' for win
// 2. Restart Photoshop
// 3. Choose File > Scripts > psdExportText
// ============================================================================

#target photoshop
app.bringToFront();

#include "output_evLayer_3inc.js";

function main() {
	
	var wwFolder = Folder.selectDialog("Select folder to save files");
	//alert(wwFolder);
	var exportLayersets = false;
	var exportOnlyLayerset = false;
	var fileType = "GIF";
	var repQual;
	var dlg = new Window('dialog', 'Export Layersets?',{x:100, y:100, width:400, height:80}); 
	
	//exportLayersets
	dlg.add('statictext', {x:10, y:10, width:140, height:20}, 'Export Layersets? ');
	
	dlg.btnGroup = dlg.add('group', {x:10, y:30, width:380, height:80}, 'Submit'); 
	dlg.btnGroup.yesBtn = dlg.btnGroup.add('button', {x:10, y:10, width:100, height:20}, 'Yes', {name:'ok'}); 
	dlg.btnGroup.noBtn = dlg.btnGroup.add('button', {x:120, y:10, width:100, height:20}, 'No', {name:'cancel'}); 
	
	dlg.btnGroup.yesBtn.onClick = function() {
		exportLayersets = true;
		dlg.close();
	}
	
	dlg.show();
	
	//exportOnlyLayerset
	var dlg = new Window('dialog', 'Export Only "output" Layerset?',{x:100, y:100, width:400, height:80}); 
	
	dlg.add('statictext', {x:10, y:10, width:140, height:20}, 'Export Layersets? ');
	
	dlg.btnGroup = dlg.add('group', {x:10, y:30, width:380, height:80}, 'Submit'); 
	dlg.btnGroup.yesBtn = dlg.btnGroup.add('button', {x:10, y:10, width:100, height:20}, 'Yes', {name:'ok'}); 
	dlg.btnGroup.noBtn = dlg.btnGroup.add('button', {x:120, y:10, width:100, height:20}, 'No', {name:'cancel'}); 
	
	dlg.btnGroup.yesBtn.onClick = function() {
		exportOnlyLayerset = true;
		dlg.close();
	}
	
	dlg.show();
	
	//alert(exportLayersets);
	
	var dlg = new Window('dialog', 'Choose a filetype:',{x:100, y:100, width:400, height:80}); 
	
	dlg.add('statictext', {x:10, y:10, width:140, height:20}, 'Choose a filetype: ');
	
	dlg.btnGroup = dlg.add('group', {x:10, y:30, width:380, height:80}, 'Type'); 
	dlg.btnGroup.gifBtn = dlg.btnGroup.add('button', {x:10, y:10, width:100, height:20}, 'GIF', {name:'gif'}); 
	dlg.btnGroup.jpgBtn = dlg.btnGroup.add('button', {x:120, y:10, width:100, height:20}, 'JPG', {name:'jpg'}); 
	dlg.btnGroup.tifBtn = dlg.btnGroup.add('button', {x:230, y:10, width:100, height:20}, 'TIF', {name:'tif'}); 
	
	dlg.btnGroup.gifBtn.onClick = function() {
		fileType = "GIF";
		dlg.close();
	}
	dlg.btnGroup.jpgBtn.onClick = function() {
		fileType = "JPG";
		dlg.close();
	}
	dlg.btnGroup.tifBtn.onClick = function() {
		fileType = "TIF";
		dlg.close();
	}
	
	dlg.show();
	
	function getQual(fileType) {
		var repQual;
		if (fileType == "GIF") {
			repQual = prompt("Enter Number of Colors for GIF (2-256)","32");
			repQual = parseInt(repQual);
			if ((repQual >= 2) && (repQual <= 256)) {
				return repQual;
			} else {
				getQual(fileType);
			}
		} else if (fileType == "JPG") {
			repQual = prompt("Enter JPG Quality (0-100)","50");
			repQual = parseInt(repQual);
			if ((repQual >= 0) && (repQual <= 100)) {
				return repQual;
			} else {
				getQual(fileType);
			}
		} else {
			repQual = 1;
			return repQual;
		}
	}
	
	repQual = getQual(fileType);
	wwFolder += "/";
	
	if (exportLayersets) {
		exportVisibleSets(fileType, activeDocument, repQual, wwFolder);
	} else {
		exportVisible(fileType, activeDocument, repQual, wwFolder, exportOnlyLayerset);
	}
	
	alert("Script Complete");
}

function isCorrectVersion() {
	if (parseInt(version, 10) >= 10) {
		return true;
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
		activeDocument.suspendHistory('Export Layers/Layersets', 'main()');
	}
	catch(e) {
		if (e.number != 8007) { // don't report error on user cancel
			showError(e);
		}
	}
}