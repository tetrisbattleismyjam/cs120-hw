<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        $productID = $_POST["product_id"];
        $qty = $_POST["qty"];

        if (isset($_SESSION[$productID])) {
            $prev = $_SESSION[$productID];
        } else {
            $prev = 0;
        }

        $_SESSION[$productID] = $prev + $qty;
    }
    
    session_write_close();
    header("Location:home.php"); ?>

<script>alert(<?php $_SESSION ?>) </script>