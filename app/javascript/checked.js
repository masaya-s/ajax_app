function check() {
  // 投稿のDOMを取得している
  const posts = document.getElementsByClassName("post");
 
  // 取得したDOMを配列に変換している
  postsA = Array.from(posts);
 
  postsA.forEach(function (post) { // ここのpostは1件の投稿
      if (post.getAttribute("data-load") != null) {   // 2? 一周目はdata-loadが無いのでif文は無視される
       return null; // 二周目はdata-loadにtrueが入るので「真」になり、return null;が読まれるので、ここで処理が終わる
     }
     post.setAttribute("data-load", "true");
    // 投稿をクリックした場合に実行する処理を定義している
    post.addEventListener("click", (e) => {
      // どの投稿をクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
 
      // Ajaxに必要なオブジェクトを生成している。変数XHRからXMLHttpRequestのメソッドを使用できるようにしている
      const XHR = new XMLHttpRequest();
 
      // openでリクエストを初期化する(どのようなリクエストをするのか指定するメソッド)
      XHR.open("GET", `/posts/${postId}`, true); // ここのtrueは非同期on？
 
      // レスポンスのタイプを指定する
      XHR.responseType = "json";
 
      // sendでリクエストを送信する
      XHR.send();
 
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        const item = XHR.response.post; // XHR.responseでレスポンスされてきたJSONにアクセス。
        if (item.checked === true) { // 3? trueとfalseはどうやって判定している？
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
 
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`); // e.g. 404: Not Found
        } else {
          return null;
        }
      };
      // リクエストが送信できなかった時
      XHR.onerror = () => {
        alert("Request failed");
      };
 
      // (イベントハンドラーが実行し終わったら今回の)イベントをキャンセルして、処理が重複しないようにしている
      e.preventDefault(); // 1? この場合 post.addEventListener("click", (e) => に紐付けている。e部分は任意

    });
  });
 }

 // 一定時間ごとに関数を実行する(1000ミリ秒=1秒)
 setInterval(check, 1000);
// window.addEventListener("load", check);


 // あるイベントが発火した際に実行されるメソッドは、イベントハンドラーと言う