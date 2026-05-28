CREATE TABLE IF NOT EXISTS products (
  id         SERIAL        PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  image      VARCHAR(500)  NOT NULL,
  store_link VARCHAR(500)  DEFAULT NULL,
  ig_link    VARCHAR(500)  DEFAULT NULL,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);
