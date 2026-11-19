# AI contribution guidance

AI Base is a minimal, static HTML/CSS/JavaScript starter. Keep it usable without a required build step or runtime dependencies.

- Work in small, reviewable vertical slices. Use test-driven development: define expected behavior, add a focused failing check, implement the smallest change, and rerun the relevant checks.
- Prefer semantic HTML, accessible interaction, mobile-first responsive styles, and the repository's existing class-based CSS and partial organization. Reuse existing patterns; do not duplicate the grid system, although you can expand it to improve it..
- Keep optional development and test tooling separate from the published site's runtime.
- Update the relevant documentation and `styleguide.html` examples whenever a feature is added or its behavior changes. Do not document proposed work as completed.
- For new behavior or tooling with unresolved design choices, record the proposal and decision needed before treating it as established.

See [the design principles and roadmap](roadmap.html) for the agreed direction and proposed feature order.
