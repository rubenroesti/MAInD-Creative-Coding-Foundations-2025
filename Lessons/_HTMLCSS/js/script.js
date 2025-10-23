
document.addEventListener('DOMContentLoaded', (event) => {
  onClick();
});

function onClick() {
var textOverImages = document.getElementsByClassName("image-container");
var previousTextOverImage;
for (var i = 0; i < textOverImages.length; i++) {
  textOverImages[i].onclick = function () {
    var classes = this.classList;
    if (classes.contains("show")) {
      classes.remove("show");
    } else {
      if (previousTextOverImage != null)
        previousTextOverImage.classList.remove("show");
      previousTextOverImage = this;
      classes.add("show");
    }};
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

document.addEventListener('DOMContentLoaded', (event) => {
  onClickbutton();
});

function onClickbutton() {
  const button = document.getElementById("button");
  button.addEventListener("click", function(){
    console.log("j'ai click")
    document.body.classList.toggle("switch-on");
  });
}