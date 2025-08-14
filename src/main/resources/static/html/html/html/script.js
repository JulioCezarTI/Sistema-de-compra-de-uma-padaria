let produtos = [];

document.addEventListener("DOMContentLoaded", () => {
    const btnAdicionar = document.getElementById("btnAdicionar");
    const btnFinalizar = document.getElementById("btnFinalizar");

    btnAdicionar.addEventListener("click", adicionarItem);
    btnFinalizar.addEventListener("click", finalizarCompra);
});

function adicionarItem() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);
    const preco = parseFloat(document.getElementById("precoProduto").value);

    if (!nome || isNaN(quantidade) || isNaN(preco)) {
        alert("Preencha todos os campos do produto corretamente!");
        return;
    }

    produtos.push({
        nome,
        quantidade,
        preco,
        total: quantidade * preco
    });

    alert("Produto adicionado com sucesso!");
}

function finalizarCompra() {
    const nomeCliente = document.getElementById("nomeUsuario").value;
    const telefone = document.getElementById("telefoneUsuario").value;
    const nota = document.getElementById("notaFiscal");

    if (!nomeCliente || !telefone) {
        alert("Preencha os dados do cliente!");
        return;
    }

    if (produtos.length === 0) {
        alert("Nenhum produto adicionado!");
        return;
    }

    // Agrupar produtos iguais
    const produtosAgrupados = {};

    produtos.forEach(item => {
        if (produtosAgrupados[item.nome]) {
            produtosAgrupados[item.nome].quantidade += item.quantidade;
            produtosAgrupados[item.nome].total += item.quantidade * item.preco;
        } else {
            produtosAgrupados[item.nome] = {
                quantidade: item.quantidade,
                total: item.quantidade * item.preco
            };
        }
    });

    // Montar nota fiscal
    let totalGeral = 0;
    let notaHTML = `<h3>Nota Fiscal - ${nomeCliente}</h3>
<p>Telefone: ${telefone}</p>
<p><strong>Data/Hora do Pedido:</strong> ${dataHoraFormatada}</p>
<ul>`;


    for (const nome in produtosAgrupados) {
        const item = produtosAgrupados[nome];
        notaHTML += `<li>${item.quantidade}x ${nome} - R$ ${item.total.toFixed(2)}</li>`;
        totalGeral += item.total;
    }

    notaHTML += `</ul><strong>Total: R$ ${totalGeral.toFixed(2)}</strong>`;
    nota.innerHTML = notaHTML;
}

const agora = new Date();
const dataHoraFormatada = agora.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
});
