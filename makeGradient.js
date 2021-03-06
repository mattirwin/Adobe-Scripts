//Makes a b&w gradent from the coordinates provided
function makeGradient(sx, sy, ex, ey) {
	var id18 = charIDToTypeID( "Grdn" );
		var desc3 = new ActionDescriptor();
		var id19 = charIDToTypeID( "From" );
			var desc4 = new ActionDescriptor();
			var id20 = charIDToTypeID( "Hrzn" );
			var id21 = charIDToTypeID( "#Pxl" );
			desc4.putUnitDouble( id20, id21, sx );
			var id22 = charIDToTypeID( "Vrtc" );
			var id23 = charIDToTypeID( "#Pxl" );
			desc4.putUnitDouble( id22, id23, sy );
		var id24 = charIDToTypeID( "Pnt " );
		desc3.putObject( id19, id24, desc4 );
		var id25 = charIDToTypeID( "T   " );
			var desc5 = new ActionDescriptor();
			var id26 = charIDToTypeID( "Hrzn" );
			var id27 = charIDToTypeID( "#Pxl" );
			desc5.putUnitDouble( id26, id27, ex );
			var id28 = charIDToTypeID( "Vrtc" );
			var id29 = charIDToTypeID( "#Pxl" );
			desc5.putUnitDouble( id28, id29, ey );
		var id30 = charIDToTypeID( "Pnt " );
		desc3.putObject( id25, id30, desc5 );
		var id31 = charIDToTypeID( "Type" );
		var id32 = charIDToTypeID( "GrdT" );
		var id33 = charIDToTypeID( "Lnr " );
		desc3.putEnumerated( id31, id32, id33 );
		var id34 = charIDToTypeID( "Dthr" );
		desc3.putBoolean( id34, true );
		var id35 = charIDToTypeID( "UsMs" );
		desc3.putBoolean( id35, true );
		var id36 = charIDToTypeID( "Grad" );
			var desc6 = new ActionDescriptor();
			var id37 = charIDToTypeID( "Nm  " );
			desc6.putString( id37, "Black, White" );
			var id38 = charIDToTypeID( "GrdF" );
			var id39 = charIDToTypeID( "GrdF" );
			var id40 = charIDToTypeID( "CstS" );
			desc6.putEnumerated( id38, id39, id40 );
			var id41 = charIDToTypeID( "Intr" );
			desc6.putDouble( id41, 4096.000000 );
			var id42 = charIDToTypeID( "Clrs" );
				var list1 = new ActionList();
					var desc7 = new ActionDescriptor();
					var id43 = charIDToTypeID( "Clr " );
						var desc8 = new ActionDescriptor();
						var id44 = charIDToTypeID( "Rd  " );
						desc8.putDouble( id44, 0.000000 );
						var id45 = charIDToTypeID( "Grn " );
						desc8.putDouble( id45, 0.001358 );
						var id46 = charIDToTypeID( "Bl  " );
						desc8.putDouble( id46, 0.057031 );
					var id47 = charIDToTypeID( "RGBC" );
					desc7.putObject( id43, id47, desc8 );
					var id48 = charIDToTypeID( "Type" );
					var id49 = charIDToTypeID( "Clry" );
					var id50 = charIDToTypeID( "UsrS" );
					desc7.putEnumerated( id48, id49, id50 );
					var id51 = charIDToTypeID( "Lctn" );
					desc7.putInteger( id51, 0 );
					var id52 = charIDToTypeID( "Mdpn" );
					desc7.putInteger( id52, 50 );
				var id53 = charIDToTypeID( "Clrt" );
				list1.putObject( id53, desc7 );
					var desc9 = new ActionDescriptor();
					var id54 = charIDToTypeID( "Clr " );
						var desc10 = new ActionDescriptor();
						var id55 = charIDToTypeID( "Rd  " );
						desc10.putDouble( id55, 254.999970 );
						var id56 = charIDToTypeID( "Grn " );
						desc10.putDouble( id56, 254.999985 );
						var id57 = charIDToTypeID( "Bl  " );
						desc10.putDouble( id57, 254.999985 );
					var id58 = charIDToTypeID( "RGBC" );
					desc9.putObject( id54, id58, desc10 );
					var id59 = charIDToTypeID( "Type" );
					var id60 = charIDToTypeID( "Clry" );
					var id61 = charIDToTypeID( "UsrS" );
					desc9.putEnumerated( id59, id60, id61 );
					var id62 = charIDToTypeID( "Lctn" );
					desc9.putInteger( id62, 4096 );
					var id63 = charIDToTypeID( "Mdpn" );
					desc9.putInteger( id63, 50 );
				var id64 = charIDToTypeID( "Clrt" );
				list1.putObject( id64, desc9 );
			desc6.putList( id42, list1 );
			var id65 = charIDToTypeID( "Trns" );
				var list2 = new ActionList();
					var desc11 = new ActionDescriptor();
					var id66 = charIDToTypeID( "Opct" );
					var id67 = charIDToTypeID( "#Prc" );
					desc11.putUnitDouble( id66, id67, 100.000000 );
					var id68 = charIDToTypeID( "Lctn" );
					desc11.putInteger( id68, 0 );
					var id69 = charIDToTypeID( "Mdpn" );
					desc11.putInteger( id69, 50 );
				var id70 = charIDToTypeID( "TrnS" );
				list2.putObject( id70, desc11 );
					var desc12 = new ActionDescriptor();
					var id71 = charIDToTypeID( "Opct" );
					var id72 = charIDToTypeID( "#Prc" );
					desc12.putUnitDouble( id71, id72, 100.000000 );
					var id73 = charIDToTypeID( "Lctn" );
					desc12.putInteger( id73, 4096 );
					var id74 = charIDToTypeID( "Mdpn" );
					desc12.putInteger( id74, 50 );
				var id75 = charIDToTypeID( "TrnS" );
				list2.putObject( id75, desc12 );
			desc6.putList( id65, list2 );
		var id76 = charIDToTypeID( "Grdn" );
		desc3.putObject( id36, id76, desc6 );
	executeAction( id18, desc3, DialogModes.NO );
}