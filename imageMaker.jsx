// outputEvLayerFront - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS3, or higher
// Description: Creates a new test image within a random range.
// Version: 0.2.0
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
#include "makeGuide.jsx"
#include "makeGradient.js"

app.bringToFront();

var xwid = Math.ceil(Math.random()*100)+557;
var xhgt = Math.ceil(Math.random()*100)+324;

var docRef = app.documents.add( xwid, xhgt);

makeGuide("X", Math.floor(xwid/2));
makeGuide("Y", Math.floor(xhgt/2));

makeGradient(10, 10, (xwid-10), (xhgt-10));

var colorRef = new RGBColor();
colorRef.red = 255;
colorRef.green = 255;
colorRef.blue = 255;
var mSolidC = new SolidColor();
mSolidC.rgb = colorRef;


var nTextLayer = activeDocument.artLayers.add();
nTextLayer.kind = LayerKind.TEXT;

nTextLayer.textItem.font = "MyriadPro-Cond";
nTextLayer.textItem.size = 30;
nTextLayer.textItem.color = mSolidC;
nTextLayer.textItem.justification = Justification.CENTER;
nTextLayer.textItem.position = [Math.floor(xwid/2)+" px", Math.floor(xhgt/2)+" px"];
//nTextLayer.textItem.position[1] = 100;

nTextLayer.textItem.contents = "Test-Image";

