/**
 * json暗号化・複合時に使用する「どのフィールドは暗号化・複合しないか」リスト。
 * 対象の json ごとに正規表現で記載すること
 * @param  {[type]} _name [description]
 * @return {[type]}       [description]
 */
export default function(_name) {
  const list = {
    Works: [
      /^items\.\d+\.topimage/,
      /^items\.\d+\.images/,
      /^items\.\d+\.duration/,
      /^items\.\d+\.position/,
      /^items\.\d+\.team/,
      /^items\.\d+\.charge/,
      /^items\.\d+\.targetdevice/,
      /^items\.\d+\.technique/
    ]
  }[_name]
  return list ? list : []
}
