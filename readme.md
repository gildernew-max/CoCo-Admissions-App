# CoCo complete-file board

Phone-friendly tracker for Gabrielle “CoCo” Grace Gildernew (Marist School, Class of 2027, SAT 1470). Dave and CoCo use it to see what is still open on nine non-binding files. No Early Decision.

This is a complete-file board: application, fee, transcript, SAT/test, recommendations where required, and portal. It is not a Common App, essay workspace, CSS wizard, or net-cost tool. It does not submit anything.

Auburn is on the board because CoCo is filing that application herself. The row is tracking only.

## Open it

GitHub Pages (after it is enabled): https://gildernew-max.github.io/CoCo-Admissions-App/

On a computer: open `index.html`, or from this folder run `python3 -m http.server 8080` and visit http://localhost:8080/

## What is seeded

Nine schools, in the plan actually being filed:

| School | Plan | Next headline date | Recs |
| --- | --- | --- | --- |
| Auburn | EA Round 1 | Sep 15, 2026 complete file | None |
| Georgia Tech | EA1 (Georgia) | Oct 15; docs Oct 30; self-reported SAT Nov 16 | None |
| UGA | EA | Oct 15; materials Oct 29 | None |
| SMU | EA | File Oct 31 (Nov 1 is Sunday); auto merit with Nov 1 | With the file |
| TCU | EA | Nov 1 | With the file |
| UVA | EA, out-of-state | Nov 1; teacher/counselor forms Nov 8 | Required |
| Emory / Oxford | RD | Scholar Programs Nov 15 if she wants that pool; RD Jan 1; CSS/FAFSA/IDOC Feb 10 | Required |
| FSU | Regular | Dec 1; materials Dec 8. No EA (Florida residents only) | None |
| Boston University | RD | Some merit scholarships Dec 1; RD + CSS/FAFSA Jan 5 | Required |

Household (not a school): FSA IDs for CoCo and one parent before Oct 1; FAFSA/CSS open Oct 1; May 1, 2027 national reply for all nine.

Fallback RD dates sit under **Dates and notes** when EA is the plan. Optional items (Scholar Programs, some BU merit) can be checked if filed or not pursuing.

## Checks and backup

Checklist state is stored in the browser (`localStorage`). Export JSON or copy JSON, then import on the other phone. Reset checks only clears this device.

## Tests

```bash
node tests/logic.test.js
```

## Repo

https://github.com/gildernew-max/CoCo-Admissions-App.git
