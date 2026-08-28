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

assert.strictEqual(data.schools.length, 9, "nine schools");
assert.strictEqual(data.policy.earlyDecision, false);
assert.ok(data.schools.every((row) => row.binding === false));

const names = data.schools.map((row) => row.name);
assert.deepStrictEqual(names, [
  "Auburn",
  "Georgia Tech",
  "UGA",
  "SMU",
  "TCU",
  "UVA",
  "Emory / Oxford",
  "FSU",
  "Boston University",
]);

const auburn = school("auburn");
assert.strictEqual(auburn.filer, "coco");
assert.ok(!auburn.items.some((item) => item.id === "recs"), "Auburn hides recs");
assert.strictEqual(auburn.test.mode, "official");

const auburnNext = logic.getNextDeadline(auburn, unchecked(auburn), TODAY);
assert.strictEqual(auburnNext.date, "2026-09-15");
assert.strictEqual(auburnNext.label, "EA Round 1 complete file");
assert.strictEqual(
  logic.getNextAction(auburn, unchecked(auburn), TODAY).label,
  "Submit the Auburn application (CoCo files)"
);

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
assert.strictEqual(
  logic.getNextAction(gatech, gatechAfterApp, TODAY).item.id,
  "transcript"
);

const uga = school("uga");
assert.ok(!uga.items.some((item) => item.id === "recs"));
assert.strictEqual(logic.getNextDeadline(uga, unchecked(uga), TODAY).date, "2026-10-15");

const smu = school("smu");
assert.ok(smu.items.some((item) => item.id === "recs"));
assert.strictEqual(logic.getNextDeadline(smu, unchecked(smu), TODAY).date, "2026-10-31");

const tcu = school("tcu");
assert.ok(tcu.items.some((item) => item.id === "recs"));
assert.strictEqual(logic.getNextDeadline(tcu, unchecked(tcu), TODAY).date, "2026-11-01");

const uva = school("uva");
assert.strictEqual(uva.residency, "out-of-state");
assert.ok(uva.items.some((item) => item.id === "recs"));
assert.strictEqual(logic.getNextDeadline(uva, unchecked(uva), TODAY).date, "2026-11-01");
const uvaAfterApp = checked(uva, ["app", "fee", "transcript", "sat"]);
assert.strictEqual(logic.getNextDeadline(uva, uvaAfterApp, TODAY).date, "2026-11-08");

const emory = school("emory");
assert.ok(emory.items.some((item) => item.id === "recs"));
assert.strictEqual(
  logic.getNextDeadline(emory, unchecked(emory), TODAY).date,
  "2026-11-15"
);
const emorySkipScholars = checked(emory, ["scholars"]);
assert.strictEqual(
  logic.getNextDeadline(emory, emorySkipScholars, TODAY).date,
  "2027-01-01"
);
assert.strictEqual(logic.getHeadlineDeadline(emory).date, "2027-01-01");

const fsu = school("fsu");
assert.ok(!fsu.items.some((item) => item.id === "recs"));
assert.strictEqual(fsu.plan, "Regular");
assert.strictEqual(logic.getNextDeadline(fsu, unchecked(fsu), TODAY).date, "2026-12-01");

const bu = school("bu");
assert.ok(bu.items.some((item) => item.id === "recs"));
assert.strictEqual(logic.getNextDeadline(bu, unchecked(bu), TODAY).date, "2026-12-01");
const buSkipMerit = checked(bu, ["merit"]);
assert.strictEqual(logic.getNextDeadline(bu, buSkipMerit, TODAY).date, "2027-01-05");

const household = data.household;
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
assert.strictEqual(summary.schoolCount, 9);
assert.strictEqual(summary.openSchools, 9);
assert.strictEqual(summary.entities[0].entity.id, "auburn");
assert.strictEqual(summary.upcoming[0].entity.id, "auburn");
assert.ok(summary.entities.some((row) => row.entity.id === "household"));

const allDone = logic.defaultState(data);
logic.allEntities(data).forEach((entity) => {
  entity.items.forEach((item) => {
    allDone.checks[entity.id][item.id] = true;
  });
});
assert.ok(logic.isFileComplete(auburn, allDone.checks.auburn));
assert.strictEqual(
  logic.boardSummary(data, allDone, TODAY).upcoming.length,
  0
);

const exported = logic.exportPayload(data, state, "2026-08-28T12:00:00.000Z");
assert.strictEqual(exported.app, "coco-complete-file-board");
const roundTrip = logic.mergeState(data, logic.parseImport(JSON.stringify(exported)));
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

const overdue = logic.cardStatus(
  auburn,
  unchecked(auburn),
  "2026-09-16"
);
assert.strictEqual(overdue, "overdue");

console.log("ok");
