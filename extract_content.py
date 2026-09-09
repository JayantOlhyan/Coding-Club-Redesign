#!/usr/bin/env python3
"""
Extracts codingclub.tech into a structured content.json.

Why: the redesign must be 100% content-identical to the original.
Hand-copying 250KB of HTML guarantees drift. This is the source of truth.

Usage:
    pip install requests beautifulsoup4 lxml
    python extract_content.py
    -> content.json, images.txt, report.txt
"""

import json
import re
import hashlib
from collections import OrderedDict
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

URL = "https://codingclub.tech/"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")

# The live page duplicates most sections (separate desktop + mobile DOM trees).
# We normalise text and drop exact repeats so the prototype has ONE tree.
_ws = re.compile(r"\s+")


def norm(s: str) -> str:
    return _ws.sub(" ", (s or "")).replace("\u200b", "").strip()


def fingerprint(s: str) -> str:
    return hashlib.md5(norm(s).lower().encode()).hexdigest()


def fetch(url: str) -> BeautifulSoup:
    r = requests.get(url, headers={"User-Agent": UA}, timeout=30)
    r.raise_for_status()
    r.encoding = r.apparent_encoding or "utf-8"
    return BeautifulSoup(r.text, "lxml")


def extract(soup: BeautifulSoup) -> OrderedDict:
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    doc = OrderedDict()

    # ---- meta -------------------------------------------------------------
    meta = {"title": norm(soup.title.get_text()) if soup.title else ""}
    for m in soup.find_all("meta"):
        key = m.get("name") or m.get("property")
        if key and m.get("content"):
            meta[key] = norm(m["content"])
    doc["meta"] = meta

    # ---- linear content blocks, in document order -------------------------
    blocks = []
    seen = set()
    selector = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li",
                "a", "button", "img", "iframe", "input", "textarea"]

    for el in soup.find_all(selector):
        name = el.name

        if name == "img":
            src = el.get("src") or el.get("data-src") or ""
            if not src:
                continue
            item = {"type": "image",
                    "src": urljoin(URL, src),
                    "alt": norm(el.get("alt", "")),
                    "lazy": el.get("loading") == "lazy"}
            key = ("img", item["src"])

        elif name == "iframe":
            src = el.get("src") or el.get("data-src") or ""
            if not src:
                continue
            item = {"type": "embed", "src": urljoin(URL, src)}
            key = ("embed", item["src"])

        elif name in ("input", "textarea"):
            item = {"type": "field",
                    "input_type": el.get("type", "text"),
                    "name": el.get("name", ""),
                    "placeholder": norm(el.get("placeholder", "")),
                    "required": el.has_attr("required")}
            key = ("field", item["name"], item["placeholder"], item["input_type"])

        elif name in ("a", "button"):
            text = norm(el.get_text())
            if not text:
                continue
            item = {"type": "cta", "text": text, "href": el.get("href", "")}
            key = ("cta", fingerprint(text), item["href"])

        else:
            # headings / paragraphs / list items
            text = norm(el.get_text())
            if not text or len(text) < 2:
                continue
            # skip wrappers whose text is fully owned by a nested element we also capture
            if el.find(selector):
                continue
            item = {"type": "heading" if name.startswith("h") else
                            ("bullet" if name == "li" else "paragraph"),
                    "level": int(name[1]) if name.startswith("h") else None,
                    "text": text}
            key = (item["type"], fingerprint(text))

        if key in seen:
            item["_duplicate_of_original"] = True
            continue          # drop the desktop/mobile clone
        seen.add(key)
        blocks.append(item)

    doc["blocks"] = blocks
    return doc


def report(doc: OrderedDict) -> str:
    counts = {}
    for b in doc["blocks"]:
        counts[b["type"]] = counts.get(b["type"], 0) + 1

    imgs = [b["src"] for b in doc["blocks"] if b["type"] == "image"]
    imgur = [u for u in imgs if "imgur.com" in u]
    external = [u for u in imgs if "codingclub.tech" not in u]

    lines = ["CONTENT INVENTORY", "=" * 50]
    for k, v in sorted(counts.items(), key=lambda x: -x[1]):
        lines.append(f"{k:12} {v}")
    lines += ["",
              f"images total        : {len(imgs)}",
              f"  hosted on imgur   : {len(imgur)}   <-- must be migrated",
              f"  external host     : {len(external)}",
              "",
              "TEXT LOCKED INSIDE IMAGES (not extractable, needs manual re-typing):",
              "  - pricing / discount graphics",
              "  - benefits panels",
              "  - testimonial + placement screenshots",
              "  - before/after comparison panels"]
    return "\n".join(lines)


if __name__ == "__main__":
    soup = fetch(URL)
    doc = extract(soup)

    with open("content.json", "w", encoding="utf-8") as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)

    with open("images.txt", "w", encoding="utf-8") as f:
        for b in doc["blocks"]:
            if b["type"] == "image":
                f.write(b["src"] + "\n")

    rpt = report(doc)
    with open("report.txt", "w", encoding="utf-8") as f:
        f.write(rpt)

    print(rpt)
    print(f"\nwrote content.json ({len(doc['blocks'])} blocks)")
