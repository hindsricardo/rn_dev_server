module.exports = function(binary) {
  var out = '';
  while(binary.length >= 8) {
   var byte = binary.slice(0, 8);
   binary = binary.slice(8);
   out += String.fromCharCode(parseInt(byte, 2));
  }

  return decodeURIComponent(escape(out));
};
