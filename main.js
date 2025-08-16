const entrada = document.getElementById("inp-tarefa")
const adicionarItem = document.querySelector(".botao")
const limpar = document.querySelector(".limpar")
const limparMobile = document.querySelector(".para-celular")
const secao = document.querySelector(".tabela_r")
const ul = document.querySelector(".lista-compras")

let lista = JSON.parse(localStorage.getItem("tarefas")) || [] // 🔹 Carrega do localStorage

// Renderiza os itens já salvos ao abrir a página
renderizarLista()

function salvarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(lista)) // 🔹 Salva o array todo
}

function mostre() {
    if (!entrada.value.trim()) return

    lista.push(entrada.value)
    salvarLocalStorage()
    renderizarLista()

    entrada.value = ""
    entrada.focus()
}

function renderizarLista() {
    ul.innerHTML = "" // limpa a UL antes de redesenhar
    lista.forEach((tarefa, index) => {
        const li = document.createElement("li")
        const p = document.createElement("p")
        ul.appendChild(li)
        li.classList.add("item")
        li.appendChild(p)
        p.classList.add("texto")
        p.textContent = tarefa

        // permite riscar ao clicar
        li.addEventListener("click", () => {
            li.classList.toggle("comprado")
        })
    })

    // mostra/esconde seção
    if (lista.length > 0) {
        secao.classList.add("mostrar")
        secao.classList.remove("invisivel")
    } else {
        secao.classList.add("invisivel")
        secao.classList.remove("mostrar")
    }
}

function limparTudo() {
    lista = []
    salvarLocalStorage()
    renderizarLista()
}

// EVENTOS
adicionarItem.addEventListener("click", mostre)
limparMobile.addEventListener("click", limparTudo)
limpar.addEventListener("click", limparTudo)
entrada.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        mostre()
    }
})
