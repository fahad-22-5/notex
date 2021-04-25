console.log("This is notex");

// let navbtn = document.getElementById("nav");
// navbtn.addEventListener("click", viewnotes);

// let viewbtn = document.getElementById("viewbtn");
// viewbtn.addEventListener("click", viewnotes);
// viewbtn.addEventListener("click", refreshbtn);
// let reload = document.getElementById("rel");
// reload.addEventListener("click", viewnotes);

// function refreshbtn(){
//     let reload = document.getElementById("rel");
//     reload.innerHTML = `<button class="btn btn-primary" id="ref">Refresh🔄</button>`
// }
viewnotes();

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
    
}

function delnote(index){
    notesarr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    viewnotes();

}

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


