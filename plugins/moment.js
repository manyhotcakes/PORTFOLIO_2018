import moment from "moment"
export default function(ctx, inject) {
  // crypt のグローバルインスタンス化
  ctx.$moment = moment // 他プラグインから参照するために定義
  inject("moment", moment) // コンポーネントから参照するために定義
}
