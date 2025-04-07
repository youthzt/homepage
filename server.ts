import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const port = 8000;

console.log(`Listening on http://localhost:${port}`);

for await (const req of serve({ port })) {
    const filePath = new URL(req.url).pathname;
    if (filePath === '/') {
        filePath = '/index.html'; // Serve index.html for root path
    }
    try {
        const file = await Deno.open(filePath);
        req.respond({ status: 200, headers: file.headers, body: file });
        file.close();
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            req.respond({ status: 404, body: new TextEncoder().encode('Not Found') });
        } else {
            req.respond({ status: 500, body: new TextEncoder().encode('Internal Server Error') });
        }
    }
}