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
Inicialmente, tive a ideia de usar dados reais na população do banco de dados, para obter insights mais úteis no desenvolvimento da interface, e também para reproduzir uma experiência mais realista. Sendo assim, desenvolvi um gerador de números CNJ aleatórios, a fim de usar em sites de consulta pública e popular meu banco. 

Notei, contudo, que essa implementação não é eficiente pois a quantidade de casos que precisariam ser testados para retornar um código válido demorariam mais de três minutos. Vi que os processos de diversas áreas são publicadas no Diário de Justiça Eletrônico, mas isso iria requerer processos de identificação e processamento de texto muito árduos, e cada um dos DJe's tem estruturas de texto diferente, o que levaria a implementações diferentes para cada um deles.

Analisando possibilidades alternativas, notei que existem serviços de consultas processuais, bastava procurar uma forma de realizar buscas que retornem múltiplos processos.
Então, busquei relações entre os campos de busca e os processos, até atinar que todos os processos tem em comum a presença de um advogado. Pesquisando por advogados, eu conseguiria uma boa quantidade de processos por busca, com baixas taxas de buscas sem resultados.

A etapa anterior me leva ao próximo desafio: encontrar uma lista de advogados separados por estado. Pesquisando, encontrei os resultados dos exames da OAB, com os nomes de todos que passaram e seus respectivos estados.
Apliquei um webscrapping na página da OAB para baixar os arquivos PDF com os resultados e extraí o texto de todos eles, separando os nomes com REGEX. Com os nomes separados, gerei um arquivo JSON.

Para realizar o crawling nas páginas de consulta pública, considerando também que minha prioridade deve ser a implementação do frontend, optei por limitar a população dos dados a processos que estejam em um sistema de PJE, reduzindo a necessidade de implementação e simplificando a filtragem de dados obtidos.

Foram selecionados 11 estados brasileiros com sistemas de consulta PJE, entre Tribunais de Justiça, Tribunais Regionais Federais e o Conselho Nacional de Justiça. São eles:
- Amapá (TJPA)
- Amazonas (TRF1)
- Ceará (TJCE)
- Distrito Federal (CNJ)
- Espírito Santo  (TJES)
- Mato Grosso (TJMT)
- Minas Gerais (TJMG)
- Paraíba (TJPB)
- Piauí (TRF1)
- Tocantins (TRF1)

# Processamento dos dados
Após o crawling, foram gerados arquivos JSON, separados por estados, com os processos coletados. Antes de gerar um arquivo final para utilizar na API, fiz uma limpeza dos dados e agreguei alguns valores a partir dos dados gerados no repositório [forosCNJ](https://github.com/abjur/forosCNJ), com dados como a sigla do tribunal, a comarca do processo e a Unidade federativa. Além disso, os dados de participantes também foram processados para distinguir CPF, Código da OAB e nomes, dentro das entidades.

# Banco de Dados
A primeira ideia foi utilizar um banco de dados Postgres para fazer a persistência, mas considerando o foco deste desafio, optei por gerar um arquivo .json e utilizar a leitura dele no backend. Caso sobre tempo, posso retornar e implementar a persistência com mais detalhes.

# Prototipação
Antes de planejar os endpoints, foquei em idealizar e desenhar a página. Quis aproveitar o realismo dos dados, então decidi adiar a estruturação da API e focar no protótipo para ter melhor noção dos requisitos.

## As personas
Para começar, busquei elaborar os perfis de usuário da ferramenta. Para isso, observei a interface de serviços que realizam consultas processuais, e também conversei com pessoas que estudam ou trabalham na área do direito. A partir dessas experiências, cheguei a dois perfis básicos:
- O usuáfio leigo: Aquele que não tem formação em direito, mas está sendo autor ou réu de algum processo, tem um familiar ou amigo sendo processado e deseja acompanhar todas as movimentações;
- O usuário do direito: Aquele que tem formação em direito, incompleto ou completo, e que usa essa ferramenta para estudar e notificar seus possíveis clientes.

Nenhuma das duas personas deve ser abandonada na implementação dessa interface, mas o segundo perfil já está suprido de serviços e ferramentas. Dessa forma, optei por desenvolver uma ferramenta mais amigável e acessível para pessoas leigas em assuntos jurídicos.

## A jornada do usuário
### Acessibilidade de Linguagem
O "juridiquês" em ferramentas de consulta de processos jurídicos era mais que esperado. Apontando assim a primeira barreira de acessibilidade. Alguns termos aplicados na busca processual podem ser facilmente substituídos por expressões populares que não reduziria de forma significante seu sentido original. "Comarca", por exemplo, pode ser substituído por "Cidade", sem deixar aplicantes do direito perdidos com a definição. Com este foco, foram aplicadas algumas modificações pontuadas abaixo:
- substituições dos termos na interface, em relação aos termos originais.
- Implementação de tooltips para exibir o significado de termos de baixa popularidade que não podem ser substituídos.

### Identificação dos processos
Na jornada imaginada para o perfil em foco, uma das situações projetadas foi o acompanhamento de processos. Essa projeção deduziu a ansiedade do usuário por novas movimentações no processo, e a consequente reabertura contínua da página para realizar a mesma pesquisa de processo. A fim de atender a essas necessidades do usuário, foram implementados dois recursos: 
 - A implantação de um histórico, com os últimos processos acessados;
 - Um componente que aponta a previsão para a próxima movimentação, com base na análise de processos de mesmo assunto no banco de dados; e
 - Sinalização de nova movimentação baseada no estado da última visita.
  

![Captura de tela do componente de previsão da próxima movimentação](./media/previsao.png)

### Identificação dos participantes
Nas minhas entrevistas, nota-se que é comum os advogados conhecerem uns aos outros, bem como os juízes e promotores que participam do caso. O usuário leigo, no entanto, não conhece esses integrantes, bem como não conhece suas participações, taxa de vitória nos processos de mesmo assunto que o caso de interesse. Assim, decidi implementar uma seção de exibição de estatísticas do advogado ou da empresa, conforme a participação na ferramenta, exibindo casos procedentes, não procedentes e em andamento.

### Pesquisa Auxiliada
O método mais eficaz de se chegar a um processo é atraveś do código CNJ, descrito na primeira seção deste documento. Este código, contudo é consideravelmente longo para se manter registro. Além disso, com base nas minhas entrevistas, os advogados que realizam buscas processuais utilizando esse código já tem fixado parte desse código em suas ferramentas, considerando que raramente um advogado precisa fazer consulta fora de sua comarca, tribunal, vara e/ou foro. Para o usuário mais leigo, essa pesquisa por esse parâmetro é desestimulante, além de pouco conclusiva.

Com este foco, tentei tornar a lógica de filtros mais usual possível, utilizando filtro pelos campos indicativos do código CNJ. Além disso, planejo que esses filtros, após determinadas utilizações fique salvo na sessão do usuário, a fim de que ele não precise repetir a escolha desses filtros repetidas vezes.

## A Interface
No wireframe, imaginei o foco repartido na movimentação e nos detalhes 

# API
A framework escolhida para a API foi a FastAPI, devido sua fácil implementação, alta eficiência e a interface Swagger, permitindo realizar testes manuais pelo navegador. 