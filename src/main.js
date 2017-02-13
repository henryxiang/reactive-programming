import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove');

mouseMove$.subscribe(e => {
  const coordinate = `X: ${e.clientX}, Y: ${e.clientY}`
  $('#result').html(coordinate);
});

