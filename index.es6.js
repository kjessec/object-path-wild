'use strict';
function opw(src, keypath) {
  const path = keypath.split(opw.delimiter);
  const res = path.reduce(function(candidates, key) {
    if(!key.length) {
      throw new Error('Path cannot be empty.');
    }

    const newCandidates = [];
    candidates.map(function(candidate) {
      if(key === '*') {
        if(Array.isArray(candidate)) {
          candidate.map(function(entry) {
            newCandidates.push(entry);
          });
        }

        else if(typeof candidate === 'object') {
          Object.keys(candidate).map(function(candidateName) {
            newCandidates.push(candidate[candidateName]);
          });
        }

        return;
      }

      const entry = candidate[key];
      if(typeof entry !== 'undefined') {
        newCandidates.push(entry);
      }
    });
    return newCandidates;
  }, [src]);

  return res;
}

opw.delimiter = '.';

module.exports = opw;
