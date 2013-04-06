var UISwitch = require('../index.js');
var uiswitch = new UISwitch(document.querySelector('.switch'));

uiswitch
.on('tap', function (event) {
	console.log('Tapped!');
})
.on('change', function (event, state) {
	console.log('State: ' + state);
})
;