<?php
$servername = "localhost";
$username = "";
$password = "";
$dbname = "caixas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

$input_data = file_get_contents("php://input");

$input_array = json_decode($input_data, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $linhas = $input_array["linhas"];
    $colunas = $input_array["colunas"];
    $sentido = $input_array["sentido"];
    $intervalo = $input_array["intervalo"];

    $sql = "INSERT INTO inputs (linhas, colunas, sentido, intervalo) VALUES ('$linhas', '$colunas', '$sentido', '$intervalo')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao enviar mensagem: " . $conn->error]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT linhas, colunas, sentido, intervalo FROM inputs ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(["status" => "error", "message" => "Nenhum dado encontrado"]);
    }
}

$conn->close();
die();