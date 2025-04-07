import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.114.0/http/file_server.ts";

const app = serve({ port: 8000 });

console.log(`Listening on http://localhost:${8000}`);

for await (const req of app) {
    const filePath = new URL(req.url).pathname;
    if (filePath === '/') {
        filePath = '/index.html'; // Serve index.html for root path
    }
    try {
        const res = await serveFile(req, `./${filePath}`);
        req.respond(res);
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            req.respond({ status: 404, body: new TextEncoder().encode('Not Found') });
        } else {
            req.respond({ status: 500, body: new TextEncoder().encode('Internal Server Error') });
        }
    }
}