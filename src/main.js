import $ from 'jquery';
import Rx from 'rx-dom';

console.log("App started");

Rx.DOM.ready()
  .subscribe(v => console.log("DOM ready"));

Rx.Observable.of(1,2,3)
  .subscribe(v => console.log(v));


$("#head").html("It works!");

