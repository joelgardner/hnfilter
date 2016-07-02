function hn_filter(term, removeNonmatching) {
  function _remove(element) {
    var holder = element;
    while (holder.parentElement && !holder.id) holder = holder.parentElement;
    holder.parentElement.removeChild(holder);
  }

  var needle = new RegExp(term, 'i'),
      haystack = document.querySelectorAll('span.comment');
  return Array.prototype.slice.call(haystack).reduce(function(count, post) {
    var index = post.innerHTML.search(needle);
    if (index === -1) return (removeNonmatching && _remove(post)) || count;
    post.innerHTML = [
      post.innerHTML.substring(0, index),
      '<span style="background-color:#03ffe8;">' + term + '</span>',
      post.innerHTML.substring(index + term.length)
    ].join('');
    return ++count;
  }, 0);
}
