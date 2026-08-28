(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.BOARD_DATA = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const student = {
    name: "Gabrielle Grace Gildernew",
    nickname: "CoCo",
    school: "Marist School",
    classYear: 2027,
    sat: 1470,
  };

  const household = {
    id: "household",
    kind: "household",
    name: "Household",
    plan: "Shared",
    binding: false,
    recs: "none",
    notes: [
      "Not a school. These items apply across all nine files.",
      "FSA IDs for CoCo and one parent are due before Oct 1.",
      "FAFSA and CSS open Oct 1. This board only tracks that they exist — it is not a FAFSA/CSS form.",
      "May 1, 2027 is the national reply date for all nine schools.",
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
        action: "Choose and reply by May 1, 2027",
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
      test: {
        mode: "official",
        label: "Official SAT sent (College Board 1005)",
      },
      notes: [
        "Complete file by Sep 15: application, $50 fee, official SAT to College Board 1005, transcript via SCOIR/Parchment, then Applicant Portal.",
        "No recommendations.",
        "CoCo is filing this application herself. This board only tracks it; it does not submit anything.",
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
          action: "Submit the Auburn application (CoCo files)",
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
          label: "Official SAT sent (College Board 1005)",
          action: "Send official SAT to College Board code 1005",
          deadlineId: "complete-file",
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
        "No recommendations.",
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
          action: "Submit the EA1 application",
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
      id: "uga",
      kind: "school",
      name: "UGA",
      plan: "EA",
      planKind: "ea",
      binding: false,
      recs: "none",
      test: { mode: "self-reported", label: "Self-reported SAT" },
      notes: ["EA Oct 15; materials Oct 29. No recommendations."],
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
          action: "Submit the EA application",
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
      id: "smu",
      kind: "school",
      name: "SMU",
      plan: "EA",
      planKind: "ea",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "EA is Nov 1. File Sunday, Oct 31.",
        "Recommendations go with the file.",
        "Automatic merit consideration with a Nov 1 file.",
      ],
      deadlines: [
        {
          id: "file",
          date: "2026-10-31",
          label: "File EA (Sunday)",
          role: "headline",
        },
        {
          id: "ea",
          date: "2026-11-01",
          label: "Official EA deadline",
          role: "official",
        },
        {
          id: "merit",
          date: "2026-11-01",
          label: "Auto merit with EA file",
          role: "merit",
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
          action: "Send SAT / test scores as SMU requires",
          deadlineId: "file",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "Submit recommendations with the file",
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
    {
      id: "tcu",
      kind: "school",
      name: "TCU",
      plan: "EA",
      planKind: "ea",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: ["EA Nov 1. Recommendations go with the file."],
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
          action: "Submit the EA application",
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
          action: "Send SAT / test scores as TCU requires",
          deadlineId: "ea",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "Submit recommendations with the file",
          deadlineId: "ea",
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
      id: "uva",
      kind: "school",
      name: "UVA",
      plan: "EA",
      planKind: "ea",
      binding: false,
      recs: "required",
      residency: "out-of-state",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "EA Nov 1; teacher and counselor forms Nov 8.",
        "Recommendations required.",
        "Out-of-state.",
      ],
      deadlines: [
        {
          id: "ea",
          date: "2026-11-01",
          label: "EA application",
          role: "headline",
        },
        {
          id: "recs",
          date: "2026-11-08",
          label: "Teacher / counselor forms",
          role: "recs",
        },
      ],
      items: [
        {
          id: "app",
          label: "Application submitted",
          action: "Submit the EA application",
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
          action: "Send SAT / test scores as UVA requires",
          deadlineId: "ea",
        },
        {
          id: "recs",
          label: "Teacher / counselor forms submitted",
          action: "Submit teacher and counselor forms",
          deadlineId: "recs",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "recs",
        },
      ],
    },
    {
      id: "emory",
      kind: "school",
      name: "Emory / Oxford",
      plan: "RD",
      planKind: "rd",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "No Early Decision. RD application is Jan 1.",
        "Scholar Programs Nov 15 is optional — only if she wants that pool. Check the box if filed or not pursuing.",
        "Recommendations required.",
        "Aid documents (CSS / FAFSA / IDOC) Feb 10. Tracked here as a date, not as a form wizard.",
      ],
      deadlines: [
        {
          id: "scholars",
          date: "2026-11-15",
          label: "Scholar Programs (optional)",
          role: "optional",
        },
        {
          id: "rd",
          date: "2027-01-01",
          label: "RD application",
          role: "headline",
        },
        {
          id: "aid",
          date: "2027-02-10",
          label: "CSS / FAFSA / IDOC",
          role: "aid",
        },
      ],
      items: [
        {
          id: "scholars",
          label: "Scholar Programs (file or not pursuing)",
          action: "File Scholar Programs, or check this if not pursuing",
          deadlineId: "scholars",
          optional: true,
        },
        {
          id: "app",
          label: "Application submitted",
          action: "Submit the RD application",
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
          action: "Send SAT / test scores as Emory requires",
          deadlineId: "rd",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "Submit recommendations",
          deadlineId: "rd",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "rd",
        },
        {
          id: "aid",
          label: "CSS / FAFSA / IDOC submitted",
          action: "Submit CSS, FAFSA, and IDOC",
          deadlineId: "aid",
          group: "aid",
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
        "No recommendations.",
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
          action: "Submit the regular application",
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
      id: "bu",
      kind: "school",
      name: "Boston University",
      plan: "RD",
      planKind: "rd",
      binding: false,
      recs: "required",
      test: { mode: "self-reported", label: "SAT / test sent" },
      notes: [
        "Some merit scholarships Dec 1. Check the box if filed or not pursuing.",
        "RD application and CSS / FAFSA Jan 5.",
        "Recommendations required.",
      ],
      deadlines: [
        {
          id: "merit",
          date: "2026-12-01",
          label: "Some merit scholarships",
          role: "optional",
        },
        {
          id: "rd",
          date: "2027-01-05",
          label: "RD application + CSS / FAFSA",
          role: "headline",
        },
      ],
      items: [
        {
          id: "merit",
          label: "Merit scholarships (file or not pursuing)",
          action: "File merit scholarships, or check this if not pursuing",
          deadlineId: "merit",
          optional: true,
        },
        {
          id: "app",
          label: "Application submitted",
          action: "Submit the RD application",
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
          action: "Send SAT / test scores as BU requires",
          deadlineId: "rd",
        },
        {
          id: "recs",
          label: "Recommendations submitted",
          action: "Submit recommendations",
          deadlineId: "rd",
        },
        {
          id: "portal",
          label: "Applicant portal checked",
          action: "Check the applicant portal",
          deadlineId: "rd",
        },
        {
          id: "aid",
          label: "CSS / FAFSA submitted",
          action: "Submit CSS and FAFSA",
          deadlineId: "rd",
          group: "aid",
        },
      ],
    },
  ];

  return {
    version: 1,
    appId: "coco-complete-file-board",
    student: student,
    policy: {
      binding: "non-binding only",
      earlyDecision: false,
    },
    household: household,
    schools: schools,
  };
});
