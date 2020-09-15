# numberKeypad
jQuery기반 숫자 혹은 문자를 모바일(핸드폰) 자판처럼 구현.

- 부트스트랩 4기반. (flex display 사용)
- 프로젝트 중에 키패드형식 컴포넌트를 만들일이있어서 간단히 구현하였습니다.
- 다중 input 가능한 형태이며, resize & 모바일 사이즈 반응.
- 랜덤 키배열 지원


Usage
-----
* Include `jquery.numberKeypad.css`  at the bottom after bootStrap.

  ```
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="jquery.numberKeypad.css">
  ```

* Include `jquery.numberKeypad.js` at the bottom after jQuery.

  ```
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="jquery.numberKeypad.js"></script>
  ```

* Use `numberKeypad` function on jQuery object.

  ```
  $(document).ready(function() {
      $('#keypad').numberKeypad();
  });
  ```

Advance options
---------------
You can customize the plugin by providing a hash with options on initialization. eg:

```
$(document).ready(function() {
    $('#keypad').numberKeypad({
        wrap: '.wrapper',
		arrKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        login: false // 이하 커스텀 스타일
    });
});
```

Default options:

```
{
	wrap: 'body',
    arrKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    login: false, // custom page style :: padding
    isRandom: true, // Random Keypad
    cancel: null,   // cancle시 콜백
    callback: null, // ok시 콜백
    limit: 100,     // 자리 수 제한
}
```
