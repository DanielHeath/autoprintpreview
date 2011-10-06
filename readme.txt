jQuery('body').append("<canvas id='testPrintPreviewCanvas'></canvas>");
jQuery('#testPrintPreviewCanvas').width('100%');

var evt = document.createEvent("MouseEvents");
evt.initEvent("renderPrintPreview", true, false);
jQuery('#testPrintPreviewCanvas')[0].dispatchEvent(evt);
