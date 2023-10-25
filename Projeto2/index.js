const loteriasHere = {
  megasena:"",
  quina:"",
  lotofacil:""
}


const btnMega = document.getElementById("btnMega")
const btnQuina = document.getElementById("btnQuina")
const btnLotofacil = document.getElementById("btnLotofacil")


function gerarNumeros(qtd,max) {
  let result = []
  while (result.length < qtd) {
    const random = Math.floor(Math.random() * (max-1) + 1)
    if (!result.includes(random)) {
      result.push(random)
    }
  }
   
  return result.join('-')
}



btnMega.addEventListener("click",() =>{
  const result = gerarNumeros(6,60)
  const span = document.querySelector(".mega .numeros span")
  span.textContent =  result

  const loterias = JSON.parse(localStorage.getItem("loterias"))
  
  if(loterias){
    loterias.megasena = result
    localStorage.setItem("loterias", JSON.stringify(loterias))
    return
  }
  localStorage.setItem("loterias",JSON.stringify(loteriasHere))
})

btnQuina.addEventListener("click",() =>{
  const result = gerarNumeros(5,80)
  const span = document.querySelector(".quina .numeros span")
  span.textContent = result

  const loterias = JSON.parse(localStorage.getItem("loterias"))
  
  if(loterias){
    loterias.quina = result
    localStorage.setItem("loterias", JSON.stringify(loterias))
    return
  }
  
  localStorage.setItem("loterias",JSON.stringify(loteriasHere))
})

btnLotofacil.addEventListener("click",() =>{
  const result = gerarNumeros(15,25)
  const span = document.querySelector(".lotofacil .numeros span")
  span.textContent = result
  
  const loterias = JSON.parse(localStorage.getItem("loterias"))
  if(loterias){
    loterias.lotofacil = result
    localStorage.setItem("loterias", JSON.stringify(loterias))
    return
  }
  
  localStorage.setItem("loterias",JSON.stringify(loteriasHere))
})

function render(){
  const loterias = JSON.parse(localStorage.getItem("loterias"))
  if(loterias){

  const span1 = document.querySelector(".mega .numeros span")
  span1.textContent = loterias.megasena

    const span2 = document.querySelector(".quina .numeros span")
    span2.textContent = loterias.quina

    const span3 = document.querySelector(".lotofacil .numeros span")
    span3.textContent = loterias.lotofacil
    return
  }
  
  localStorage.setItem("loterias",JSON.stringify(loteriasHere))
}

render()