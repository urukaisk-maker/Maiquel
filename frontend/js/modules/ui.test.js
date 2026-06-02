import { describe, expect, it } from "vitest";
import { escapeHtml } from "./ui.js";

describe("escapeHtml", () => {
  it("escapa caracteres peligrosos en texto HTML", () => {
    const value = `<script>alert("x")</script> & 'ok'`;
    const result = escapeHtml(value);

    expect(result).toContain("&lt;script&gt;");
    expect(result).toContain("&quot;x&quot;");
    expect(result).toContain("&amp;");
    expect(result).toContain("&#039;ok&#039;");
  });
});
