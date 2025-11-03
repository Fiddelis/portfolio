import { defineField, defineType } from "sanity";
export default defineType({
  name: "works",
  title: "Works",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "start", type: "datetime" }),
    defineField({ name: "end", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "tech", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "url", type: "string" }),
  ],
});
