from flask import Flask, Blueprint
from routes import task_routes, auth_routes, main_routes

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Register blueprints
app.register_blueprint(task_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(main_routes)

if __name__ == "__main__":
    app.run(debug=True)
