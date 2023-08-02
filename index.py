from flask import Flask, request, jsonify
import mysql.connector
import hashlib

app = Flask(__name__)

# MySQL configuration
db_config = {
    'host': 'localhost',
    'user': 'your_mysql_user',
    'password': 'your_mysql_password',
    'database': 'recruitment_website'
}

# Function to hash the password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# User registration endpoint
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    hashed_password = hash_password(password)

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        values = (username, email, hashed_password)
        cursor.execute(query, values)

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'User registered successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# User login endpoint
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data['username']
    password = data['password']

    hashed_password = hash_password(password)

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "SELECT id, username FROM users WHERE username = %s AND password = %s"
        values = (username, hashed_password)
        cursor.execute(query, values)

        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            return jsonify({'message': 'Login successful', 'user_id': user[0], 'username': user[1]}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Job application endpoint
@app.route('/apply', methods=['POST'])
def job_application():
    data = request.get_json()
    user_id = data['user_id']
    job_title = data['job_title']

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "INSERT INTO job_applications (user_id, job_title, application_date) VALUES (%s, %s, NOW())"
        values = (user_id, job_title)
        cursor.execute(query, values)

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Job application submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
