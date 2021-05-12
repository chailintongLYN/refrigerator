export default function time_stamp(stamp, formatter) {
  let date = new Date(Number(stamp));
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  var _week = date.getDay();

  if (_week == 0) _week = '星期日';

  if (_week == 1) _week = '星期一';

  if (_week == 2) _week = '星期二';

  if (_week == 3) _week = '星期三';

  if (_week == 4) _week = '星期四';

  if (_week == 5) _week = '星期五';

  if (_week == 6) _week = '星期六';

  if (h < 10) {
    h = '0' + h;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }

  if (formatter) {
    return Y + '-' + M + '-' + D;
  }
  return {year: Y, month: M, day: D, week: _week, hour: h, min: m, sec: s};
}
