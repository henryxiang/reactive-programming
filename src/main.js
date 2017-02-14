import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const inputText$ = Rx.Observable
  .fromEvent($('#txt'), 'keyup')
  .pluck('target', 'value');

inputText$.subscribe(text => {
  $('#result').html(text);
});
