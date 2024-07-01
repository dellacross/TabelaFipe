# FIPE Fácil

## Membros do Time
- Frederico Abbud Reis - Back-end
- Victor Della Croce Maltez - Front-end
- Vitor Moura Vieira - Fullstack

## Escopo do Projeto

### Objetivo do Sistema
O objetivo deste sistema é fornecer uma interface intuitiva e eficiente para a consulta de informações da tabela FIPE, permitindo aos usuários visualizar valores atualizados de veículos automotores como carros, motos e caminhões no mercado brasileiro. Destina-se a facilitar o acesso a dados de preços médios de veículos de forma rápida e confiável, atendendo às necessidades de potenciais compradores, vendedores e entusiastas do setor automotivo.

### Features
- **Consulta Rápida**: Permite a busca por marca, modelo e ano do veículo, oferecendo resultados instantâneos com os valores atualizados.
- **Cálculo IPVA**: Oferece ao usuário o valor do IPVA dos veículos, de acordo com o estado desejado.
- **Comparação de Veículos**: Habilita a comparação entre diferentes veículos para auxiliar na tomada de decisão de compra ou venda.
- **Interface Amigável**: Design intuitivo e fácil de usar, garantindo que os usuários possam navegar pelo sistema sem complicações.
- **Interface Responsiva**: Design responsivo que se adapta a telas de diferentes tamanhos.
- **Filtragem Avançada**: Permite aos usuários aplicar filtros detalhados, como faixa de preço, ano de fabricação, tipo de combustível e outros, para refinar as buscas.

## Tecnologias Utilizadas
### Linguagens
- Javascript
- HTML5
- CSS3
- Python

### Ambiente de Execução (server)
- Node.js

### Framework
- ReactJS

### Banco de Dados
- SQLite
- Firebase

### Backlog do Produto
1. **Como usuário, gostaria de selecionar uma marca de carro para ver os modelos disponíveis**
2. **Como usuário, gostaria de escolher um modelo após selecionar uma marca para ver os anos disponíveis**
3. **Como usuário, gostaria de selecionar um ano para visualizar informações detalhadas do veículo**
4. **Como usuário, gostaria de consultar o IPVA do veículo selecionado**
5. **Como usuário, gostaria de ver um ranking dos veículos mais baratos**
6. **Como usuário, gostaria de ver um ranking dos veículos mais caros**
7. **Como usuário, gostaria de fazer uma comparação entre dois veículos**
8. **Como usuário, gostaria de me cadastrar no sistema para acessar funcionalidades exclusivas**
9. **Como usuário cadastrado, gostaria de ter uma página de perfil para gerenciar minhas informações**
10. **Como usuário, gostaria de favoritar veículos para acessá-los rapidamente**
11. **Como usuário, quero fazer login no sistema para acessar meus modelos favoritos**
12. **Como usuário, gostaria de poder me deslogar do sistema**
13. **Como usuário, gostaria de visualizar minha lista de modelos favoritos após fazer login**
14. **Como usuário, quero ver o histórico de modelos que consultei**
15. **Como usuário, desejo remover modelos da minha lista de favoritos**

### Backlog do Sprint #1
- **História #1: Como usuário, gostaria de selecionar uma marca de carro para ver os modelos disponíveis**
  - Pesquisar API FIPE e entender como buscar marcas [Victor]
  - Desenvolver a funcionalidade no backend para buscar marcas [Vitor]
  - Implementar interface de usuário para seleção de marcas [Victor]
  - Integrar interface de usuário com a API do backend [Fred]

- **História #2: Como usuário, gostaria de escolher um modelo após selecionar uma marca para ver os anos disponíveis**
  - Adaptar a API do backend para buscar modelos baseado na marca [Vitor]
  - Desenvolver componente de interface para listar modelos [Victor]
  - Implementar lógica de seleção de modelo e busca de anos [Vitor]
  - Testar fluxo de seleção de marca, modelo e ano [Fred]

- **História #3: Como usuário, gostaria de selecionar um ano para visualizar informações detalhadas do veículo**
  - Desenvolver endpoint no backend para buscar informações do veículo [Vitor]
  - Criar tela de detalhes do veículo na interface do usuário [Victor]
  - Implementar chamada à API e exibição de dados na interface [Victor]
  - Realizar testes de usabilidade e corrigir bugs [Fred]

- **História #4: Como usuário, gostaria de consultar o IPVA do veículo selecionado**
  - Investigar integração com APIs de consulta de IPVA [Vitor]
  - Implementar lógica de cálculo ou integração de IPVA no backend [Fred]
  - Desenvolver funcionalidade na interface para exibir IPVA [Victor]
  - Testar e validar a exibição correta do IPVA [Fred]

- **História #5: Como usuário, gostaria de ver um ranking dos veículos mais baratos**
  - Implementar algoritmo de ranking crescente no backend [Vitor]
  - Desenvolver página de ranking na interface do usuário [Victor]
  - Integrar dados do backend na página de ranking [Fred]
  - Testar ordenação e exibição dos rankings [Fred]

- **História #6: Como usuário, gostaria de ver um ranking dos veículos mais caros**
  - Implementar algoritmo de ranking decrescente no backend [Vitor]
  - Desenvolver página de ranking na interface do usuário [Victor]
  - Integrar dados do backend na página de ranking [Victor]
  - Testar ordenação e exibição dos rankings [Fred]

- **História #7: Como usuário, gostaria de fazer uma comparação entre dois veículos**
  - Desenvolver funcionalidade de comparação entre os dados dos veículos [Vitor]
  - Criar componente para exibição dos dados dos veículos [Victor]
  - Testar exibição e precisão das comparações [Fred]

- **História #8: Como usuário, gostaria de me cadastrar no sistema para acessar funcionalidades exclusivas**
  - Implementar sistema de autenticação no backend [Fred]
  - Desenvolver formulário de cadastro na interface do usuário [Victor]
  - Integrar formulário de cadastro com o backend [Victor]
  - Testar processo de cadastro e autenticação [Vitor]

