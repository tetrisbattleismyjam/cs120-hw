<head>
    <title>OFFICE PARTY</title>
    <style>
        body>* {display: inline-block;}
        .day {width: 40px;}
    </style>
</head>

<body>
    <?php
    $hours = array("Sun" => "9:00 AM - 9:05 AM", "Mon" => "2:00 AM - 11:59 PM", 
                "Tue" => "2:00 AM - 2:99 FM", "Wed" => "4:00 PM - 3:59 AM", 
                "Thu" => "6:44 PM - 7:34 PM", "Fri" => "10:00 PM - 10:32 PM", 
                "Sat" => "CLOSED");

    function hours_to_element() {
        global $hours;

        foreach($hours as $day=>$hour) {
            yield "<span class='day'> $day </span class='hour'> $hour </span>";
        }
    }

    foreach(hours_to_element() as $el) {
        echo $el . "</br>";
    }
    ?>
</body>