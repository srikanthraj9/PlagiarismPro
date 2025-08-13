from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

from config import CORS_ORIGINS, JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRES

# Get absolute path to the frontend build folder
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "../Frontend/dist"))

def create_app():
    app = Flask(
        __name__,
        static_folder=FRONTEND_DIST,   # Path to frontend build
        static_url_path=""             # Serve from root
    )

    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_TOKEN_EXPIRES

    CORS(app, resources={r"/*": {"origins": CORS_ORIGINS, "supports_credentials": True}})
    JWTManager(app)

    # API Blueprints
    from routes.auth_routes import auth_bp
    from routes.pdf_routes import pdf_bp
    from routes.history_routes import history_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(pdf_bp, url_prefix="/pdf")
    app.register_blueprint(history_bp, url_prefix="/history")

    # Serve frontend
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        file_path = os.path.join(FRONTEND_DIST, path)
        if path != "" and os.path.exists(file_path):
            return send_from_directory(FRONTEND_DIST, path)
        else:
            return send_from_directory(FRONTEND_DIST, "index.html")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
