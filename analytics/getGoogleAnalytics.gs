/////////////////////////////////////////////////////////////////////////////////////////////
//　メインクラス。
//  1. phantomJSCloudScrapingをつかって、GAをHTMLにレンダリングする
// 　　 初期設定：phantomJSCloudScrapingのAPIキーを取得し、GASのプロパティ（PHANTOMJSCLOUD_ID）に設定する
//　　　https://auto-worker.com/blog/?p=1974
//  2. Paserライブラリで、目的のCSSクラスから値を取得する
//
/////////////////////////////////////////////////////////////////////////////////////////////

function getGoogleAnalytics() {
  let url = "https://analytics.google.com/analytics/web/?authuser=0&pli=1#/my-reports/q8oe2_bRSgiaVEQERmptYw/a54516992w87479473p92320289/";

  // Googleにログインする（bot判定されて動作せず）
  // loginToGoogle();

  //PhantomJsCloud用の独自関数で動的なWebページのHTMLデータを取得する
  let html = phantomJSCloudScraping(url);

  //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  let metricsList = Parser.data(html)
    .from('<div class="_GAtjb">')  // ログイン認証を超えられないため、GAから要素を拾えずエラー
      .to('</div>')
      .iterate();

  //ログ出力でスクレイピング結果を表示する
  console.log(metricsList);

  ///////////////////////////////////////////////////////////
  // 動作確認用コード。Yahooニュースのヘッドラインを取得するコード  //   
  ///////////////////////////////////////////////////////////

  // //スクレイピングしたいWebページのURLを変数で定義する
  // let url = "https://www.yahoo.co.jp/";
  
  // //PhantomJsCloud用の独自関数で動的なWebページのHTMLデータを取得する
  // let html = phantomJSCloudScraping(url);

  // //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  // let newsList = Parser.data(html)
  //   .from('<h1 class="_3cl937Zpn1ce8mDKd5kp7u">')
  //     .to('</h1>')
  //     .iterate();

  // //ログ出力でスクレイピング結果を表示する
  // console.log(newsList);
}
