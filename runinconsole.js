/**
First, copy the `hn_filter` function your browser's console to perform searches:
`hn_filter(['remote'], ['react', 'javascript'], true)`
which is equivalent to `contains('remote') && (contains('react') || contains('javascript'))`
**/

function hn_filter(/* terms1, terms2, ..., termsN, removeMisses */) {
  var termSets = Array.prototype.slice.call(arguments),
      removeMisses = typeof(termSets[termSets.length - 1]) === 'boolean' ? termSets.pop() : false,
      haystack = document.querySelectorAll('span.comment');
  return Array.prototype.slice.call(haystack).filter(function(post) {
    var hit = termSets.reduce(function(result, terms) {
      return terms.reduce(function(result, term) {
        var needle = new RegExp(term, 'gi');
        var index = post.innerHTML.search(new RegExp(term, 'i'));
        if (index === -1) return result;
        post.innerHTML = [
          post.innerHTML.substring(0, index),
          '<span style="background-color:#03ffe8;">' + term + '</span>',
          post.innerHTML.substring(index + term.length)
        ].join('');
        return true;
      }, false) && result;
    }, true);
    if (!hit && removeMisses) _remove(post);
    return hit;
  }).length;

  function _remove(element) {
    var holder = element;
    while (holder.parentElement && !holder.id) holder = holder.parentElement;
    holder.parentElement.removeChild(holder);
  }
}


