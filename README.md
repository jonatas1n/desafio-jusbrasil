# Probusca
Essa é a ferramenta de busca processual implementada por **Jônatas Gomes Barbosa da Silva** para o processo seletivo do **JusBrasil**. Esse desafio seguiu o [modelo](https://gist.github.com/brunobbbs/319333ecf13173b2d5908a161415478d) para sua implementação.

## Instalação

É necessário ter instalado Docker na máquina. Para utilização dos comandos automatizados, é necessário também ter o Makefile instalado. Caso haja algum problema com a instalação ou execução do makefile, basta acessar o arquivo makefile, na raíz do projeto, e executa sequencialmente no terminal os comandos, após os comandos apontados nesse documento.

### Primeiros passos
Para instalar o projeto, execute o seguinte comando:

``make build``


### Execução
Após o término do processo, basta executar:

``make up``

Ele executará todo o projeto, que estará acessível no link: [http://localhost](http://localhost)

A URL para a API é [http://localhost:7700](http://localhost:7700)

### Primeira Utilização

- Sugiro pesquisar pelo nome *"Aline"* no campo de busca, e pressionar "Enter".
- Vários processos serão retornados. Passe o mouse por cima de algum processo, para visualizar as informações. **(Sugiro selecionar no primeiro processo).**
- Na tela apresentada, é possível visualizar várias informações sobre o processo, como a comarca, tribunal de origem, início do processo e última movimentação.
- Clique na área de participantes, onde será possível visualizar os polos ativo e passivo do processo.
- Role na janela a direita para ver as movimentações do processo.
- Por último, clique na opção "notificar" para visualizar o *Toast* desenhado para notificar e alertar o usuário.

Caso seja necessário ter acesso por terminal do conteiner de projeto, basta executar

``make attach``


## Testes automatizados

Para executar os testes automatizados, basta executar o comando:

``make test`` 