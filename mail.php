
<?php
// ����� phpmailer
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';
    require 'phpmailer/Exception.php';
    
// ����������, ������� ���������� ������������
    $name = $_POST['name'];
    $tel = $_POST['tel'];
  
    $nameT = '<b>Name:</b>';
    $telT= '<b>Tel:</b>';
    
    
// ������������ ������ ������
    $title = '';
    $body = "
    $nameT $name<br>
	$telT $tel<br>";
// ��������� PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();   
        $mail->CharSet = "UTF-8";
        $mail->Encoding = 'base64';
        $mail->SMTPAuth   = true;
        // $mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    
    
    // ????????? ????? ?????
        $mail->Host       = 'smtp.yandex.ru'; // SMTP ??????? ????? ?????
        $mail->Username   = 'hovhannisyans2021@yandex.com'; // ????? ?? ?????
        $mail->Password   = 'vlmmcjpygmpwxshv'; // ?????? ?? ?????
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('hovhannisyans2021@yandex.com', 'New Mail'); // ????? ????? ????? ? ??? ???????????
    
    // ���������� ������
        $mail->addAddress('OKN@afid.ru');

    // �������� ���������
        $mail->isHTML(true);
        $mail->Subject =  '=?UTF-8?B?'.base64_encode($title).'?=';
        $mail->Body = $body;
        

    // ��������� ������������� ���������
        if ($mail->send()) {$result = "success";} 
        else {$result = "error";}

        } catch (Exception $e) {
            $result = "error";
            $status = "��������� �� ���� ����������. ������� ������: {$mail->ErrorInfo}";
        }

    // ����������� ����������
        echo json_encode(["result" => $result, "status" => $status]);
?>


