FROM python:3.11-slim
WORKDIR /app
RUN pip install flask opencv-python
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install\
    libgl1\
    libgl1-mesa-glx \ 
    libglib2.0-0 -y && \
    rm -rf /var/lib/apt/lists/*
COPY . /app
ENV FLASK_APP=app.py
CMD ["flask", "run","--host=0.0.0.0","--port=5000"]
