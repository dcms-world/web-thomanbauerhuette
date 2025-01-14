<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Logging function
function log_message($message) {
    $log_file = '/tmp/contact_form.log';
    file_put_contents($log_file, date('[Y-m-d H:i:s] ') . $message . "\n", FILE_APPEND);
}

// Überprüfe, ob Daten vorhanden sind
$data = $_POST;
log_message("Received data: " . print_r($data, true));

if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    log_message("Missing form data");
    echo json_encode([
        'success' => false,
        'message' => 'Bitte füllen Sie alle Felder aus.'
    ]);
    exit;
}

// E-Mail Konfiguration
$to = 'huette@thomanbauer.at';
$subject = "Neue Kontaktanfrage von " . $data['name'];
$message = "Kontaktanfrage über die Webseite\n\n";
$message .= "Name: " . htmlspecialchars($data['name']) . "\n";
$message .= "E-Mail des Absenders: " . htmlspecialchars($data['email']) . "\n\n";
$message .= "Nachricht:\n" . htmlspecialchars($data['message']);

// Verbesserte Header für bessere Zustellbarkeit
$headers = "From: huette@thomanbauer.at\r\n";
$headers .= "Reply-To: " . htmlspecialchars($data['email']) . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Zusätzliche Authentifizierungs-Header
$headers .= "X-Priority: 3\r\n";
$headers .= "X-MSMail-Priority: Normal\r\n";
$headers .= "Importance: Normal\r\n";

// SPF und DKIM Simulation (falls vom Hosting unterstützt)
$headers .= "X-Sender-IP: " . $_SERVER['SERVER_ADDR'] . "\r\n";
$headers .= "X-Domain: thomanbauer.at\r\n";

log_message("Attempting to send email");
log_message("To: $to");
log_message("Subject: $subject");
log_message("Headers: $headers");

// Verwende PHP mail() Funktion mit zusätzlichen Parametern
$additional_params = "-f huette@thomanbauer.at";

// Sende E-Mail
$mail_sent = mail($to, $subject, $message, $headers, $additional_params);

if ($mail_sent) {
    log_message("Email sent successfully");
    echo json_encode(['success' => true]);
} else {
    log_message("Email sending failed");
    echo json_encode([
        'success' => false,
        'message' => 'Fehler beim Senden der E-Mail'
    ]);
}
?>
