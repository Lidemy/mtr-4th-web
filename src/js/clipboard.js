$('[data-toggle="tooltip"]').tooltip()

function setTooltip(btn, message) {
  $(btn).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function () {
    $(btn)
      .attr('data-original-title', 'Copy me')
      .tooltip('hide');
  }, 1000);
}

const clipboard = new ClipboardJS('.copy__btn');

clipboard.on('success', function (e) {
  setTooltip(e.trigger, 'Copied!');
  hideTooltip(e.trigger);
})

clipboard.on('error', function (e) {
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});


