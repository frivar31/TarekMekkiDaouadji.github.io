<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['csrf_token']) && $_POST['csrf_token'] == $_SESSION['csrf_token']) {
    // Supprimez le jeton CSRF après utilisation
    unset($_SESSION['csrf_token']);

    $name = $_POST["name"];
    $email = $_POST["email"];
    $entreprise = $_POST["entreprise"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "mekki.d.tarek@hotmail.com";
    $subject_mail = "Nouveau message du formulaire de contact";
    $message_mail = "Nom et prénom: $name\n";
    $message_mail .= "Email: $email\n";
    $message_mail .= "Entreprise: $entreprise\n";
    $message_mail .= "Sujet: $subject\n";
    $message_mail .= "Message:\n$message";

    $headers = "From: $email";

    mail($to, $subject_mail, $message_mail, $headers);

    // Rediriger l'utilisateur vers une page de confirmation
    header("Location: confirmation.html");
    exit();
} else {
    // En cas de méthode non autorisée, renvoyer une réponse 405 Not Allowed
    header('HTTP/1.1 405 Not Allowed');
    exit('405 Not Allowed');
}
?>
