# FlipProof

A small, mobile-first reseller helper: identify an item from a photo, record comparable prices, draft a marketplace listing, and keep a lightweight inventory.

## MVP features

- Photo upload with phone-camera capture.
- Optional AI photo identification through the OpenAI Responses API.
- Manual item details when AI is not configured or uncertain.
- Separate active asking-price, verified sold-price, and quick-sale target fields.
- Listing title and description draft with one-tap copy.
- Device-local inventory using browser localStorage.

## Pricing integrity

This MVP does **not** retrieve live marketplace comparables or verified sold data. Enter only prices you have actually checked. Asking prices are not completed-sale evidence. Match condition, model, and completeness before using a comparable. Quick-sale price is your own pricing target, not an automated valuation.

Future marketplace data adapters must respect provider terms and access requirements. No marketplace auto-publishing is enabled.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add an OpenAI API key to `OPENAI_API_KEY` if you want photo identification.
5. Run `npm run dev` and open the local address shown by Next.js.

Without an API key, use **Enter item details manually**. Never commit API keys.

## Keep it simple

The product stays focused on Identify, Price & list, and My inventory. Inventory is currently stored in the browser on the current device; it is not synced across devices or users.
