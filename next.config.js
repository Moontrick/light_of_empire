const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

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
};

module.exports = withNextIntl(nextConfig);
