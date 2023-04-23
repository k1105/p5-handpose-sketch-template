export const updateStyleIndex = (
  lost: { state: boolean; prev: boolean; at: number },
  styleIndex: number,
  styleNum: number
) => {
  if (lost.prev && !lost.state && new Date().getTime() - lost.at > 1000) {
    // //ロスト復帰したタイミングで、1s以上経過していた場合
    styleIndex = (styleIndex + 1) % styleNum; //表示するスケッチファイルを変更
  }
  return styleIndex;
};
