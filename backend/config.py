import os
from datetime import timedelta

# Load env vars if present
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-in-prod")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")
ACCESS_TOKEN_EXPIRES = timedelta(hours=int(os.getenv("JWT_HOURS", "12")))

# Semantic Scholar API
SEMANTIC_SCHOLAR_BASE = "https://api.semanticscholar.org/graph/v1/paper/search"
SEMANTIC_SCHOLAR_FIELDS = "title,year,authors"

# File/Report settings
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
REPORT_DIR = os.getenv("REPORT_DIR", "reports")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORT_DIR, exist_ok=True)

# Email (use SMTP or a provider like SendGrid)
SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@docu-detect.local")
