# THE WORKS — Product Direction & Experience Contract

**Status:** product direction and balanced landing-page design approved on 2026-11-24. First public landing-page milestone implemented on 2026-11-24; see the current implementation checkpoint at the end of this document.

This document is the project-specific source of truth for the product model, customer journeys, shared account, company workspaces and visual direction. It supplements the inherited Iteration 13 engineering/PWA standards. When inherited generic demo behavior conflicts with this document, this document governs THE WORKS.

## 1. Product definition

**THE WORKS** is one connected customer-facing service and product platform for three participating specialist businesses:

- **PROSPEC** — branding, marketing, printing, corporate clothing, merchandise, signage, sourcing and general supplies.
- **GALAXY LIQUIDS** — mobile bars, bespoke cocktail/mocktail menus, bar packages, brand activations and private/corporate event beverage services.
- **KAVON GROUP** — event concepts and management, production, décor, VIP hospitality, holding rooms, guest transfers, logistics and execution.

Public proposition: **Business gets done here.**

Supporting copy: **Find the products, services and people you need to bring your next project to life.**

THE WORKS is a shared discovery, enquiry and customer-access platform. Do not describe the three participating businesses as a common legal parent group or imply common ownership unless the product owner later verifies and authorises that claim. Preserve each business's own identity, service terms, staff access, quotations, financial records and delivery responsibility.

THE WORKS is not merely three brochure sites stitched together, and it is not a generic business-builder/demo product.

## 2. Core product model

The product has three connected entry surfaces:

1. **Businesses** — browse PROSPEC, GALAXY LIQUIDS and KAVON GROUP directly.
2. **Services & products** — start with the customer's need and route them to the relevant provider.
3. **My Account** — one customer identity for the customer's interactions across participating businesses.

The public landing page must offer both business-first and need-first discovery. Neither path should be hidden behind the other.

The owner/staff entry is the single footer Briefcase affordance. It opens an authorised company selector, then the selected company's own admin workspace. An authorised owner may also have a group overview; this is an additional permission-controlled view, not a replacement for the company workspaces.

## 3. Public landing-page information architecture

The proposed landing page is a compact, mobile-first editorial service storefront:

1. **Compact identity/header:** THE WORKS wordmark, clear links to Find a service, Businesses and My Account. Do not crowd the header with admin controls.
2. **Purposeful hero:** headline “Business gets done here.”, concise explanation and a strong image composition representing the actual participating services. Primary action: “Find a service”. Secondary action: “Browse businesses”.
3. **Need-first discovery:** a search/input prompt such as “What do you need to make happen?” plus concise service-category shortcuts. Initial categories include:
   - Branding, marketing & creative
   - Corporate clothing, printing & merchandise
   - Product sourcing & supplies
   - Mobile bars & drinks
   - Event planning & management
   - Stage, sound & lighting
   - Décor, VIP hospitality & guest logistics
4. **Featured services/products:** real, approved listings only. Each result clearly identifies its provider. Do not invent fixed prices; use a clear “Price on request” or quote-led label when appropriate.
5. **Meet the businesses:** three distinct, recognisable brand panels/cards for PROSPEC, GALAXY LIQUIDS and KAVON GROUP, each with a short accurate description and a direct entry.
6. **How it works:** Choose a service → Send your requirements → Follow the response in My Account.
7. **Customer-account reassurance:** explain that one THE WORKS account keeps the customer's requests and updates together.
8. **Compact footer:** customer account, business links, contact/legal links as verified, and the single Briefcase icon for authorised owner/staff entry.

The landing page must not become a long generic marketing page. Prioritise the actual discovery and enquiry actions in the first viewport, use meaningful imagery, and keep supporting sections compact and scannable.

### Approved first-viewport direction: balanced

The product owner approved the **balanced** direction: combine an editorial, image-led brand introduction with immediately visible service discovery. Neither a cinematic hero nor a search directory should dominate at the expense of the other.

