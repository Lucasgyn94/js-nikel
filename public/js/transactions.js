// =============================================================================
// CONTROLE DA PÁGINA DE TRANSAÇÕES (TRANSACTIONS.JS)
// =============================================================================

const myModal = new bootstrap.Modal("#transaction-modal");

// --- EVENT LISTENERS (ouvidores de evento) ---
document.getElementById("button-logout").addEventListener("click", logout);

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
    renderizarTabela();
});

document.getElementById("transactions-list").addEventListener("click", function(e) {
    const button = e.target.closest('button');
    if (!button) return;
    const id = parseInt(button.getAttribute("data-id"));

    if (button.classList.contains("delete-button")) {
        if (deletarTransacao(id)) {
            renderizarTabela();
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

document.getElementById('transaction-modal').addEventListener('hidden.bs.modal', function (event) {
    const editIdInput = document.getElementById("edit-id");
    if (editIdInput) editIdInput.remove();
    document.getElementById("transaction-form").reset();
    document.querySelector("#transaction-modal .modal-title").textContent = "Adicionar Lançamento";
});

// --- INICIALIZAÇÃO ---
if (checkLogado()) {
    buscarDadosUsuarioLogado();
    renderizarTabela();
}

// --- FUNÇÃO DE UI ---
function renderizarTabela() {
    const tbody = document.getElementById("transactions-list");
    tbody.innerHTML = "";

    if (dados.transactions.length) {
        dados.transactions.forEach(t => {
            const tipo = t.tipo === TIPO_ENTRADA ? "Entrada" : "Saída";

            tbody.innerHTML += `
                <tr class="shadow-sm">
                    <td data-label="Data">${t.data}</td>
                    <td data-label="Valor">R$ ${t.valor.toFixed(2)}</td>
                    <td data-label="Tipo">${tipo}</td>
                    <td data-label="Descrição">${t.descricao}</td>
                    <td data-label="Ações">
                        <button class="btn btn-warning btn-sm edit-button" data-id="${t.id}" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${t.id}" title="Deletar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;
        });
    }
}