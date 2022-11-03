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

# Planejamento

- Para o melhor entendimento do processo, pesquisei e mapeei a estruturação dos dados que busco.

- Tive a ideia de usar dados reais na população do banco de dados, para mostrar meus conhecimentos com web scrapping e aumentar meu desafio. Pensei em desenvolver um gerador aleatório de números CNJ e fazer a pesquisa recursiva no site do JusBrasil e usar esse método para popular meu banco. Aredito que assim, consigo mostrar minhas habilidades nas duas áreas.


# Webscrappping
Primeiro, pesquisei por qualquer processo no JusBrasil para entender como os resultados são resgatados e estudar as requisições para ver se posso usar alguma rota específica.

Para realizar o webscrapping, preciso entender o formato dos números de processo:

NNNNNNN-DD.AAAA.J.TR.OOOO

## NNNNNNN
Número sequencial do proceesso por unidade de origem (OOOO)

## DD
O campo (DD), com 2 (dois) dígitos, identifica o dígito verificador.

O cálculo de verificação deve ser efetuado pela aplicação do algoritmo Módulo 97 Base 10, conforme Norma ISO 7064:2003

## AAAA
Ano do ajuizamento

## J
Código referente ao órgão ou segmento do poder judiciário

#### Definições:

<table>
<tr><th>Código</th><th>Órgão</th></tr>
<tr><td>1</td><td>STF</td></tr>
<tr><td>2</td><td>CNJ</td></tr>
<tr><td>3</td><td>STJ</td></tr>
<tr><td>4</td><td>Justiça Federal</td></tr>
<tr><td>5</td><td>Justiça do Trabalho</td></tr>
<tr><td>6</td><td>Justiça Eleitoral</td></tr>
<tr><td>7</td><td>Justiça Militar da União</td></tr>
<tr><td>8</td><td>Justiça dos Estados e do Distrito Federal e Territórios</td></tr>
<tr><td>9</td><td>Justiça Militar Estadual</td></tr>
</table>

## TR 
Código referente ao Tribunal

#### Definições
<table>
<tr><th>Código</th><th>Tribunal</th></tr>
<tr><td>00</td><td>STF | CNJ | STJ | Tribunal Superior do Trabalho | TSE | Superior Tribunal Militar</td></tr>
<tr><td>90</td><td>Conselho da Justiça Federal | Conselho Superior da Justiça do Trabalho</td></tr>
<tr><td>01 a 06</td><td>Justiça Federal | Tribunais Regionais Federais</td></tr>
<tr><td>01 a 24</td><td>Justiça do Trabalho | Tribunais Regionais do Trabalho</td></tr>
<tr><td>01 a 27</td><td>Justiça Eleitoral | Tribunais Regionais Eleitorais </td></tr>
<tr><td>01 a 12</td><td>Justiça Militar da União | Circunscrições Judiciárias Militares</td></tr>
<tr><td>01 a 27</td><td>Justiça dos Estados e do Distrito Federal e Territórios | Tribunais de Justiça</td></tr>
<tr><td>13, 21 e 26</td><td>Tribunais Militares dos Estados de Minas Gerais, Rio Grande do Sul e São Paulo</td></tr>
</table>

## OOOO
Códifo referete a origem do processo, que varia de 1 a 8999

## Aplicação
Com essas definições em mãos, desenvolvi uma função para gerar códigos CNJ aleatórios para realizar busca. 

Baseado na implementação do [abjutils](https://github.com/abjur/abjutils/), implementei inicialmente uma função para obter o código verificador a partir dos dados gerados inicialmente. Com essas funções, realizei buscas limitadas ao governo do Estado do Ceará, no site do tribunal de justiça do Estado do Ceará. 
## Backend
- Decidindo qual tecnologia irei utilizar para servir o backend. Considerando a integração com o script de webscrap, pensei em utilizar Flask, tendo em vista sua simplicidade, mas acredito que preciso de uma complexidade maior para realizar as buscas, o que me leva ao Django Rest. 