# O Desafio

O desafio consiste na implementação de duas páginas principais:
- Uma página de consulta processual; e
- uma página de processos.

Essa implementação deve usar ReactJs no front-end e o backend fica à critério.

Nesse desafio, os processos podem ser cadastrados com dados fake e devem possuir os seguintes dados:

- Número CNJ no formato `NNNNNNN-NN.NNNN.N.NN.NNNN` Ex.: 5001682-88.2020.8.13.0672;
- Nome das partes (Autor x Réu);
- Tribunal de origem (Ex.: TJSP);
- Data de início;
- Movimentações;
  - Data;
  - Descrição;

# Coleta de dados
Inicialmente, tive a ideia de usar dados reais na população do banco de dados, para obter insights no desenvolvimento da interface. Sendo assim, desenvolvi um gerador de números CNJ aleatórios, a fim de usar em sites de consulta pública e popular meu banco. 

Notei, contudo, que essa implementação não é eficiente, pois a quantidade de casos que precisariam ser testados para retornar um código válido demorariam mais de três minutos. Então, busquei relações entre os campos de busca e os processos, até atinar que todos os processos tem em comum a presença de um advogado. Pesquisando por advogados, eu conseguiria uma boa quantidade de processos por busca, com baixas taxas de buscas sem resultados.

A etapa anterior me leva ao próximo desafio: encontrar uma lista de advogados separados por estado. Pesquisando, encontrei os resultados dos exames da OAB, com os nomes de todos que passaram e seus respectivos estados.
Apliquei um webscrapping na página da OAB para baixar os arquivos PDF com os resultados e extraí o texto de todos eles, separando os nomes com REGEX. Com os nomes separados, gerei um arquivo JSON.

Para realizar o crawling nas páginas de consulta pública, considerando também que minha prioridade deve ser a implementação do frontend, optei por limitar a população dos dados a processos que estejam em um sistema de PJE, reduzindo a necessidade de implementação e simplificando a filtragem de dados obtidos.

Foram selecionados 7 estados brasileiros com sistemas de consulta PJE. São eles:
- Bahia
- Ceará
- Espírito Santo
- Maranhão
- Minas Gerais
- Rio de Janeiro
- São Paulo
- Paraíba

# Banco de Dados
A primeira ideia foi utilizar um banco de dados Postgres para fazer a persistência, mas considerando o foco deste desafio, optei por gerar um arquivo .json e utilizar a leitura dele no backend. Caso sobre tempo, posso retornar e implementar a persistência com mais detalhes.

## Backend
- Decidindo qual tecnologia irei utilizar para servir o backend. Considerando a integração com o script de webscrap, pensei em utilizar Flask, tendo em vista sua simplicidade, mas acredito que preciso de uma complexidade maior para realizar as buscas, o que me leva ao Django Rest. 