The first viewport should contain:
- A compact THE WORKS identity/header with Businesses and My Account access; no prominent admin navigation.
- A concise optional announcement strip only when there is a real, current notice.
- The headline **“Business gets done here.”** and short supporting proposition.
- A purposeful, high-quality hero image or image composition representing the real service mix.
- A prominent search/discovery field labelled **“What do you need to make happen?”**
- Two clear actions: **“Find a service”** (primary) and **“Browse businesses”** (secondary).
- A small set of immediately scannable service shortcuts, not a long category wall.

The first viewport should feel editorial and human, but the customer must be able to start a task immediately without scrolling. On mobile, preserve a compact vertical rhythm, readable type, touch-friendly controls and the same hierarchy; do not simply shrink a desktop composition.

Below the fold, use this order: service/category discovery and curated featured listings; the three distinct business identities; a concise three-step “How it works”; the shared My Account benefit; then a compact footer with the single owner/staff Briefcase entry. Avoid duplicating the same service list in multiple sections.

Visual styling should borrow the *qualities* of Luvie's Foods and The Plug: warm, direct storefront language; purposeful photography; bold editorial type hierarchy; image-forward cards; curated discovery; clear customer actions; honest loading/empty states. Create a distinct THE WORKS identity and palette rather than copying either reference.

This balanced composition is now the approved landing-page design direction. Further implementation details should be resolved against the inherited Iteration 13 visual standards and actual repository components, without reopening the approved first-viewport direction unless the product owner requests a change.

## 4. Service-first discovery and routing

Customers should not need to know the provider's company name before they can begin. They may search, browse a category, choose a listing or enter through a business card.

Initial routing map:

| Customer need | Provider |
|---|---|
| Marketing, advertising, brand strategy and creative | PROSPEC |
| Corporate clothing, uniforms, branded merchandise | PROSPEC |
| Printing, banners, stickers, signage and vehicle branding | PROSPEC |
| Procurement, product sourcing and general supplies | PROSPEC |
| Mobile bar hire and bespoke drink menus | GALAXY LIQUIDS |
| Cocktails/mocktails, private parties and corporate bar activations | GALAXY LIQUIDS |
| Event planning, concept development and full event management | KAVON GROUP |
| Stage, sound, lighting, décor and production | KAVON GROUP |
| VIP hospitality, executive holding rooms, guest transfers and event logistics | KAVON GROUP |

Where useful, show relevant complementary providers as optional recommendations. Example: an event-production enquiry may also surface mobile-bar services and branded event merchandise. Never force a bundle or obscure which business will deliver each service.

### Provider-specific experience expectations

- **PROSPEC:** build a professional, Amrod-inspired catalogue experience. Support product categories, product images/codes, colours, sizes/variants, custom branding options, quantities, sourcing and quote requests. A fixed public price is not required when the actual model is quote-based.
- **GALAXY LIQUIDS:** centre the experience on mobile-bar packages, cocktail/mocktail menus, bespoke options, event date/venue/guest count, requirements, quotation and booking coordination. Do not turn it into a generic retail shop.
- **KAVON GROUP:** centre the experience on event briefs, concepts, production, décor, hospitality, logistics, project scope, quotations, planning and execution. Reuse and adapt the existing Kavon example/demo where its work is valid; do not preserve generic inherited sample services as Kavon offerings.

## 5. Customer identity and account journey

Use one THE WORKS customer identity across the platform. A customer should not need three separate usernames/passwords to work with the three businesses.

Recommended journey:

1. Browse services/products anonymously.
2. Open a listing and understand its full description, provider, price/quote status and next action.
3. Submit an enquiry/request with the essential contact and job details without being forced through account registration first.
4. Create or activate the shared customer account after submission, with details already entered carried forward where technically supported.
5. Return to My Account to follow enquiries, quotations, approvals, messages, project/booking status, receipts and future requests.

Returning customers may sign in earlier and have their known details prefilled. Account creation must be offered as a useful next step, not used as an unnecessary barrier to discovery or first enquiry.

