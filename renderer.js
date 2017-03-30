// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// to build: electron-packager . --icon="img/fan.icns" --overwrite

const electron = require('electron')

const dragula = require('dragula');
const print = (x) => console.log(x);
const fs = require('fs');
const savePath = (electron.app || electron.remote.app).getPath('userData')+"/data.txt";

function save() {
  let tasks = document.getElementById('list').innerHTML;
  console.log(savePath);
  fs.writeFileSync(savePath, tasks);
}

function load() {
  fs.readFile(savePath, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    document.getElementById('list').innerHTML = data;
  });
}

function addTask() {
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
    })
    if (text[text.length-2] == "+") {
      newDiv.innerHTML = "- " + text.slice(0,text.length-2)
      if ((text[text.length-1] == "r") || (text[text.length-1] == "1")) {
        newDiv.style.color = "red";
      }
      else if ((text[text.length-1] == "o") || (text[text.length-1] == "2")){
        newDiv.style.color = "orange";
      } else if ((text[text.length-1] == "y") || (text[text.length-1] == "3")){
        newDiv.style.color = "yellow";
      } else if ((text[text.length-1] == "g") || (text[text.length-1] == "4")){
        newDiv.style.color = "green";
      } else if ((text[text.length-1] == "b") || (text[text.length-1] == "5")){
        newDiv.style.color = "blue";
      } else if ((text[text.length-1] == "i") || (text[text.length-1] == "6")){
        newDiv.style.color = "indigo";
      } else if ((text[text.length-1] == "v") || (text[text.length-1] == "7")){
        newDiv.style.color = "violet";
      }
    }
  };

    document.getElementById('list').appendChild(newDiv);
    document.getElementById('addBox').value = '';
    save();
}}

dragula([document.getElementById("list")])
  .on('drag', function (el) {
    // el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el) {
    // el.className += ' ex-moved';
    console.log("moved")
    setTimeout(()=>{save()}, 500)
    save();
  }).on('over', function (el, container) {
    // container.className += ' ex-over';
    el.remove();
    save();
  }).on('out', function (el, container) {
    // container.className = container.className.replace('ex-over', '');
  });

load();