FROM python:3.11-slim

WORKDIR /AI-BI-Backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
