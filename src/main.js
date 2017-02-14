import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';


const httpResponse$ = Rx.Observable
  .ajax('https://api.github.com/users/ReactiveX')
  .map(e => e.response);  

httpResponse$.subscribe(response => {
  const outputJson = JSON.stringify(response, null, 2);
  $('#result').html(`<pre>${outputJson}</pre>`)
});