// psdExportText - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS3, or higher
// Description: exports all text layers to a text file (using a get layers algorithm from http://www.ps-scripts.com/)
// Version: 0.8.0
// Author: Matt Irwin
// Website: http://www.thunderouscrickets.com
// ============================================================================
// Installation:
// 1. Place script in '/Applications/Adobe\ Photoshop\ CS#/Presets/Scripts/' for mac 
//    or 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\' for win
// 2. Restart Photoshop
// 3. Choose File > Scripts > psdExportText
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
			 var desc =  executeActionGet(ref);
			 var res = desc.getBoolean(charIDToTypeID( "Bckg" ));
			 return res	
		 };
		function getLayerType(idx,prop) {		  
			 var ref = new ActionReference();
			 //Must figure out a better way to do this
			 //ref.putIndex(charIDToTypeID( "Lyr " ), idx);
			 ref.putIndex(charIDToTypeID( "TxLr" ), idx);
			 var desc =  executeActionGet(ref);
			 var type = desc.getEnumerationValue(prop);
			 var res = typeIDToStringID(type);
			 return res	
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
	
	var text_lyrs = getTextLayersIndex();
	
	var theFile = File.saveDialog("Textfile Save As...");
	var isopen_w = theFile.open("w");
	
	var dlg = new Window('palette', 'Script Progress',{x:100, y:100, width:400, height:140}); 
	dlg.pText = dlg.add('statictext', [10,10,390,45], 'Progress:');
	dlg.pBar = dlg.add ('progressbar', [10,55,390,80]);
	
	for(var i = 0; i < text_lyrs.length; ++i) {
		dlg.center();
		dlg.show();
		dlg.hide();
		dlg.show(); 
		pg = parseInt(((i+1)/text_lyrs.length)*100);
		dlg.pBar.value = pg;
		makeActiveByIndex( text_lyrs[i], false );
		var currentLayer = activeDocument.activeLayer; 
		theFile.writeln(currentLayer.textItem.contents);
	}
	theFile.close();
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
		activeDocument.suspendHistory('Export Text to File', 'main()');
	}
	catch(e) {
		if (e.number != 8007) { // don't report error on user cancel
			showError(e);
		}
	}
}
