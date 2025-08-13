from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

# In-memory "DB" (swap to real DB later)
USERS = {}  # email -> {username, password_hash, profession}

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(force=True)
    required = ["email", "username", "password", "profession"]
    if not all(k in data and str(data[k]).strip() for k in required):
        return jsonify({"msg": "Missing fields"}), 400

    email = data["email"].lower().strip()
    if email in USERS:
        return jsonify({"msg": "User already exists"}), 400

    USERS[email] = {
        "username": data["username"].strip(),
        "password_hash": generate_password_hash(data["password"]),
        "profession": data["profession"].strip(),
    }
    return jsonify({"msg": "Registration successful"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    email = str(data.get("email", "")).lower().strip()
    password = str(data.get("password", ""))

    user = USERS.get(email)
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"msg": "Invalid credentials"}), 401

    token = create_access_token(identity=email, expires_delta=timedelta(hours=12))
    return jsonify({"token": token, "username": user["username"]})
