// 时间过滤器
// date 时间戳对象
// fmt  样式 ‘YY-MM-DD hh:mm:ss’
export function formatDate (date, fmt) {
  // 匹配YY YYYY
  let reg = new RegExp('(Y+)');
  if (reg.test(fmt)) {
    // 替换YY部分为年
    fmt = fmt.replace(RegExp.$1, date.getFullYear() + '');
    // 根据匹配的‘Y’的长度来截取年份显示
    // yyyy - 2018 yy - 18
    fmt = fmt.substr(4 - RegExp.$1.length);
  }
  // 匹配其他
  let regConfig = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let key in regConfig) {
    let reg = new RegExp(`(${key})`);
    if (reg.test(fmt)) {
      let str = regConfig[key] + '';
      // 根据fmt格式来决定是否需要填充'0'
      str = RegExp.$1.length === 1 ? str : padLeftZero(str);
      fmt = fmt.replace(RegExp.$1, str);
    }
  }
  return fmt;
}

function padLeftZero (str) {
  // 这个方法真的很巧妙，很棒
  return ('00' + str).substr(str.length);
}
