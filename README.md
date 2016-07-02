----
## A simple script to filter results on HackerNews' Who is Hiring threads

### Search/filter HackerNews Who is Hiring results and highlight search terms.
####Inspired by [kristopolous's](https://news.ycombinator.com/item?id=10313519) awesome script that I had trouble getting working (I suspect a markup change in HN is the culprit).

#### Input the following function into your browser console:
```js
function hn_filter(/* terms1, terms2, ..., termsN, removeMisses */) {
  var termSets = Array.prototype.slice.call(arguments),
      removeMisses = typeof(termSets[termSets.length - 1]) === 'boolean' ? termSets.pop() : false,
      haystack = document.querySelectorAll('span.comment');
  return Array.prototype.slice.call(haystack).filter(function(post) {
    var hit = termSets.reduce(function(result, terms) {
      return terms.reduce(function(result, term) {
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
```

#### Then, in your browser console, use the function:

    $ hn_filter(['remote'], ['react', 'javascript'], true)
    > 35


Here, we're searching for posts matching containing `remote` and one of `react` or `javascript`.  We're also passing `true` as the last argument.  This will remove any posts that do not match the search criteria.  The call is equivalent to:

    contains('remote') && (contains('react') || contains('javascript'))

I.e., search terms are `OR`ed within an argument array; and `AND`ed across argument arrays.

The result, 35, is the number the posts in the thread of matching the criteria.

We can simply not pass a boolean as the last argument, or pass `false`, to avoid removing non-matching posts from the thread.
