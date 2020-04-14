addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request: Request): Promise<Response> {
  return new Response('Hello from bifrost!', {
    headers: { 'content-type': 'text/plain' }
  });
}
