# House complete-file board

Phone-friendly house tracker for eight non-binding college files. Not a student-facing app. No Early Decision. SMU is not on this list; TCU was named over SMU.

This is a complete-file board: application, fee, transcript, SAT/test, recommendations where required, and portal. It is not a Common App, essay workspace, CSS wizard, or net-cost tool. It does not submit anything.

Auburn is tracked only. CoCo files that application herself. This board never submits.

## Open it

GitHub Pages: https://gildernew-max.github.io/CoCo-Admissions-App/

If that URL is not live yet, enable it once: **Settings → Pages → Build and deployment → Source: GitHub Actions**, then re-run the Pages workflow. The token used to open this PR cannot flip that setting.

Until Pages is on, this branch can be opened at:
https://raw.githack.com/gildernew-max/CoCo-Admissions-App/cursor/coco-complete-file-board-a98a/index.html

On a computer: open `index.html`, or from this folder run `python3 -m http.server 8080` and visit http://localhost:8080/

## What is seeded

Eight schools:

| School | Plan | Headline date | Recs |
| --- | --- | --- | --- |
| Auburn | EA Round 1 | Sep 15, 2026 complete file. Official SAT to 1005 is unknown (look-only; do not send). Dec 1 last EA/merit is in detail. | None |
| Georgia Tech | EA1 (Georgia) | Oct 15; docs Oct 30; self-reported SAT Nov 16 | None |
| FSU | Regular | Dec 1; materials Dec 8. No EA (Florida residents only) | None |
| UGA | EA | Oct 15; materials Oct 29. SAT required (self-report) | None |
| Carnegie Mellon | RD | Jan 4, 2027 | Required |
| Rice | RD | Jan 4, 2027 | Required |
| Case Western | EA | Nov 1 | Required |
| TCU | EA | File Oct 31 (Nov 1 official EA in detail) | With the file |

No SMU, UVA, Emory, or Boston University. No CSS rows on TCU, Case Western, Carnegie Mellon, or Rice. No SRAR row.

Household (not a school): FSA IDs for CoCo and one parent before Oct 1; FAFSA/CSS open Oct 1; May 1, 2027 national reply for all eight.

## Checks and backup

Checklist state is stored in the browser (`localStorage`). Export JSON or copy JSON, then import on another phone. Reset checks only clears this device.

## Tests

```bash
node tests/logic.test.js
```

## Repo

https://github.com/gildernew-max/CoCo-Admissions-App.git
