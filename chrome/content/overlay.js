var listener = {
  onLocationChange: function(webProgress, request, location) { },
  onProgressChange: function(webProgress, request, curSelfProgress,
                             maxSelfProgress, curTotalProgress,
                             maxTotalProgress) { },
  onSecurityChange: function(webProgress, request, state) { },
  onStateChange: function(webProgress, request, stateFlags, status) { },
  onStatusChange: function(webProgress, request, status, message) { },
  QueryInterface: function(iid) {
    if (iid.equals(Components.interfaces.nsIWebProgressListener) ||
        iid.equals(Components.interfaces.nsISupportsWeakReference))
          return this;
    throw Components.results.NS_NOINTERFACE;
  }
}


var autoprintpreview = {
  onLoad: function() {
    this.initialized = true;
  },

  onMenuItemCommand: function(e) {
    var canvas = e.originalTarget;
    var exitPrintPreview = function() {
      window
        .frames[1]
        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIWebBrowserPrint)
        .exitPrintPreview();
    };

    var printPreview = function() {
      var gWbp = window
        .frames[1]
        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIWebBrowserPrint);

//      gWbp = browser
//        .contentWindow.frames[1]
//        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
//        .getInterface(Components.interfaces.nsIWebBrowserPrint);

      gWbp.printPreview(gWbp.globalPrintSettings, window.frames[0], listener);

      ctx1 = canvas.getContext("2d");
      ctx1.drawWindow(window.frames[1], 0, 0, 300, 300, "rgb(256,256,256)");
      exitPrintPreview();
    };

    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                              .getService(Components.interfaces.nsIPrefBranch);
    prefs.setBoolPref('print.show_print_progress', false);
    printPreview()
    prefs.clearUserPref('print.show_print_progress');

  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    autoprintpreview.onMenuItemCommand(e);
  },

};

window.addEventListener("load", function () { autoprintpreview.onLoad(); }, false);
document.addEventListener("renderPrintPreview", function(e) { autoprintpreview.onMenuItemCommand(e); }, false, true); // The last value is a Mozilla-specific value to indicate untrusted content is allowed to trigger the event.
