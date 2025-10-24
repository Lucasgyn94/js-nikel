// Garantir que o script so rode apos carregamento da pagina
document.addEventListener('DOMContentLoaded', function() {
    // Pegando a modal do login
    const myModal = new bootstrap.Modal("#register-modal");
    let logado = sessionStorage.getItem("logado");
    let sessao = localStorage.getItem("sessao");

    checkLogado(); 

    // CRIAR CONTA
    document.getElementById("create-form").addEventListener("submit", function(evento) {
        // evitar recarregamento ao submeter formulário
        evento.preventDefault();

        const nome = document.getElementById("name-create-input").value;
        const email = document.getElementById("email-create-input").value;
        const senha = document.getElementById("password-create-input").value;
        
        if (nome.length < 2) {
            alert("Nome inválido! Deve ser maior que 2 caracteres");
            return;
        }

        if (email.length < 3) {
            alert("Email inválido! deve ser maior que 3 caracteres");
            return
        }

        if (senha.length < 4) {
            alert("Senha deve ser maior ou igual a 4")
            return;
        }

        salvarDados({
            nome: nome,
            email: email,
            senha: senha,
            transactions: []
        })
        
        myModal.hide();

        alert("Conta criada com sucesso!");
    });

    // LOGAR CONTA
    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email-input").value;
        const senha = document.getElementById("password-input").value;
        const checkSessao = document.getElementById("session-check").checked;

        const conta = buscarConta(email);

        if (!conta) {
            alert("Opss! Verifique o usuário ou a senha!");
            return;
        }

    
        if (conta.senha !== senha) {
            alert("Opps! Usuário ou senha inválidos.");
            return;
        }
        
        salvarSessao(email, checkSessao);
        window.location.href = "home.html";
    
    });

    function salvarDados(dados) {
        localStorage.setItem(dados.email, JSON.stringify(dados));
    }

    function buscarConta(key) {
        const conta = localStorage.getItem(key);

        if (conta) {
            return JSON.parse(conta);
        }
    }

    function salvarSessao(dados, sessaoSalva) {
        if (sessaoSalva) {
            localStorage.setItem('sessao', dados); // localStorage: independentemente de fechar a janela do app, os dados e persistidos.
        }

        sessionStorage.setItem('logado', dados); // sessionStorage: caso a janela do app seja fechada, os dados são perdidos

    }

    function checkLogado() {
        if (sessao) {
            sessionStorage.setItem("logado", sessao);
            logado = sessao;
        }

        if (logado) {
            salvarSessao(logado, sessao);

            window.location.href = "home.html";
        }
    }
    


});
