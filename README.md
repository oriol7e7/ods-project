# API - ProductCycle Store

### Base URL i URL al iniciar projecte (important)

`http://localhost:3000`

---

## Endpoints disponibles

### 1. Obtenir tots els productes

- **Endpoint**: `/products`
- **Mètode**: `GET`
- **Resposta esperada (200):**

```json
[
  {
    "id": 1,
    "user_id": 2,
    "name": "Càmera Reflex Canon EOS 2000D",
    "price": 250,
    "desc": "Càmera ideal per iniciar-se en la fotografia...",
    "state": "Molt bon estat",
    "modality": "Venda",
    "location": "Barcelona Centre",
    "img": "https://..."
  }
  // ... més productes
]
```

---

### 2. Obtenir producte per id

- **Endpoint**: `/products/:id`
- **Mètode**: `GET`
- **Exemple**: `/products/1`
- **Resposta esperada (200):**

```json
{
  "id": 1,
  "user_id": 2,
  "name": "Càmera Reflex Canon EOS 2000D",
  "price": 250,
  "desc": "Càmera ideal per iniciar-se en la fotografia...",
  "state": "Molt bon estat",
  "modality": "Venda",
  "location": "Barcelona Centre",
  "img": "https://..."
}
```

- **Resposta d'error (404):**

```json
{
  "status": "error",
  "message": "No s'ha trobat el producte amb l'id: 3453"
}
```

---

### 3. Buscar productes per nom

- **Endpoint**: `/products/name/:name`
- **Mètode**: `GET`
- **Exemple**: `/products/name/Càmera`
- **Resposta esperada (200):**

```json
[
  { "id": 1, "name": "Càmera Reflex Canon EOS 2000D", ... }
]
```

---

### 4. Obtenir productes de l'usuari autenticat

- **Endpoint**: `/products/me`
- **Mètode**: `GET`
- **Autenticació**: Cookie JWT
- **Resposta esperada (200):**

```json
[
  { "id": 1, "user_id": 2, ... }
]
```

---

### 5. Crear un nou producte

- **Endpoint**: `/products`
- **Mètode**: `POST`
- **Cos de la petició:**

```json
{
  "user_id": 2,
  "name": "Nou Producte",
  "price": 25.5,
  "desc": "Descripció del producte de prova",
  "state": "Nou",
  "modality": "Venda",
  "location": "Barcelona",
  "img": "https://..."
}
```

- **Resposta esperada (200):**

```json
{
  "status": "success",
  "message": "Producte creat correctament"
}
```

- **Resposta d'error (400):**

```json
{
  "status": "error",
  "message": "No s'ha pogut afegir el producte"
}
```

---

### 6. Modificar un producte

- **Endpoint**: `/products/:id`
- **Mètode**: `PUT`
- **Cos de la petició:**

```json
{
  "user_id": 2,
  "name": "Producte Modificat",
  "price": 30,
  "desc": "Descripció modificada",
  "state": "Com nou",
  "modality": "Venda",
  "location": "Barcelona",
  "img": "https://..."
}
```

- **Resposta esperada (200):**

```json
{
  "status": "success",
  "message": "Producte modificat correctament"
}
```

- **Resposta d'error (404):**

```json
{
  "status": "error",
  "message": "No s'ha pogut modificar el producte amb id: 23"
}
```

---

### 7. Eliminar un producte

- **Endpoint**: `/products/:id`
- **Mètode**: `DELETE`
- **Resposta esperada (200):**

```json
{
  "status": "success",
  "message": "Producte eliminat correctament"
}
```

- **Resposta d'error (404):**

```json
{
  "status": "error",
  "message": "No s'ha pogut eliminar el producte amb id: 23"
}
```

---

### 8. Registrar un nou usuari

- **Endpoint**: `/register`
- **Mètode**: `POST`
- **Cos de la petició:**

```json
{
  "email": "usuari@exemple.com",
  "pwd": "contrasenya"
}
```

- **Resposta esperada (200):**

```json
{
  "status": "success",
  "token": "...",
  "message": "User created successfully"
}
```

---

### 9. Login d'usuari

- **Endpoint**: `/login`
- **Mètode**: `POST`
- **Cos de la petició:**

```json
{
  "email": "usuari@exemple.com",
  "pwd": "contrasenya"
}
```

- **Resposta esperada (200):**

```json
{
  "status": "success",
  "token": "...",
  "message": "User logged successfully"
}
```

---

### 10. Validar sessió d'usuari (JWT)

- **Endpoint**: `/auth/me`
- **Mètode**: `GET`
- **Autenticació**: Cookie JWT
- **Resposta esperada (200):**

```json
{
  "loggedIn": true,
  "user": {
    "user_id": 2,
    "mail": "usuari@exemple.com",
    "role": "normal"
  }
}
```

---

## Notes

- Tots els endpoints retornen errors amb el format:

```json
{
  "status": "error",
  "message": "Missatge d'error"
}
```

- El sistema està orientat a economia circular: només es permeten productes de segona mà, intercanvi o lloguer.
