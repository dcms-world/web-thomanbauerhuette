<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// reCAPTCHA Konfiguration
$recaptcha_secret = "YOUR_RECAPTCHA_SECRET_KEY";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Überprüfe reCAPTCHA
    $recaptcha_response = $data['recaptcha'];
    $verify_url = "https://www.google.com/recaptcha/api/siteverify";
    $verify_data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($verify_data)
        ]
    ];
    
    $context = stream_context_create($options);
    $verify_response = file_get_contents($verify_url, false, $context);
    $captcha_success = json_decode($verify_response);
    
    if ($captcha_success->success) {
        // E-Mail Konfiguration
        $to = "contact@example.com";
        $subject = "Neue Anfrage von " . $data['name'];
        $message = "Name: " . $data['name'] . "\n";
        $message .= "E-Mail: " . $data['email'] . "\n\n";
        $message .= "Nachricht:\n" . $data['message'];
        
        $headers = "From: noreply@example.com\r\n";
        $headers .= "Reply-To: " . $data['email'] . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Fehler beim Senden der E-Mail'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'reCAPTCHA Überprüfung fehlgeschlagen'
        ]);
    }
}
?>
