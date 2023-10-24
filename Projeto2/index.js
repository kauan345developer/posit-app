const btnMega = document.getElementById("btnMega")

function gerarNumeros(qtd,max) {
  let result = ""
  for (let index = 0; index < qtd; index++) {
    const random = Math.floor(Math.random() * (max-1) + 1)
    result += `${random}-`
  }
  result = result.slice(0,-1)
  return result
}



btnMega.addEventListener("click",() =>{
  const container = document.querySelector(".mega .numeros")
  const result = gerarNumeros(6,60)
  const span = document.createElement("span")
  span.textContent = result
  container.appendChild(span)
})