One account does **not** mean one shared company record. Every enquiry, quotation, message, booking/project, payment and receipt must remain associated with its actual provider business. Staff access is restricted by company and role. A PROSPEC staff member must not automatically see GALAXY LIQUIDS or KAVON customer conversations or financial records.

Do not represent browser-local demo records as real accounts, shared records or cloud-synchronised data.

## 6. Owner's Briefcase and company workspaces

The single 💼 Briefcase entry opens the authorised owner/staff access flow. After authentication and permission resolution, show:

- PROSPEC — catalogue, products/variants, sourcing, print jobs, enquiries, quotations, customers and business records.
- GALAXY LIQUIDS — packages, drink menus, bookings, event details, enquiries, quotations, customers and event operations.
- KAVON GROUP — event projects, production tasks, décor, hospitality, logistics, enquiries, quotations, customers and execution.
- Group overview — only for owners explicitly authorised to view cross-company reporting.

The selector is navigation, not security. Enforce authentication and company-level permissions on server actions and data boundaries. Do not expose admin workspaces merely by hiding or showing a client-side button.

## 7. Visual genre and reference interpretation

**Dominant genre: Character-led editorial service storefront.** This gives a multi-business platform a recognisable human personality and a strong sense of craft without making it feel like a corporate directory.

**Secondary expressions:**
- **Atmosphere** for purposeful, high-quality photography and the hero/brand storytelling.
- **Data** for account records, quotations, status tracking and the operational Briefcase.
- **Loud** only for occasional campaign/announcement moments, not as the default for every surface.

Use the repositories gatshaayanda/luvies-foods and gatshaayanda/the-plug as targeted visual and user-flow references only. Iteration 13 remains the architecture and working-functionality foundation.

### Transferable qualities from Luvie's Foods

- Immediate brand identity and a concise brand statement.
- Image-led hero with a short confident headline and clear primary action.
- A compact, direct Store-to-customer-action flow.
- Product/service content presented as the main event, not buried under generic marketing copy.
- Visible live-content/loading/empty states that tell the truth.
- Clear customer-account access and a natural continuation from a selection into the account/request journey.
- Warm, human copy and a distinctive editorial finish.

### Transferable qualities from The Plug

- A confident editorial storefront with a concise announcement/notice strip where genuinely needed.
- Bold typographic hierarchy and a clear, compact navigation.
- Image-forward catalogue cards with clear categories, detail access, save/select/request actions.
- Useful discovery sections and curated feeds rather than a generic wall of links.
- A customer space that explains practical benefits (history, updates, continuity) without forcing registration before browsing.
- Optional guided help that stays secondary to the main customer journey.

### Do not copy

Do not copy Luvie's or The Plug's business identity, logos, exact copy, palettes, product content, routes, data models, authentication, backend, or business-specific workflow. THE WORKS needs its own restrained identity and design tokens. Each provider's own brand must remain visible within its business experience.

Keep the visual language compact and mobile-first across landing, catalogue, service detail, request, account and admin. Use readable contrast, full descriptions, sensible touch targets, restrained surfaces and purposeful imagery. Do not truncate essential listing descriptions or hide essential price/quote information.

## 8. Inherited setup/demo behavior to retire

THE WORKS is a pre-defined multi-business service platform, not a blank business-builder. Retire the inherited first-run “Create a business / Use previous business / Load or explore an example” identity-onboarding choice from the customer entry experience.

Do not ask a public visitor to create a business, load a demo business, select a saved local business, or configure a generic brand before they can see the public platform. Do not seed generic Iteration 13 services, sample business identities or fictitious customer activity into the live THE WORKS experience.

The three real provider identities and their service catalogues are configured as product data by the authorised platform/business operators. Any internal development fixture must be clearly isolated from public production content and must never be presented as a real business, customer, order, price or activity record.

