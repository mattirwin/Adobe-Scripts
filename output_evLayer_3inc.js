function exportVisibleFlat(fileType, doc, qual, loc, myFileNm) {
	var myJPEG = new JPEGSaveOptions();
	myJPEG.quality = 10;
	myJPEG.formatOptions = FormatOptions.STANDARDBASELINE
	
	if (fileType == "GIF") {
		var myFileNm = myFileNm + ".gif"
		jsSavWebGIF(qual, myFileNm, loc);
	} else if (fileType == "JPG") {
		var myFileNm = myFileNm + ".jpg"
		jsSavWebJPG(qual, myFileNm, loc);
	} else {
		var myFileNm = myFileNm + ".tif"
		jsSavTIF(qual, myFileNm, loc);
	}
}
function exportVisible(fileType, doc, qual, loc, exportOnlyLayerset) {
	var myJPEG = new JPEGSaveOptions();
	myJPEG.quality = 10;
	myJPEG.formatOptions = FormatOptions.STANDARDBASELINE
	
	if (exportOnlyLayerset) {
		doc = activeDocument.layerSets["output"];
	}
	
	var settings = new Array();
	for (var i=0; i<doc.layers.length; i++) {
		settings[i] = doc.layers[i].visible;
		doc.layers[i].visible = false;
	}
	
	for (var i=0; i<doc.layers.length; i++) {
		if (settings[i]) {
			doc.layers[i].visible = true;
			
			if (fileType == "GIF") {
				var myFileNm = doc.layers[i].name + ".gif"
				jsSavWebGIF(qual, myFileNm, loc);
			} else if (fileType == "JPG") {
				var myFileNm = doc.layers[i].name + ".jpg"
				jsSavWebJPG(qual, myFileNm, loc);
			} else {
				var myFileNm = doc.layers[i].name + ".tif"
				jsSavTIF(qual, myFileNm, loc);
			}
			doc.layers[i].visible = false;
		}
	}
	
	for (var i=0; i<doc.layers.length; i++) {
		doc.layers[i].visible = settings[i];
	}
}

function exportVisibleSets(fileType, doc, qual, loc) {
	var myJPEG = new JPEGSaveOptions();
	myJPEG.quality = 10;
	myJPEG.formatOptions = FormatOptions.STANDARDBASELINE
	
	var settings = new Array();
	for (var i=0; i<doc.layerSets.length; i++) {
		settings[i] = doc.layerSets[i].visible;
		doc.layerSets[i].visible = false;
	}
	
	for (var i=0; i<doc.layerSets.length; i++) {
		if (settings[i]) {
			doc.layerSets[i].visible = true;
			
			if (fileType == "GIF") {
				var myFileNm = doc.layerSets[i].name + ".gif"
				jsSavWebGIF(qual, myFileNm, loc);
			} else if (fileType == "JPG") {
				var myFileNm = doc.layerSets[i].name + ".jpg"
				jsSavWebJPG(qual, myFileNm, loc);
			} else {
				var myFileNm = doc.layerSets[i].name + ".tif"
				jsSavTIF(qual, myFileNm, loc);
			}
			
			doc.layerSets[i].visible = false;
		}
	}
	
	for (var i=0; i<doc.layerSets.length; i++) {
		doc.layerSets[i].visible = settings[i];
	}
}

function jsSavTIF(qual, name, loc) {
	//qual is not used iam a lazy artist = bad proggrammer
	var myFile =  new File( loc + name );
	var myTif = new TiffSaveOptions();
	
	myTif.layers = false;
	myTif.formatOptions = FormatOptions.STANDARDBASELINE;
	
	activeDocument.saveAs(myFile, myTif, true);
}

