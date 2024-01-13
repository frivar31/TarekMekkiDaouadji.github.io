


<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

    // Vous pouvez ajouter des entêtes supplémentaires si nécessaire
    $headers = "From: $email";

    // Envoyer l'e-mail
    mail($to, $subject_mail, $message_mail, $headers);

    // Rediriger l'utilisateur vers une page de confirmation
    header("Location: confirmation.html");
    exit();
}
?>
