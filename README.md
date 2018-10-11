# numberKeypad
jQuery기반 숫자 혹은 문자를 모바일(핸드폰) 자판처럼 구현.

- 프로젝트 중에 키패드형식 컴포넌트를 만들일이있어서 간단히 구현하였습니다.
- 다중 input 가능한 형태이며, resize & 모바일 사이즈 반응.


Usage
-----
* Include `jquery.numberKeypad.css` in head of your html document.

  ```
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
        wrap: $('.wrapper'),
		  arrKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'x', 'j', 'ok'],
        login: false // 이하 커스텀 스타일
    });
});
```

Default options:

```
{
	wrap: $('.wrapper'),
	arrKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'x', 0, 'ok'],
	login: false // 이하 커스텀 스타일
}
```