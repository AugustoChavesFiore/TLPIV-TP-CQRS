# Trabajo Practico de Arquitectura CQRS

Este proyecto implementa una arquitectura CQRS (Command Query Responsibility Segregation) para demostrar cómo se puede separar las operaciones de lectura y escritura en un sistema. La arquitectura CQRS permite escalar y optimizar las operaciones de lectura y escritura de manera independiente, mejorando así el rendimiento y la mantenibilidad del sistema.

## Tecnologías Utilizadas

- **CQRS**: La arquitectura CQRS se utiliza para separar las responsabilidades de comandos (escritura) y consultas (lectura) en el sistema.
- **RabbitMQ**: RabbitMQ se utiliza como broker de mensajes para manejar la comunicación entre los diferentes componentes del sistema, asegurando que los mensajes se entreguen de manera confiable.
- **Nginx**: Nginx se utiliza como reverse proxy para dirigir el tráfico a los diferentes servicios del sistema, proporcionando balanceo de carga y mejorando la seguridad.
- **Docker**: Docker se utiliza para contenerizar las aplicaciones, facilitando la configuración y el despliegue del sistema.

## Descripción del Proyecto

El proyecto es agnóstico al CRUD de productos, lo que significa que la arquitectura CQRS implementada puede ser aplicada a cualquier otro dominio o entidad. En este caso, se ha utilizado un CRUD de productos como ejemplo para demostrar cómo funciona la arquitectura.

Se han creado dos APIs separadas para manejar las operaciones de comandos (escritura) y consultas (lectura), siguiendo los principios de la arquitectura CQRS.

## Pasos para ejecutar el proyecto

### Para ejecutar el proyecto necesita tener Docker instalado.

1. Clonar repositorio

```bash
    git https://github.com/AugustoChavesFiore/TLPIV-TP-CQRS.git
```

2. renombrar el `env.template` a `env` (cambiar variables si lo desea)

3. ejecutar el comando desde el directorio raiz

```bash
    docker compose --env-file ./backend/.env  --env-file ./backend_querys/.env up --build -d
```

### Notas adicionales:

- Asegúrate de que Docker Desktop esté en ejecución antes de ejecutar el comando.
- Verifica que las variables de entorno en los archivos `.env` estén configuradas correctamente.
