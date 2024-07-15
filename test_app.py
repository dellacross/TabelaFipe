import pytest
import sqlite3
import jwt
from datetime import datetime, timezone, timedelta
from app import app, generate_token, verify_token, register, login, add_to_favorites, remove_from_favorites, get_favorites, get_user_profile, calculate_ipva

SECRET_KEY = "fipe"
ALGORITHM = "HS256"

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def setup_and_teardown_db():
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

def test_verify_invalid_token():
    result = verify_token("invalid_token")
    assert result == "Invalido"
    
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
    user_id = 'test2@teste.com'
    password = 'Senha123!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = login(user_id, password)
    assert status_code == 200
    assert 'user' in response
    assert 'token' in response

def test_login_user_invalid_credentials():
    user_id = 'test_user@example.com'
    password = 'WrongPass'
    response, status_code = login(user_id, password)
    assert status_code == 401
    assert response['message'] == "Credenciais inválidas"

def test_add_to_favorites():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    response = add_to_favorites(user_id, vehicle_url, tipo_veiculo)
    assert response['message'] == "Veículo adicionado aos favoritos"

def test_add_existing_favorite():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    add_to_favorites(user_id, vehicle_url, tipo_veiculo)
    response = add_to_favorites(user_id, vehicle_url, tipo_veiculo)
    assert response[1] == 400
    assert response[0]['message'] == "Veículo já está nos favoritos"

def test_remove_from_favorites():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    add_to_favorites(user_id, vehicle_url, tipo_veiculo)
    response = remove_from_favorites(user_id, vehicle_url)
    assert response['message'] == "Removido dos favoritos com sucesso"

def test_remove_nonexistent_favorite():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    vehicle_url = "http://example.com/vehicle1"
    response = remove_from_favorites(user_id, vehicle_url)
    assert response[1] == 400
    assert response[0]['message'] == "Veículo não está nos favoritos"

def test_get_favorites():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    add_to_favorites(user_id, vehicle_url, tipo_veiculo)
    favorites = get_favorites(user_id)
    assert len(favorites) == 1
    assert favorites[0]['vehicle_url'] == vehicle_url
    assert favorites[0]['tipo_veiculo'] == tipo_veiculo

def test_get_user_profile():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    profile = get_user_profile(user_id)
    assert profile['nome'] == nome
    assert profile['email'] == user_id
    assert profile['estado'] == estado
    assert profile['favoritos'] == []

def test_calculate_ipva():
    data = {
        "ano_id": 2010,
        "price": 20000,
        "state": "SP",
        "tipo": "carros"
    }
    with app.test_client() as client:
        response = client.post("/ipva", json=data)
        json_data = response.get_json()
        assert response.status_code == 200
        assert "ipva" in json_data
        assert json_data["ipva"] == 20000 * 0.04

def test_calculate_ipva_exempt():
    data = {
        "ano_id": 1990,
        "price": 20000,
        "state": "SP",
        "tipo": "carros"
    }
    with app.test_client() as client:
        response = client.post("/ipva", json=data)
        json_data = response.get_json()
        assert response.status_code == 200
        assert "ipva" in json_data
        assert json_data["ipva"] == 0

def test_ipva_invalid_state():
    data = {
        "ano_id": 2010,
        "price": 20000,
        "state": "ZZ",
        "tipo": "carros"
    }
    with app.test_client() as client:
        response = client.post("/ipva", json=data)
        json_data = response.get_json()
        assert response.status_code == 401
        assert json_data["message"] == "Estado inválido"

def test_ipva_invalid_tipo():
    data = {
        "ano_id": 2010,
        "price": 20000,
        "state": "SP",
        "tipo": "bicicleta"
    }
    with app.test_client() as client:
        response = client.post("/ipva", json=data)
        json_data = response.get_json()
        assert response.status_code == 401
        assert json_data["message"] == "Tipo deve ser carros, motos ou caminhoes"

