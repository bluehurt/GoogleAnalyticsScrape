function phantomJSCloudScraping(URL) {
  //スクリプトプロパティからPhantomJsCloudのAPIキーを取得する
  let key = PropertiesService.getScriptProperties().getProperty('PHANTOMJSCLOUD_ID');
  
  //HTTPSレスポンスに設定するペイロードのオプション項目を設定する
  let option =
  {
    url: URL,
    renderType: "HTML",
    outputAsJson: true
  };
  
  //オプション項目をJSONにしてペイロードとして定義し、エンコードする
  let payload = JSON.stringify(option);
  payload = encodeURIComponent(payload);
  
  //PhantomJsCloudのAPIリクエストを行うためのURLを設定
  let apiUrl = "https://phantomjscloud.com/api/browser/v2/" + key + "/?request=" + payload;
  
  //設定したAPIリクエスト用URLにフェッチして、情報を取得する。
  let response = UrlFetchApp.fetch(apiUrl);
  
  //取得したjsonデータを配列データとして格納
  let json = JSON.parse(response.getContentText());
  
  //APIから取得したデータからJSから生成されたソースコードを取得
  let source = json["content"]["data"];
  return source;
}
