object-path-wild
==================

Access subtree elements using keypath, with wildcard ('\*') support.

## Introduction
BFS search through the object tree. Nothing special, utterly stupid and inefficient, but works.

## Usage
### Typical
Wildcard ('\*') will select all that is possible, regardless of array/object.
````javascript
'use strict';
const lookup = require('object-path-wild');
const obj = {
  a: { b: { c: { d: { e: [
    { f: { g: { h: { i: { j: 'This'}}}}},
    { f: { g: { h: { i: { j: 'is'}}}}},
    { f: { g: { h: { i: { j: 'mad'}}}}},
    { f: { g: { h: { i: { j: 'deep'}}}}}
  ]}}}};
};

lookup(obj, 'a.b.c.d.e.*.f.g.h.i.j');
// ['This', 'is', 'mad', 'deep'];
````

### Asymmetric subtrees (more realistic maybe)
Any key/idx that is not present along the subtree will be omitted.
````javascript
const obj = {
  a: { b: { c: { d: { e: [
    { f: { g: { h: { i: { j: 'Hello!'}}}}},
    { f: { g: { h: 1 }}},
    { f: { g: { h: 2 }}},
    { f: { g: { h: 3 }}}
  ]}}}};
};

lookup(obj, 'a.b.c.d.e.*.f.g.h.i.j');
// ['Hello!']
````
