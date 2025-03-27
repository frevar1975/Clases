# Usar la imagen base de Python
FROM python:3.9

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY app.py .

# Instalar Flask
RUN pip install flask

# Exponer el puerto 5000
EXPOSE 5000

# Comando de ejecución
CMD ["python", "app.py"]
