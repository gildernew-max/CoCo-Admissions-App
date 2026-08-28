(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.BoardLogic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function todayISO(now) {
    var d = now ? new Date(now) : new Date();
    return toISO(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  function toISO(year, month, day) {
    return (
      String(year) +
      "-" +
      String(month).padStart(2, "0") +
      "-" +
      String(day).padStart(2, "0")
    );
  }

  function parseISO(iso) {
    var parts = iso.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function formatDate(iso, today) {
    var d = parseISO(iso);
    var label =
      WEEKDAYS[d.getDay()] +
      ", " +
      MONTHS[d.getMonth()] +
      " " +
      d.getDate();
    var todayDate = parseISO(today || todayISO());
    if (d.getFullYear() !== todayDate.getFullYear()) {
      label += ", " + d.getFullYear();
    }
    return label;
  }

  function daysUntil(iso, today) {
    var a = parseISO(today);
    var b = parseISO(iso);
    return Math.round((b.getTime() - a.getTime()) / 86400000);
  }

  function emptyChecks(entity) {
    var checks = {};
    entity.items.forEach(function (item) {
      checks[item.id] = false;
    });
    return checks;
  }

  function checksFor(state, entityId, entity) {
    var saved = (state && state.checks && state.checks[entityId]) || {};
    var merged = emptyChecks(entity);
    Object.keys(merged).forEach(function (id) {
      if (saved[id] === true) merged[id] = true;
    });
    return merged;
  }

  function isItemOpen(item, checks) {
    return checks[item.id] !== true;
  }

  function itemsForDeadline(entity, deadlineId) {
    return entity.items.filter(function (item) {
      return item.deadlineId === deadlineId;
    });
  }

  function deadlineIsOpen(entity, deadline, checks) {
    var linked = itemsForDeadline(entity, deadline.id);
    if (linked.length === 0) return true;
    return linked.some(function (item) {
      return isItemOpen(item, checks);
    });
  }

  function isLookOnly(item) {
    return item.group === "look-only";
  }

  function requiredItems(entity) {
    return entity.items.filter(function (item) {
      return !item.optional && !isLookOnly(item);
    });
  }

  function fileItems(entity) {
    return entity.items.filter(function (item) {
      return !item.optional && item.group !== "aid" && !isLookOnly(item);
    });
  }

  function progress(entity, checks) {
    var items = requiredItems(entity);
    var done = items.filter(function (item) {
      return checks[item.id] === true;
    }).length;
    return { done: done, total: items.length };
  }

  function fileProgress(entity, checks) {
    var items = fileItems(entity);
    var done = items.filter(function (item) {
      return checks[item.id] === true;
    }).length;
    return { done: done, total: items.length };
  }

  function isFileComplete(entity, checks) {
    var items = fileItems(entity);
    if (items.length === 0) return requiredItems(entity).every(function (item) {
      return checks[item.id] === true;
    });
    return items.every(function (item) {
      return checks[item.id] === true;
    });
  }

  function isFullyComplete(entity, checks) {
    return entity.items.every(function (item) {
      if (isLookOnly(item)) return true;
      return checks[item.id] === true;
    });
  }

  function getHeadlineDeadline(entity) {
    var found = null;
    entity.deadlines.forEach(function (deadline) {
      if (deadline.role === "headline" && !found) found = deadline;
    });
    return found || entity.deadlines[0] || null;
  }

  function getNextDeadline(entity, checks, today) {
    var open = entity.deadlines.filter(function (deadline) {
      return deadlineIsOpen(entity, deadline, checks);
    });
    if (open.length === 0) return null;

    var upcoming = open.filter(function (deadline) {
      return deadline.date >= today;
    });
    var pool = upcoming.length ? upcoming : open;
    pool.sort(function (a, b) {
      if (a.date === b.date) return a.label.localeCompare(b.label);
      return a.date < b.date ? -1 : 1;
    });
    return pool[0];
  }

  function getNextAction(entity, checks, today) {
    var nextDeadline = getNextDeadline(entity, checks, today);
    if (nextDeadline) {
      var linkedOpen = itemsForDeadline(entity, nextDeadline.id).filter(
        function (item) {
          return isItemOpen(item, checks) && !isLookOnly(item);
        }
      );
      if (linkedOpen.length) {
        return {
          item: linkedOpen[0],
          label: linkedOpen[0].action || linkedOpen[0].label,
          deadline: nextDeadline,
        };
      }
    }
    var firstOpen = entity.items.filter(function (item) {
      return isItemOpen(item, checks) && !isLookOnly(item);
    })[0];
    if (!firstOpen) return null;
    return {
      item: firstOpen,
      label: firstOpen.action || firstOpen.label,
      deadline: nextDeadline,
    };
  }

  function cardStatus(entity, checks, today) {
    if (isFullyComplete(entity, checks)) return "complete";
    var next = getNextDeadline(entity, checks, today);
    if (!next) {
      return isFileComplete(entity, checks) ? "complete" : "open";
    }
    var delta = daysUntil(next.date, today);
    if (delta < 0) return "overdue";
    if (delta <= 14) return "soon";
    return "open";
  }

  function sortKey(entity, checks, today) {
    if (isFullyComplete(entity, checks)) return "9|" + entity.name;
    var next = getNextDeadline(entity, checks, today);
    if (!next) return "8|" + entity.name;
    var delta = daysUntil(next.date, today);
    var bucket = delta < 0 ? "0" : "1";
    return bucket + "|" + next.date + "|" + entity.name;
  }

  function allEntities(data) {
    return [data.household].concat(data.schools);
  }

  function boardSummary(data, state, today) {
    var entities = allEntities(data).map(function (entity) {
      var checks = checksFor(state, entity.id, entity);
      return {
        entity: entity,
        checks: checks,
        nextDeadline: getNextDeadline(entity, checks, today),
        nextAction: getNextAction(entity, checks, today),
        progress: progress(entity, checks),
        fileProgress: fileProgress(entity, checks),
        fileComplete: isFileComplete(entity, checks),
        complete: isFullyComplete(entity, checks),
        status: cardStatus(entity, checks, today),
      };
    });
    entities.sort(function (a, b) {
      var ka = sortKey(a.entity, a.checks, today);
      var kb = sortKey(b.entity, b.checks, today);
      if (ka === kb) return 0;
      return ka < kb ? -1 : 1;
    });

    var schoolRows = entities.filter(function (row) {
      return row.entity.kind === "school";
    });
    var openSchools = schoolRows.filter(function (row) {
      return !row.fileComplete;
    }).length;

    var upcoming = entities
      .filter(function (row) {
        return row.nextDeadline && !row.complete;
      })
      .slice(0, 3);

    return {
      entities: entities,
      openSchools: openSchools,
      schoolCount: schoolRows.length,
      householdOpen: !entities.find(function (row) {
        return row.entity.id === "household";
      }).complete,
      upcoming: upcoming,
    };
  }

  function defaultState(data) {
    var checks = {};
    allEntities(data).forEach(function (entity) {
      checks[entity.id] = emptyChecks(entity);
    });
    return {
      app: data.appId,
      version: data.version,
      checks: checks,
    };
  }

  function mergeState(data, incoming) {
    var base = defaultState(data);
    if (!incoming || typeof incoming !== "object") return base;
    var source = incoming.checks || incoming;
    allEntities(data).forEach(function (entity) {
      var saved = source[entity.id];
      if (!saved || typeof saved !== "object") return;
      entity.items.forEach(function (item) {
        if (saved[item.id] === true) base.checks[entity.id][item.id] = true;
        if (saved[item.id] === false) base.checks[entity.id][item.id] = false;
      });
    });
    return base;
  }

  function exportPayload(data, state, exportedAt) {
    return {
      app: data.appId,
      version: data.version,
      exportedAt: exportedAt || new Date().toISOString(),
      audience: data.audience || "house",
      checks: mergeState(data, state).checks,
    };
  }

  function parseImport(text) {
    var parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Not a JSON object.");
    }
    if (parsed.app && parsed.app !== "coco-complete-file-board") {
      throw new Error("This file is not a complete-file board export.");
    }
    if (!parsed.checks || typeof parsed.checks !== "object") {
      throw new Error("Export is missing checklist data.");
    }
    return parsed;
  }

  return {
    todayISO: todayISO,
    parseISO: parseISO,
    formatDate: formatDate,
    daysUntil: daysUntil,
    emptyChecks: emptyChecks,
    checksFor: checksFor,
    progress: progress,
    fileProgress: fileProgress,
    isFileComplete: isFileComplete,
    isFullyComplete: isFullyComplete,
    getHeadlineDeadline: getHeadlineDeadline,
    getNextDeadline: getNextDeadline,
    getNextAction: getNextAction,
    cardStatus: cardStatus,
    allEntities: allEntities,
    boardSummary: boardSummary,
    defaultState: defaultState,
    mergeState: mergeState,
    exportPayload: exportPayload,
    parseImport: parseImport,
  };
});
