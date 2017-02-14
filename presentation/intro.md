# Reactive Programming Introduction

---

## What's so good about Node.js?

* Asynchronous event-driven     <!-- .element: class="fragment" -->
* Non-blocking I/O              <!-- .element: class="fragment" -->
* Better concurrency handling   <!-- .element: class="fragment" -->

---

## What's the catch?

* Callback hell                       <!-- .element: class="fragment" -->
* Events force side-effects           <!-- .element: class="fragment" -->
* Events are not first-class values   <!-- .element: class="fragment" -->

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

## A problem to solve

Log only the first 10 clicks on the right half of the browser window.

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
      clicks = 0;
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

## Thinking Reactively

> Your mouse is a database

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

## The reactive way


---

## Create observables



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
