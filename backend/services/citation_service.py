import re, requests
from config import SEMANTIC_SCHOLAR_BASE, SEMANTIC_SCHOLAR_FIELDS

# Very basic "References" scraper: looks for References section and bracketed/numbered lines
REF_HEADER_RE = re.compile(r"\breferences\b", re.IGNORECASE)
CITATION_LINE_RE = re.compile(r"^\s*(\[\d+\]|^\d+\.)?\s*(.+)$")

def extract_references(text: str):
    lines = text.splitlines()
    refs_started = False
    refs = []
    for line in lines:
        if not refs_started and REF_HEADER_RE.search(line):
            refs_started = True
            continue
        if refs_started:
            if line.strip() == "" and len(refs) > 3:  # stop after a blank once we have some refs
                break
            m = CITATION_LINE_RE.match(line.strip())
            if m:
                refs.append(m.group(2).strip())
    return refs[:50]  # cap to avoid API spam

def clean_title(citation_line: str):
    # crude: capture anything within quotes or Title Case chunks
    q = re.findall(r"\"([^\"]+)\"", citation_line)
    if q:
        return q[0]
    # else, remove author/year/publisher patterns
    cleaned = re.sub(r"\(\d{4}\)|\d{4}|IEEE|Elsevier|Springer|ACM|arXiv.*", "", citation_line, flags=re.I)
    cleaned = re.sub(r"\[[^\]]+\]", "", cleaned)
    cleaned = re.sub(r"[\.,;]+", " ", cleaned)
    cleaned = re.sub(r"\s{2,}", " ", cleaned).strip()
    # keep 5..160 chars
    return cleaned[:160] if len(cleaned) >= 5 else citation_line

def validate_citations(full_text: str):
    refs = extract_references(full_text)
    results = {}
    for raw in refs:
        title = clean_title(raw)
        if not title or len(title) < 4:
            continue
        status = "Not Found"
        try:
            params = {"query": title, "limit": 1, "fields": SEMANTIC_SCHOLAR_FIELDS}
            r = requests.get(SEMANTIC_SCHOLAR_BASE, params=params, timeout=10)
            if r.ok:
                data = r.json()
                if data.get("data"):
                    status = "Valid"
        except Exception:
            status = "Not Found"
        results[title] = status
    return results
