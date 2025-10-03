from flask import Flask
from routes.user_route import users_bp
from routes.coleira_route import coleira_bp
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(users_bp)
app.register_blueprint(coleira_bp)

CORS(app, origins=["http://localhost:5173"])

if __name__ == '__main__':
    app.run(port=5000, debug=True)