const assert = require("assert");
const data = require("../js/data.js");
const logic = require("../js/logic.js");

const TODAY = "2026-08-28";

function school(id) {
  return data.schools.find((row) => row.id === id);
}

function unchecked(entity) {
  return logic.emptyChecks(entity);
}

function checked(entity, ids) {
  const checks = unchecked(entity);
  ids.forEach((id) => {
    checks[id] = true;
  });
  return checks;
}

assert.strictEqual(data.schools.length, 8, "eight schools");
assert.strictEqual(data.audience, "house");
assert.strictEqual(data.policy.earlyDecision, false);
assert.ok(data.schools.every((row) => row.binding === false));

const names = data.schools.map((row) => row.name);
assert.deepStrictEqual(names, [
  "Auburn",
  "Georgia Tech",
  "FSU",
  "UGA",
  "Carnegie Mellon",
  "Rice",
  "Case Western",
  "TCU",
]);

["smu", "uva", "emory", "bu"].forEach((id) => {
  assert.strictEqual(school(id), undefined, "dropped leftover school " + id);
});

assert.ok(!data.household.items.some((item) => item.id === "srar"));
assert.ok(!JSON.stringify(data).includes("SMU"));
assert.ok(!JSON.stringify(data).includes("Boston University"));
assert.ok(!JSON.stringify(data).includes("Emory"));
assert.ok(!JSON.stringify(data).includes("UVA"));

const auburn = school("auburn");
assert.strictEqual(auburn.filer, "coco");
assert.ok(!auburn.items.some((item) => item.id === "recs"), "Auburn hides recs");
assert.strictEqual(auburn.test.mode, "look-only");
const auburnSat = auburn.items.find((item) => item.id === "sat");
assert.strictEqual(auburnSat.label, "Official SAT to 1005 — unknown");
assert.ok(!/send/i.test(auburnSat.label));
assert.ok(!/send/i.test(auburnSat.action || ""));
assert.strictEqual(auburnSat.group, "look-only");
assert.ok(
  !auburn.notes.some((note) => /CSS/i.test(note) && !/No CSS/.test(note)),
  "Auburn has no CSS chase"
);

const auburnNext = logic.getNextDeadline(auburn, unchecked(auburn), TODAY);
assert.strictEqual(auburnNext.date, "2026-09-15");
assert.strictEqual(auburnNext.label, "EA Round 1 complete file");
assert.strictEqual(
  logic.getNextAction(auburn, unchecked(auburn), TODAY).label,
  "File the Auburn application (CoCo files; board does not submit)"
);
assert.notStrictEqual(
  logic.getNextAction(auburn, unchecked(auburn), TODAY).item.id,
  "sat"
);
const auburnFileDone = checked(auburn, ["app", "fee", "transcript", "portal"]);
assert.ok(logic.isFileComplete(auburn, auburnFileDone));
assert.ok(logic.isFullyComplete(auburn, auburnFileDone));
assert.strictEqual(logic.getNextAction(auburn, auburnFileDone, TODAY), null);

const gatech = school("gatech");
assert.ok(!gatech.items.some((item) => item.id === "recs"));
assert.strictEqual(gatech.test.mode, "self-reported");
assert.strictEqual(
  logic.getNextDeadline(gatech, unchecked(gatech), TODAY).date,
  "2026-10-15"
);
const gatechAfterApp = checked(gatech, ["app", "fee"]);
assert.strictEqual(
  logic.getNextDeadline(gatech, gatechAfterApp, TODAY).date,
  "2026-10-30"
);
assert.ok(!gatech.items.some((item) => item.group === "aid"));

const uga = school("uga");
assert.ok(!uga.items.some((item) => item.id === "recs"));
assert.strictEqual(
  logic.getNextDeadline(uga, unchecked(uga), TODAY).date,
  "2026-10-15"
);
assert.ok(uga.items.some((item) => item.id === "sat"));

const fsu = school("fsu");
assert.ok(!fsu.items.some((item) => item.id === "recs"));
assert.strictEqual(fsu.plan, "Regular");
assert.strictEqual(
  logic.getNextDeadline(fsu, unchecked(fsu), TODAY).date,
  "2026-12-01"
);
assert.ok(!fsu.items.some((item) => item.group === "aid"));

