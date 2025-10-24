// =============================================================================
// ARQUIVO CENTRAL DE LÓGICA (COMMON.JS)
// =============================================================================
// --- CONSTANTES E VARIÁVEIS GLOBAIS ---
const TIPO_ENTRADA = "1";
const TIPO_SAIDA = "2";

let dados = { transactions: [] };
let logado = sessionStorage.getItem("logado");
const sessao = localStorage.getItem("sessao");

// --- FUNÇÕES DE AUTENTICAÇÃO E SESSÃO ---

function checkLogado() {
    if (sessao) {
        sessionStorage.setItem("logado", sessao);
        logado = sessao;
    }
    if (!logado) {
        window.location.href = "index.html";
        return false;
    }
    return true;
}

function logout() {
    sessionStorage.removeItem("logado");
    localStorage.removeItem("sessao");
    window.location.href = "index.html";
}

// --- FUNÇÕES DE MANIPULAÇÃO DE DADOS ---

function buscarDadosUsuarioLogado() {
    const dadosUsuario = localStorage.getItem(logado);
    if (dadosUsuario) {
        dados = JSON.parse(dadosUsuario);
    }
}

function salvarDados() {
    localStorage.setItem(logado, JSON.stringify(dados));
}

function adicionarLancamento(e) {
    const data = document.getElementById("date-input").value;
    const descricao = document.getElementById("description-input").value;
    const valorInput = document.getElementById("value-input").value;
    const tipo = document.querySelector('input[name="type-input"]:checked').value;

    if (!valorInput || !descricao || !data) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    dados.transactions.unshift({
        id: new Date().getTime(),
        valor: parseFloat(valorInput),
        tipo: tipo,
        descricao: descricao,
        data: data
    });

    salvarDados();
    e.target.reset();
    alert("Lançamento adicionado com sucesso!");
    return true;
}

function deletarTransacao(id) {
    const confirmacao = confirm("Tem certeza que deseja deletar esta transação?");
    if (confirmacao) {
        dados.transactions = dados.transactions.filter(t => t.id !== id);
        salvarDados();
        alert("Transação deletada com sucesso!");
        return true;
    }
    return false;
}

function atualizarTransacao(id, novosDados) {
    dados.transactions = dados.transactions.map(t => {
        if (t.id === id) {
            return { ...t, ...novosDados };
        }
        return t;
    });
    salvarDados();
    alert("Transação atualizada com sucesso!");
}