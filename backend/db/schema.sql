CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    "desc" TEXT,
    state TEXT,
    modality TEXT,
    location TEXT NOT NULL,
    img TEXT NOT NULL,
    CONSTRAINT ck_price CHECK (price > 0),
    CONSTRAINT ck_modality CHECK (modality IN ('Lloguer', 'Venda')),
    CONSTRAINT fk_products_users FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    CONSTRAINT ck_role CHECK (role IN('admin', 'normal'))
);