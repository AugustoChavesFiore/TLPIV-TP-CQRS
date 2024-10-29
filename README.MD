# Trabajo Practico de Arquitectura CQRS

## Pasos para ejecutar el proyecto
### Para ejecutar el proyecto necesita tener Docker instalado.

1. Clonar repositorio 
```bash
    git https://github.com/AugustoChavesFiore/TLPIV-TP-CQRS.git
```

2. renombrar el `env.template` a `env` (cambiar variables si lo desea)

3. ejecutar el comando 
```bash
    docker compose --env-file ./backend/.env  --env-file ./backend_querys/.env up --build -d
```

### Notas adicionales:
- Asegúrate de que Docker Desktop esté en ejecución antes de ejecutar el comando.
- Verifica que las variables de entorno en los archivos `.env` estén configuradas correctamente.

Con estos cambios, las instrucciones deberían ser más claras y fáciles de seguir.