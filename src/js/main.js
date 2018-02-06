FastClick.attach(document.body);
SVGInjector(document.getElementById('svg-store'));

$('.svg-icon').each((i, el) => {
  let $el = $(el);
  if ($el.is(':empty')) $el.html(`<use xlink:href=#${$el.data('id')}></use>`);
});

new LazyLoad({
  elements_selector: '.lazyload',
  threshold: 0
});
