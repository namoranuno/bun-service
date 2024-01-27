import { Hono } from "hono";

const book = new Hono();

book.get("/", (c) => c.text("LIST OF BOOKS"));

book.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text("Get book:" + id);
});

book.post("/", (c) => c.text("Create book"));

export default book;
