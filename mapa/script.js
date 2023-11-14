var regioes = {};
var regioesMarkers = {};

let map;
let marker;
let geocoder;
let responseDiv;
let response;

//---------------------------------------------------------


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: -17.930178, lng: -43.7908453 },
        mapTypeControl: false,
    });
    //---------------------------
    geocoder = new google.maps.Geocoder();
    //---------------------------
    //Input para rua---------------
    const inputRua = document.createElement("input");
    inputRua.type = "text";
    inputRua.placeholder = "Entre com a rua:";
    inputRua.required = true;

    // Input numero da rua----------------------
    const inputNumero = document.createElement("input");
    inputNumero.type = "text";
    inputNumero.placeholder = "Entre com nº da rua:";
    inputNumero.required = true;

    // Input para bairro-----------------------
    const inputBairro = document.createElement("input");
    inputBairro.type = "text";
    inputBairro.placeholder = "Entre com o bairro:";
    inputBairro.required = true;

    // Input para cidade----------------------------
    const inputCidade = document.createElement("input");
    inputCidade.type = "text";
    inputCidade.placeholder = "Entre com a cidade:";
    inputCidade.setAttribute("required", "true"); // Adiciona o atributo required

    // Input para estado--------------------------
    const inputEstado = document.createElement("input");
    inputEstado.type = "text";
    inputEstado.placeholder = "Entre com o estado:";
    inputEstado.required = true;
    //---------------------------
    const submitButton = document.createElement("input");
    submitButton.type = "button";
    submitButton.value = "Geocode";
    submitButton.classList.add("button", "button-primary");
    //---------------------------
    const clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.value = "Clear";
    clearButton.classList.add("button", "button-secondary");
    //---------------------------
    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";
    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);
    //---------------------------
    const instructionsElement = document.createElement("p");
    instructionsElement.id = "instructions";
    instructionsElement.innerHTML =
        "<strong>Instruções</strong>: Entre com o endereço da ocorrência acima.";
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRua);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputNumero);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputBairro);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputCidade);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputEstado);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(clearButton);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

    submitButton.addEventListener("click", function () {
        const ruaEditado = inputRua.value.trim().replace(/\b\w/g, c => c.toUpperCase());
        const numeroEditado = inputNumero.value.trim().replace(/\s+/g, '');
        const bairroEditado = inputBairro.value.trim().replace(/\b\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
        const cidadeEditado = inputCidade.value.trim().replace(/\b\w/g, c => c.toUpperCase());
        const estadoEditado = inputEstado.value.trim().replace(/^\w/, c => c.toUpperCase());


        const inputEndereco = `${ruaEditado} ${numeroEditado}, ${bairroEditado}, ${cidadeEditado} - ${estadoEditado}`;

        for (const item of bairrosPorRegiao) {
            if (item.bairros.includes(bairroEditado)) {
                try {
                    if (!regioes[item.regiao]) {
                        //Se a validação acima retorna false:
                        //Irá gerar um novo array com a chave de nome da região.
                        regioes[item.regiao] = [];
                    }
                    regioes[item.regiao].push(inputEndereco);
                } catch (err) {
                    console.error('Erro ao obter resultado da pesquisa:', err);
                }
            }
        }
    });
    clearButton.addEventListener("click", () => {
        clear();
    });
    // clear();
}
//---------------------------------------------------------------------------------------------------------

function clear() {
    // Itera por cada região e limpa os marcadores associados a ela
    for (const item of bairrosPorRegiao) {
        if (regioesMarkers[item.regiao] && regioesMarkers[item.regiao].length > 0) {
            // Define a propriedade de mapa de cada marcador como null
            for (const regioesMarker of regioesMarkers[item.regiao]) {
                regioesMarkers[item.regiao] = [];
                
            }
            initMap()
            // Limpa o array de marcadores para a região atual
        }
    }
}
//---------------------------------------------------------------------------------------------------------

function gerarModelos() {
    document.addEventListener('DOMContentLoaded', () => {
        bairrosPorRegiao.forEach((item) => {
            const modeloArea = document.querySelector(".modelo").cloneNode(true);

            modeloArea.querySelector(".grid-area img").setAttribute("src", item.img);
            modeloArea.querySelector(".grid-area h1").innerHTML = item.regiao;

            document.querySelector(".area-regioes").append(modeloArea);

            const showButton = document.createElement("input");
            showButton.id = "show-button-" + item.regiao; // ID único para cada botão
            showButton.type = "button";
            showButton.value = "mostrar";
            showButton.classList.add("button", "button-primary");
            modeloArea.append(showButton);

            showButton.addEventListener('click', () => mostrarBairros(item));

        });
    });
}
//---------------------------------------------------------------------------------------------------------
function mostrarBairros(item) {
    if (regioes[item.regiao] && regioes[item.regiao].length > 0) {
        regioes[item.regiao].forEach((endereco) => {
            geocode({ address: endereco });

        });
    } else {
        alert('Nada a exibir!');
    }
}
//---------------------------------------------------------------------------------------------------------
function geocode(request) {
    geocoder
        .geocode(request)
        .then((result) => {
            const { results } = result;
            console.log(results[0])
            try {
                for (const item of bairrosPorRegiao) {
                    if (!regioesMarkers[item.regiao]) {
                        regioesMarkers[item.regiao] = [];
                    }
                    for (let i = 0; i < results.length; i++) {
                        const location = results[i].geometry.location;
                        regioesMarkers[item.regiao].push(location);

                        marker = new google.maps.Marker({
                            position: location,
                            map: map
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
            return results;
        })
        .catch((e) => {
            alert("Geocode was not successful for the following reason: " + e);
        });
}

//---------------------------------------------------------------------------------------------------------



window.initMap = initMap;
gerarModelos();


