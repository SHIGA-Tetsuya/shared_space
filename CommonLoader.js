function loadCsv(filePath, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filePath);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 0 || xhr.status === 200) {
                var lines = xhr.responseText.trim().split("\n");
                var result = [];
                for (var i = 0; i < lines.length; i++) {
                    result.push(lines[i].split(","));
                }
                if (callback) callback(result);  // ← QMLの関数を呼び出す！
            } else {
                console.log("読み込み失敗！ status: " + xhr.status);
                if (callback) callback(null);  // エラー時
            }
        }
    }
    xhr.send();
}
