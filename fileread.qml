import "CommonLoader.js" as Loader

Item {
    property var csvData: []

    Button {
        text: "読み込む！"
        onClicked: {
            Loader.loadCsv("file:///C:/myapp/data.csv", function(result) {
                if (result) {
                    csvData = result;
                    console.log("読み込んだデータ:", csvData);
                } else {
                    console.log("読み込みに失敗したよ…😭");
                }
            });
        }
    }

    // 表示確認
    Text {
        text: csvData.length > 1 ? csvData[1][0] : "まだ読み込んでないよ"
    }
}