def test_ipva_isento():
    data = {
        "ano_id": 1990,
        "price": 20000,
        "state": "SP",
        "tipo": "carros"
    }
    with app.test_client() as client:
        response = client.post("/ipva", json=data)
        json_data = response.get_json()
        assert response.status_code == 200
        assert "ipva" in json_data
        assert json_data["ipva"] == 0

def test_api_route():
    with app.test_client() as client:
        response = client.get("/test")
        assert response.status_code == 200
        assert response.get_json() == {}

def test_register_existing_user():
    user_id = 'test_user@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = register(user_id, password, nome, estado)
    assert status_code == 400
    assert response['message'] == "Usuário já registrado"

def test_add_favorite_invalid_user():
    user_id = 'invalid_user@example.com'
    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    response = add_to_favorites(user_id, vehicle_url, tipo_veiculo)
    assert response[1] == 404
    assert response[0]['message'] == "Usuário não encontrado"

def test_remove_favorite_invalid_user():
    user_id = 'invalid_user@example.com'
    vehicle_url = "http://example.com/vehicle1"
    response = remove_from_favorites(user_id, vehicle_url)
    assert response[1] == 404
    assert response[0]['message'] == "Usuário não encontrado"
    
def test_login_invalid_user():
    user_id = 'invalid_user@example.com'
    password = 'Senha123!'
    response, status_code = login(user_id, password)
    assert status_code == 401
    assert response['message'] == "Credenciais inválidas"

def test_add_to_favorites_via_api():
    user_id = 'test_user_api@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = login(user_id, password)
    token = response['token']

    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    with app.test_client() as client:
        response = client.post("/favorite", json={'vehicle_url': vehicle_url, 'tipo_veiculo': tipo_veiculo}, headers=headers)
        json_data = response.get_json()
        assert response.status_code == 200
        assert json_data['message'] == "Veículo adicionado aos favoritos"

def test_remove_from_favorites_via_api():
    user_id = 'test_user_api@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = login(user_id, password)
    token = response['token']

    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    with app.test_client() as client:
        client.post("/favorite", json={'vehicle_url': vehicle_url, 'tipo_veiculo': tipo_veiculo}, headers=headers)
        response = client.delete("/favorite", json={'vehicle_url': vehicle_url}, headers=headers)
        json_data = response.get_json()
        assert response.status_code == 200
        assert json_data['message'] == "Removido dos favoritos com sucesso"

def test_get_user_profile_via_api():
    user_id = 'test_user_profile_api@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = login(user_id, password)
    token = response['token']

    headers = {
        'Authorization': f'Bearer {token}'
    }
    with app.test_client() as client:
        response = client.get("/perfil", headers=headers)
        json_data = response.get_json()
        assert response.status_code == 200
        assert json_data['nome'] == nome
        assert json_data['email'] == user_id
        assert json_data['estado'] == estado
        assert json_data['favoritos'] == []

def test_get_favorites_via_api():
    user_id = 'test_user_favorites_api@example.com'
    password = 'StrongPass1!'
    nome = 'Test User'
    estado = 'SP'
    register(user_id, password, nome, estado)
    response, status_code = login(user_id, password)
    token = response['token']

    vehicle_url = "http://example.com/vehicle1"
    tipo_veiculo = "carro"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    with app.test_client() as client:
        client.post("/favorite", json={'vehicle_url': vehicle_url, 'tipo_veiculo': tipo_veiculo}, headers=headers)
        response = client.get("/favorites", headers=headers)
        json_data = response.get_json()
        assert response.status_code == 200
        assert len(json_data) == 1
        assert json_data[0]['vehicle_url'] == vehicle_url
        assert json_data[0]['tipo_veiculo'] == tipo_veiculo

def test_verify_token_missing_parts():
    token = "invalid.token.part"
    result = verify_token(token)
    assert result == "Invalido"

def test_verify_token_wrong_signature():
    user_id = 'test_user'
    data = {"user_id": user_id, "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=30)}
    token = jwt.encode(data, "wrong_secret_key", algorithm=ALGORITHM)
    result = verify_token(token)
    assert result == "Invalido"
