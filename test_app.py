import pytest
import sqlite3
import jwt
from datetime import datetime, timezone, timedelta
from app import app, generate_token, verify_token, register, login

SECRET_KEY = "fipe"
ALGORITHM = "HS256"

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    # Setup: Initialize the database before each test
    conn = sqlite3.connect('login_data.db')
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS login_details2")
    c.execute("DROP TABLE IF EXISTS favorites3")
    c.execute('''CREATE TABLE login_details2 (
                    USER_ID TEXT PRIMARY KEY,
                    PASSWORD TEXT NOT NULL,
                    NOME TEXT NOT NULL,
                    ESTADO TEXT NOT NULL)''')
    c.execute('''CREATE TABLE favorites3 (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id TEXT NOT NULL,
                    vehicle_url TEXT NOT NULL,
                    tipo_veiculo TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES login_details2 (USER_ID))''')
    conn.commit()
    conn.close()
    yield
    # Teardown: Cleanup the database after each test
    conn = sqlite3.connect('login_data.db')
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS login_details2")
    c.execute("DROP TABLE IF EXISTS favorites3")
    conn.commit()
    conn.close()

def test_generate_token():
    user_id = 'test_user'
    token = generate_token(user_id)
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    assert payload['user_id'] == user_id

def test_verify_token():
    user_id = 'test_user'
    token = generate_token(user_id)
    payload = verify_token(token)
    assert payload['user_id'] == user_id

def test_verify_expired_token():
    user_id = 'test_user'
    expiration_date = datetime.now(tz=timezone.utc) - timedelta(minutes=1)
    data = {"user_id": user_id, "exp": expiration_date}
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    result = verify_token(token)
    assert result == "Expirado"

def test_register_user():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    response, status_code = register(user_id, password, nome, estado)
    assert status_code == 200
    assert response['message'] == "Registro feito com sucesso"

def test_register_user_invalid_email():
    user_id = 'invalid_email'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    response, status_code = register(user_id, password, nome, estado)
    assert status_code == 400
    assert response['message'] == "Email inválido"

def test_login_user():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = login(user_id, password)
    assert status_code == 200
    assert 'user' in response

def test_login_user_invalid_credentials():
    user_id = 'test_user@example.com'
    password = 'WrongPass'
    response, status_code = login(user_id, password)
    assert status_code == 400
    assert response['message'] == "Credenciais inválidas"
