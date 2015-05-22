'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var YutaiApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    YutaiApp = require('components/YutaiApp.js');
    component = React.createElement(YutaiApp);
  });

  it('should create a new instance of YutaiApp', function () {
    expect(component).toBeDefined();
  });
});
