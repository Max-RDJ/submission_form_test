<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $review = $_POST['review'];

    $conn = new mysqli('sql7.freesqldatabase.com', 'sql7748230', 'NdC6XG8Ly8', 'name_and_review', '3306');
    if($conn->connect_error) {
        die('Connection Failed : '.$conn->connect_erorr);
    } else {
        $stmt = $conn->prepare("INSERT INTO name_and_review(firstName, lastName, review)
            values(?, ?, ?)");
        $stmt->bind_param("sss", $firstName, $lastName, $review);
        $stmt->execute();
        echo "Review submitted";
        $stmt->close();
    }
?>

<!-- Spam filter and retrieve db of other users once submitted -->