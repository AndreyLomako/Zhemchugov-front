<?php

$to = 'Philogor@yandex.ru';
$subject = 'Заказ обратного звонка';
$headers = 'From: no-reply@ателье-жемчугов.рф';

$locale = array(
    'name' => 'Имя',
    'email' => 'Email',
    'tel' => 'Номер телефона',
);
$msg = '';

if (!empty($_POST)) {
    if (empty($_POST['name'] || empty($_POST['tel']))) {
        $response = array(
            'status' => 'info',
            'text' => 'Не все обязательные поля были заполнены!'
        );
        echo json_encode($response);
        return false;
    } else {
        foreach ($_POST as $key => $value) {
            $msg .= $locale[$key] . ': ' . $value . "\r\n";
        }
    }
}

if (mail($to, $subject, $msg, $headers)) {
    $response = array(
        'status' => 'success',
        'text' => 'Заявка успешно отправлена!'
    );
} else {
    $response = array(
        'status' => 'error',
        'text' => 'Произошла ошибка! Перезагрузите страницу и попробуйте ещё раз.'
    );
}
echo json_encode($response);
return false;

?>