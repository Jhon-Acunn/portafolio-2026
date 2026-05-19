/**
 * Analytics component — supports Plausible and Umami via environment variables.
 *
 * Enable by setting ONE of these env vars:
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
 *   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
 *
 * Both are privacy-first, GDPR-compliant analytics platforms.
 */

export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <>
      {/* Plausible */}
      {plausibleDomain && (
        <script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}

      {/* Umami */}
      {umamiWebsiteId && (
        <script
          defer
          src="https://analytics.umami.is/script.js"
          data-website-id={umamiWebsiteId}
        />
      )}
    </>
  );
}
