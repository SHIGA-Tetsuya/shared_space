Editor.GoFileTop(); // ファイルの先頭へ移動
var totalLines = Editor.GetLineCount(0); // 引数を0に固定
var currentLine = 1;

while (currentLine <= totalLines) {
    // ":" で始まる行を探す
    while (currentLine <= totalLines) {
        if (Editor.GetLineStr(currentLine).match(/^:/)) {
            currentLine++; // 次の行へ移動
            break;
        }
        currentLine++;
    }

    // 選択範囲の開始
    if (currentLine > totalLines) break; // ファイル終端なら終了
    Editor.Jump(currentLine, 1);
    Editor.BeginSelect(); // 選択開始

    // 次の ":" で始まる行の前まで進む
    while (currentLine <= totalLines) {
        if (Editor.GetLineStr(currentLine).match(/^:/)) {
            break;
        }
        currentLine++;
    }

    // 選択範囲を確定して昇順ソート
    Editor.Jump(currentLine, 1);
    Editor.SortAsc(); // 昇順ソート
}
