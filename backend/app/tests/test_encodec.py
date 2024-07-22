from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_receive_encodec():
    response = client.post("/encodec", json={"data": [0.1] * 8})
    assert response.status_code == 200
    assert response.json() == {"message": "Audio decoded and saved successfully"}

def test_receive_encodec_invalid_input():
    response = client.post("/encodec", json={"data": ["invalid"]})
    assert response.status_code == 422  # Unprocessable Entity
