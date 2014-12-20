/**
 * UX Rocket
 * Keyboard Command
 * For preventing overwriting default commands, only commands 
 * defined with alt least two of ALT, CTRL, SHIFT keys
 * @author Bilal Cinarli
 */

(function(window, document) {
    var _settings = {
        keymap: {
            "keys"    : {
                "0": 48,
                "1": 49,
                "2": 50,
                "3": 51,
                "4": 52,
                "5": 53,
                "6": 54,
                "7": 55,
                "8": 56,
                "9": 57,
                "A": 1,
                "B": 2,
                "C": 3,
                "D": 4,
                "E": 5,
                "F": 6,
                "G": 7,
                "H": 8,
                "I": 9,
                "J": 10,
                "K": 11,
                "L": 12,
                "M": 13,
                "N": 14,
                "O": 15,
                "P": 16,
                "Q": 17,
                "R": 18,
                "S": 19,
                "T": 20,
                "U": 21,
                "V": 22,
                "W": 23,
                "X": 24,
                "Y": 25,
                "Z": 26
            },
            "keys_alt": {
                "0": 248,
                "1": 183,
                "2": 8364,
                "3": 169,
                "4": 8218,
                "5": 730,
                "6": 729,
                "7": 8225,
                "8": 176,
                "9": 216,
                "A": 198,
                "B": 223,
                "C": 199,
                "D": 206,
                "E": 8240,
                "F": 207,
                "G": 286,
                "H": 211,
                "I": 304,
                "J": 212,
                "K": 63743,
                "L": 210,
                "M": 732,
                "N": 710,
                "O": 214,
                "P": 8719,
                "Q": 338,
                "R": 194,
                "S": 350,
                "T": 202,
                "U": 220,
                "V": 9674,
                "W": 8222,
                "X": 217,
                "Y": 193,
                "Z": 219
            }
        },

        commands: {
            "ACS": {},
            "AC" : {},
            "AS" : {},
            "CS" : {}
        },

        commandType: function(keys) {
            var codeStack = '';

            if(keys.indexOf('ALT') != -1) {
                codeStack += 'A';
            }

            if(keys.indexOf('CTRL') != -1) {
                codeStack += 'C';
            }

            if(keys.indexOf('SHIFT') != -1) {
                codeStack += 'S';
            }

            return codeStack;
        }
    };

    var _this = {
		version: "0.2.0",
				
        addCommand: function(keys, callback) {
            var keyStack = keys.split(' '),
                commandType = _settings.commandType(keys);

            if(commandType == 'AS'){
            	_settings.commands[commandType][_settings.keymap.keys_alt[keyStack[keyStack.length - 1]]] = callback; 
				return;         
            }
			
			_settings.commands[commandType][_settings.keymap.keys[keyStack[keyStack.length - 1]]] = callback;
        },

        removeCommand: function(keys) {
            return _this.addCommand(keys, function(){});
        },

        checkCommand: function(e) {
            var commandType = false,
                callback_fn = false;

            if(e.altKey === true && e.ctrlKey === true && e.shiftKey === true) {
                commandType = 'ACS';
            }

            else if(e.altKey === true && e.ctrlKey === true) {
                commandType = 'AC';
            }

            else if(e.altKey === true && e.shiftKey === true) {
                commandType = 'AS';
            }

            else if(e.ctrlKey === true && e.shiftKey === true) {
                commandType = 'CS';
            }

            if(commandType && typeof _settings.commands[commandType][e.keyCode] != 'undefined') {
                callback_fn = _settings.commands[commandType][e.keyCode];
            }

            if(callback_fn) {
                _this.callback(callback_fn);
            }
        },

        callback: function(fn) {
            // if callback string is function call it directly
            if(typeof fn === 'function') {
                fn.apply(this);
            }

            // if callback defined via string, call it via new Function
            else {
                if(fn !== false) {
                    var func = new Function('return ' + fn);
                    func();
                }
            }
        },

        start: function(event) {
            event = event || 'keypress';

            if(document.addEventListener){
                document.addEventListener(event, _this.checkCommand);

                return;
            }

            document.attachEvent('on' + event, _this.checkCommand);
        }
    };

    window.uxshortcode = _this;	
	
	if (typeof define === 'function' && define.amd) {
		define(uxshortcode);
	}
	
	// jQuery registry for UX Rocket
	if(typeof jQuery === 'function'){
		jQuery.uxshortcode = window.uxshortcode;
	}
}(window, document));

uxshortcode.start();