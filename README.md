----
# A simple script to filter results on HackerNews' Who is Hiring threads

#### Input the following function into your browser console:

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

#### Then, in your browser console, use the function:

    $ [hn_filter('remote', true), hn_filter('javascript'), hn_filter('react')]
    > [104, 21, 20]


Here, we're running the function three times.  In the first call, we're passing `true` as a second argument.  This will remove posts that do not contain the term.  In the last two calls, we do not remove posts that don't match.  The statement is equivalent to:

    contains('remote') && (contains('javascript') || contains('react'))

 The resulting statement is an array of integers representing the values of matched terms in the thread.  The thread had 104 posts mentioning `remote`, 21 for `javascript`, and 20 for `react`.

Note, since we removed posts that do not contain `remote` in the first call, the subsequent calls only search posts containing `remote`.
