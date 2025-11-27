// Compatibility shim for deployment platforms that expect `src/server.js` as the entry.
// This simply imports the project's actual entry `index.mjs` so the server starts as before.

import '../index.mjs';
