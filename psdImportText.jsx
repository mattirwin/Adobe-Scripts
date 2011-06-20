// psdImportText - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS3, or higher
// Description: imports lines from a text file to duplicated layers from an existing text layer 
// (uses a get layers algorithm from http://www.ps-scripts.com/)
// Version: 0.8.0
// Author: Matt Irwin
// Website: http://www.thunderouscrickets.com
// ============================================================================
// Installation:
// 1. Place script in '/Applications/Adobe\ Photoshop\ CS#/Presets/Scripts/' for mac 
//    or 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\' for win
// 2. Restart Photoshop
// 3. Choose File > Scripts > psdImportText
// ============================================================================

#target photoshop
app.bringToFront();

function main() {	
	function getTextLayersIndex(){
		function getNumberLayers(){
			var ref = new ActionReference();
			ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID("NmbL") )
			ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
			return executeActionGet(ref).getInteger(charIDToTypeID("NmbL"));
		}
		function hasBackground() {
			var ref = new ActionReference();
			ref.putProperty( charIDToTypeID("Prpr"), charIDToTypeID( "Bckg" ));
			ref.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Back" ))//bottom Layer/background
			var desc;
			var res;
			try {//if background is only layer this fails for some reason
				desc =  executeActionGet(ref);
				res = desc.getBoolean(charIDToTypeID( "Bckg" ));
			} catch(e){
				res = true;
			};
			return res;
		};
		function getLayerType(idx,prop) {		  
			var ref = new ActionReference();
			//Must figure out a better way to do this
			//ref.putIndex(charIDToTypeID( "Lyr " ), idx);
			ref.putIndex(charIDToTypeID( "TxLr" ), idx);
			var desc =  executeActionGet(ref);
			var type = desc.getEnumerationValue(prop);
			var res = typeIDToStringID(type);
			return res;
		};
		
		var cnt = getNumberLayers()+1;
		var res = new Array();
		if(hasBackground()){
			var i = 0;
		}else{
			var i = 1;
		};
		
		var prop =  stringIDToTypeID("layerSection");
		for(i;i<cnt;i++){
			try {//Must figure out a better way to do this
			var temp = getLayerType(i,prop);
			res.push(i);
			} catch(e){};
		};
		return res;
	};
	
	function makeActiveByIndex( idx, visible ){
		 var desc = new ActionDescriptor();
			var ref = new ActionReference();
			ref.putIndex(charIDToTypeID( "Lyr " ), idx); 
			desc.putReference( charIDToTypeID( "null" ), ref );
			desc.putBoolean( charIDToTypeID( "MkVs" ), visible );
		executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
	};
	
	var originalActiveLayer = activeDocument.activeLayer; 
	
	var theFile = File.openDialog("Textfile to Open...");
	var isopen_r = theFile.open("r");
	
	var myArr = [];
	
	if (isopen_r) {
		theFile.seek(0,0);
		var tempC;
		while( !theFile.eof ) {
			tempC = theFile.readln();
			myArr.push(tempC);
		}
	}
	theFile.close();
	
	var text_lyrs = getTextLayersIndex();
	
	var dlg_p = new Window('palette', 'Script Progress',{x:100, y:100, width:400, height:140}); 
	dlg_p.pText = dlg_p.add('statictext', [10,10,390,45], 'Progress:');
	dlg_p.pBar = dlg_p.add ('progressbar', [10,55,390,80]);
	
	var useTextLayer = -1;
	if (text_lyrs.length > 0) {
		var dlg = new Window('dialog', 'Use Existing Text Layer?',{x:100, y:100, width:400, height:120}); 
		
		dlg.add('statictext', {x:10, y:10, width:40, height:20}, 'Layer: ');
		var textLayerList = dlg.add("dropdownlist", {x:55, y:10, width:200, height:20});
		
		for ( i = text_lyrs.length - 1; i > -1; i-- ) {
			dlg_p.center();
			dlg_p.show();
			dlg_p.hide();
			dlg_p.show(); 
			pg = parseInt((1 -((i+1)/text_lyrs.length)) * 100);
			dlg_p.pBar.value = pg;
		
			makeActiveByIndex( text_lyrs[i], false );
			var currentLayer = activeDocument.activeLayer; 
			var xItem = textLayerList.add("item", currentLayer.name);
			xItem.val = i;
		}
		dlg_p.hide();
		textLayerList.selection = textLayerList.items[0];
		activeDocument.activeLayer = originalActiveLayer;
		
		dlg.btnGroup = dlg.add('group', {x:10, y:40, width:380, height:40}, 'Submit'); 
		dlg.btnGroup.useBtn = dlg.btnGroup.add('button', {x:10, y:10, width:100, height:20}, 'Use Layer', {name:'ok'}); 
		dlg.btnGroup.cancelBtn = dlg.btnGroup.add('button', {x:120, y:10, width:100, height:20}, 'Ignore', {name:'cancel'}); 
		
		dlg.btnGroup.useBtn.onClick = function() {
			useTextLayer = textLayerList.selection.val;
			dlg.close();
		}
		dlg.show();
	}
	
	for ( i = 0; i < myArr.length; i++ ) {
		dlg_p.center();
		dlg_p.show();
		dlg_p.hide();
		dlg_p.show(); 
		pg = parseInt(((i+1)/myArr.length)*100);
		dlg_p.pBar.value = pg;
		
		if (useTextLayer > -1) {
			makeActiveByIndex( text_lyrs[useTextLayer], false );
			var nTextLayer = activeDocument.activeLayer.duplicate();
			nTextLayer.name = myArr[i];
		} else {
			var nTextLayer = activeDocument.artLayers.add();
			nTextLayer.kind = LayerKind.TEXT;
		}
		nTextLayer.textItem.contents = myArr[i];
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
		activeDocument.suspendHistory('Import Text from File', 'main()');
	}
	catch(e) {
		if (e.number != 8007) { // don't report error on user cancel
			showError(e);
		}
	}
}
