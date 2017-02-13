import $ from 'jquery';
import Rx from 'rx-dom';

console.log("App started");

Rx.DOM.ready()
  .subscribe(v => console.log("DOM ready"));

$("#head").html("It works!");

