/**
 * search.js
 * Client-side search filtering for search.html.
 * Reads ?q= URL parameter, pre-fills the input, and filters
 * static result items using case-insensitive includes().
 */
(function () {
  'use strict';

  var searchInput   = document.getElementById('search-input');
  var searchForm    = document.getElementById('search-form');
  var resultsArea   = document.getElementById('search-results');
  var resultsCount  = document.getElementById('results-count');
  var noResults     = document.getElementById('no-results');
  var summaryQuery  = document.getElementById('summary-query');

  if (!searchInput || !resultsArea) return;

  /* All result items — each must have data-searchable attribute */
  var allItems = Array.prototype.slice.call(
    resultsArea.querySelectorAll('[data-searchable]')
  );

  function getQuery() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('q') || '').trim();
  }

  function highlight(text, query) {
    if (!query) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
  }

  function filterResults(query) {
    var lower   = query.toLowerCase();
    var visible = 0;

    allItems.forEach(function (item) {
      var haystack = (item.getAttribute('data-searchable') || '').toLowerCase();
      var matches  = !query || haystack.includes(lower);

      if (matches) {
        item.removeAttribute('hidden');
        visible++;

        /* Apply highlight to title and excerpt */
        var titleEl   = item.querySelector('.search-result__title');
        var excerptEl = item.querySelector('.search-result__excerpt');

        if (titleEl && titleEl.dataset.raw) {
          titleEl.innerHTML = highlight(titleEl.dataset.raw, query);
        }
        if (excerptEl && excerptEl.dataset.raw) {
          excerptEl.innerHTML = highlight(excerptEl.dataset.raw, query);
        }
      } else {
        item.setAttribute('hidden', '');
      }
    });

    return visible;
  }

  function updateUI(query, visibleCount) {
    /* Update summary text */
    if (summaryQuery) {
      summaryQuery.textContent = query ? '\u201c' + query + '\u201d' : 'all content';
    }
    if (resultsCount) {
      resultsCount.textContent = visibleCount;
    }

    /* Show/hide no-results message */
    if (noResults) {
      if (visibleCount === 0 && query) {
        noResults.removeAttribute('hidden');
      } else {
        noResults.setAttribute('hidden', '');
      }
    }
  }

  function run(query) {
    /* Cache raw text for highlight/restore */
    allItems.forEach(function (item) {
      var titleEl   = item.querySelector('.search-result__title');
      var excerptEl = item.querySelector('.search-result__excerpt');
      if (titleEl && !titleEl.dataset.raw) {
        titleEl.dataset.raw = titleEl.textContent;
      }
      if (excerptEl && !excerptEl.dataset.raw) {
        excerptEl.dataset.raw = excerptEl.textContent;
      }
    });

    var count = filterResults(query);
    updateUI(query, count);
  }

  /* Pre-fill from URL on page load */
  var initialQuery = getQuery();
  searchInput.value = initialQuery;
  run(initialQuery);

  /* Live filtering as user types */
  searchInput.addEventListener('input', function () {
    var query = searchInput.value.trim();
    /* Update the URL without reloading */
    var url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState(null, '', url.toString());
    run(query);
  });

  /* Handle form submission (prevent default — filtering is live) */
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      run(searchInput.value.trim());
    });
  }

}());
