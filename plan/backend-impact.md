# ThryveMS public landing page impact assessment

27 Oct 2026 — design/thryvems-immersive-landing-20261027

**No backend impact.** This change replaces only the public static product landing page presentation.
- Database schemas and relationships: unchanged.
- APIs, access/permissions, process scope and classifications: unchanged; no requests to the app backend.
- Backend workflows, security, integrations, events and backend tests: unchanged.
- Existing subscription calculator amounts and annual discount: preserved (client-side presentation only).
- Contact: existing preview form remains unconnected; no lead submission, storage or new API.
- Frontend application (dbauto/afdhlskdfs-iqms-preview): no application code changed.
- Existing backend architecture synchronization PRs remain **Pending**; this PR does not change their status.
