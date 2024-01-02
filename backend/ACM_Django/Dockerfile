FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
COPY . /build
WORKDIR ./build
RUN apt-get update && apt-get install wait-for-it
RUN pip install -r requirements.txt
