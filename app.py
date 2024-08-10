from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import os
import time
import base64
from gevent.pywsgi import WSGIServer

app = Flask(__name__)

@app.route('/')
def index():
    # Read classes from coco.names file
    with open('coco.names', 'r') as f:
        classes = f.readlines()
    classes = [cls.strip() for cls in classes]  # Remove leading/trailing whitespace

    # Group classes into rows with 10 elements each
    rows = [classes[i:i+10] for i in range(0, len(classes), 10)]

    return render_template('index.html', supported_classes=rows)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return render_template('index.html', error='No file part')
    
    file = request.files['file']
    if file.filename == '':
        return render_template('index.html', error='No selected file')

    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    
    classes = open('coco.names').read().strip().split('\n')
    np.random.seed(42)
    colors = np.random.randint(0, 255, size=(len(classes), 3), dtype='uint8')

    net = cv2.dnn.readNetFromDarknet('yolov3.cfg', 'yolov3.weights')
    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
    ln = net.getLayerNames()
    try:
        ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    except IndexError:
        ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

    blob = cv2.dnn.blobFromImage(img, 1/255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    outputs = net.forward(ln)

    boxes = []
    confidences = []
    classIDs = []
    h, w = img.shape[:2]

    for output in outputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence > 0.5:
                box = detection[:4] * np.array([w, h, w, h])
                (centerX, centerY, width, height) = box.astype("int")
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))
                box = [x, y, int(width), int(height)]
                boxes.append(box)
                confidences.append(float(confidence))
                classIDs.append(classID)

    indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    
    recognized_objects = []

    if len(indices) > 0:
        for i in indices.flatten():
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])
            color = [int(c) for c in colors[classIDs[i]]]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 4)
            text = "{}: {:.4f}".format(classes[classIDs[i]], confidences[i])
            cv2.putText(img, text, (x, y - 5), cv2.FONT_HERSHEY_TRIPLEX, 1, color, 1)
    
        recognized_objects = [{"class": classes[classIDs[i]], "confidence": confidences[i]} for i in indices.flatten()]
    else:
        # No objects are recognized, return a message
        recognized_objects = [{"message": "Can't find any object in the image."}]

    _, img_encoded = cv2.imencode('.jpg', img)
    img_base64 = base64.b64encode(img_encoded).decode('utf-8')

    return jsonify({'image': img_base64, 'objects': recognized_objects})

if __name__ == '__main__':
    # app.run(threaded=True)
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()