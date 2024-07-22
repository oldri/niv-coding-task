# Encodec Application

This project demonstrates a full-stack application that encodes and decodes audio files using the Encodec model. The application includes a frontend for uploading audio files, a backend for processing and decoding the files, and Docker for containerization.

## Project Description

**Task: [Encodec](https://github.com/facebookresearch/encodec)**

Create a front-end where you can upload an audio file, which is encoded by Encodec, then sent to another backend (to simulate data transmission from one server to another). On the other backend (Python), decode the input with Encodec and save the decoded audio. Ensure the audios are the same.

### Step-by-Step Implementation:

#### Frontend

1. **Upload audio to frontend**:

    - Provides an interface for users to upload audio files.

2. **Convert audio to 24kHz waveform using `ffmpeg`**:

    - Converts the uploaded audio to a 24kHz waveform.

3. **Encode with Encodec**:

    - Uses ONNX Runtime for JavaScript to encode the audio.

4. **Send it to another server**:
    - Transmits the encoded data to the backend.

#### Backend (FastAPI)

1. **Create a POST route to receive input**:

    - Defines an endpoint to accept encoded audio data.

2. **Read the input (8xN matrix Encodec)**:

    - Processes the received encoded audio data.

3. **Decode it with Encodec**:

    - Uses Encodec to decode the audio data.

4. **Save as 22050Hz WAV**:
    - Saves the decoded audio as a 22050Hz WAV file.

## Project Structure

encodec-app/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── requirements.txt
│ │ ├── tests/
│ │ │ └── test_encodec.py
│ └── Dockerfile
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── tests/
│ │ │ └── audioUpload.test.js
│ │ ├── audioUpload.js
│ │ ├── index.js
│ │ └── styles.css
│ ├── jest.config.js
│ ├── package.json
│ └── package-lock.json
├── docker-compose.yml
├── .gitignore
└── README.md

## Prerequisites

-   Docker
-   Docker Compose

## Setting Up the Project

### 1. Clone the Repository

```sh
git clone git@github.com:oldri/niv-coding-task.git
cd encodec-app
```

### 2. Build and Run the Containers

Use Docker Compose to build and start both the frontend and backend services:
docker-compose up --build

This command will build the Docker images for both the backend and frontend services and start the containers. The frontend will be available at http://localhost:5000, and the backend will be available at http://localhost:8000.

### Frontend

The frontend application allows users to upload audio files. The audio files are then converted to a 24kHz waveform using ffmpeg, encoded with Encodec (using ONNX Runtime for JavaScript), and sent to the backend for processing.

### Running Locally

If you prefer to run the frontend locally without Docker, follow these steps:

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npx serve -s public

The frontend will be available at http://localhost:5000.

### Backend

The backend application is built with FastAPI and is responsible for receiving encoded audio data, decoding it using Encodec, and saving the decoded audio as a 22050Hz WAV file.

### Running Locally

If you prefer to run the backend locally without Docker, follow these steps:

Navigate to the backend directory:

cd backend

Create a virtual environment and activate it:

python -m venv env
source env/bin/activate # On Windows use `env\Scripts\activate`

### Install dependencies:

pip install -r app/requirements.txt

Run the FastAPI server:

uvicorn app.main:app --host 0.0.0.0 --port 8000

The backend will be available at http://localhost:8000.

### Running Tests

Frontend Tests
Navigate to the frontend directory and run the tests:

cd frontend
npm test

### Backend Tests

Navigate to the backend directory and run the tests:

cd backend
pytest

### Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

### Company Description

Nullius in Verba (NIV) is an AI startup based in Tirana, Albania with a clear mission: to accelerate the successful implementation of AI and drive unprecedented growth in regional economies. We specialize in developing AI models tailored to the nuances of the Albanian language, including Text-to-Speech and Speech-to-Text models. We also offer action models for automating tasks and streamlining processes. With customization options and dedicated solutions, NIV supports businesses in adopting AI to work smarter, faster, and more efficiently.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
