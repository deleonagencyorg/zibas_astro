import type { APIRoute } from 'astro';
import { CONTACT_API_HOST, API_TOKEN, LOG_LEVEL } from '../../../config/env';

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!CONTACT_API_HOST || !API_TOKEN) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Missing CONTACT_API_HOST or API_TOKEN env variable',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(request.url);
    const promotionId = url.searchParams.get('promotionId');
    const page = url.searchParams.get('page') || '1';
    const pageSize = url.searchParams.get('pageSize') || '12';
    const country = url.searchParams.get('country') || '';
    const tags = url.searchParams.getAll('tags[]');

    if (!promotionId) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing promotionId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Normalize host: ensure it ends with /api
    let baseHost = CONTACT_API_HOST.trim().replace(/\/$/, '');
    if (!baseHost.endsWith('/api')) {
      baseHost = `${baseHost}/api`;
    }

    const params = new URLSearchParams();
    params.set('promotionId', String(promotionId));
    params.set('page', String(page));
    params.set('pageSize', String(pageSize));
    if (country) params.set('country', country);
    if (tags && tags.length) {
      tags.forEach((t) => { if (t) params.append('tags[]', t); });
    }
    const targetUrl = `${baseHost}/v1/auth/participations?${params.toString()}`;

    // Server-side diagnostic log (does not print token)
    if (LOG_LEVEL !== 'silent') {
      console.log('[API/creators/participations] Fetching:', {
        targetUrl,
        promotionId,
        page,
        pageSize,
        country,
        tags,
      });
    }

    // First attempt: raw token as provided
    let res = await fetch(targetUrl, {
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    // Retry with Bearer prefix on 401
    if (res.status === 401) {
      const token = API_TOKEN.startsWith('Bearer ')
        ? API_TOKEN.slice(7)
        : API_TOKEN;
      res = await fetch(targetUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }

    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      return new Response(
        JSON.stringify({ ok: false, status: res.status, error: text, debug: { targetUrl, from: 'proxy' } }),
        {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = contentType.includes('application/json')
      ? JSON.parse(text)
      : { data: [], raw: text };

    return new Response(JSON.stringify({ ok: true, ...data, debug: { targetUrl, from: 'proxy' } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    if (LOG_LEVEL !== 'silent') {
      console.error('[API/creators/participations] Error:', err?.message || err);
    }
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Unknown error', debug: { from: 'proxy-catch' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