function jsSavWebGIF(qual, name, loc) {
var id97 = charIDToTypeID( "Expr" );
    var desc7 = new ActionDescriptor();
    var id98 = charIDToTypeID( "Usng" );
        var desc8 = new ActionDescriptor();
        var id99 = charIDToTypeID( "Op  " );
        var id100 = charIDToTypeID( "SWOp" );
        var id101 = charIDToTypeID( "OpSa" );
        desc8.putEnumerated( id99, id100, id101 );
        var id102 = charIDToTypeID( "Fmt " );
        var id103 = charIDToTypeID( "IRFm" );
        var id104 = charIDToTypeID( "GIFf" );
        desc8.putEnumerated( id102, id103, id104 );
        var id105 = charIDToTypeID( "Intr" );
        desc8.putBoolean( id105, false );
        var id106 = charIDToTypeID( "RedA" );
        var id107 = charIDToTypeID( "IRRd" );
        var id108 = charIDToTypeID( "Sltv" );
        desc8.putEnumerated( id106, id107, id108 );
        var id109 = charIDToTypeID( "RChT" );
        desc8.putBoolean( id109, false );
        var id110 = charIDToTypeID( "RChV" );
        desc8.putBoolean( id110, false );
        var id111 = charIDToTypeID( "AuRd" );
        desc8.putBoolean( id111, false );
        var id112 = charIDToTypeID( "NCol" );
        desc8.putInteger( id112, qual );
        var id113 = charIDToTypeID( "Dthr" );
        var id114 = charIDToTypeID( "IRDt" );
        var id115 = charIDToTypeID( "Dfsn" );
        desc8.putEnumerated( id113, id114, id115 );
        var id116 = charIDToTypeID( "DthA" );
        desc8.putInteger( id116, 100 );
        var id117 = charIDToTypeID( "DChS" );
        desc8.putInteger( id117, 0 );
        var id118 = charIDToTypeID( "DCUI" );
        desc8.putInteger( id118, 0 );
        var id119 = charIDToTypeID( "DChT" );
        desc8.putBoolean( id119, false );
        var id120 = charIDToTypeID( "DChV" );
        desc8.putBoolean( id120, false );
        var id121 = charIDToTypeID( "WebS" );
        desc8.putInteger( id121, 0 );
        var id122 = charIDToTypeID( "TDth" );
        var id123 = charIDToTypeID( "IRDt" );
        var id124 = charIDToTypeID( "None" );
        desc8.putEnumerated( id122, id123, id124 );
        var id125 = charIDToTypeID( "TDtA" );
        desc8.putInteger( id125, 100 );
        var id126 = charIDToTypeID( "Loss" );
        desc8.putInteger( id126, 0 );
        var id127 = charIDToTypeID( "LChS" );
        desc8.putInteger( id127, 0 );
        var id128 = charIDToTypeID( "LCUI" );
        desc8.putInteger( id128, 100 );
        var id129 = charIDToTypeID( "LChT" );
        desc8.putBoolean( id129, false );
        var id130 = charIDToTypeID( "LChV" );
        desc8.putBoolean( id130, false );
        var id131 = charIDToTypeID( "Trns" );
        desc8.putBoolean( id131, true );
        var id132 = charIDToTypeID( "Mtt " );
        desc8.putBoolean( id132, true );
        var id133 = charIDToTypeID( "MttR" );
        desc8.putInteger( id133, 255 );
        var id134 = charIDToTypeID( "MttG" );
        desc8.putInteger( id134, 255 );
        var id135 = charIDToTypeID( "MttB" );
        desc8.putInteger( id135, 255 );
        var id136 = charIDToTypeID( "SHTM" );
        desc8.putBoolean( id136, false );
        var id137 = charIDToTypeID( "SImg" );
        desc8.putBoolean( id137, true );
        var id138 = charIDToTypeID( "SSSO" );
        desc8.putBoolean( id138, false );
        var id139 = charIDToTypeID( "SSLt" );
        var list3 = new ActionList();
        desc8.putList( id139, list3 );
        var id140 = charIDToTypeID( "DIDr" );
        desc8.putBoolean( id140, false );
        var id141 = charIDToTypeID( "In  " );
        desc8.putPath( id141, new File( loc + name ) );
    var id142 = stringIDToTypeID( "SaveForWeb" );
    desc7.putObject( id98, id142, desc8 );
executeAction( id97, desc7, DialogModes.NO );
}


function jsSavWebJPG(qual, name, loc) {
	var id7 = charIDToTypeID( "Expr" );
		var desc3 = new ActionDescriptor();
		var id8 = charIDToTypeID( "Usng" );
			var desc4 = new ActionDescriptor();
			var id9 = charIDToTypeID( "Op  " );
			var id10 = charIDToTypeID( "SWOp" );
			var id11 = charIDToTypeID( "OpSa" );
			desc4.putEnumerated( id9, id10, id11 );
			var id12 = charIDToTypeID( "Fmt " );
			var id13 = charIDToTypeID( "IRFm" );
			var id14 = charIDToTypeID( "JPEG" );
			desc4.putEnumerated( id12, id13, id14 );
			var id15 = charIDToTypeID( "Intr" );
			desc4.putBoolean( id15, false );
			var id16 = charIDToTypeID( "Qlty" );
			desc4.putInteger( id16, qual );
			var id17 = charIDToTypeID( "QChS" );
			desc4.putInteger( id17, 0 );
			var id18 = charIDToTypeID( "QCUI" );
			desc4.putInteger( id18, 0 );
			var id19 = charIDToTypeID( "QChT" );
			desc4.putBoolean( id19, false );
			var id20 = charIDToTypeID( "QChV" );
			desc4.putBoolean( id20, false );
			var id21 = charIDToTypeID( "Optm" );
			desc4.putBoolean( id21, false );
			var id22 = charIDToTypeID( "Pass" );
			desc4.putInteger( id22, 1 );
			var id23 = charIDToTypeID( "blur" );
			desc4.putDouble( id23, 0.000000 );
			var id24 = charIDToTypeID( "EICC" );
			desc4.putBoolean( id24, false );
			var id25 = charIDToTypeID( "Mtt " );
			desc4.putBoolean( id25, true );
			var id26 = charIDToTypeID( "MttR" );
			desc4.putInteger( id26, 255 );
			var id27 = charIDToTypeID( "MttG" );
			desc4.putInteger( id27, 255 );
			var id28 = charIDToTypeID( "MttB" );
			desc4.putInteger( id28, 255 );
			var id29 = charIDToTypeID( "SHTM" );
			desc4.putBoolean( id29, false );
			var id30 = charIDToTypeID( "SImg" );
			desc4.putBoolean( id30, true );
			var id31 = charIDToTypeID( "SSSO" );
			desc4.putBoolean( id31, false );
			var id32 = charIDToTypeID( "SSLt" );
			var list2 = new ActionList();
			desc4.putList( id32, list2 );
			var id33 = charIDToTypeID( "DIDr" );
			desc4.putBoolean( id33, false );
			var id34 = charIDToTypeID( "In  " );
			desc4.putPath( id34, new File( loc + name ) );
		var id35 = stringIDToTypeID( "SaveForWeb" );
		desc3.putObject( id8, id35, desc4 );
	executeAction( id7, desc3, DialogModes.NO );
}
/*
var jsQual = arguments[0];
var jsFolder = arguments[1];
var jsType = arguments[2];
var jsSets = arguments[3];

if ( documents.length > 0 )
{
	if (jsSets == "Yes") {
		exportVisibleSets(jsType, activeDocument, jsQual, jsFolder);
	} else {
		exportVisible(jsType, activeDocument, jsQual, jsFolder);
	}
}
else
{
	alert( "You must have a document open to export" );
}

alert("script complete");
*/
