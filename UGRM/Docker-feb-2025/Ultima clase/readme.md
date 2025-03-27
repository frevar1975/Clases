# Ejemplo: Correr varios servicios con Docker y Docker Compose

Este ejercicio muestra cómo ejecutar múltiples servicios (Nginx y Redis) utilizando Docker de forma manual y con Docker Compose.

## 📌 Requisitos

- Tener instalado [Docker](https://www.docker.com/get-started)
- Tener instalado [Docker Compose](https://docs.docker.com/compose/install/)

## 1️⃣ Ejecución Manual con `docker run`

### 🔹 Crear una red para la comunicación entre contenedores
```bash
docker network create mi_red
```

### 🔹 Ejecutar Redis en segundo plano
```bash
docker run -d --name redis --network mi_red redis
```

### 🔹 Ejecutar Nginx en segundo plano y exponer el puerto 8080
```bash
docker run -d --name nginx --network mi_red -p 8080:80 nginx
```

### 🔹 Verificar que los contenedores están corriendo
```bash
docker ps
```

### 🔹 Inspeccionar la red para verificar la conectividad
```bash
docker network inspect mi_red
```

### 🔹 Probar la conexión a Redis
```bash
docker exec -it redis redis-cli ping
```
**Salida esperada:** `PONG`

### 🔹 Acceder a Nginx desde el navegador
Abre [http://localhost:8080](http://localhost:8080) y deberías ver la página de bienvenida de Nginx.

### 🔹 Detener y eliminar los contenedores
```bash
docker stop nginx redis && docker rm nginx redis && docker network rm mi_red
```

---

## 2️⃣ Usando `docker-compose`

### 🔹 Crear un archivo `docker-compose.yml`
Crea un archivo llamado `docker-compose.yml` con el siguiente contenido:

```yaml
version: "3"
services:
  redis:
    image: redis
    container_name: redis
    networks:
      - mi_red

  nginx:
    image: nginx
    container_name: nginx
    ports:
      - "8080:80"
    networks:
      - mi_red

networks:
  mi_red:
```

### 🔹 Levantar los servicios con Docker Compose
```bash
docker-compose up -d
```

### 🔹 Verificar los contenedores en ejecución
```bash
docker ps
```

### 🔹 Acceder a Nginx en el navegador
Abre [http://localhost:8080](http://localhost:8080)

### 🔹 Probar Redis desde dentro del contenedor
```bash
docker exec -it redis redis-cli ping
```

### 🔹 Detener y eliminar los servicios
```bash
docker-compose down
```

---

## 🚀 Conclusión

- **Sin Docker Compose:** Hay que gestionar redes y contenedores manualmente.
- **Con Docker Compose:** Todo se configura en un solo archivo y es más fácil de administrar.

Este ejemplo es una base para proyectos más complejos con bases de datos, APIs y frontend.

¡Feliz Dockerización! 🐳

