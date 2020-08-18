function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form")); // 引数にフォームのオブジェクトを指定して、フォームに入力された値を使用できるようにする
    const XHR = new XMLHttpRequest(); // 非同期通信を実現するために必要なXMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true); // 【リクエスト内容】HTTPメソッドはPOST、パスは/posts、非同期通信はtrueで有効に設定
    XHR.responseType = "json";
    XHR.send(formData); // メモ投稿のフォームに入力された情報を送信
    XHR.onload = () => {
      const item = XHR.response.post;
      const list = document.getElementById("list"); // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content"); // メモの入力フォーム」をリセットするために取得
      const HTML = ` 
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`; // 「メモとして描画する部分のHTML」を定義
      list.insertAdjacentHTML("afterend", HTML); // list要素に対してHTMLを追加する。afterendでlistの要素直後に挿入

      formText.value = ""; // 「メモの入力フォームに入力されたままの文字」はリセットされる。正確には、空の文字列に上書きされるような仕組み

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };  //ここまでがサーバーサイドの処理が成功し、レスポンスが正しく返却された場合の処理
    
    XHR.onerror = function () { // リクエストが送信できなかった時
      alert("Request failed");
    };

    e.preventDefault();
  })
}
window.addEventListener("load", memo); // window（ページ）をload（読み込んだ時）に実行される

