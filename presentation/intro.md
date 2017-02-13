# Reactive Programming Introduction

---

## A Story

####Life as a programmer <!-- .element: class="fragment" -->

- Writing some code ... <!-- .element: class="fragment" -->
- Fixing some bugs ... <!-- .element: class="fragment" -->
- By writing more code! <!-- .element: class="fragment" -->

---

## Why program fails

Is 99.99% good enough?

* 100 lines -> 99% <!-- .element: class="fragment" -->
* 1,000 lines -> 90% <!-- .element: class="fragment" -->
* 10,000 lines -> 37% <!-- .element: class="fragment" -->
* 100,000 lines -> 0.005% <!-- .element: class="fragment" -->

---

## How to be a good programmer

* Write less code <!-- .element: class="fragment" -->
* Write better code <!-- .element: class="fragment" -->
* Write testable code <!-- .element: class="fragment" -->

---

## Be functional

* First class function (pure function) <!-- .element: class="fragment" -->
* High-order function <!-- .element: class="fragment" -->
* Immutability <!-- .element: class="fragment" -->
* Higher level of abstraction <!-- .element: class="fragment" -->

---

## Example 1

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

---

## Example 2

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

---