( function() {
"use strict";

var name = "Bob";
var time = "today";
var test = `Hello ${name}, how are you ${time}?`;

class MyClass {
	constructor( test ) {
		console.log( test );

		let arTest = Array();
		arTest = [ "oneone", "twotow", "threethree" ];

		for ( let x of arTest ) {
			console.log( x );
		}
	}
}

let classTest = new MyClass( "hi" );

} )();
