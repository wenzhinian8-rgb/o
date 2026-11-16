# Ocaso chat

- `index.html`: app entry point
- `styles.css`: responsive layout and visual system
- `app.js`: client interactions and local character/message storage

## Registration API contract

The WeChat-style phone registration form expects same-origin Worker endpoints:

- `POST /api/auth/send-code` with `{ "phone": "...", "region": "86" }`
- `POST /api/auth/register` with `{ "phone": "...", "region": "86", "code": "...", "password": "...", "nickname": "..." }`

Both endpoints should return JSON with `{ "ok": true }`; registration must also return a `user` object. Set any authenticated session using a secure, HttpOnly cookie. The static frontend deliberately does not generate demo SMS codes or report a successful registration when the Worker endpoints are missing.

Profiles, characters, and messages currently use browser storage. Server-side accounts, one-device licensing, and Tavern access locks still need Worker-side verification and persistent storage; client-side state is not an authorization boundary.
