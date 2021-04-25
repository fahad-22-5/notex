console.log("This is notex");


// Push notes to localstorage when added
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function(e){

    let addtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");
    
    if(notes == null){
        notesarr = [];
    }
    else{
        notesarr = JSON.parse(notes);
    }

    let notesobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesarr.push(notesobj);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesarr);
})


// ****Button actions****
let navbtn = document.getElementById("nav");
navbtn.addEventListener("click", viewnotes);
let viewbtn = document.getElementById("viewbtn");
viewbtn.addEventListener("click", viewnotes);
viewbtn.addEventListener("click", hidebtn);
navbtn.addEventListener("click", scroll);
navbtn.addEventListener("click", hidebtn);


// ***REFRESH BUTTON(REMOVED)***

// viewbtn.addEventListener("click", refreshbtn);
//let reload = document.getElementById("rel");
// reload.addEventListener("click", viewnotes);
// function refreshbtn(){
//     let reload = document.getElementById("rel");
//     reload.innerHTML = `<button class="btn btn-primary" id="viewbtn">View pre-made notes</button>          <button class="btn btn-primary" id="ref">🔄</button>`
// }


//****COLLAPSABILITY****
    
function hidebtn(){
    let hide = document.getElementById('collbt');
    hide.innerHTML = `<button id="hidebtn">🔼</button>`

    let collbtn = document.getElementById('hidebtn');
    collbtn.addEventListener("click", collapse);
    collbtn.addEventListener("click", stopc);

    function stopc() {
        clearTimeout(t);
        let pre = document.getElementById('collbt');
        pre.innerHTML = ``
    }

    function collapse(){
        let coll = document.getElementById('notes');
        coll.innerHTML = ``
        console.log('clicked')
    }
}

//*** SCROLL ON CLICK ***
let scroller = document.getElementById('viewbtn');
scroller.addEventListener("click", scroll);
    function scroll(){
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    
//*** Viewnotes function ***

function viewnotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesarr = [];
    }
    else{
        notesarr = JSON.parse(notes);
    }

    let site = "";

    notesarr.forEach(function(element, index) {
        site  += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button class="btn btn-primary" id="${index}" onclick="delnote(this.id)">Delete</button>
        </div>
        </div>
        `
    });
    

    let view = document.getElementById("notes");
    if(notesarr.length != 0){
        view.innerHTML = site;
    }
    else{
        view.innerHTML = `<h5>Errr.. please add a note :)</h5>`
    }
    t = setTimeout(viewnotes, 100);
}

//**** Delete function****
function delnote(index){
    notesarr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    viewnotes();

}

//*** Search***
let searchin = document.getElementById("searchin")
searchin.addEventListener("input", function(){
    let results = document.getElementsByClassName("notecard");
    let input = searchin.value.toLowerCase();
    Array.from(results).forEach(function(element){
        let notetxt = element.getElementsByTagName("p")[0].innerText;
        if(notetxt.includes(input)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
