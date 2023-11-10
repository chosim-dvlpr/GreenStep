from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from io import BytesIO
from PIL import Image

app = FastAPI()

# 모델 경로를 지정합니다. 여기서는 'model'이라는 이름의 SavedModel 디렉토리로 가정합니다.
MODEL_PATH = 'model'

# TensorFlow 모델을 로드합니다.
model = tf.saved_model.load(MODEL_PATH)
print(model.signatures["serving_default"].structured_outputs)

@app.post("/py/predict-image")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    pil_image = Image.open(BytesIO(contents))

    # 이미지를 모델에 맞게 전처리합니다.
    pil_image = pil_image.resize((224, 224))
    img_array = np.array(pil_image) / 255.0
    img_array = img_array[np.newaxis, ...]  # 배치 차원 추가

    # 모델을 사용하여 예측을 수행합니다.
    # `predict` 함수는 `tf.keras.Model`에 대해 사용되는데, `tf.saved_model.load`로 로드된 모델은 이를 직접 사용할 수 없습니다.
    # 대신, 서빙 시그니처를 사용해야 합니다.
    # 모델을 사용하여 예측을 수행합니다.
    img_tensor = tf.convert_to_tensor(img_array, dtype=tf.float32)  # 데이터 타입을 float32로 명시
    predictions = model.signatures["serving_default"](img_tensor)


    # 예측 결과를 처리합니다.
    predicted_class = np.argmax(predictions['sequential_3'].numpy(), axis=1)
    confidence = np.max(predictions['sequential_3'].numpy(), axis=1)

    return {"predicted_class": int(predicted_class[0]), "confidence": float(confidence[0])}

# 참고: `serving_default`는 모델을 훈련할 때 설정한 서빙 시그니처에 따라 달라질 수 있습니다.
