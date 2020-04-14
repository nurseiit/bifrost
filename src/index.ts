addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const getRandomVariantIndex = (): number => Math.floor(Math.random() * 2);

async function handleRequest(request: Request): Promise<Response> {
  const pathname = new URL(request.url).pathname;
  if (pathname === '/') {
    // fetch variants
    const resp = await fetch(
      'https://cfw-takehome.developers.workers.dev/api/variants'
    );
    const { variants } = await resp.json();
    // select one of two variants randomly (uniformly)
    const url = variants[getRandomVariantIndex()];
    // fetch and return the selected variant
    return await fetch(url);
  } else {
    return new Response();
  }
}
