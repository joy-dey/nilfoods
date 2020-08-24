<?php

$cn = mysqli_connect("localhost", "root", "", "test");

$sql = mysqli_query($cn, "SELECT * FROM main");

if ($sql) {
    $count = 0;
    while ($row = mysqli_fetch_assoc($sql)) {
        $arOut[$count]["c_img"] = $row["id"];
        $arOut[$count]["c_name"] = $row["name"];

        $sqlSub = mysqli_query($cn, "SELECT * FROM subc WHERE phone='" . $row["phone"] . "'");
        if ($sqlSub) {
            $countSub = 0;
            while ($rowSub = mysqli_fetch_assoc($sqlSub)) {
                $arOut[$count]["c_items"][$countSub]["cs_name"] = $rowSub["s_name"];
                $arOut[$count]["c_items"][$countSub]["cs_link"] = $rowSub["phone"];
                $countSub++;
            }
        } else {
            $arOut[] = 0;
        }
        $count++;
    }
} else {
    $arOut[] = 0;
}


echo json_encode($arOut);

mysqli_close($cn);