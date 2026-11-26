export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://jvrminingandservices.example.com';
  const routes = ['', '/about/', '/services/', '/machinery/', '/projects/', '/gallery/', '/contact/'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
