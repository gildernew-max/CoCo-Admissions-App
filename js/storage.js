(function (root) {
  "use strict";

  var KEY = "coco-complete-file-board-v1";

  function load(data) {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return root.BoardLogic.defaultState(data);
      return root.BoardLogic.mergeState(data, JSON.parse(raw));
    } catch (err) {
      return root.BoardLogic.defaultState(data);
    }
  }

  function save(data, state) {
    var payload = root.BoardLogic.exportPayload(data, state);
    localStorage.setItem(KEY, JSON.stringify(payload));
    return payload;
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  root.BoardStorage = {
    KEY: KEY,
    load: load,
    save: save,
    clear: clear,
  };
})(typeof self !== "undefined" ? self : this);
