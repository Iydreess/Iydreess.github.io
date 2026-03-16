# GitHub Pages SEO Hosting Configuration (Equivalent to .htaccess)

GitHub Pages does not support Apache .htaccess rules.

Equivalent setup used in this project:

1. HTTPS + canonical host redirect in page head script
- File: index.html
- Redirects non-HTTPS or non-canonical host requests to https://iddrisrashid.tech

2. Canonical URL declaration
- File: index.html
- Canonical tag points to https://iddrisrashid.tech/

3. Search-engine canonical domain routing
- File: CNAME
- Uses iddrisrashid.tech as the production host for GitHub Pages

4. Compression and caching
- GitHub Pages serves content behind a CDN with built-in compression/caching.
- Custom cache-control rules are not configurable via .htaccess on GitHub Pages.
