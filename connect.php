<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $review = $_POST['review'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'review',"3307");
    if($conn->connect_error) {
        die('Connection Failed : '.$conn->connect_erorr);
    } else {
        $stmt = $conn->prepare("INSERT INTO name_and_review(firstName, lastName, review)
            values(?, ?, ?)");
        $stmt->bind_param("sss", $firstName, $lastName, $review);
        $stmt->execute();
        // echo $execval;
        echo "Review submitted";
        $stmt->close();
    }
?>