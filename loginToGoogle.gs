////////////////////////////////////////////////////
// Googleにログインするコード（Bot判定されてつかえない） //
////////////////////////////////////////////////////

function loginToGoogle() {
  var url = 'https://accounts.google.com/Login';
  var html = UrlFetchApp.fetch(url).getContentText();
  var form = getLoginForm(html); // ログインフォームを取得する関数
  var payload = {
    'Email': 'YOUR MAIL ADDRESS', // メールアドレス
    'Passwd': 'YOUR PASSWORD', // パスワード
    'signIn': 'Sign in',
    'continue': 'https://analytics.google.com/analytics/web/?utm_source=demoaccount&utm_medium=demoaccount&utm_campaign=demoaccount#/my-reports/q8oe2_bRSgiaVEQERmptYw/a54516992w87479473p92320289/', // ログイン後に移動するURL
  };
  var options = {
    'method': 'post',
    'payload': payload,
    'followRedirects': false,
  };
  var response = UrlFetchApp.fetch(form.action, options);
  Logger.log(response.getContentText());
}

////////////////////////////////////////////////////
// Googleのログイン画面からインプット項目を取得するコード //
////////////////////////////////////////////////////

function getLoginForm(html) {  
  // responseからformを取得する
  var formStart = html.indexOf('<form');
  var formEnd = html.indexOf('</form>') + '</form>'.length;
  var formHtml = html.substring(formStart, formEnd);

  // parseエラーになる文字列を取り除く
  var removeStr = 'novalidate';
  var formHtml = formHtml.replace(removeStr, '');

  var removeStr = 'autofocus';
  var formHtml = formHtml.replace(removeStr, '');

  // inputタグの閉じタグを設定
  var searchStr = /(<input.*)>/g;
  var replaceStr = '$1/>';
  var formHtml = formHtml.replace(searchStr, replaceStr);

  // もともとついている閉じタグは修正
  var searchStr = '<input type="hidden" id="_utf8" name="_utf8" value="&#9731;"//>';
  var replaceStr = '<input type="hidden" id="_utf8" name="_utf8" value="&#9731;"/>';
  var formHtml = formHtml.replace(searchStr, replaceStr);

  // 改行が入っているのを修正
  var searchStr = '               >';
  var replaceStr = '/>';
  var formHtml = formHtml.replace(searchStr, replaceStr);

  // parseする
  var form = XmlService.parse(formHtml).getRootElement();

  // formから要素を取得する
  return {
    'action': form.getAttribute('action').getValue(),
    'inputs': form.getChildren('input').map(function(input) {
      return {
        'name': input.getAttribute('name').getValue(),
        'value': input.getAttribute('value').getValue(),
      };
    }),
  };
}
