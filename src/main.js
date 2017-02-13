import $ from 'jquery';
import Rx from 'rxjs/Rx';

console.log("App started");

Rx.Observable.of(1,2,3)
  .subscribe(v => console.log(v));

$("#head").html("It works!");

