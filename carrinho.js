if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', pronto)
} else {
    pronto()
}

function pronto(){
    var botoesRemoverCarrinho = document.getElementsByClassName('removercarrinho')
    for (var i = 0; i < botoesRemoverCarrinho.length; i++){
        var botaoRemoverCarrinho = botoesRemoverCarrinho[i]
        botaoRemoverCarrinho.addEventListener("click", botaoRemoverItem)
    }

    var inputsQuantidadeCarrinho = document.getElementsByClassName('quantidadecarrinho')
    for (var i = 0; i < inputsQuantidadeCarrinho.length; i++) {
        var input = inputsQuantidadeCarrinho[i]
        input.addEventListener('change', checarQuantidade)
    }

    var addCarrinho = document.getElementsByClassName('botaocardapio')
    for (var i = 0; i < addCarrinho.length; i++) {
        var botao = addCarrinho[i]
        botao.addEventListener('click', botaoAdicionar)
       
    }
}






function attCarrinho() {
    var pedidosCarrinho = document.getElementsByClassName('pedidos')[0]
    var linhasCarrinho = pedidosCarrinho.getElementsByClassName('produtocarrinho')
    var total = 0
    for (var i = 0; i < linhasCarrinho.length; i++) {
        var linhaCarrinho = linhasCarrinho[i]

        var preçoElemento = linhaCarrinho.getElementsByClassName('valorcarrinho')[0]
        var quantidadeDeElementos = linhaCarrinho.getElementsByClassName('quantidadecarrinho')[0]

        preçoElemento = preçoElemento.innerText.replace(",", ".")
        var preço = parseFloat(preçoElemento.replace('R$', ''))

        
        var quantidade = quantidadeDeElementos.value

        total = total + (preço * quantidade)
        
    }
    total = Math.round(total * 100) / 100
    
    document.querySelector("#totalcarrinho").innerText = 'R$' + total
}

function botaoRemoverItem(event) {
    var botaoClicado = event.target
    botaoClicado.parentElement.remove()
    attCarrinho()
}

function checarQuantidade(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    attCarrinho()
}

function botaoAdicionar(event) {
    var button = event.target
    var itemCardapio = button.parentElement.parentElement
    
    console.log(itemCardapio)
    var titulo = itemCardapio.getElementsByClassName('sabor')[0].innerText
    var preço = itemCardapio.getElementsByClassName('valor')[0].innerText
    console.log(titulo, preço)
    addItemNaLista(titulo, preço)
    attCarrinho()
}

function addItemNaLista(titulo, preço) {
    var addCarrinho = document.createElement('div')
    addCarrinho.classList.add('produtocarrinho')

    var produtosCarrinho = document.getElementsByClassName('areacarrinho')[0]
    var saboresCarrinho = produtosCarrinho.getElementsByClassName('saborcarrinho')

    for (var i = 0; i < saboresCarrinho.length; i++) {
        if (saboresCarrinho[i].innerText == titulo) {
            alert('Esse item já está selecionado, para alterar a quantidade dirija-se ao carrinho.')
            return
        }
    }
    var conteudoProdutoCarrinho = `
        <button class="removercarrinho">-</button>
        <h3 class="saborcarrinho">${titulo}</h3>
        <div class="mobile2"> <input type="number" value="1" class="quantidadecarrinho"><h3 class="mobile">x</h3>
        <h3 class="valorcarrinho">${preço}</h3></div>
    `
    addCarrinho.innerHTML = conteudoProdutoCarrinho
    produtosCarrinho.append(addCarrinho)
    addCarrinho.getElementsByClassName('removercarrinho')[0].addEventListener('click', botaoRemoverItem)
    addCarrinho.getElementsByClassName('quantidadecarrinho')[0].addEventListener('change', checarQuantidade)
}


attCarrinho()