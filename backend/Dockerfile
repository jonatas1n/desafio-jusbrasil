FROM python:latest

WORKDIR /backend

COPY . ./backend

RUN pip install -r backend/requirements.txt

EXPOSE 7700

ENTRYPOINT ["python3"]
CMD ["api.py"]