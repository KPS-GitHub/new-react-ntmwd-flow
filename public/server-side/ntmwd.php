<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
echo json_encode(array_map('str_getcsv', file('https://filecloud.ntmwd.com/HTCOMNET/Handlers/AnonymousDownload.ashx?file=12943482')));;