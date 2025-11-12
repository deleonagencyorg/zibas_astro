import type { APIRoute } from 'astro';
import { CONTACT_API_HOST, API_TOKEN, LOG_LEVEL } from '../../../config/env';

// Ensure this endpoint runs on the server at runtime (required for POST)
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const publicHost = (import.meta as any).env.PUBLIC_API_HOST || '';
    const publicToken = (import.meta as any).env.PUBLIC_API_TOKEN || '';
    const effectiveHost = (CONTACT_API_HOST || '').trim() || publicHost;
    const effectiveToken = (API_TOKEN || '').trim() || publicToken;

    if (!effectiveHost || !effectiveToken) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing API host or token' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!/^https?:\/\//i.test(effectiveHost)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid API host. Expected absolute URL with http/https', received: effectiveHost }),
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
    let baseHost = effectiveHost.trim().replace(/\/$/, '');
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
        Authorization: effectiveToken,
        'Content-Type': 'application/json',
      },
    });

    // Retry with Bearer prefix on 401
    if (res.status === 401) {
      const token = effectiveToken.startsWith('Bearer ')
        ? effectiveToken.slice(7)
        : effectiveToken;
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const publicHost = (import.meta as any).env.PUBLIC_API_HOST || '';
    const publicToken = (import.meta as any).env.PUBLIC_API_TOKEN || '';
    const effectiveHost = (CONTACT_API_HOST || '').trim() || publicHost;
    const effectiveToken = (API_TOKEN || '').trim() || publicToken;

    if (!effectiveHost || !effectiveToken) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing API host or token' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({} as any));
    const promotionId = String(body?.promotionId || '');
    const page = String(body?.page || '1');
    const pageSize = String(body?.pageSize || '12');
    const country = String(body?.country || '');
    const tags: string[] = Array.isArray(body?.tags) ? body.tags : (body?.tag ? [String(body.tag)] : []);

    if (!promotionId) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing promotionId in body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let baseHost = CONTACT_API_HOST.trim().replace(/\/$/, '');
    if (!baseHost.endsWith('/api')) {
      baseHost = `${baseHost}/api`;
    }

    const params = new URLSearchParams();
    params.set('promotionId', promotionId);
    params.set('page', page);
    params.set('pageSize', pageSize);
    if (country) params.set('country', country);
    if (tags && tags.length) tags.forEach((t) => t && params.append('tags[]', t));

    const targetUrl = `${baseHost}/v1/auth/participations?${params.toString()}`;

    if (LOG_LEVEL !== 'silent') {
      console.log('[API/creators/participations][POST] Forwarding to:', targetUrl);
    }

    let res = await fetch(targetUrl, {
      headers: {
        Authorization: effectiveToken,
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
      const token = effectiveToken.startsWith('Bearer ') ? effectiveToken.slice(7) : effectiveToken;
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
        JSON.stringify({ ok: false, status: res.status, error: text, debug: { targetUrl, from: 'proxy-post' } }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = contentType.includes('application/json') ? JSON.parse(text) : { data: [], raw: text };
    return new Response(JSON.stringify({ ok: true, ...data, debug: { targetUrl, from: 'proxy-post' } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (err: any) {
    if (LOG_LEVEL !== 'silent') {
      console.error('[API/creators/participations][POST] Error:', err?.message || err);
    }
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Unknown error', debug: { from: 'proxy-post-catch' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
