import MyElementHandler from './elementHandler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const getRandomVariantIndex = (): number => Math.floor(Math.random() * 2);

const fetchRewrite = async (url: string) => {
  const res = await fetch(url);
  return new HTMLRewriter().on('*', new MyElementHandler()).transform(res);
};

async function handleRequest(request: Request): Promise<Response> {
  // fetch variants
  const resp = await fetch(
    'https://cfw-takehome.developers.workers.dev/api/variants'
  );
  const { variants } = await resp.json();

  const cookie = request.headers.get('cookie');
  if (cookie && cookie.includes('bifrost-AB=earth')) {
    /* cookie matches for variant 0 (earth) */
    return await fetchRewrite(variants[0]);
  } else if (cookie && cookie.includes('bifrost-AB=asgard')) {
    /* cookie matches for variant 1 (asgard) */
    return await fetchRewrite(variants[1]);
  } else {
    /* no cookie matches */
    // select one of two variants randomly (uniformly)
    const index = getRandomVariantIndex();
    // name cookie group value
    const group = index === 0 ? 'earth' : 'asgard';
    // fetch selected variant
    const response = await fetchRewrite(variants[index]);
    // clone response to modify later
    const responseClone = new Response(response.body, response);
    // add the cookie created
    responseClone.headers.append('Set-Cookie', `bifrost-AB=${group}; path=/`);
    return responseClone;
  }
}
