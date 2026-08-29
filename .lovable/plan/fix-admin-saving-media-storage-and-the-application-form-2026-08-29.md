# Fix admin saving, media storage, and the application form

## What's wrong today

- The admin editor saves everything (text, links, sections, logos, colors) only into your own browser's local storage. There is no Publish control mounted anywhere in the admin panel, so nothing ever reaches the backend and visitors keep seeing the default content.
- Uploaded images and videos go to a private storage bucket and are stored as temporary signed links. Those links can expire and are tied to the private bucket, so media can disappear or fail to load for visitors.
- Videos larger than 2 MB are rejected — that is a leftover browser-only fallback limit for when there is no cloud storage, not a real storage limit.
- The membership form on the page does nothing with its data: it just shows a "Thank you" message. Nothing is stored or sent anywhere.

## What will change

**1. Publishing that actually works**
- Mount the cloud sign-in + Publish bar in the admin panel header (next to Reset/Done), with a clear "signed in as admin / not admin" indicator and success/error feedback.
- Pressing Publish writes the whole site configuration — all text, links, section settings, theme colors, logos, media URLs — to the backend. Visitors then load that published version.
- Local storage stays only as your working draft between edits.

**2. Public, permanent media**
- Make the `site-media` bucket public so uploaded images and videos get permanent URLs. (If the workspace still blocks public buckets, I will report it and keep signed URLs, refreshing them on load.)
- Replace signed-URL generation with stable public URLs, and update any previously stored signed URLs so existing uploads keep working.
- Remove the 2 MB video cap for cloud uploads. Uploads go straight to storage with the bucket's 50 MB per-file limit; images are still auto-optimized, videos are uploaded as-is.
- Upload requires being signed in as admin — no silent fallback to a browser-only copy that would never publish. If not signed in, the editor says so.

**3. Membership applications stored + admin inbox**
- New `applications` table storing first name, last name, email, phone, country, chosen tier, plus timestamp and status (new / contacted / archived).
- Anyone can submit; only admins can read, update, or delete. Inputs validated (required fields, valid email, length limits) on the client and constrained in the database.
- New "Applications" tab in the admin panel listing submissions newest-first, with the ability to mark contacted/archived and copy the applicant's email. Includes a CSV export.
- New "Notifications email" field in admin settings where you set the address that should receive applications. Stored in `admin_settings`; the admin inbox shows it and applications are visible there immediately.
- Note: actual outgoing email delivery is not part of this (it needs an email service and a verified sending domain). Say the word later and I'll add it.

**4. Fonts + finish**
- Add the Cormorant Garamond + Jost font links so headings render correctly.
- Typecheck/build pass and a live check of: edit → publish → reload as a visitor, image upload, video upload, form submit → appears in admin inbox.

## Technical notes

- Storage bucket flipped to public via the storage update tool; RLS policies on `storage.objects` keep writes admin-only while reads become public.
- `applications` table gets explicit GRANTs: `INSERT` to `anon` and `authenticated`, `SELECT/UPDATE/DELETE` to `authenticated` gated by `is_admin()`, plus `ALL` to `service_role`; `updated_at` trigger reuses `touch_updated_at()`.
- `mediaRepository.ts` switches from `createSignedUrl` to `getPublicUrl`; `fields.tsx` drops `MAX_LOCAL_VIDEO_MB` and the local data-URL fallback path for cloud-enabled sessions.
- Form submission goes through the browser client with Zod validation; the admin inbox reads through the same client under admin RLS.
