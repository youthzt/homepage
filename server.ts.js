import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const port = 8000;

console.log(`Listening on http://localhost:${port}`);

for await (const req of serve({ port })) {
    req.respond({ status: 200, body: await Deno.readFile(new URL(req.url).pathname) });
}