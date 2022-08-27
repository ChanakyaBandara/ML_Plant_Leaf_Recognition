import tensorflow.keras
import numpy as np
import cv2
import sys
import json,codecs

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = tensorflow.keras.models.load_model('keras_model.h5')

# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1.
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)


# Replace this with the path to your image
# cam = cv2.VideoCapture(1)


def detection(filename):
    text = ""
    accuracy = 0

    img = cv2.imread("uploads/"+filename)
    # _,img = cam.read()
    img = cv2.resize(img, (224, 224))

    # turn the image into a numpy array
    image_array = np.asarray(img)

    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

    # Load the image into the array
    data[0] = normalized_image_array

    # run the inference
    prediction = model.predict(data)
    # print(prediction)
    json.dump(prediction.tolist(), codecs.open("result.json", 'w', encoding='utf-8'),
              separators=(',', ':'),
              sort_keys=True,
              indent=4)

if __name__ == '__main__':
    detection(str(sys.argv[1]))
#     Madras_Pea_Pumpkin.jpg

