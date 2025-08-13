import os, smtplib
from email.message import EmailMessage
from config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, REPORT_DIR

def send_report_email(recipient: str, report_id: str):
    path = os.path.join(REPORT_DIR, f"{report_id}.pdf")
    if not os.path.exists(path):
        return False, "Report not found"

    if not SMTP_HOST or not SMTP_USER or not SMTP_PASS:
        return False, "Email not configured on server"

    try:
        msg = EmailMessage()
        msg["Subject"] = "Your DOCU-DETECT Report"
        msg["From"] = FROM_EMAIL
        msg["To"] = recipient
        msg.set_content("Attached is your analysis report from DOCU-DETECT.")

        with open(path, "rb") as f:
            data = f.read()
        msg.add_attachment(data, maintype="application", subtype="pdf", filename=os.path.basename(path))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as s:
            s.starttls()
            s.login(SMTP_USER, SMTP_PASS)
            s.send_message(msg)
        return True, "Email sent"
    except Exception as e:
        return False, f"Email failed: {e}"
