---
title: RP Presentation
---

# Reactive Programming Introduction

---

## A story

> Life of a programmer

* I'm debugging ...              <!-- .element: class="fragment" -->
* Because I wrote some code ...  <!-- .element: class="fragment" -->
* How do I fix the bugs?          <!-- .element: class="fragment" -->
* By writing more code!!         <!-- .element: class="fragment" -->

---

## What's so good about Node.js?

* Asynchronous event-driven     <!-- .element: class="fragment" -->
* Non-blocking I/O              <!-- .element: class="fragment" -->
* Just-in-time processing       <!-- .element: class="fragment" -->
* High-throughput concurrency   <!-- .element: class="fragment" -->

---

## Sync or Async

```
user do an action
       │
       v
 application start processing action
   └──> make database request
          └──> do nothing until request completes
 request complete
   └──> send result to user

```
----

```
request ──> make database request
request ──> make database request
request ──> make database request
database request complete ──> send response
database request complete ──> send response
database request complete ──> send response
```

---

## What's the catch?

* Callback hell                       <!-- .element: class="fragment" -->
* Events force side-effects           <!-- .element: class="fragment" -->
* Events are not first-class values   <!-- .element: class="fragment" -->
* Hard to synchronize events          <!-- .element: class="fragment" -->

---

## ReactiveX

![](rx-logo.png)

> "ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming."

---

## What's so good about Rx
![](rx-benefits.png)

---

## Be functional

* First class function (pure function)
* High-order function
* Immutability
* Higher level of abstraction

---

## Example 1

The reduce() function

```Java
int sum(List<Integer> input) {
  int result = 0;
  for (int i : input) {
    result += i;
  }
  return result;
}
```
----

```JavaScript
sum = input.reduce((s, i) => s+i)
```

Note: reduce() is a high-order function and it is a pure function

---

## Example 2

The map() function

```Java
int sum(List<Integer> input) {
  int result = 0;
  for (int i : input) {
    result += i*i;
  }
  return result;
}
```
----

```JavaScript
sum = input
      .map(i => i*i)
      .reduce((s, i) => s+i)
```

---

## Example 3

The filter() function

```Java
int sum(List<Integer> input) {
  int result = 0;
  for (int i : input) {
    if (i%2 == 0)
      result += i*i;
  }
  return result;
}
```
----

```JavaScript
sum = input
      .filter(i => i%2 == 0)
      .map(i => i*i)
      .reduce((s, i) => s+i)
```

Note: pure functions are composable

---

## Two design patterns

* Iterator Pattern
* Observer Pattern

---

## The Iterator Pattern
<img src="iterator-pattern.png" style="background-color: white" />

---

## Iterator in action

```Java
// create an Iterator from List
Iterator<String> nameIterator = nameList.iterator();

while(nameIterator.hasNext()) {
  System.out.println(nameIterator.next());
}
```

---

## The Observer Pattern
<img src="observer-pattern.jpg" />

---

## Observer in action

```JavaScript
button1.onclick(function(event) {

  console.log(event.target);

  // actions taken on event

});
```

---

## Observable

> The only Rx data structure you need

* Observable emits values in order (like an iterator)
* Observable "pushes" values to subscriber (observer)
* Observables can be copied, transformed and queried (like SQL)
* Observables are "lazy"
* Everything is observable

---

## A problem to consider

Capture the first 10 clicks on the right half of the browser window.

---

## Solutions

```
var​ clicks = 0;​ 
document.addEventListener(​'click'​, 
  function​ registerClicks(e) {​  
    ​if​ (clicks < 10) {​
      if​ (e.clientX > window.innerWidth/2) {​
        console.log(e.clientX, e.clientY);​       
        clicks += 1;​     
      }​   
    } ​else​ {​
      document.removeEventListener(​'click'​, registerClicks);​
    }​ 
});
```
----

```JavaScript
Rx.Observable
  .fromEvent(document, ​'click'​)
​  .filter(​c => c.clientX > window.innerWidth/2)
​  .take(10)
​  .subscribe(​c => console.log(c.clientX, c.clientY))
```

---

## Thinking reactively

> "Your mouse is a database"

```JavaScript
Rx.Observable
  .fromEvent(document, ​'click'​)
​  .filter(​c => c.clientX > window.innerWidth/2)
​  .take(10)
​  .subscribe(​c => console.log(c.clientX, c.clientY))
```
----

```SQL
SELECT​ x, y ​FROM​ clicks ​
WHERE x > window_width/2
LIMIT​ 10
```

---

## Create observables

```
const source$ = new Rx.Observable(observer => {

  // send some data
  observer.next("hello world");
  observer.next([1,2,3,4,5]);
  observer.next({id: 12, name: "Bruce Wayne"});

  // throw an error
  observer.error(new Error("Error: panic!"));

  // completed
  observer.complete();

});
```

---

<!-- .slide: data-transition="fade-in fade-out" -->
## Subscribe to observables

```
const source$ = new Rx.Observable(observer) => {
  // implemention omitted
});

source$
  //optional error catcher
  .catch(err => Rx.Observable.of(err))
  .subscribe(
    data => { console.log(data); },
    // optional error handler
    error => { console.log(error); },
    // optional completion handler
    () => { console.log("completed"); }
  );
```

---

<!-- .slide: data-transition="fade-in fade-out" -->
## Subscribe to observables

```
const source$ = new Rx.Observable(observer) => {
  // implemention omitted
});

source$.subscribe(data => { 
  console.log(data);
});

```

---

## Create observables from other data structures

```
// From a collection or iterator
const value$ = Rx.Observable.from([1,2,4,5,6,7,8,9]);

// From a DOM event
const input$ = Rx.Observable.fromEvent(textInput, 'keyup');

// From a XHR
const request$ = Rx.Observable.ajax(url);

// From a Promise
const promise = new Promise((resolve, reject) => {
  resolve(42);
});
const source$ = Rx.Observable.fromPromise(promise);
```

---

## Operations on observables

* Transforming: map, buffer, switchMap
* Combining: merge, concat, zip, join
* Filtering: debounce, filter, skip, take, distinct
* Creating: timer, interval, range
* Conditional: all, skipUntil, takeUntil
* Math: count, max, min, sum, reduce

[Rx Operators Documentation](http://reactivex.io/documentation/operators.html)

---

## Map
<img src="map.png" style="background-color:white;" />

---

## Filter
<img src="filter.png" style="background-color:white;" />

---

## Merge
<img src="merge.png" style="background-color:white;" />

---

## Concat
<img src="concat.png" style="background-color:white;" />

---

## Debounce
<img src="debounce.png" style="background-color:white;" />

---

## Buffer
<img src="buffer.png" style="background-color:white;" />

---

## Zip
<img src="zip.png" style="background-color:white;" />

---

## switchMap (flatMap)
<img src="flatmap.png" style="background-color:white;" />

---

> <small>To a curious observer, everything is observable.</small>

<img src="curious-observer.png" />