The old generic setup workflow may be retained temporarily as isolated legacy code during migration only if it is unreachable from customer navigation and cannot overwrite THE WORKS provider data. Remove it after the replacement public landing and owner company-selector routes are verified. Preserve unrelated protected PWA installation, offline, account, receipt and Briefcase functionality while adapting the foundation.

## 9. Scope and implementation order

1. Establish this product contract and project-specific design direction.
2. Replace the inherited generic first-run identity/setup gate with the THE WORKS public landing and service/business discovery experience.
3. Establish the shared customer identity and account entry/continuation behavior, while preserving provider-level data separation.
4. Establish the owner Briefcase company selector and permission-aware workspaces.
5. Implement/curate PROSPEC's catalogue and quotation journey.
6. Adapt the GALAXY LIQUIDS event/mobile-bar journey.
7. Adapt the existing KAVON experience to its real event-production workflow.
8. Add optional cross-provider recommendations and authorised group-level reporting after the core journeys are correct.

The product owner has reviewed and approved the balanced landing-page composition. This document records the approved plan, not a claim that these workflows are already implemented.

## 10. Foundation protections and boundaries

- Preserve the Iteration 13 PWA install lifecycle and service-worker/offline protections. Read the inherited installation lock before any PWA changes.
- Keep the application mobile-first, compact and readable at every customer and admin step.
- Use UploadThing for approved media uploads; do not introduce Firebase Storage rules or migrate uploads to Firebase Storage.
- The product owner handles Firebase project configuration/rules unless explicitly delegated. Do not copy credentials, project IDs or secrets from another app.
- Treat GitHub main as source of truth. Verify actual code, workflows and deployment state before claiming completion.
- Preserve existing working behavior unless this product contract explicitly replaces generic demo/setup behavior.


## 12. Implementation checkpoint — 2026-11-24

### Delivered: public landing milestone
- Replaced the public root entry with THE WORKS balanced editorial storefront.
- Added the compact identity header, hero proposition, service search field and four service shortcuts in the first viewport.
- Added provider-labelled matching service results using a curated service map derived from the supplied company profiles.
- Added three separate business showcases, concise three-step journey explanation, shared-account benefit section and compact footer with one Briefcase icon.
- Added responsive styling with warm paper, charcoal, deep green and amber; Manrope headings and DM Sans body/interface type.
- Updated application metadata and the app manifest's product labels/theme colour. The existing icon assets remain inherited and are not yet THE WORKS-branded.
- Preserved the previous Iteration 13 root setup/demo at /studio during migration; it is no longer the public root experience.

### Honest boundaries / not yet delivered
- Search results are curated discovery entries, not live catalogues, stock, package availability or pricing.
- Search/category selection currently identifies a provider and jumps to its business panel; it does not yet create a quote request or enquiry.
- The /account and /admin routes are inherited and have not yet been adapted into the shared THE WORKS customer account or authenticated company selector.
- The Briefcase footer icon currently points to the inherited /admin route. Do not treat that route as the final three-company selector or as company-isolated administration.
- No Firebase configuration, rules, storage or business data were changed.
- Hero and business-card images are remote Unsplash sample imagery. Replace them with approved company-owned assets before presenting the platform as a finished client-facing launch.
- PWA installation behavior and service-worker/offline behavior were not intentionally changed. The icon assets and offline cache contents still require a separate, controlled THE WORKS identity migration and offline verification.

### Next implementation milestones
1. Build the authenticated, permission-checked Briefcase company selector and three isolated company admin workspaces.
2. Build the shared THE WORKS customer identity/account with company-scoped requests, quotations, conversations, projects/bookings, payments and receipts.
3. Build provider-specific public service/catalogue experiences: Amrod-style PROSPEC catalogue; Galaxy mobile-bar packages and menus; Kavon event/project brief.
4. Connect enquiries and quote workflows to the real approved persistence boundary after Firebase/project configuration and rules are explicitly authorised.
5. Replace stock imagery and inherited PWA icon identity with approved THE WORKS and company assets, preserving the installation lock and testing offline behavior.
