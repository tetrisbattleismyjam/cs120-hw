<?php session_start(); ?>
<html>
    <head>
        <title>WIGS AND THAT'S IT</title>
        <link href='home.css' rel='stylesheet'>
        <script   src="https://code.jquery.com/jquery-3.1.1.min.js"   
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   
        crossorigin="anonymous"></script>
        <script>
            $(document).ready(function () {
                $(".more").click(function() {
                    $(this).closest('.card').children(".description").toggle();
                })
            });
        </script>
    </head>
    <body>
        <div class="nav">
            <a href="cart.php">CART here</a>
        </div>
        <script>alert(<?php $_SESSION ?>) </script>
        
        <?php
            
            if (isset($_GET['add'])) {
                $p_id = $_GET['product_id'];
                $qty = $_GET['qty'];
                if (isset($_SESSION[$p_id])) {
                    $prev = $_SESSION[$p_id];
                } else {
                    $prev = 0;
                }

                $_SESSION[$p_id] = $prev + $qty;
            }

            $server = "localhost";
            $user = "uyh2we3nsnrfu";
            $pass = "bfzgubhqnxip";
            $db = "dbeiygg6d148rv";

            $conn = new mysqli($server, $user, $pass, $db);

            if ($conn->connect_error) {
                die("Connection error: " .$conn->connect_error);
            }

            $sql = "SELECT * FROM Products";
            $res = $conn->query($sql);
            
            if ($res->num_rows > 0) {
                while ($row = $res->fetch_assoc()) {
                    $name = $row["Name"];
                    $price = "$" . $row["Price"];
                    $img = $row["ImageURL"];
                    $description = $row["Description"];
                    $id = $row["ProductID"];

                    createCard($name, $price, $img, $description, $id);
                }
            }
            else {
                echo "no results";
            }

            function createCard($name, $price, $url, $description, $id) {
                $str =  "<div class='card'> 
                            <img src='" . $url . "'>
                            <div class='info'>
                                <span class='name'>" . $name . "</span>
                            </div>
                            <div class='cart'>
                                <span class='price'>" . $price . "</span>
                                <button type='button' class='more'> More </button>
                                <form method='post' action='addtocart.php'>
                                    <input type='hidden' name='product_id' value=" . $id .">
                                    <input type='submit' name='add' value='Add to Cart'>
                                    <select name='qty'>
                                        <option value=1> 1 </option>
                                        <option value=2> 2 </option>
                                        <option value=3> 3 </option>
                                    </select>
                                </form>

                            </div>
                            <span class='description'>" . $description . "</span>
                        </div>";
                
                echo $str;
            }

        ?>
</html>