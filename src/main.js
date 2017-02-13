import $ from 'jquery';
import Rx from 'rx-dom';

const righSideClick$ = Rx.Observable
    .fromEvent(document, 'click')
    .filter(c => c.clientX > window.innerWidth/2)
    .take(10);

righSideClick$.subscribe(c => {console.log(c.clientX + ", " + c.clientY)});
