import imp
from celery import Celery

app = Celery('tasks', broker='redis://localhost')

app.conf.broker_url = 'redis://localhost:6379/0'
app.conf.result_backend = 'redis://localhost:6379/0'

@app.task
def add(x, y):
  return x + y