const tcu = school("tcu");
assert.ok(tcu.items.some((item) => item.id === "recs"));
assert.ok(!tcu.items.some((item) => item.group === "aid"));
assert.strictEqual(
  logic.getNextDeadline(tcu, unchecked(tcu), TODAY).date,
  "2026-10-31"
);
assert.strictEqual(logic.getHeadlineDeadline(tcu).date, "2026-10-31");
assert.ok(tcu.notes.some((note) => note.includes("Nov 1")));

const cwr = school("case");
assert.ok(cwr.items.some((item) => item.id === "recs"));
assert.ok(!cwr.items.some((item) => item.group === "aid"));
assert.strictEqual(
  logic.getNextDeadline(cwr, unchecked(cwr), TODAY).date,
  "2026-11-01"
);
assert.ok(cwr.items.find((item) => item.id === "recs").hint.includes("3–4"));

const cmu = school("cmu");
assert.ok(cmu.items.some((item) => item.id === "recs"));
assert.ok(!cmu.items.some((item) => item.group === "aid"));
assert.strictEqual(
  logic.getNextDeadline(cmu, unchecked(cmu), TODAY).date,
  "2027-01-04"
);
assert.ok(cmu.items.find((item) => item.id === "recs").hint.includes("required 2"));

const rice = school("rice");
assert.ok(rice.items.some((item) => item.id === "recs"));
assert.ok(!rice.items.some((item) => item.group === "aid"));
assert.strictEqual(
  logic.getNextDeadline(rice, unchecked(rice), TODAY).date,
  "2027-01-04"
);
assert.ok(rice.items.find((item) => item.id === "recs").hint.includes("3–10"));

const publicsWithoutRecs = ["auburn", "gatech", "uga", "fsu"];
publicsWithoutRecs.forEach((id) => {
  assert.ok(
    !school(id).items.some((item) => item.id === "recs"),
    id + " omits per-school recs"
  );
});

const household = data.household;
assert.strictEqual(household.items.length, 4);
assert.strictEqual(
  logic.getNextDeadline(household, unchecked(household), TODAY).date,
  "2026-09-30"
);
assert.strictEqual(
  logic.getNextAction(household, unchecked(household), TODAY).label,
  "Create CoCo’s FSA ID"
);

const state = logic.defaultState(data);
const summary = logic.boardSummary(data, state, TODAY);
assert.strictEqual(summary.schoolCount, 8);
assert.strictEqual(summary.openSchools, 8);
assert.strictEqual(summary.entities[0].entity.id, "auburn");
assert.strictEqual(summary.upcoming[0].entity.id, "auburn");
assert.ok(summary.entities.some((row) => row.entity.id === "household"));
assert.ok(summary.entities.every((row) => row.entity.id !== "smu"));

const allDone = logic.defaultState(data);
logic.allEntities(data).forEach((entity) => {
  entity.items.forEach((item) => {
    allDone.checks[entity.id][item.id] = true;
  });
});
assert.ok(logic.isFileComplete(auburn, allDone.checks.auburn));
assert.strictEqual(logic.boardSummary(data, allDone, TODAY).upcoming.length, 0);

const exported = logic.exportPayload(data, state, "2026-08-28T12:00:00.000Z");
assert.strictEqual(exported.app, "coco-complete-file-board");
assert.strictEqual(exported.audience, "house");
const roundTrip = logic.mergeState(
  data,
  logic.parseImport(JSON.stringify(exported))
);
assert.deepStrictEqual(roundTrip.checks.auburn, state.checks.auburn);

const imported = logic.parseImport(
  JSON.stringify({
    app: "coco-complete-file-board",
    version: 1,
    checks: { auburn: { app: true, fee: true } },
  })
);
const merged = logic.mergeState(data, imported);
assert.strictEqual(merged.checks.auburn.app, true);
assert.strictEqual(merged.checks.auburn.transcript, false);

assert.throws(() => logic.parseImport('{"app":"other","checks":{}}'));

assert.strictEqual(logic.formatDate("2026-09-15", TODAY), "Tue, Sep 15");
assert.strictEqual(logic.formatDate("2027-05-01", TODAY), "Sat, May 1, 2027");
assert.strictEqual(logic.daysUntil("2026-09-15", TODAY), 18);

const overdue = logic.cardStatus(auburn, unchecked(auburn), "2026-09-16");
assert.strictEqual(overdue, "overdue");

console.log("ok");
