# Species Recognizer

## Introduction

### What is Species Recognizer?
The "Species Recognizer" is a Deep Neural Network-based model trained using the YOLO (You Only Look Once) algorithm, leveraging the COCO (Common Objects in Context) dataset. This model is designed to accurately detect and classify various objects within an image, covering a wide range of categories such as animals, vehicles, furniture, and more.

### Applications of Species Recognizer
The "Species Recognizer" is versatile and can be applied across multiple domains, including wildlife conservation, agriculture, environmental monitoring, and more. Its real-time object detection capability makes it invaluable for various industries.

## Literature Survey
Object detection algorithms have evolved significantly, moving from traditional region proposal methods to modern deep learning-based approaches like YOLO. YOLO divides images into a grid and directly predicts bounding boxes and class probabilities, offering efficient and real-time object detection. The COCO dataset is a critical resource, providing a vast array of images covering 80 different object categories, essential for training and evaluating these models.

Researchers have explored applying these techniques to species recognition, addressing challenges like variability in species appearance and environmental conditions. Integrating OpenCV with YOLO has further optimized image preprocessing, improving object detection performance. Hyperparameter optimization is crucial for enhancing model accuracy, particularly for species recognition tasks.

Real-world applications span various domains, and despite challenges like dataset biases and domain adaptation, future research continues to advance object detection technologies for species recognition.

## Problem Statement
The objective is to develop an efficient and accurate system capable of automatically identifying and classifying species of interest in images or video streams using YOLO and COCO.

## Tools and Technologies

### Visual Studio Code
Visual Studio Code (VS Code) served as the primary IDE, offering a versatile and efficient platform for writing, debugging, and managing code.

### Python Programming Language
Python was the core programming language used, with several key libraries integrated into the project:

- **OpenCV:** Used for image preprocessing tasks such as resizing, normalization, and noise reduction.
- **NumPy:** Facilitated efficient numerical computations and data manipulation.
- **Flask:** Enabled the development of the web application framework, creating RESTful APIs for communication between frontend and backend components.

### Frontend Technologies
- **HTML, JavaScript, CSS:** These technologies were used to design and enhance the user interface of the application.

### Docker
Docker was employed for containerization, allowing for easy deployment and scalability of the application across different environments.

## Project Working

The implementation of the YOLO algorithm alongside the COCO dataset has significantly advanced our ability to perform real-time object detection and classification. OpenCV was used for image preprocessing, ensuring the model received high-quality input data. The model, using pre-trained weights fine-tuned for its performance, accurately predicts the classes of objects in input images, showcasing exceptional accuracy and efficiency.

### Loading the YOLO Network

To load the YOLO network, you will need three key files:

1. `coco.names` - Contains the names of the object classes.
2. `yolov3.cfg` - The configuration file that defines the YOLO architecture.
3. `yolov3.weights` - The pre-trained YOLO weights. You can download it [here](https://pjreddie.com/media/files/yolov3.weights) (237 MB).

### Running the Project

#### Running Locally (Without Docker)

1. Ensure you have Python, OpenCV, and Flask installed on your device.
2. Navigate to the project folder using the CLI.
3. Run one of the following commands to start the application:
    ```bash
    flask run
    ```
    -or-
    ```bash
    python app
    ```
    -or-
    ```bash
    py -3.12 -m app
    ```
    (Use the last command if you have multiple Python versions and want to specify version 3.12).

#### Running with Docker

1. Navigate to the folder where the project files are located.
2. Run the following commands in PowerShell or Command Prompt to build the Docker image and container:
    ```bash
    docker build . -t species-recognition:v1
    docker container run -d -p 5000:5000 species-recognition:v1
    ```
   Ensure you have Docker installed by checking the version with `docker -v`.
3. Open `localhost:5000` in your browser, or manage the container via Docker Desktop.

## Features and Limitations

### Features
1. **Real-Time Object Detection:** YOLO enables efficient and rapid detection of objects.
2. **Comprehensive Object Categories:** The model can accurately detect and classify 80 different object categories from the COCO dataset.
3. **High Accuracy and Efficiency:** The model achieves high precision and recall rates even in complex scenes.
4. **Integration with OpenCV:** Facilitates image preprocessing for optimized model performance.
5. **Scalability and Deployment:** Docker ensures portability and reproducibility across different environments.

### Limitations
1. **Limited to Predefined Object Classes:** The model is restricted to the 80 classes included in the COCO dataset.
2. **Confidence-Based Classification:** May result in misclassifications, especially in complex scenes with overlapping objects.

## Conclusion

This project demonstrates significant advancements in real-time object detection and classification using the YOLO algorithm trained on the COCO dataset. The integration of Docker for deployment enhances scalability and portability. Future work includes expanding object categories, optimizing real-time deployment, and exploring cloud-based solutions for scalability.

## Future Prospects
1. **Expansion of Object Categories**
2. **Integration of Advanced Algorithms**
3. **Real-Time Deployment Optimization**
4. **Enhanced Performance on Challenging Scenes**
5. **Integration with Cloud Services**
6. **Incorporation of Multi-Modal Data**

## References
1. YOLO and COCO object recognition basics in Python ([medium.com](https://medium.com/@mikolaj.buchwald/yolo-and-coco-object-recognition-basics-in-python-65d06f42a6f8))
2. YOLO: Algorithm for Object Detection Explained [+Examples] ([v7labs.com](https://www.v7labs.com/blog/yolo-object-detection))
3. Object Detection with YOLO: Hands-on Tutorial ([neptune.ai](https://neptune.ai/blog/object-detection-with-yolo-hands-on-tutorial))
4. YOLO Object Detection [Explained](https://encord.com/blog/yolo-object-detection-guide/): Evolution, Algorithm, and Applications
5. Object Detection with YOLO ([University of California](https://datax.berkeley.edu/wp-content/uploads/2020/07/Object-Detection-with-YOLO-1-1.pdf))
6. Object Detection with Deep Learning: A Review Zhong-Qiu Zhao, Member, IEEE, Peng Zheng, Shou-tao Xu, and Xindong Wu, Fellow, IEEE  [arXiv:1807.05511v2](https://arxiv.org/pdf/1807.05511) 16 Apr 2019
7. [Redmon, J., Divvala, S., Girshick, R., & Farhadi, A. (2016). You Only Look Once: Unified, Real-Time Object Detection](http://pjreddie.com/yolo/). University of Washington, Allen Institute for AI, Facebook AI Research.

