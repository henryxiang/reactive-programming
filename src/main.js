import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const search$ = Rx.Observable
  .fromEvent($('#search'), 'keyup')
  .pluck('target', 'value');

const getUserInfo = (userId) => {
  const request$ = Rx.Observable.ajax('https://api.github.com/users/' + userId);
  return request$.map(e => e.response);     
}

const searchUser$ =
  search$
    .filter(text => text.length > 0) // only get the non-empty text
    .switchMap(userId => getUserInfo(userId))

searchUser$
  .subscribe(response => {
    // console.log(response);
    const outputJson = JSON.stringify(response, null, 2);
    $('#result').html(`<pre>${outputJson}</pre>`);
  });

search$
  .subscribe(text => {
    if (text.length == 0)
      $('#result').html('');
  })