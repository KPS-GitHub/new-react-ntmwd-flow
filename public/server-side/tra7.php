<?php
$data = false;
$output = 'API Error';
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://gis.traweb.net/trmapps/tokens/generateToken",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "f=json&username=ntmwd_tra&password=Trakey%40Ntmsps",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/x-www-form-urlencoded",
    "Postman-Token: 71107c62-3fbc-4dc6-92ae-d160d65f67ed",
    "cache-control: no-cache"
  ),
));
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  $data = json_decode( $response, true );
}
if( $data ) {
    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
	
	$curl = curl_init();
	
	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://gis.traweb.net/trmapps/rest/services/ExtShared/TRAdata_NTMWDmsps/MapServer/1/query?where=1%3D1&outFields=AllowableDischarge_Avail_for_Di%2C+Date&f=json&token={$data['token']}&orderByFields=Date%20DESC&resultRecordCount=7",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "GET",
	  CURLOPT_HTTPHEADER => array(
	    "Accept: */*",
	    "Accept-Encoding: gzip, deflate",
	    "Cache-Control: no-cache",
	    "Connection: keep-alive",
	    "Host: gis.traweb.net",
	    "Postman-Token: d9be28c8-e09b-477d-a1f1-a209a6cb65fc,31a84978-d3d0-46ac-9837-2ee52e807e6b",
	    "User-Agent: PostmanRuntime/7.16.3",
	    "cache-control: no-cache"
	  ),
	));
	
	$response = curl_exec($curl);
	$err = curl_error($curl);
	
	curl_close($curl);
	
	if ($err) {
	  echo "cURL Error #:" . $err;
	} else {
		
	  $data = json_decode( $response, true );
	  if( ! empty( $data ) && is_array( $data ) ) {
		  if( isset($data['features']) && is_array($data['features']) && count($data['features']) > 0 ) {
              $output = [];
              foreach($data['features'] as $day){
                  array_push($output,[
                      'value'=>number_format($day['attributes']['AllowableDischarge_Avail_for_Di'],2),
                      'date'=>$day['attributes']['Date']
                  ]);
              }
              echo json_encode($output);
		  }
	  } 
	}
}