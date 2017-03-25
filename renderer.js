// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const dragula = require('dragula');

function addTask() {
  console.log("hi");
  let text = document.getElementById('addBox').value;
  if (text != '') {
    let newDiv = document.createElement('div');
    if (text[0]=="#") {
      newDiv.className = "section";
      if (text[1]==" ") {
        newDiv.innerHTML = text.slice(2);
      } else {
        newDiv.innerHTML = text.slice(1);
      }
    }
    else {
      newDiv.className = "task";
      newDiv.innerHTML = "- " + text;
      newDiv.addEventListener("dblclick", function(){
        if (this.className == "task") {
          this.className = "task done";
        } else {
          this.className = "task";
        }
    })};

    document.getElementById('list').appendChild(newDiv);
    document.getElementById('addBox').value = '';
}}

dragula([document.getElementById("list")])
  .on('drag', function (el) {
    // el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el) {
    // el.className += ' ex-moved';
  }).on('over', function (el, container) {
    // container.className += ' ex-over';
    el.remove();
  }).on('out', function (el, container) {
    // container.className = container.className.replace('ex-over', '');
  });