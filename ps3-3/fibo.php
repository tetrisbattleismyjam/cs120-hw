<?php
    $n = $_GET["n"];
    $fib = array();

    if ($n > 0 ) {
        $fib[] = 0;

        if ($n > 1) {
            $fib[] = 1;
        }
    }

    for ($i = 2; $i < $n; $i++) {
        $fib[] = $fib[$i - 2] + $fib[$i - 1];
    }

    $result = array("length" => $n, "fibSequence" => $fib);
    echo json_encode($result);
?>