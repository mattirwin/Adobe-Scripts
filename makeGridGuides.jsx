// makeGridGuides - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS3, or higher
// Description: creates guides on a grid specified by user
// Version: 1.0.0
// Author: Matt Irwin
// Website: http://www.irwinone.com
// ============================================================================
// Installation:
// 1. Place script in '/Applications/Adobe\ Photoshop\ CS#/Presets/Scripts/' for mac 
//    or 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\' for win
// 2. Place or make sure 'makeGuide.jsx' script resource exists in 
//    '/Applications/Adobe\ Photoshop\ CS#/Presets/Scripts/' for mac
//    or 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\' for win
// 3. Restart Photoshop
// 4. Choose File > Scripts > makeGridGuides
// ============================================================================

#target photoshop
#include "makeGuide.jsx"

app.bringToFront();

function validateDim(entry, def, floor) {
	if(isNaN(entry.text)) {
		alert('You must enter a number');
		if(typeof def == "undefined") {
			return "0";
		} else {
			return def;
		}
	} else {
		entry.text = parseInt(entry.text);
		if (entry.text < 0) {
			entry.text = entry.text * -1;
		}
		if(typeof floor != "undefined") {
			if (entry.text < floor) {
				alert("Number must be at least " + floor);
					if(typeof def == "undefined") {
					return "0";
				} else {
					return def;
				}
			}
		}
		return entry.text;
	}
}

var docRef = app.activeDocument;

var dlg = new Window('dialog', 'Make Grid Guides',{x:100, y:100, width:400, height:260}); 

dlg.setupPanel = dlg.add('panel', {x:10, y:10, width:380, height:80}, 'Setup'); 
dlg.setupPanel.add('statictext', {x:10, y:10, width:40, height:20}, 'Plane: ');
var coordList = dlg.setupPanel.add("dropdownlist", {x:55, y:10, width:50, height:20});
var xItem = coordList.add("item", "X");
xItem.val = "X";
var yItem = coordList.add("item", "Y");
yItem.val = "Y";
coordList.selection = coordList.items[0];
dlg.setupPanel.add('statictext', {x:130, y:10, width:110, height:20}, 'Starting Position: ');
var startingPosition = dlg.setupPanel.add('edittext', {x:250, y:10, width:50, height:20});
startingPosition.text = "0";
startingPosition.onChange = function() {
	this.text = validateDim(this);
}
dlg.cnPanel = dlg.add('panel', {x:10, y:100, width:380, height:80}, 'Column setup');
dlg.cnPanel.add('statictext', {x:10, y:10, width:100, height:20}, 'Gutter width: ');
var gutterWidth = dlg.cnPanel.add('edittext', {x:110, y:10, width:50, height:20});
gutterWidth.text = "10";
gutterWidth.onChange = function() {
	this.text = validateDim(this, 10);
}
dlg.cnPanel.add('statictext', {x:170, y:10, width:100, height:20}, 'Inner width: ');
var innerWidth = dlg.cnPanel.add('edittext', {x:280, y:10, width:50, height:20});
innerWidth.text = "40";
innerWidth.onChange = function() {
	this.text = validateDim(this, 40, 1);
}
dlg.cnPanel.add('statictext', {x:10, y:40, width:140, height:20}, '*Max Width (optional): ');
var maxWidth = dlg.cnPanel.add('edittext', {x:160, y:40, width:50, height:20});
maxWidth.onChange = function() {
	this.text = validateDim(this, "");
}

dlg.btnGroup = dlg.add('group', {x:10, y:190, width:380, height:80}, 'Submit'); 
dlg.btnGroup.buildBtn = dlg.btnGroup.add('button', {x:10, y:10, width:100, height:20}, 'Build', {name:'ok'}); 
dlg.btnGroup.cancelBtn = dlg.btnGroup.add('button', {x:120, y:10, width:100, height:20}, 'Cancel', {name:'cancel'}); 

dlg.btnGroup.buildBtn.onClick = function() {
	if(!isNaN(gutterWidth.text) && !isNaN(innerWidth.text)) {
		gutterWidth.text = parseInt(gutterWidth.text);
		innerWidth.text = parseInt(innerWidth.text);
		startingPosition.text = parseInt(startingPosition.text);
		dlg.close();
		//buildOut();
		app.activeDocument.suspendHistory("Make Grid Guides", "buildOut()");
	} else {
		alert('Widths must be integers');
	}
}

dlg.show();

function buildOut() {
	var upperBound;
	
	if(coordList.selection.val == "X") {
		upperBound = docRef.width;
	} else {
		upperBound = docRef.height;
	}
	upperBound = parseInt(upperBound);
	
	if(maxWidth.text != "") {
		var bhold = parseInt(startingPosition.text) + parseInt(maxWidth.text);
		upperBound = (bhold > upperBound) ? upperBound : bhold;
	}
	
	var currentPosition = parseInt(startingPosition.text);
	var count = 0;
	
	while(currentPosition <= upperBound) {
		makeGuide(coordList.selection.val, currentPosition);
		if ((count % 3) == 1) {
			currentPosition += parseInt(innerWidth.text);
		} else {
			if (parseInt(innerWidth.text) == 0 ) { continue; }
			currentPosition += parseInt(gutterWidth.text);
		}
		count++;
	}
}
