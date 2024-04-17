<html>
    <head> 
        <title>TIMES TABLE</title>
    </head>
    <?php
        $n= (int)$_GET["n"];
        for ($i = 1; $i <= 12; $i++) {
            $ans = $i * $n;
            $msg = "$i x $n = $ans";
            echo $msg;
            echo "</br>";
        };
    ?>
</html>