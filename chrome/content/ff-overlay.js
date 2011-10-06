autoprintpreview.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ autoprintpreview.showFirefoxContextMenu(e); }, false);
};

autoprintpreview.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-autoprintpreview").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { autoprintpreview.onFirefoxLoad(); }, false);
