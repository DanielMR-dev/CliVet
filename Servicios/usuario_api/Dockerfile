FROM python:latest

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 4002

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4002"]