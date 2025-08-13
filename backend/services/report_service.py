import os, uuid
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from flask import send_file
from config import REPORT_DIR

def generate_report(username, email, title, word_count, summary, plagiarism_score, citations, generated_on):
    rid = str(uuid.uuid4())
    path = os.path.join(REPORT_DIR, f"{rid}.pdf")

    c = canvas.Canvas(path, pagesize=A4)
    W, H = A4

    # Header
    c.setFillColor(HexColor("#0D1B2A"))
    c.rect(0, H-2*cm, W, 2*cm, stroke=0, fill=1)
    c.setFillColor(HexColor("#E0E1DD"))
    c.setFont("Helvetica-Bold", 16)
    c.drawString(2*cm, H-1.3*cm, "DOCU-DETECT — Analysis Report")

    # Body
    y = H - 3*cm
    c.setFillColor(HexColor("#000000"))
    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, f"Title: ");
    c.setFont("Helvetica", 12); c.drawString(4*cm, y, title[:90]); y -= 0.7*cm

    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, "User: ")
    c.setFont("Helvetica", 12); c.drawString(4*cm, y, f"{username}  <{email}>"); y -= 0.7*cm

    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, "Generated On: ")
    c.setFont("Helvetica", 12); c.drawString(4*cm, y, generated_on); y -= 0.7*cm

    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, "Word Count: ")
    c.setFont("Helvetica", 12); c.drawString(4*cm, y, str(word_count)); y -= 0.7*cm

    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, "Plagiarism Score: ")
    c.setFont("Helvetica", 12); c.drawString(4*cm, y, f"{plagiarism_score}%"); y -= 1.0*cm

    # Summary block
    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, "Summary:"); y -= 0.6*cm
    c.setFont("Helvetica", 11)
    y = draw_wrapped(c, summary, 2*cm, y, 16.5*cm)
    y -= 0.6*cm

    # Citations
    c.setFont("Helvetica-Bold", 12); c.drawString(2*cm, y, "Citations:"); y -= 0.6*cm
    c.setFont("Helvetica", 11)
    if citations:
        for k, v in list(citations.items())[:30]:
            y = draw_wrapped(c, f"- {k}   [{v}]", 2*cm, y, 16.5*cm)
            if y < 3*cm:
                c.showPage(); y = A4[1]-3*cm
    else:
        y = draw_wrapped(c, "No citations detected.", 2*cm, y, 16.5*cm)

    c.showPage(); c.save()
    return rid, path

def draw_wrapped(c, text, x, y, width):
    from reportlab.platypus import SimpleDocTemplate, Paragraph
    from reportlab.lib.styles import getSampleStyleSheet
    # quick manual wrap
    import textwrap
    for line in textwrap.wrap(text, width=100):
        c.drawString(x, y, line)
        y -= 0.55*cm
        if y < 2.5*cm:
            c.showPage()
            y = A4[1] - 3*cm
    return y

def send_report_file(report_id: str):
    path = os.path.join(REPORT_DIR, f"{report_id}.pdf")
    if not os.path.exists(path):
        from flask import jsonify
        return jsonify({"msg": "Report not found"}), 404
    return send_file(path, as_attachment=True, download_name=f"docu-detect-report-{report_id}.pdf")
