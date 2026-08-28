(function () {
  "use strict";

  var data = window.BOARD_DATA;
  var logic = window.BoardLogic;
  var storage = window.BoardStorage;
  var state = storage.load(data);
  var statusTimer = null;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "className") node.className = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else if (key === "html") node.innerHTML = attrs[key];
      else if (key.indexOf("on") === 0) node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
      else if (attrs[key] === false || attrs[key] == null) return;
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function statusLabel(status) {
    if (status === "overdue") return "Overdue";
    if (status === "soon") return "Due soon";
    if (status === "complete") return "Complete";
    return "Open";
  }

  function recsLine(entity) {
    if (entity.recs === "none") return "Recs: not required";
    if (entity.recs === "required") return "Recs: required";
    return "";
  }

  function renderHeader(summary, today) {
    var chips = [
      el("span", { className: "chip", text: summary.openSchools + " of " + summary.schoolCount + " school files open" }),
    ];
    if (summary.householdOpen) {
      chips.push(el("span", { className: "chip", text: "Household open" }));
    }

    var upcomingItems = summary.upcoming.map(function (row) {
      return el("li", {}, [
        el("div", {}, [
          el("div", { className: "who", text: row.entity.name }),
          el("div", { className: "what", text: row.nextDeadline.label }),
        ]),
        el("div", { className: "when", text: logic.formatDate(row.nextDeadline.date, today) }),
      ]);
    });

    return el("header", { className: "site-header" }, [
      el("p", { className: "kicker", text: "Complete-file board" }),
      el("h1", { text: "House" }),
      el("p", {
        className: "policy",
        text: "Eight schools · non-binding only · no Early Decision",
      }),
      el("div", { className: "summary" }, chips),
      el("section", { className: "next-up", "aria-label": "Next dates" }, [
        el("h2", { text: "Next dates" }),
        upcomingItems.length
          ? el("ol", {}, upcomingItems)
          : el("p", { text: "Nothing open." }),
      ]),
    ]);
  }

  function renderCard(row, today) {
    var entity = row.entity;
    var next = row.nextDeadline;
    var action = row.nextAction;
    var file = row.fileProgress;
    var status = row.status;

    var badges = [
      el("span", { className: "badge " + status, text: statusLabel(status) }),
    ];
    if (entity.kind === "school") {
      badges.push(el("span", { className: "badge", text: "Non-binding" }));
    }
    if (entity.residency === "out-of-state") {
      badges.push(el("span", { className: "badge", text: "Out-of-state" }));
    }
    if (entity.filer === "coco") {
      badges.push(el("span", { className: "badge", text: "CoCo files" }));
    }

    var extraDates = entity.deadlines
      .filter(function (deadline) {
        return !next || deadline.id !== next.id;
      })
      .map(function (deadline) {
        return deadline.label + " — " + logic.formatDate(deadline.date, today);
      });

    var items = entity.items.map(function (item) {
      var id = entity.id + "-" + item.id;
      return el("li", {}, [
        el("label", { for: id }, [
          el("input", {
            type: "checkbox",
            id: id,
            checked: row.checks[item.id] ? "checked" : false,
            onChange: function (event) {
              toggle(entity.id, item.id, event.target.checked);
            },
          }),
          el("span", { className: "item-text" }, [
            document.createTextNode(item.label),
            item.hint
              ? el("span", { className: "optional", text: item.hint })
              : item.optional
                ? el("span", { className: "optional", text: "Optional — check if filed or not pursuing" })
                : null,
          ]),
        ]),
      ]);
    });

    var noteItems = entity.notes.map(function (note) {
      return el("li", { text: note });
    });
    extraDates.forEach(function (line) {
      noteItems.push(el("li", { text: line }));
    });

    return el("article", {
      className: "card" + (row.complete ? " complete" : ""),
      id: entity.id,
    }, [
      el("div", { className: "card-top" }, [
        el("div", {}, [
          el("h2", { text: entity.name }),
          el("p", { className: "plan", text: entity.plan }),
        ]),
        el("div", { className: "badges" }, badges),
      ]),
      el("div", { className: "next-block" }, [
        el("div", {}, [
          el("p", { className: "label", text: "Next date" }),
          el("p", { className: "next-date" }, [
            el("span", {
              text: next ? logic.formatDate(next.date, today) : "None",
            }),
            next ? el("span", { className: "sub", text: next.label }) : null,
          ]),
        ]),
        el("div", {}, [
          el("p", { className: "label", text: "Next action" }),
          el("p", {
            className: "next-action",
            text: action ? action.label : "Nothing open",
          }),
        ]),
      ]),
      el("p", {
        className: "progress-line",
        text:
          entity.kind === "school"
            ? file.done + " of " + file.total + " file items · " + row.progress.done + " of " + row.progress.total + " required"
            : row.progress.done + " of " + row.progress.total + " items",
      }),
      el("ul", { className: "checklist" }, items),
      entity.kind === "school" && entity.recs === "none"
        ? el("p", { className: "na", text: recsLine(entity) })
        : null,
      el("details", { className: "notes" }, [
        el("summary", { text: "Dates and notes" }),
        el("ul", {}, noteItems),
      ]),
    ]);
  }

  function renderTools() {
    return el("section", { className: "tools", id: "backup" }, [
      el("h2", { text: "This phone and other devices" }),
      el("p", {
        text: "Checks are saved in this browser. Export JSON to move the board to another phone.",
      }),
      el("div", { className: "actions" }, [
        el("button", { className: "primary", type: "button", text: "Export JSON", onClick: exportJson }),
        el("button", { type: "button", text: "Copy JSON", onClick: copyJson }),
        el("label", { className: "file-btn" }, [
          el("input", {
            type: "file",
            accept: "application/json,.json",
            onChange: importJson,
          }),
          document.createTextNode("Import JSON"),
        ]),
        el("button", { type: "button", text: "Reset checks", onClick: resetChecks }),
      ]),
      el("p", { className: "status", id: "tool-status" }),
    ]);
  }

  function render() {
    var y = window.scrollY;
    var today = logic.todayISO();
    var summary = logic.boardSummary(data, state, today);
    var root = document.getElementById("app");
    root.replaceChildren();
    root.appendChild(renderHeader(summary, today));
    var board = el("main", { className: "board" });
    summary.entities.forEach(function (row) {
      board.appendChild(renderCard(row, today));
    });
    root.appendChild(board);
    root.appendChild(renderTools());
    root.appendChild(
      el("footer", { className: "site-footer" }, [
        el("p", {
          text: "Local tracker only. It does not submit applications, send scores, or file FAFSA/CSS.",
        }),
      ])
    );
    window.scrollTo(0, y);
  }

  function persist() {
    storage.save(data, state);
  }

  function toggle(entityId, itemId, checked) {
    state.checks[entityId][itemId] = !!checked;
    persist();
    render();
  }

  function setStatus(message, isError) {
    var node = document.getElementById("tool-status");
    if (!node) return;
    node.textContent = message;
    node.className = "status" + (isError ? " error" : "");
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () {
      if (node.textContent === message) node.textContent = "";
    }, 4000);
  }

  function currentExport() {
    return logic.exportPayload(data, state);
  }

  function exportJson() {
    var payload = JSON.stringify(currentExport(), null, 2);
    var blob = new Blob([payload], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = el("a", {
      href: url,
      download: "house-complete-file-board.json",
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Exported JSON.");
  }

  function copyJson() {
    var payload = JSON.stringify(currentExport(), null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(payload).then(
        function () {
          setStatus("Copied JSON.");
        },
        function () {
          setStatus("Could not copy. Use Export JSON.", true);
        }
      );
      return;
    }
    setStatus("Could not copy. Use Export JSON.", true);
  }

  function importJson(event) {
    var file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = logic.parseImport(String(reader.result));
        state = logic.mergeState(data, parsed);
        persist();
        render();
        setStatus("Imported checklist.");
      } catch (err) {
        setStatus(err.message || "Import failed.", true);
      }
    };
    reader.readAsText(file);
  }

  function resetChecks() {
    if (!window.confirm("Clear all checks on this device?")) return;
    storage.clear();
    state = logic.defaultState(data);
    persist();
    render();
    setStatus("Checks cleared.");
  }

  render();
})();
