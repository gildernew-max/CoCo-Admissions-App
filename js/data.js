(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.BOARD_DATA = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const household = {
    id: "household",
    kind: "household",
    name: "Household",
    plan: "Shared",
    binding: false,
    recs: "none",
    notes: [
      "Not a school. These items apply across all eight files.",
      "FSA IDs for CoCo and one parent are due before Oct 1.",
      "FAFSA and CSS open Oct 1. That is the date the forms open, not a per-school CSS chase.",
      "May 1, 2027 is the national reply date for all eight schools.",
    ],
    deadlines: [
      {
        id: "fsa",
        date: "2026-09-30",
        label: "FSA IDs — before Oct 1",
        role: "headline",
      },
      {
        id: "aid-open",
        date: "2026-10-01",
        label: "FAFSA / CSS open",
        role: "open",
      },
      {
        id: "reply",
        date: "2027-05-01",
        label: "National reply date",
        role: "reply",
      },
    ],
    items: [
      {
        id: "fsa-coco",
        label: "FSA ID — CoCo",
        action: "Create CoCo’s FSA ID",
        deadlineId: "fsa",
      },
      {
        id: "fsa-parent",
        label: "FSA ID — one parent",
        action: "Create one parent FSA ID",
        deadlineId: "fsa",
      },
      {
        id: "aid-open",
        label: "FAFSA / CSS are open (Oct 1)",
        action: "Note that FAFSA and CSS are open",
        deadlineId: "aid-open",
      },
      {
        id: "reply",
        label: "National reply (May 1, 2027)",
        action: "Reply by May 1, 2027",
        deadlineId: "reply",
      },
    ],
  };

  const schools = [
    {
      id: "auburn",
      kind: "school",
      name: "Auburn",
      plan: "EA Round 1",
      planKind: "ea",
      binding: false,
      recs: "none",
      filer: "coco",
      test: { mode: "look-only", label: "Official SAT to 1005 — unknown" },
      notes: [
        "Complete file by Sep 15: application (Common App or auburn.edu, not both), $50 fee, transcript via SCOIR/Parchment, then Applicant Portal.",
        "Official SAT to College Board code 1005 is unknown. College Board is look-only. Do not send scores.",
        "Recs: none. No CSS.",
        "Last EA/merit complete-file: Dec 1 (not the headline).",
        "CoCo files this application herself. This board only tracks it; it never submits.",
      ],
      deadlines: [
        {
          id: "complete-file",
          date: "2026-09-15",
          label: "EA Round 1 complete file",
          role: "headline",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the Auburn application (CoCo files; board does not submit)",
          deadlineId: "complete-file",
        },
        {
          id: "fee",
          label: "Fee paid ($50)",
          action: "Pay the $50 application fee",
          deadlineId: "complete-file",
        },
        {
          id: "transcript",
          label: "Transcript sent (SCOIR / Parchment)",
          action: "Send transcript via SCOIR or Parchment",
          deadlineId: "complete-file",
        },
        {
          id: "sat",
          label: "Official SAT to 1005 — unknown",
          action: "SAT to 1005 is unknown; College Board is look-only",
          group: "look-only",
          hint: "College Board is look-only. Do not send scores.",
        },
        {
          id: "portal",
          label: "Applicant Portal checked",
          action: "Open the Applicant Portal and confirm the file",
          deadlineId: "complete-file",
        },
      ],
    },
    {
      id: "gatech",
      kind: "school",
      name: "Georgia Tech",
      plan: "EA1 (Georgia)",
      planKind: "ea",
      binding: false,
      recs: "none",
      test: { mode: "self-reported", label: "Self-reported SAT" },
      notes: [
        "EA1 for Georgia residents. Application Oct 15; documents Oct 30; self-reported SAT Nov 16.",
        "Recs: none. No CSS.",
      ],
      deadlines: [
        {
          id: "ea1",
          date: "2026-10-15",
          label: "EA1 application",
          role: "headline",
        },
        { id: "docs", date: "2026-10-30", label: "Documents", role: "docs" },
        {
          id: "sat",
          date: "2026-11-16",
          label: "Self-reported SAT",
          role: "test",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the EA1 application",
          deadlineId: "ea1",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "ea1",
        },
        {
          id: "transcript",
          label: "Transcript / documents sent",
          action: "Send transcript and documents",
          deadlineId: "docs",
        },
        {
          id: "sat",
          label: "Self-reported SAT",
          action: "Self-report SAT scores",
          deadlineId: "sat",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "docs",
        },
      ],
    },
    {
      id: "fsu",
      kind: "school",
      name: "FSU",
      plan: "Regular",
      planKind: "rd",
      binding: false,
      recs: "none",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "Regular Dec 1; materials Dec 8.",
        "No EA — Early Action is for Florida residents only.",
        "Recs: none. No CSS.",
      ],
      deadlines: [
        {
          id: "rd",
          date: "2026-12-01",
          label: "Regular application",
          role: "headline",
        },
        {
          id: "materials",
          date: "2026-12-08",
          label: "Materials",
          role: "docs",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the regular application",
          deadlineId: "rd",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "rd",
        },
        {
          id: "transcript",
          label: "Transcript / materials sent",
          action: "Send transcript and materials",
          deadlineId: "materials",
        },
        {
          id: "sat",
          label: "SAT / test sent",
          action: "Send SAT / test scores as FSU requires",
          deadlineId: "rd",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "materials",
        },
      ],
    },
    {
      id: "uga",
      kind: "school",
      name: "UGA",
      plan: "EA",
      planKind: "ea",
      binding: false,
      recs: "none",
      test: { mode: "self-reported", label: "Self-reported SAT" },
      notes: [
        "EA Oct 15; materials Oct 29.",
        "SAT required (self-report).",
        "Recs: none. No CSS.",
      ],
      deadlines: [
        {
          id: "ea",
          date: "2026-10-15",
          label: "EA application",
          role: "headline",
        },
        {
          id: "materials",
          date: "2026-10-29",
          label: "Materials",
          role: "docs",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the EA application",
          deadlineId: "ea",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "ea",
        },
        {
          id: "transcript",
          label: "Transcript / materials sent",
          action: "Send transcript and materials",
          deadlineId: "materials",
        },
        {
          id: "sat",
          label: "Self-reported SAT",
          action: "Self-report SAT scores",
          deadlineId: "ea",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "materials",
        },
      ],
    },
    {
      id: "cmu",
      kind: "school",
      name: "Carnegie Mellon",
      plan: "RD",
      planKind: "rd",
      houseLabel: "Animation and screenwriting",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "RD Jan 4, 2027.",
        "Recs required: 1 teacher + counselor (SCOIR: required 2).",
        "No CSS date on this board.",
      ],
      deadlines: [
        {
          id: "rd",
          date: "2027-01-04",
          label: "RD application",
          role: "headline",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the RD application",
          deadlineId: "rd",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "rd",
        },
        {
          id: "transcript",
          label: "Transcript sent",
          action: "Send the transcript",
          deadlineId: "rd",
        },
        {
          id: "sat",
          label: "SAT / test sent",
          action: "Send SAT / test scores as Carnegie Mellon requires",
          deadlineId: "rd",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "File recommendations with the RD application",
          deadlineId: "rd",
          hint: "1 teacher + counselor (SCOIR: required 2).",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "rd",
        },
      ],
    },
    {
      id: "rice",
      kind: "school",
      name: "Rice",
      plan: "RD",
      planKind: "rd",
      houseLabel: "Screenwriting and graphic novels",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "RD Jan 4, 2027.",
        "Recs required: at least 1 counselor (SCOIR: required 3–10).",
        "No CSS date on this board.",
      ],
      deadlines: [
        {
          id: "rd",
          date: "2027-01-04",
          label: "RD application",
          role: "headline",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the RD application",
          deadlineId: "rd",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "rd",
        },
        {
          id: "transcript",
          label: "Transcript sent",
          action: "Send the transcript",
          deadlineId: "rd",
        },
        {
          id: "sat",
          label: "SAT / test sent",
          action: "Send SAT / test scores as Rice requires",
          deadlineId: "rd",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "File recommendations with the RD application",
          deadlineId: "rd",
          hint: "At least 1 counselor (SCOIR: required 3–10).",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "rd",
        },
      ],
    },
    {
      id: "case",
      kind: "school",
      name: "Case Western",
      plan: "EA",
      planKind: "ea",
      houseLabel: "Writing desk",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "EA Nov 1.",
        "Recs required: 2 teacher + counselor (SCOIR: required 3–4).",
        "No CSS date on this board.",
      ],
      deadlines: [
        {
          id: "ea",
          date: "2026-11-01",
          label: "EA application",
          role: "headline",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the EA application",
          deadlineId: "ea",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "ea",
        },
        {
          id: "transcript",
          label: "Transcript sent",
          action: "Send the transcript",
          deadlineId: "ea",
        },
        {
          id: "sat",
          label: "SAT / test sent",
          action: "Send SAT / test scores as Case Western requires",
          deadlineId: "ea",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "File recommendations with the EA application",
          deadlineId: "ea",
          hint: "2 teacher + counselor (SCOIR: required 3–4).",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "ea",
        },
      ],
    },
    {
      id: "tcu",
      kind: "school",
      name: "TCU",
      plan: "EA",
      planKind: "ea",
      houseLabel: "Scripts and art",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "File Sunday, Oct 31. Official EA deadline is Nov 1 (a Sunday).",
        "Recommendations go with the file.",
        "No CSS row until confirmed.",
      ],
      deadlines: [
        {
          id: "file",
          date: "2026-10-31",
          label: "File EA (Sunday)",
          role: "headline",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "File the EA application on Sunday, Oct 31",
          deadlineId: "file",
        },
        {
          id: "fee",
          label: "Fee paid",
          action: "Pay the application fee",
          deadlineId: "file",
        },
        {
          id: "transcript",
          label: "Transcript sent",
          action: "Send the transcript",
          deadlineId: "file",
        },
        {
          id: "sat",
          label: "SAT / test sent",
          action: "Send SAT / test scores as TCU requires",
          deadlineId: "file",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "File recommendations with the application",
          deadlineId: "file",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "file",
        },
      ],
    },
  ];

  return {
    version: 1,
    appId: "coco-complete-file-board",
    audience: "house",
    policy: {
      binding: "non-binding only",
      earlyDecision: false,
    },
    household: household,
    schools: schools,
  };
});
