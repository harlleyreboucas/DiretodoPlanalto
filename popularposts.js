let items = document.querySelectorAll('#PopularPosts1 li[data-post-id],#PopularPosts2 li[data-post-id],#PopularPosts3 li[data-post-id],#PopularPosts4 li[data-post-id],#PopularPosts5 li[data-post-id],#PopularPosts6 li[data-post-id],#PopularPosts7 li[data-post-id]');
items.length && items.forEach(item => {
    let p = document.createElement('div');
    p.className = 'popular-tag';
    fetch('/feeds/posts/summary/' + item.dataset.postId + '?alt=json')
        .then(response => response.json())
        .then(json => {
            if (json && json.entry && json.entry.category) {
                let out = [];
                json.entry.category.forEach(category => {
                    out.push('<a href="/search/label/' + encodeURIComponent(category.term) + '?&amp;max-results=20" rel="tag">' + category.term + '</a>');
                });
                if (out) {
                    p.innerHTML = out.join('');
                    $(item).find('.item-title').before(p);
                }
            }
        });
});