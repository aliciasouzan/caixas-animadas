CREATE DATABASE IF NOT EXISTS caixas;

USE caixas;

CREATE TABLE IF NOT EXISTS inputs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    linhas INT NOT NULL,
    colunas INT NOT NULL,
    sentido INT NOT NULL,
    intervalo INT NOT NULL
);

SELECT * FROM inputs;