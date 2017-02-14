import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const source1$ = Rx.Observable
  .interval(1000)
  .map(t => `Source 1: ${t+1}`);

const source2$ = Rx.Observable
  .interval(3000)
  .map(t => `Source 2: ${t+1}`);

const mergedSource$ = Rx.Observable.merge(source1$, source2$);

mergedSource$
  .take(40)
  .subscribe(value => {
    $('#result').append(`<div>${value}</div>`);
  })