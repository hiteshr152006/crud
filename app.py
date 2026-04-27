from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

app = Flask(__name__)

# Supabase connection
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

TABLE_NAME = "users"

# Home page
@app.route("/")
def home():
    return render_template("index.html")

# CREATE
@app.route("/users", methods=["POST"])
def create_user():
    data = request.json

    result = supabase.table(TABLE_NAME).insert({
        "name": data["name"],
        "email": data["email"]
    }).execute()

    return jsonify(result.data), 201


# READ
@app.route("/users", methods=["GET"])
def get_users():
    result = supabase.table(TABLE_NAME).select("*").order("id").execute()
    return jsonify(result.data), 200


# UPDATE
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json

    result = supabase.table(TABLE_NAME).update({
        "name": data["name"],
        "email": data["email"]
    }).eq("id", user_id).execute()

    return jsonify(result.data), 200


# DELETE
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    supabase.table(TABLE_NAME).delete().eq("id", user_id).execute()
    return jsonify({"message": "Deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)