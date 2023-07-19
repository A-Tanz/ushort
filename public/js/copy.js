function copyText() {
  var textBox = document.getElementById("textbox");
  textBox.select();
  document.execCommand("copy");
  var butn = document.getElementById("b1");
  butn.innerHTML = "Copied!";
  setTimeout(function () {
    butn.innerHTML = "Copy";
  }, 2000);
}
