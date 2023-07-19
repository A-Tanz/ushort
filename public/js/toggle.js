function b1c() {
    console.log("Clicked");
    var txt = document.getElementById("b1").innerText;
    if(txt == "Customize")
    {
      console.log("Customize");
      document.getElementById("b1").innerText = "Randomize";
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.name = "custom";
      newInput.placeholder = "Enter Custom Code";
      newInput.autocomplete="off"
      newInput.required = true;
      var div = document.getElementById("ccc")
      div.appendChild(newInput);
    }
    else if(txt == "Randomize")
    {
      console.log("Randomize");
      document.getElementById("b1").innerText = "Customize";
      var div = document.getElementById("ccc")
      div.removeChild(div.lastChild);
    }
  }