const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Старые статичные роуты → slug страниц на бэке (ссылки в Discord и поисковой индекс)
const LEGACY_PAGE_REDIRECTS = [
  ['likbez', 'likbezy'],
  ['roleplay', 'otygrovki'],
  ['rp-rules', 'vnutrennie-pravila-proekta'],
  ['discord-rules', 'pravila-discord-servera'],
  ['structures', 'struktury'],
  ['high-command', 'vysshee-komandovanie'],
  ['isb', 'imperskaya-sluzhba-bezopasnosti'],
  ['military-police', 'voennaya-policiya'],
  ['inquisitorius', 'inkvizitoriy'],
  ['shadow-troopers', 'korpus-temnyh-shturmovikov'],
  ['criminal-code', 'uk'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  compiler: {
    styledComponents: true,
  },
  // gamedig тянет telnet-client/xmlrpc и ломается при бандлинге — грузим его как обычный require в рантайме
  serverExternalPackages: ['gamedig'],
  output: 'standalone',
  async redirects() {
    return LEGACY_PAGE_REDIRECTS.flatMap(([from, to]) => [
      { source: `/${from}`, destination: `/${to}`, permanent: true },
      { source: `/ru/${from}`, destination: `/ru/${to}`, permanent: true },
    ]);
  },
};

module.exports = withNextIntl(nextConfig);
