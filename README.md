# Projeto API-Map

Descrição

O projeto API-Map foi desenvolvido para fornecer informações geográficas e detalhes sobre diferentes regiões e bairros em uma cidade específica. Ele utiliza a API do Google Maps para geocodificar endereços fornecidos pelo usuário e exibir marcadores no mapa para cada endereço correspondente. Além disso, o projeto também permite visualizar informações detalhadas de bairros em diferentes regiões.

Recursos Principais
Mapa Interativo: Utiliza a API do Google Maps para fornecer um mapa interativo onde os usuários podem inserir endereços para geocodificação.

Geocodificação: Converte endereços fornecidos pelo usuário em coordenadas geográficas e exibe marcadores no mapa correspondentes.

Visualização por Região: O projeto permite visualizar informações detalhadas de bairros em diferentes regiões, como Barreiro, Centro-Sul, Leste, Nordeste, Noroeste, Norte, Oeste, Pampulha e Venda Nova.

Modelos de Regiões: Cada região possui um modelo visual que inclui uma imagem representativa e um botão para exibir os bairros correspondentes no mapa.

Como Funciona
Entrada de Endereço: Os usuários podem inserir um endereço completo, incluindo rua, número, bairro, cidade e estado.
Geocodificação: Ao clicar no botão "Geocode", o endereço inserido é geocodificado, e um marcador correspondente é adicionado ao mapa.
Visualização por Região: Os usuários podem visualizar informações detalhadas dos bairros em diferentes regiões clicando nos botões correspondentes.
Estrutura do Projeto
HTML: O arquivo HTML (index.html) define a estrutura da página, incluindo os campos de entrada e o mapa.

CSS: O arquivo style.css contém estilos para a página, incluindo a aparência dos modelos de região e do modal.

JavaScript: Os arquivos script.js e regioes.js contêm a lógica do JavaScript para interagir com a API do Google Maps, geocodificar endereços, e exibir informações de bairros e regiões.

Configuração e Execução
Certifique-se de ter acesso à internet, pois o projeto depende da API do Google Maps.
Clone ou faça o download dos arquivos do projeto para sua máquina local.
Abra o arquivo index.html em um navegador web compatível para visualizar e interagir com o projeto.
Notas
Para que o projeto funcione corretamente, é necessário ter uma chave de API válida do Google Maps, que está sendo usada no código fornecido (API_KEY).
