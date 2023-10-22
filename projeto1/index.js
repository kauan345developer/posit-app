
const noteName = document.getElementById("noteName")
const content = document.getElementById("content")
const form = document.getElementById("form1")
const teste = document.getElementById("teste")
const notesCollection = document.querySelector(".container .notesCollection")


let tableofnotes = []

let idplus 

form.addEventListener("submit",(ev) =>{
  ev.preventDefault()
  let count = tableofnotes.length

  if(count === 9){
    return alert("numero maximo de notas,remova uma nota")
  }

  
  const note = {
    name:noteName.value,
    content:content.value,
    id1:idplus
  }
  console.log(`idplus:${idplus}`)
  addNotes(note)
  tableofnotes.push(note)

  idplus++

  const p = JSON.stringify(tableofnotes)
  localStorage.setItem("notes",p)

  noteName.value =""
  content.value = ""

})


function addNotes(note){
  const {name,content,id1} = note
  console.log(`id1: ${id1}`)
  const visiblenote = document.createElement("div")
  visiblenote.id = id1
  visiblenote.classList.add(`note${Math.floor(Math.random() * (9-1) + 1)}`)

  const visibleH2 = document.createElement("h2")
  const visibleP = document.createElement("p")

  const excludeBtn = document.createElement("img")
  excludeBtn.src ="./image/exclude.svg"
  excludeBtn.classList.add("exclude")
  
  excludeBtn.addEventListener("click",(ev) => {
    const fatherNote =  ev.target.parentElement;
    console.log(`fatherNote-id: ${fatherNote.id}`)
    tableofnotes = tableofnotes.filter((param) => param.id1 !== parseInt(fatherNote.id) )
    localStorage.setItem("notes",JSON.stringify(tableofnotes))

    notesCollection.removeChild(fatherNote)
  })


  visibleH2.textContent = name
  visibleP.textContent = content

  visiblenote.append(visibleH2,visibleP,excludeBtn)

  notesCollection.appendChild(visiblenote)
}


function render() {
  try {
    const storage = JSON.parse(localStorage.getItem("notes"))
    if (storage && storage.length !== 0) {
      tableofnotes = storage;

      idplus = Math.max(...tableofnotes.map((note) => note.id1)) + 1;
    } else {
      idplus = 1;
    }
    tableofnotes.forEach((element) => {
      addNotes(element);
    });
  } catch (error) {
    console.log("REERERERERE")
    console.error(error) 
  }
}

render();
