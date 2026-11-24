# THE WORKS — Business & Experiences

**Business gets done here.**

THE WORKS is one public discovery and customer-access platform for three participating specialist businesses: PROSPEC, GALAXY LIQUIDS and KAVON GROUP. This does not assert common legal ownership. Each business remains responsible for its own services, quotations, customers, staff permissions and financial records.

## Start here
- [THE WORKS Product Direction](docs/THE-WORKS-PRODUCT-DIRECTION.md) — approved product model, landing structure, customer journeys, company workspaces and implementation roadmap.
- [Project Operating Contract](AGENTS.md) — authoritative project-specific rules and protected behavior.
- [Design Direction](DESIGN.md) — approved Atmosphere-led visual genre and reference adaptation.
- [Iteration 13 Start Here](START-HERE.md) — inherited engineering, change-safety, PWA and offline standards.

## Public landing experience
The public root now provides:
- A balanced editorial hero with search and category shortcuts immediately available.
- Provider-labelled service discovery for customers who start with a need rather than a company name.
- Three distinct business showcases.
- A concise three-step explanation and shared-account proposition.
- A compact footer with one owner Briefcase icon.

The visual direction adapts Luvie's Foods' warm, direct customer language and purposeful storefront actions with The Plug's editorial hierarchy, curated discovery, image-forward cards and discreet account/Briefcase navigation. These are visual and interaction references only. Iteration 13 remains the technical foundation.

## Participating businesses
- **PROSPEC:** marketing, branding, corporate clothing, printing, merchandise, signage, sourcing and supplies.
- **GALAXY LIQUIDS:** mobile bars, bespoke cocktail/mocktail menus, private events and corporate activations.
- **KAVON GROUP:** event planning, production, décor, VIP hospitality, guest logistics and execution.

## Current boundaries
- The landing search filters an initial curated service map. It is not a live catalogue, inventory, package availability feed or enquiry submission workflow.
- Business panels describe the participating providers; company-specific catalogue and booking experiences are subsequent milestones.
- The inherited Iteration 13 setup/demo is preserved at /studio for migration and recovery only. It is not the public entry point.
- The inherited /account and /admin routes are not yet the shared THE WORKS customer account or the final authenticated, company-scoped Briefcase selector. Do not claim otherwise.
- Hero and card photography currently uses remote Unsplash sample images. Replace with approved company-owned assets before public launch.
- The inherited PWA icon assets have not yet been rebranded. PWA install behavior and service-worker/offline behavior remain protected and were not intentionally redesigned in this milestone.

## Foundation and protected behavior
This project was cloned from gatshaayanda/iteration13. Preserve native beforeinstallprompt capture and click-to-prompt behavior, embedded-browser handling, iOS Safari installation guidance, manifest/install eligibility, service-worker cache namespace, offline shell and update behavior. Preserve existing Firebase/Auth/Firestore and UploadThing configuration. Do not configure Firebase, change rules or add Firebase Storage without explicit instruction.

## Verification
Run the repository's package scripts:
- npm ci
- npm run verify:identity
- npm run lint
- npm run build

A successful push is not proof of build, deployment, cross-company isolation, production authentication or physical-device/offline QA.
