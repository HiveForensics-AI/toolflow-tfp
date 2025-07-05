
# ToolFlow Protocol (TFP) — Node.js/TypeScript

**By Hive Forensics AI**

A minimalist JSON-first protocol and reference server for building context-aware “tools” (APIs) that any LLM agent—or human—can discover and invoke.

---

## 🚀 Features

* **Simple JSON protocol**: `/tfp/tools` for discovery, `/tfp/invoke` for calls
* **Type-safe**: Zod runtime validation + full TypeScript types
* **Extensible**: drop-in `registerTool()` for new handlers
* **Lightweight**: \~150 lines of code, zero ceremony
* **CLI-friendly**: test instantly with `curl` or your favorite HTTP client

---

## 🏁 Quick Start

```bash
# 1️⃣ Clone or unzip
git clone https://github.com/HiveForensics-AI/toolflow-tfp.git
cd toolflow-tfp

# 2️⃣ Install deps
npm install

# 3️⃣ Launch in dev mode (hot reload)
npm run dev
# → http://localhost:3000

# 4️⃣ Try it!
# List tools:
curl http://localhost:3000/tfp/tools

# Invoke the “echo” example:
curl -X POST http://localhost:3000/tfp/invoke \
     -H "Content-Type: application/json"      \
     -d '{
           "toolId": "echo.v1",
           "input": { "text": "Hello, Hive!" }
         }'
```

You should see:

```json
{
  "requestId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "toolId": "echo.v1",
  "output": { "echoed": "Hello, Hive!" },
  "metadata": {
    "durationMs": 2,
    "timestamp": "2025-07-05T14:23:00.123Z",
    "status": "success"
  }
}
```

---

## 📁 Project Structure

```
.
├── package.json          # scripts & dependencies
├── tsconfig.json         # strict TS setup
├── README.md             # ← this file
└── src/
    ├── protocol/
    │   └── types.ts      # Core Zod schemas & TS types
    ├── tools/
    │   └── echo.ts       # Example “echo.v1” descriptor + handler
    ├── server.ts         # Express app with /tfp endpoints
    └── index.ts          # Bootstraps server on port 3000
```

---

## ➕ Adding Your Own Tool

1. **Create** `src/tools/myTool.ts`:

   ```ts
   import { z } from 'zod';
   import { ToolDescriptor } from '../protocol/types';

   // 1. Define input/output schemas:
   export const inputSchema = z.object({
     foo: z.string(),
     bar: z.number().optional()
   });
   export const outputSchema = z.object({
     result: z.string()
   });

   // 2. Export descriptor:
   export const descriptor: ToolDescriptor = {
     toolId: 'myTool.v1',
     name: 'My Tool',
     description: 'Does something awesome with foo and bar.',
     version: '1.0.0',
     inputSchema,
     outputSchema,
     tags: ['example','demo']
   };

   // 3. Export handler:
   export async function handler(input: z.infer<typeof inputSchema>) {
     // your logic…
     return { result: `You sent foo=${input.foo}` };
   }
   ```

2. **Register** it in `src/server.ts`:

   ```ts
   import { descriptor as myDesc, handler as myHandler } from './tools/myTool';
   // …
   registerTool(myDesc, myHandler);
   ```

3. **Restart** your server—now `/tfp/tools` lists `myTool.v1` and you can:

   ```bash
   curl -X POST http://localhost:3000/tfp/invoke \
        -H "Content-Type: application/json"      \
        -d '{
              "toolId": "myTool.v1",
              "input": { "foo": "bar" }
            }'
   ```

---

## 🔍 Error Handling

If you invoke an unknown tool or send invalid input, you’ll get a structured error:

```bash
curl -X POST http://localhost:3000/tfp/invoke \
     -H "Content-Type: application/json"      \
     -d '{ "toolId": "nope.v1", "input": {} }'
```

```json
{
  "requestId": "…",
  "toolId": "nope.v1",
  "metadata": {
    "timestamp": "2025-07-05T14:30:00Z",
    "status": "error"
  },
  "error": {
    "code": "ToolNotFound",
    "message": "Unknown tool",
    "details": null
  }
}
```

Or, for validation errors:

```json
{
  "requestId": "…",
  "toolId": "echo.v1",
  "metadata": { "timestamp": "…", "status": "error" },
  "error": {
    "code": "ZodError",
    "message": "Expected string, received number at path: text",
    "details": { /* Zod validation issues */ }
  }
}
```

---

## 🧪 Testing with `curl` & Postman

* **List tools**:
  `GET http://localhost:3000/tfp/tools`

* **Invoke tool**:
  `POST http://localhost:3000/tfp/invoke`
  Header: `Content-Type: application/json`
  Body example:

  ```json
  {
    "toolId": "echo.v1",
    "input": { "text": "Test" }
  }
  ```

You can import these into Postman or Insomnia as saved requests.

---

## 📦 Building & Deployment

```bash
# Build for production
npm run build

# Start compiled server
npm start

# Or containerize:
docker build -t hive-tfp:latest .
docker run -p 3000:3000 hive-tfp:latest
```

---

## 📚 Next Steps & Customization

* Swap **Zod** for **io-ts** or **Yup** if you prefer.
* Add **authentication** middleware (API-key, JWT).
* Plug in **WebSocket** or **gRPC** transports.
* Integrate **metrics** (Prometheus, OpenTelemetry).
* Build a **client SDK** generator from `/tfp/tools` JSON manifest.

---

## 📜 License

Apache 2.0 — see [LICENSE](LICENSE)

---

Happy building! 🚀
