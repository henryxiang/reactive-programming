import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const click$ = Rx.Observable.fromEvent($('#btn1'), 'click');

const multiClick$ = click$
    .bufferWhen(() => click$.debounceTime(250))
    .map(clicks => clicks.length);

multiClick$.subscribe(c => {
  const clicks = c == 1 ? `${c} click` : `${c} clicks`;
  $('#result').html(clicks);
});

