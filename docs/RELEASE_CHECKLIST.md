# HOWIYA — Release checklist

## Ready in the current demo

- [x] Public portfolio routes and project detail routes.
- [x] Arabic/English labels and RTL/LTR direction.
- [x] Light/dark appearance and local preference storage.
- [x] Responsive navigation and mobile layouts.
- [x] Demo project CRUD, draft/publish, gallery, tags and palette.
- [x] Profile, services, testimonials, contact links and basic SEO settings.
- [x] Contact-form validation and clear demo-only messaging.
- [x] Safe external-link handling for social profiles.
- [x] Local-storage fallback and legacy sample-data cleanup.
- [x] CI build and Pages deployment workflow.

## Owner content needed before public promotion

- [ ] Replace sample projects with work you own or have permission to show.
- [ ] Replace demo image URLs with approved final assets.
- [ ] Add your real portrait or approved profile image.
- [ ] Confirm your public name, biography, services and skills.
- [ ] Add verified WhatsApp, email, Instagram and Facebook URLs.
- [ ] Add customer testimonials only with permission and accurate attribution.
- [ ] Review Arabic and English copy on desktop and mobile.

## Backend and security required for production use

- [ ] Connect Supabase Auth and remove client-side demo login.
- [ ] Create database tables and Row Level Security policies for each content collection.
- [ ] Move project/profile/service/testimonial data from LocalStorage to the database.
- [ ] Add Supabase Storage buckets and upload validation for project images.
- [ ] Send contact messages to a server-side endpoint or trusted email provider.
- [ ] Add spam protection, rate limiting and server-side validation.
- [ ] Add privacy policy, terms and consent copy where required.
- [ ] Test admin authorization, unauthenticated access, error states and data recovery.
- [ ] Configure backups and verify restore procedures.

## Release verification

- [ ] `npm run build` passes.
- [ ] GitHub Actions build check passes on the release commit.
- [ ] GitHub Pages deployment is successful.
- [ ] Verify the live URL on desktop and mobile.
- [ ] Test every navigation link, project filter, gallery control and form validation.
- [ ] Confirm no placeholder contact details, sample testimonials or unlicensed assets remain.
