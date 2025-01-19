from flask import Blueprint, request, jsonify, session, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from models import Task, User
#import logging

task_routes = Blueprint("tasks", __name__, url_prefix="/tasks")
auth_routes = Blueprint("auth", __name__, url_prefix="/auth")
main_routes = Blueprint("main", __name__, url_prefix="/")

#logging.basicConfig(level=logging.DEBUG)

# Main Page
@main_routes.route("/", methods=["GET"])
def get_main():
    return render_template("index.html"), 201

# Task routes

# Rendering tasks templates
@task_routes.route("/add", methods=["GET"])
def addtask_get():
    return render_template("add.html"), 201

@task_routes.route("/", methods=["GET"])
def get_tasks():
    if "user_id" not in session:
        return render_template("tasks_nologin.html")
    tasks = Task.select().where(Task.user_id == session["user_id"])
    return render_template("tasks.html", tasks = [task.__data__ for task in tasks])

@task_routes.route("/<int:task_id>", methods=["GET"])
def get_task_update(task_id):
    task = Task.get_or_none(Task.id == task_id, Task.user_id == session["user_id"])
    if not task:
        return jsonify({"error": "Unauthorized"}), 401
    return render_template("edit.html", task = task.__data__)


# Backend tasks
@task_routes.route("/add", methods=["POST"])
def add_task():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    if len(data['title']) <= 70 and len(data['description']) <=250:
        task = Task.create(title=data["title"], description=data.get("description", ""), user_id=session["user_id"])
        return jsonify(task.__data__), 201
    return jsonify({"success": False})

@task_routes.route("/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    Task.update(**data).where(Task.id == task_id).execute()
    return jsonify({"success": True})

@task_routes.route("/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    Task.delete_by_id(task_id)
    return jsonify({"success": True})



# Auth routes

# Rendering authorisations templates
@auth_routes.route("/register", methods=["GET"])
def register_get():
    return render_template("register.html"), 201

@auth_routes.route("/login", methods=["GET"])
def login_get():
    return render_template("login.html"), 201

@auth_routes.route("/logout", methods=["GET"])
def logout_get():
    return render_template("logout.html"), 201

# Backend authorisations
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    password_hash = generate_password_hash(data["password"])
    if 3 <= len(data['username']) <= 15 and 8 <= len(data['password']) <= 40:
        user = User.create(username=data["username"], password_hash=password_hash)
        return jsonify(user.__data__), 201
    return jsonify({"success": False})
    

@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.get_or_none(User.username == data["username"])
    if user and check_password_hash(user.password_hash, data["password"]):
        session["user_id"] = user.id
        return jsonify({"success": True})
    return jsonify({"error": "Invalid credentials"}), 401

@auth_routes.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"success": True})