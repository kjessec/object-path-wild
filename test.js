/* eslint id-length: 0 */
'use strict';
const lookup = require('../');
const test = require('tape');

test('object+array', function(t) {
  t.plan(1);
  const obj = {
    a: {
      b: {
        c: {
          d: [
            {
              e: {
                f: {
                  g: {
                    h: {
                      i: 'wheew!'
                    }
                  }
                }
              }
            },
            {
              e: {
                f: {
                  g: {
                    h: {
                      i: 'wheew!'
                    }
                  }
                }
              }
            },
            {
              e: {
                f: {
                  g: {
                    h: {
                      i: 'wheew!'
                    }
                  }
                }
              }
            },
          ]
        }
      }
    }
  };

  t.deepEqual(
    lookup(obj, 'a.b.c.d.*.e.f.g.h.i'),
    ['wheew!', 'wheew!', 'wheew!'],
    'even if the tree path split because of an array, it still should work'
  );
});

test('array', function(t) {
  t.plan(2);
  const obj = [
    [
      [
        [
          [
            [
              [
                [
                  1
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ];

  t.deepEqual(
    lookup(obj, '0.0.0.0.0.0.0.0'),
    [1],
    'all array index'
  );
  t.deepEqual(
    lookup(obj, '*.*.*.*.*.*.*.*'),
    [1],
    'all array wildcard'
  );
});

test('dropping non-existent keys', function(t) {
  t.plan(1);
  const obj = [
    {
      a: {
        b: {
          c: [
            {
              target: 'hehe!'
            },
          ],
          d: [
            {
              target: 'haha!'
            }
          ]
        }
      }
    },
    {
      a: {
        b: {
          c: [
            {
              target: 'hehe!'
            },
          ],
          d: [
            {
              target: 'haha!'
            }
          ]
        }
      }
    },
    {
      a: {
        b: {
          c: [
            {
              target: 'hehe!',
              something: {
                special: true
              }
            },
          ],
          d: [
            {
              target: 'haha!'
            }
          ]
        }
      }
    }
  ];

  t.deepEqual(
    lookup(obj, '*.a.b.c.*.something.special'),
    [true],
    'if a key is not found in lookalike object/arrays, drop them'
  );
});
