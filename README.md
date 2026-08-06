## Resumen de la Solución

### Arquitectura
- **`src/app.js`**: Servidor Express con endpoint `POST /match` encargado de la recepción de solicitudes, validación de datos de entrada y respuesta de errores HTTP 400/500.
- **`src/matchLogic.js`**: Módulo puro encargado exclusivamente del cálculo del puntaje, categorización e identificación de razones del match.

### Decisiones de Diseño y Casos Límite
- **Control de división por cero**: Validación condicional para arreglos de habilidades requeridas vacíos (`skills_requeridas: []`), garantizando respuesta 100% de cobertura por defecto en dicho bloque.
- **Normalización de experiencia**: Cálculo de brechas no negativas mediante `Math.max(0, exp_min - exp_candidato)` para evitar penalizaciones cuando la experiencia del candidato supera la requerida.

### Pruebas Unitarias
Se implementó una suite de 6 pruebas automatizadas con Jest (`npm test`) que valida:
1. Coincidencia excelente (`EXCELLENT_FIT` $\ge 85$).
2. Coincidencia buena (`GOOD_FIT` entre 65 y 84).
3. Coincidencia aceptable (`MAYBE` entre 40 y 64).
4. Sin coincidencia (`NO_FIT` $< 40$).
5. Caso borde de vacantes sin skills requeridas.
6. Caso borde de candidato con experiencia excedente.


## Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js (v24+)
- **Framework Web:** Express
- **Pruebas Unitarias:** Jest


