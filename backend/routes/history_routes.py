from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from routes.pdf_routes import HISTORY

history_bp = Blueprint("history", __name__)

@history_bp.route("", methods=["GET"])
@jwt_required()
def get_history():
    email = get_jwt_identity()
    return jsonify(HISTORY.get(email, []))
