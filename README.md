# Probusca
Essa é a ferramenta de busca processual implementada por **Jônatas Gomes Barbosa da Silva** para o processo seletivo do **JusBrasil**. Esse desafio seguiu o [modelo](https://gist.github.com/brunobbbs/319333ecf13173b2d5908a161415478d) para sua implementação.

## Instalação

É necessário ter instalado na máquina Docker, e para utilização dos comando automatizados é necessário ter o Makefile.

### Execução
Para executar o projeto, basta executar o comando:

``make up``

Ele executará todo o projeto, que estará acessível no link: [http://localhost:7755](http://localhost:7755)

A URL para a API é [http://localhost:7700](http://localhost:7700)

Caso seja necessário ter acesso por terminal do conteiner de projeto, basta executar

``make attach``