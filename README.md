# Nikel App (Controle de Entrada e Saída de Valores) 
## Gerenciador Financeiro Pessoal
* Nikel é um aplicativo de finanças pessoais simples, intuitivo e eficiente, criado para ajudar a organizar nossas finanças, controlar despesas e atingir nossos objetivos de forma descomplicada.
* O mesmo foi desenvolvido do zero durante o curso **Codai 2.0 - Front-End**.

## Principais Funcionalidades
__Autenticação de Usuários__: Sistema completo de login e cadastro, com persistência de sessão.

__Dashboard Intuitivo__: Visualização de saldo total e das últimas transações de entrada e saída assim que fizer o login.

__Gestão Completa de Transações (CRUD)__: Adicionar, visualizar, editar e deletar lançamentos de forma fácil e rápida.

__Histórico Detalhado__: Uma página dedicada para listar todas as nossas transações.

__Persistência de Dados__: Nossas informações são salvas localmente no navegador usando localStorage, garantindo que não percamos nossos dados.

__Design Totalmente Responsivo__: Experiência de uso perfeita em qualquer dispositivo, do desktop ao celular.

## Melhorias e Refatorações Implementadas
### 1. Refatoração e Centralização de Código
* Todo o código JavaScript comum (autenticação, manipulação de dados, etc.) foi centralizado no arquivo js/common.js, tornando o código mais limpo, fácil de manter e evitando bugs causados por duplicação.

### 2. Funcionalidade CRUD Completa
* A aplicação incialmente só tinha os métodos de criação e vizualização de dados, porém foi adicionado os métodos para edição e deleção, permitindo assim, o ciclo completo de gerenciamento de uma transação:
__Create__: Adicionar novos lançamentos.
__Read__: Visualizar os lançamentos na home e na página de transações.
__Update__: Editar o valor, data, descrição ou tipo de qualquer lançamento.
__Delete__: Excluir permanentemente uma transação.

### 3. Design Responsivo (Mobile First)
* A experiência em dispositivos móveis foi uma prioridade:
__Layout da Home Adaptável__: Em telas menores, as colunas de "Entradas" e "Saídas" são empilhadas verticalmente para melhor legibilidade.
__Tabela que se Transforma em Cards__: Na página de transações, a tabela tradicional se converte em um layout de "cards" em telas pequenas, evitando barras de rolagem horizontais e tornando os dados fáceis de ler.
__Botão de Adicionar Inteligente__: O botão flutuante de adicionar (+) só aparece em telas grandes. Em telas menores, ele é substituído por um ícone na barra de navegação superior, otimizando o espaço e a usabilidade.

## 💻 Tecnologias Utilizadas
* HTML5
* CSS (com Flexbox para layouts responsivos)
* JavaScript
* Bootstrap 5.1 (para a estrutura de grid, componentes e responsividade)

## 🛠️ Como Executar o Projeto
### 1. Clone este repositório:
```
git clone https://github.com/seu-usuario/nikel.git
```

### 2. Navegue até a pasta do projeto:
```
cd nikel
```
### 3. Abertura do arquivo "index.html"
* Abra o arquivo "index.html" no seu navegador de preferência.
