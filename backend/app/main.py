from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, conlist
import numpy as np
import soundfile as sf
import onnxruntime as ort
import logging
from pathlib import Path

app = FastAPI()
logging.basicConfig(level=logging.INFO)
model_path = Path('./decodec_model.onnx')

class EncodecInput(BaseModel):
    data: conlist(float, min_items=8)  # Ensures data is a list of floats with at least 8 items

@app.post("/encodec")
async def receive_encodec(input: EncodecInput):
    try:
        encoded_data = np.array(input.data, dtype=np.float32).reshape((1, -1, 8))  # Adjust shape as needed
        decoded_audio = await decode_with_encodec(encoded_data)
        output_path = 'output.wav'
        sf.write(output_path, decoded_audio, 22050)
        logging.info(f'Audio decoded and saved to {output_path}')
        return {"message": "Audio decoded and saved successfully"}
    except Exception as e:
        logging.error(f'Error processing audio: {e}')
        raise HTTPException(status_code=500, detail=str(e))

async def decode_with_encodec(encoded_data):
    try:
        session = ort.InferenceSession(model_path.as_posix())
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        result = session.run([output_name], {input_name: encoded_data})
        decoded_audio = result[0]
        return decoded_audio
    except Exception as e:
        logging.error(f'Error decoding audio: {e}')
        raise
