import $ from 'jquery';
// import Rx from 'rx-dom';
import Rx from 'rxjs/Rx';

const source$ = new Rx.Observable(observer => {
  console.log("Created an observable");

  // send some data
  observer.next("hello world");
  observer.next([1,2,3,4,5]);
  observer.next({id: 12, name: "Bruce Wayne"});

  // throw an error
  observer.error(new Error("Error: panic!"));

  // completed
  observer.complete();

});


source$
  .catch(err => Rx.Observable.of(err))
  .subscribe(
    value => {
      console.log(value);
    },
    error => {
      console.log(error);
    },
    () => {
      console.log("completed");
    }
  );