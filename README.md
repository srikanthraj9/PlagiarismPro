📄 PlagiarismPro
PlagiarismPro is a Flask + React plagiarism detection tool.
It allows users to upload documents, analyze text for similarities, and download detailed plagiarism reports.

🚀 Tech Stack
Backend:

Python
Flask
Flask-JWT-Extended
Gunicorn (for production)
Frontend:

React
Vite
shadcn/ui
TailwindCSS
Deployment Targets:

Local Development
Railway / Render (backend)
Vercel (frontend)
📂 Project Structure
PlagiarismPro/ │ ├── backend/ # Flask backend │ ├── app.py # Flask entry point │ ├── requirements.txt # Python dependencies │ └── ...other backend files │ ├── Frontend/ # React + Vite frontend │ ├── src/ │ ├── package.json │ └── vite.config.ts │ └── README.md # Project instructions

yaml Copy Edit

⚙ Installation & Setup (Local Development)
1️⃣ Clone the repository
git clone https://github.com/yourusername/PlagiarismPro.git
cd PlagiarismPro
2️⃣ Backend Setup (Flask)
bash
Copy
Edit
cd backend
python -m venv .venv
Activate the virtual environment:

Windows (PowerShell)

powershell
Copy
Edit
.venv\Scripts\activate
Mac/Linux

bash
Copy
Edit
source .venv/bin/activate
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the backend:

bash
Copy
Edit
python app.py
Backend runs at: http://127.0.0.1:5000

3️⃣ Frontend Setup (React + Vite + shadcn/ui)
Open a new terminal (keep backend running):

bash
Copy
Edit
cd Frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

🏭 Serving Frontend with Flask (Production Build)
If you want Flask to serve the React build:

Step 1: Build the frontend

bash
Copy
Edit
cd Frontend
npm run build
Step 2: Point Flask to the build folder
Edit backend/app.py:

python
Copy
Edit
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../Frontend/dist", static_url_path="/")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
Step 3: Run Flask

bash
Copy
Edit
cd backend
python app.py
Now visit http://127.0.0.1:5000 — React will be served by Flask.
