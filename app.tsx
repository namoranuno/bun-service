import { Hono } from "hono";
import bookRouter from "./routes/books";
import { streamText } from "hono/streaming";
import { logger } from "hono/logger";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.use("*", logger());

app.get("/hello", (c) => {
  return c.json({ hello: "world" });
});

const route = app.post(
  "/posts",
  zValidator(
    "form",
    z.object({
      body: z.string(),
    })
  ),
  (c) => {
    return c.json({ hello: "world" });
  }
);

app.get("/streamText", (c) => {
  return streamText(c, async (stream) => {
    // Write a text with a new line ('\n').
    for (let i = 0; i < 10; i++) {
      await stream.writeln("Hello" + i);
      // Wait 1 second.
      await stream.sleep(1000);
    }
  });
});

app.route("/book", bookRouter);

export default app;
