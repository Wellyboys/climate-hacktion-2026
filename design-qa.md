# ReGround map visualization — design and interaction QA

final result: passed

## Visual truth and evidence
- User references: `/var/folders/td/l20cb81d1395t6f6d_h1d1kc0000gn/T/codex-clipboard-2ff13fb0-e2b0-4cda-8292-a6b9b421debb.png` and `/var/folders/td/l20cb81d1395t6f6d_h1d1kc0000gn/T/codex-clipboard-adc1cce5-f155-47d5-909c-0966361967bd.png`.
- Implementation: `outputs/Hackaton-Project.html`, reviewed in the Codex in-app browser at http://127.0.0.1:4187/.
- Browser screenshot: `outputs/ReGround-map-preview.jpg` (1015 × 848 px).
- Mobile screenshot: `outputs/ReGround-mobile.jpg`. Temporary 390 × 844 viewport requested; the in-app surface reported 341 CSS px effective document width. Document width and scroll width were both 341, so no horizontal overflow. Exported full-page image is scaled to 309 × 2055; it is supporting evidence, not a 1:1 density comparison.
- Side-by-side comparison opened and reviewed: `work/reference-comparison.jpg`. Reference 2 is 960 × 608; implementation map region cropped from (30,48) to (974,650) and fit proportionally into an equal 960 × 610 comparison area. The source and implementation show different cities and datasets by design.
- State: Auckland, soil comparison, 2035, 3D. Full New Zealand geography, distance mode, emissions mode, baseline 2026, column popup, and mobile scrolled map were also directly inspected.
- Focused fidelity review: map/columns, legend and timeline are readable in the side-by-side comparison; legend values and column click details were inspected directly at browser viewport size. No extra cropped comparison was required for these large elements.

## Findings and resolution history
1. [P1, resolved] CARTO raster tiles returned an API-key-required image. Replaced with OpenStreetMap public street tiles. Post-fix rendered screenshot shows the actual Auckland coastline, roads and labels; the MapLibre engine and Natural Earth New Zealand boundary are embedded in the HTML.
2. [P2, resolved] The mobile story and wrapped map toolbar overlapped. Changed mobile story, toolbar and status to flow layout, then sized the geographic viewport below them. Post-fix mobile view shows distinct story, controls and map regions.
3. [P2, resolved] A wrapped mobile data-position caption touched the timeline. Added space beneath the timeline and made the caption use the available width. The corrected mobile map and numeric results were inspected after reload.
4. No remaining actionable P0/P1/P2 issue found in reviewed states.

## Five fidelity surfaces
- Typography: restrained serif headline/story title with readable system sans-serif controls and tabular numeric results; wrapping inspected on desktop and mobile.
- Layout: geographic map is the central visual region, with a compact legend/story, camera controls, genuine NZ locator, and a year scrubber. Mobile places the longer story above the map to avoid obscuring it.
- Colors: orange/blue comparison columns match the reference's categorical treatment; dark green and ivory preserve ReGround's design language. Categories keep their colors across mode switches.
- Geographic and asset quality: rendered geographic imagery uses actual OpenStreetMap tiles; country boundary comes from Natural Earth. No hand-drawn country silhouette or generated map imagery is used. Map controls and marker assets are supplied by MapLibre.
- Copy/content: the three views explain soil disposal, transport-distance opportunity, and emissions impact. All quantities derive from the repository's Auckland-wide model. Columns are explicitly aggregate comparison anchors rather than project sites; no district/site statistics were invented.

## Primary interactions checked
- Soil, distance and emissions buttons update narrative, legend values and 3D columns.
- Keyboard Home/End on the year slider changes 2026/2035 results. 2026: 20,000 t reused and 168 t CO2-e avoided. 2035: 222,666 t reused and 1,870 t CO2-e avoided.
- Play restarts at 2026 when at 2035, progresses annually, and stops at 2035. Play/Pause toggling inspected.
- New Zealand/close-up camera controls, locator action, 2D/3D and reset inspected.
- Clicking the orange column displays its year, value, units and aggregate scope.
- Mobile controls, geographic display, timeline and numeric cards directly inspected; no horizontal overflow in the effective mobile viewport.
- Browser console warning/error inspection returned no entries after the final tile fix and interaction checks.
- Inline application script syntax check passed.

## Intentional content constraints / follow-up polish
The references contain dense site-level columns. The repository contains one Auckland aggregate annual scenario. Two comparable aggregate columns therefore communicate the supplied data truthfully; density is intentionally lower. A genuine spatial distribution requires geocoded source/receiver records before adding a site layer.
Street detail needs internet; embedded Natural Earth coastline and scenario calculations remain available without street tiles. The app requires WebGL, and a visible message is provided when initialization fails. Slow-network and WebGL-disabled failure states were not separately simulated.
