// =============================================================================
// CONTROLE DA PÁGINA HOME (HOME.JS)
// =============================================================================

const myModal = new bootstrap.Modal("#transaction-modal");

// --- EVENT LISTENERS ---
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", () => { window.location.href = "transactions.html"; });

// Listener para o formulário (agora lida com Criar e Atualizar)
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const editIdInput = document.getElementById("edit-id");

    if (editIdInput) { // MODO EDIÇÃO
        const id = parseInt(editIdInput.value);
        const novosDados = {
            data: document.getElementById("date-input").value,
            descricao: document.getElementById("description-input").value,
            valor: parseFloat(document.getElementById("value-input").value),
            tipo: document.querySelector('input[name="type-input"]:checked').value
        };
        atualizarTransacao(id, novosDados);
    } else { // MODO CRIAÇÃO
        adicionarLancamento(e);
    }
    
    myModal.hide();
    atualizarUI();
});

// Listener para os botões de ação (Editar/Deletar)
function adicionarListenersDeAcao(containerId) {
    document.getElementById(containerId).addEventListener("click", function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        const id = parseInt(button.getAttribute("data-id"));

        if (button.classList.contains("delete-button")) {
            if (deletarTransacao(id)) {
                atualizarUI();
            }
        }
        if (button.classList.contains("edit-button")) {
            const transacao = dados.transactions.find(t => t.id === id);
            if (transacao) {
                document.getElementById("date-input").value = transacao.data;
                document.getElementById("description-input").value = transacao.descricao;
                document.getElementById("value-input").value = transacao.valor;
                document.querySelector(`input[name="type-input"][value="${transacao.tipo}"]`).checked = true;
                document.getElementById("transaction-form").insertAdjacentHTML('beforeend', `<input type="hidden" id="edit-id" value="${id}">`);
                document.querySelector("#transaction-modal .modal-title").textContent = "Editar Lançamento";
                myModal.show();
            }
        }
    });
}
adicionarListenersDeAcao("cash-in-list");
adicionarListenersDeAcao("cash-out-list");


// Listener para limpar o formulário ao fechar o modal
document.getElementById('transaction-modal').addEventListener('hidden.bs.modal', function (event) {
    const editIdInput = document.getElementById("edit-id");
    if (editIdInput) editIdInput.remove();
    document.getElementById("transaction-form").reset();
    document.querySelector("#transaction-modal .modal-title").textContent = "Adicionar Lançamento";
});


// --- INICIALIZAÇÃO ---
if (checkLogado()) {
    buscarDadosUsuarioLogado();
    atualizarUI();
}

// --- FUNÇÕES DE UI ---
function atualizarUI() {
    exibirTransacoes(TIPO_ENTRADA, "cash-in-list");
    exibirTransacoes(TIPO_SAIDA, "cash-out-list");
    obterTotalTransacoes();
}

function exibirTransacoes(tipo, elementoId) {
    const container = document.getElementById(elementoId);
    container.innerHTML = "";
    const transacoesFiltradas = dados.transactions.filter(t => t.tipo === tipo);
    if (transacoesFiltradas.length === 0) return;

    const limite = Math.min(transacoesFiltradas.length, 5);
    for (let i = 0; i < limite; i++) {
        const t = transacoesFiltradas[i];
        container.innerHTML += `
            <div class="row mb-4 shadow-sm">
                <div class="col-12 ">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="fs-2 mb-0">R$ ${t.valor.toFixed(2)}</h3>
                        <div class="btn-group px-md-4 px-lg-5 gap-2" role="group">
                            <button class="btn btn-warning btn-sm edit-button" data-id="${t.id}"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm delete-button" data-id="${t.id}"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8"><p>${t.descricao}</p></div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">${t.data}</div>
                        </div>
                    </div>
                </div>
                
            </div>`;
    }
}

function obterTotalTransacoes() {
    let total = dados.transactions.reduce((acc, t) => t.tipo === TIPO_ENTRADA ? acc + t.valor : acc - t.valor, 0);
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}