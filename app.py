from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session
import pyodbc

app = Flask(__name__)
app.secret_key = 'your_secret_key'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function
@app.route('/')
def ernar():
    return render_template('ernar.html')

@app.route('/admin')
@login_required
def admin():
    return render_template('admin.html')

@app.route('/adidas')
@login_required
def adidas():
    return render_template('adidas.html')

@app.route('/nike')
@login_required
def nike():
    return render_template('nike.html')

@app.route('/puma')
@login_required
def puma():
    return render_template('puma.html')

@app.route('/korzina')
@login_required
def korzina():
    return render_template('korzina.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if check_user(username, password):
            session['logged_in'] = True
            return redirect(url_for('admin'))
        else:
            return "Неверный логин или пароль", 401
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

# Страница регистрации
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        add_user(username, password)
        return redirect(url_for('login'))
    return render_template('register.html')

# Настройки подключения к Microsoft Access
DB_PATH = r"C:\Users\lenovo\Desktop\test\test\database.mdb"
conn_str = (
    r"DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};"
    f"DBQ={DB_PATH};"
)

try:
    with pyodbc.connect(conn_str) as conn:
        print("Успешное подключение к базе данных!")
except pyodbc.Error as e:
    print(f"Ошибка подключения: {e}")

# Функция для проверки пользователя
def check_user(username, password):
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT password FROM information WHERE username = ?", (username,))
        row = cursor.fetchone()
        if row and row[0] == password:
            return True
    return False

# Функция для добавления нового пользователя
def add_user(username, password):
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO information (username, password) VALUES (?, ?)", (username, password))
        conn.commit()

if __name__ == '__main__':
    app.run(debug=True)
