import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.114.0/http/file_server.ts";

console.log("Listening on http://localhost:8000");

serve(async (req) => {
    let filePath = new URL(req.url).pathname;
    if (filePath === '/') {
        filePath = '/index.html';
    }

    try {
        return await serveFile(req, `.${filePath}`);
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return new Response('Not Found', { status: 404 });
        } else {
            return new Response('Internal Server Error', { status: 500 });
        }
    }
}, { port: 8000 });
