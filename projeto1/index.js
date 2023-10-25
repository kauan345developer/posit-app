
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
    id1:idplus,
    bgclass:""
  }

  addNotes(note,true)
  tableofnotes.push(note)

  idplus++

  const p = JSON.stringify(tableofnotes)
  localStorage.setItem("notes",p)

  noteName.value =""
  content.value = ""

})

document.addEventListener("click",() => {
  const ul = notesCollection.querySelectorAll("div ul")
  ul.forEach((e) => {
    e.style.display = "none"
  })
})



function contextMenu(visiblenote){
  const listOfLi = [
    "Excluir",
    "Mudar cor"
  ]

  const newUl = document.createElement('ul')
  newUl.style.display = "none"

  listOfLi.forEach((litext) =>{
    const li = document.createElement("li")
    li.textContent = litext
    newUl.appendChild(li)
  })



  visiblenote.appendChild(newUl)

  
}

function putColor(note,randomColor,visiblenote){
  if(randomColor){
    visiblenote.classList.add(`note${Math.floor(Math.random() * (9-1) + 1)}`)
    return note.bgclass = /note\d+/.exec(visiblenote.className)
  }
  
  visiblenote.classList.add(note.bgclass[0])
}


function btnexcluir(li1){
      const fatherdiv = li1.parentElement.parentElement
      notesCollection.removeChild(fatherdiv)
      tableofnotes = tableofnotes.filter((param) => param.id1 !== parseInt(fatherdiv.id) )
      localStorage.setItem("notes",JSON.stringify(tableofnotes))
}



function createMudarCor(li2){
        const fatherdiv = li2.parentElement.parentElement
  
        const cores = document.createElement("div")
        cores.classList.add("cores")
  
        const gridCores = document.createElement("div")
        gridCores.classList.add("gridCores")
  
        const p = document.createElement('p')
        p.textContent = "Selecione uma Cor"
  
        const btnEx = document.createElement("button")
        btnEx.textContent = "FECHAR"

        for (let index = 1; index < 10; index++) {
          const cor = document.createElement("div")
          cor.classList.add(`note${index}`)
          gridCores.appendChild(cor)
        }
        
        cores.append(p,gridCores,btnEx)
        fatherdiv.appendChild(cores)
        

      const coresespecificas = cores.querySelectorAll(".gridCores")
      const ultmacorespecifica = coresespecificas[coresespecificas.length -  1]
      const cor = ultmacorespecifica.querySelectorAll("div")
      cor.forEach((cor) => {
        cor.addEventListener("click", () => {
          mudarCor(cor,fatherdiv)
        })
      })

      const divBtns = document.querySelectorAll(".cores button")
      const divBtnUltimo = divBtns[divBtns.length -1]
      divBtnUltimo.addEventListener("click",(ev)=>{
        const fathercores = ev.target.parentElement
        const grandfather = ev.target.parentElement.parentElement
        grandfather.removeChild(fathercores)
      })
}

function mudarCor(cor,fatherdiv){

      const newColor = /note\d+/.exec(cor.className)
      for (let i = 1; i <= 9; i++) {
        fatherdiv.classList.remove(`note${i}`)
      }
      fatherdiv.classList.add(newColor)
    
  

  tableofnotes = tableofnotes.map((objeto) =>{
    if(objeto.id1 === parseInt(fatherdiv.id)){
      return {...objeto, bgclass:newColor }
    }
    return objeto
  })
  localStorage.setItem("notes",JSON.stringify(tableofnotes))
}

function addNotes(note,randomColor){
  const {name,content,id1} = note

  const visiblenote = document.createElement("div")
  visiblenote.id = id1
  visiblenote.classList.add("oi")
  putColor(note,randomColor,visiblenote)

  const visibleH2 = document.createElement("h2")
  const visibleP = document.createElement("p")
  

  const excludeBtn = document.createElement("img")
  excludeBtn.src ="./image/exclude.svg"
  excludeBtn.classList.add("exclude")
  
  excludeBtn.addEventListener("click",(ev) => {
    const fatherNote =  ev.target.parentElement;
    tableofnotes = tableofnotes.filter((param) => param.id1 !== parseInt(fatherNote.id) )
    localStorage.setItem("notes",JSON.stringify(tableofnotes))

    notesCollection.removeChild(fatherNote)
  })


  visibleH2.textContent = name
  visibleP.textContent = content

  visiblenote.append(visibleH2,visibleP,excludeBtn)
  contextMenu(visiblenote)
  notesCollection.appendChild(visiblenote)
  
  const divs = notesCollection.querySelectorAll("div")
  const div = divs[divs.length - 1]
  
    const ul = div.querySelector("ul")
    
      div.addEventListener("contextmenu",(ev) => {
        ev.preventDefault()
        
        
        const divRect = div.getBoundingClientRect();
        const x = ev.clientX - divRect.left - 10; 
        const y = ev.clientY - divRect.top  - 10; 
        
        ul.style.position = "relative"
        ul.style.left = x + "px"
        ul.style.top = y + "px"
        ul.style.display = "block"
  })
  

  const li1 = div.querySelector("ul li:nth-child(1)")
    li1.addEventListener("click",() =>{
      btnexcluir(li1)
    })
  

  const li2 = div.querySelector("ul li:nth-child(2)")
  li2.addEventListener("click",() =>{
    createMudarCor(li2)
  })


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
      addNotes(element,false);
    });


  } catch (error) {

    console.error(error) 
  }
}



render();

