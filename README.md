# Sioux UISwitch

## Overview

The `UISwitch` class lets you create On/Off buttons, similar to [the iOS one](http://developer.apple.com/library/ios/#documentation/uikit/reference/UISwitch_Class/Reference/Reference.html). [demo](http://felix.lovassy.hu/projects/gellert/sioux/switchexample/)

#### Inheriths from:
- sioux-ui


javascript:
``` js
var UISwitch = require('sioux-ui-switch');
var uiswitch = new UISwitch(document.querySelector('.container'));
// document.querySelector('.container') is the element in which the switch will be appended

uiswitch
.on('tap', function (event) {
  console.log('Tapped!');
})
.on('change', function (event, state) {
  console.log('State: ' + state);
})
;
```

## Properties
#### state
- _Boolean_
- the state of the switch

## Methods
#### setState(state)
Sets the switch to the passed in `state` (_Boolean_).

## Events
#### 'change'
Fires when the switch changed state (when the CSS transition ends);