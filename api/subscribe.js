// Vercel serverless function — early-access email capture.
//
// The browser POSTs to /api/subscribe (same-origin, so ad blockers and
// tracker-blockers can't touch it). This function then relays the signup
// to Klaviyo server-side, where there's no CORS and no blocker.
//
// Public company_id (site ID) is safe to keep here. List = Drop 001 Early Access.

const KLAVIYO_COMPANY_ID = 'Y8reLa';
const KLAVIYO_LIST_ID = 'VTMznW';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method not allowed' });
    return;
  }

  // Vercel auto-parses JSON bodies, but guard for a raw string just in case.
  let email = '';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    email = String(body.email || '').trim();
  } catch (e) {
    res.status(400).json({ ok: false, error: 'bad request body' });
    return;
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    res.status(400).json({ ok: false, error: 'invalid email' });
    return;
  }

  try {
    const kRes = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=' + KLAVIYO_COMPANY_ID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'revision': '2024-10-15' },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            custom_source: 'early access form',
            profile: { data: { type: 'profile', attributes: { email: email } } }
          },
          relationships: { list: { data: { type: 'list', id: KLAVIYO_LIST_ID } } }
        }
      })
    });

    if (kRes.ok) {            // 202 Accepted
      res.status(200).json({ ok: true });
    } else {
      let detail = '';
      try { detail = (await kRes.text()).slice(0, 300); } catch (e) {}
      res.status(502).json({ ok: false, error: 'klaviyo rejected', status: kRes.status, detail });
    }
  } catch (err) {
    res.status(502).json({ ok: false, error: 'relay failed: ' + String(err) });
  }
}
