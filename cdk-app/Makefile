.PHONY: install test clean

SHELL = /bin/bash

PYTHON_DIRS = stacks
PYTHON_FILES = ./*.py

all: lint test synth

install:
	poetry install && npm install

lint:
	black ${PYTHON_DIRS} ${PYTHON_FILES}
	isort ${PYTHON_DIRS} ${PYTHON_FILES}
	flake8 ${PYTHON_DIRS} ${PYTHON_FILES} --statistics

synth:
	npm run synth

deploy:
	npm run deploy
