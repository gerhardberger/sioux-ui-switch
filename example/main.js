var UISwitch = require('../index.js');
var uiswitch = new UISwitch(document.querySelector('.screen'));
window.uiswitch = uiswitch;
uiswitch
.on('tap', function (event) {
	console.log('Tapped!');
})
.on('change', function (event, state) {
	console.log('State: ' + state);
})
;