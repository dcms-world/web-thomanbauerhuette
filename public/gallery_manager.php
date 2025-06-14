<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$impressionsBasePath = __DIR__ . '/images/impressions/';
$galleryBasePath = __DIR__ . '/images/gallery/';

function getImpressions() {
    global $impressionsBasePath;
    
    $mediaFiles = glob($impressionsBasePath . '*.{jpg,jpeg,png,gif,webp,mp4,avi,mov}', GLOB_BRACE);
    
    // Zufällige Auswahl von 4 Medien, falls mehr als 4 vorhanden
    if (count($mediaFiles) > 4) {
        shuffle($mediaFiles);
        $mediaFiles = array_slice($mediaFiles, 0, 4);
    }
    
    return array_map(function($file) {
        return str_replace(__DIR__, '', $file);
    }, $mediaFiles);
}

function getGalleryImages($category = null) {
    global $galleryBasePath;
    $categories = ['Aussen', 'Innen', 'Umgebung'];
    
    $images = [];
    
    if ($category === null || $category === 'Alle') {
        foreach ($categories as $cat) {
            $categoryPath = $galleryBasePath . $cat . '/';
            if (is_dir($categoryPath)) {
                $categoryMedia = glob($categoryPath . '*.{jpg,jpeg,png,gif,webp,mp4,avi,mov}', GLOB_BRACE);
                $images = array_merge($images, array_map(function($file) use ($cat) {
                    return "images/gallery/{$cat}/" . basename($file);
                }, $categoryMedia));
            }
        }
        shuffle($images);
    } else {
        $categoryPath = $galleryBasePath . $category . '/';
        if (is_dir($categoryPath)) {
            $images = array_map(function($file) use ($category) {
                return "images/gallery/{$category}/" . basename($file);
            }, glob($categoryPath . '*.{jpg,jpeg,png,gif,webp,mp4,avi,mov}', GLOB_BRACE));
        }
    }
    
    return $images;
}

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'impressions':
        echo json_encode(getImpressions());
        break;
    
    default:
        $category = $_GET['category'] ?? null;
        echo json_encode(getGalleryImages($category));
        break;
}
?>
