import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const data = [1,2,'a',3,'b',4,'c',6,7,8];

const data$ = Rx.Observable.from(data);

const filteredData$ = 
    data$.filter(d => !isNaN(d))
        .filter(d => d%2 === 0);

filteredData$.subscribe(
  d => {console.log(d)},
  err => {},
  () => {console.log("completed")}
);

filteredData$.reduce((s, d) => s+d)
    .subscribe(sum => {
      $('#result').html(`<b>Sum = ${sum}</b>`);
    });
