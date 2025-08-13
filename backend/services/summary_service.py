import os
import fitz
from config import UPLOAD_DIR

def extract_text_and_save(file_storage):
    filename = secure_filename(file_storage.filename)
    path = os.path.join(UPLOAD_DIR, filename)
    file_storage.save(path)

    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    word_count = len(text.split())
    return text, word_count, path

def guess_title(pdf_path, text):
    # 1) Try PDF metadata
    try:
        with fitz.open(pdf_path) as doc:
            meta_title = (doc.metadata or {}).get("title", "")
            if meta_title and meta_title.strip():
                return meta_title.strip()
    except:
        pass
    # 2) Fallback: first non-empty line with Title-like length
    for line in text.splitlines():
        line = line.strip()
        if 5 <= len(line) <= 150 and line.lower() not in ("abstract", "references"):
            return line
    return "Untitled Document"

# --- helpers ---
import re
from werkzeug.utils import secure_filename
