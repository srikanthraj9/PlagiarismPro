from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from services import pdf_service, summary_service, plagiarism_service, citation_service, report_service, email_service
from routes.auth_routes import USERS

pdf_bp = Blueprint("pdf", __name__)

# Simple in-memory history store per user
HISTORY = {}  # email -> [records]

@pdf_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_pdf():
    current_email = get_jwt_identity()
    user = USERS.get(current_email, {"username": "User"})
    username = user.get("username", "User")

    uploaded = request.files.get("file")
    if not uploaded:
        return jsonify({"msg": "No file uploaded"}), 400

    # Extract text + file save
    text, word_count, saved_path = pdf_service.extract_text_and_save(uploaded)

    # Title heuristic (metadata or first heading)
    title = pdf_service.guess_title(saved_path, text)

    # Summarize (with safe fallback)
    summary = summary_service.summarize(text)

    # Plagiarism (TF-IDF vs local corpus; returns %)
    plagiarism_score = plagiarism_service.check_plagiarism(text)

    # Citations (extract + validate via Semantic Scholar)
    citations = citation_service.validate_citations(text)

    # Timestamp
    ts = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

    # Generate report PDF and id
    report_id, report_path = report_service.generate_report(
        username=username,
        email=current_email,
        title=title,
        word_count=word_count,
        summary=summary,
        plagiarism_score=plagiarism_score,
        citations=citations,
        generated_on=ts,
    )

    record = {
        "id": report_id,
        "username": username,
        "title": title,
        "word_count": word_count,
        "summary": summary,
        "plagiarism_score": plagiarism_score,
        "citations": citations,
        "generated_on": ts,
    }
    HISTORY.setdefault(current_email, []).append(record)

    # Response shape matches your frontend expectation
    return jsonify(record), 200

@pdf_bp.route("/report/<rid>", methods=["GET"])
@jwt_required()
def get_report(rid):
    return report_service.send_report_file(rid)

@pdf_bp.route("/send-email/<rid>", methods=["POST"])
@jwt_required()
def send_email(rid):
    current_email = get_jwt_identity()
    ok, msg = email_service.send_report_email(recipient=current_email, report_id=rid)
    code = 200 if ok else 500
    return jsonify({"msg": msg}), code
