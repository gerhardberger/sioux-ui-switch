var inherits = require('inherits');
var UI = require('sioux-ui');
var insertCss = require('insert-css');
var fs = require('fs');

var html = fs.readFileSync(__dirname + '/struct.html');
var css = fs.readFileSync(__dirname + '/style.css');
insertCss(css);

function UISwitch (element) {
	var self = this;

	element.innerHTML += html;

	self.element = element.querySelector('.switch');
	self._moveStartTouch = { pageX: undefined, pageY: undefined };
	self.state = false;

	self.spawnEvents();
	self.TAP_BOUND_X = 1;
	self.TAP_BOUND_Y = 15;

	var wrapper = self.element.querySelector('.wrapper');
	var switchWidth = self.element.clientWidth;
	var circleWidth = wrapper.querySelector('.circle').clientWidth;

	self.on('touchstart', function (event) {
		self.element.classList.add('active');
		self._moveStartTouch.pageX = event.changedTouches[0].pageX;
		self._moveStartTouch.pageY = event.changedTouches[0].pageY;
	});

	self.on('touchmove', function (event) {
		if (!self._moveStartTouch.pageX && !self._moveStartTouch.pageY) return;

		var x = event.changedTouches[0].pageX - self._moveStartTouch.pageX;
		self._moveStartTouch.pageX = event.changedTouches[0].pageX;

		var translate = wrapper.getAttribute('style');

		if (!translate) translate = 'translateX(-40px)';

		var n = parseInt(translate.match(/\(.*\)/g)[0].slice(1,-1), 10);

		if (n + x >= circleWidth - switchWidth && n + x <= 0)
			wrapper.setAttribute('style', '-webkit-transform: translateX(' + (n + x) + 'px);');

	});

	self.on('touchend', function (event) {
		self.element.classList.remove('active');
		if (!self._moveStartTouch.pageX && !self._moveStartTouch.pageY) return;
		
		var translate = wrapper.getAttribute('style');
		if (!translate) return;

		var n = parseInt(translate.match(/\(.*\)/g)[0].slice(1,-1), 10);

		//if (!(n === 0 || n === (circleWidth - switchWidth)))

		self.setState(n + (switchWidth - circleWidth) > (switchWidth - circleWidth) / 2);
	});

	self.on('tap', function (event) {
		self.setState(!self.state);
	});

	/*self.on('touchleave', function (event) {
		self._moveStartTouch.pageX = undefined;
		self._moveStartTouch.pageY = undefined;
	});*/

}

inherits(UISwitch, UI);


UISwitch.prototype.setState = function (state) {
	var self = this;
	var wrapper = self.element.querySelector('.wrapper');
	var switchWidth = self.element.clientWidth;
	var circleWidth = wrapper.querySelector('.circle').clientWidth;
	wrapper.setAttribute('style', '-webkit-transition: -webkit-transform .1s linear; -webkit-transform: translateX(' + (state ? 0 : circleWidth - switchWidth) + 'px);');
	var transitionEndHandler = function (event) {
		if (state !== self.state) {
			self.state = state;
			self.emit('change', event, self.state);
		}
		wrapper.removeEventListener('webkitTransitionEnd', transitionEndHandler);
	};
	wrapper.addEventListener('webkitTransitionEnd', transitionEndHandler, false);
};

module.exports = UISwitch;