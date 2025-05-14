Item {
    id: root
    property var csvData: []  // ← 後で使えるように保存！

    Button {
        text: "CSV読み込み"
        onClicked: {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "file:///C:/myapp/data.csv");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 0 || xhr.status === 200) {
                        var lines = xhr.responseText.trim().split("\n");
                        var parsed = [];
                        for (var i = 0; i < lines.length; i++) {
                            parsed.push(lines[i].split(","));
                        }
                        root.csvData = parsed;  // ← 読み込んだデータを格納✨
                        console.log("データを保存したよ:", root.csvData);
                    }
                }
            }
            xhr.send();
        }
    }

    // 読み込んだ結果を表示（例：2行目1列目）
    Text {
        text: root.csvData.length > 1 ? root.csvData[1][0] : "データなし"
        anchors.top: parent.top
        anchors.topMargin: 100
    }
}
