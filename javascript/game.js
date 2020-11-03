const CaminhoImagem="../img/interrogacao.png"; // Imagem da parte de trás da carta, uma interrogação.
const Revelada=1; //Esse é o estado que a carta fica quando revelada.							
const Escondida=0;//Esse é o estado que indica se a carta não foi revelada ou está escondida.
const Marcada=-1;// Esse é o estado que as cartas ficam quando o jogador as clicka.

var pares=[];//Liga 2 cartas em um par que contêm a mesma imagem
var imagens=[];// Contêm todas imagens usadas no jogo menos a da interrogação.
var cartas=[];// Cria objetos que gerenciam o estado e a imagem que representa cada carta
var quantidadeMarcada;// Guarda quantas cartas o jogador clickou.
var TotalCartas;//Define o total de cartas, é usado para automatizar vários loops
var ParesRevelados;
var indicesEscolhidos=[];// Salva os índices das duas cartas clickadas pelo jogador.

function MarcaCarta(x){// Função chamada no onclick, é ativada quando o jogador clica em uma carta
	indice=x-1 // Define os índices que vão ser usados no array, tem -1 pq eu comecei a partir do número 1
	if (!cartas[indice].estaMarcada() && cartas[indice].estaEscondida()&& quantidadeMarcada<2) { // Checa se a carta está marcada, e se a quantidade de cartas marcadas é menor que 2
		cartas[indice].estado=Marcada;// Muda o estado da carta clickada para marcada.
		Revelar(x); // Mostra a carta.
		indicesEscolhidos[quantidadeMarcada]=indice; // Array que separa os índices escolhidos índicesEscolhidos[0]= 0 / IE[1]=1.
		quantidadeMarcada++;//Incrementa caso o jogador tenha clickado em uma carta.
	}
	console.log("Voce clicou na carta: "+x);//Mostra no console qual carta foi clickada.
	if(quantidadeMarcada==2){//Se o jogador tiver clickado em duas cartas entra no if para fazer as validações.
		if(ValidarPares(pares,cartas)){//Verifica entre todos pares se algum foi acertado.
			if (cartas[indicesEscolhidos[0]].estado==Revelada && cartas[indicesEscolhidos[1]].estado==Revelada ) {//Verifica nos 2 índices se as cartas tiveram seu estado alterado para "Revelado"
				ParesRevelados++;
				if (ParesRevelados!=TotalCartas/2) {//Se ainda não foram revelados todos pares zera a variável abaixo para o jogador poder continuar marcando cartas.
				quantidadeMarcada=0;					
				}else{//Se o jogador revelou todos os pares, ele ganhou.
					setTimeout(function(){alert("Voce Ganhou");}, 200); //Utiliza um alerta com 200ms
					console.log("Voce ganhou");
				}
			}
		}else{//Caso o jogador tenha errado o par, isto esconde as cartas marcadas.
			setTimeout(function(){ EscondeCarta(indicesEscolhidos[0]+1)}, 200);// O delay é para o jogador conseguir visualizar que errou.
			setTimeout(function(){ EscondeCarta(indicesEscolhidos[1]+1)}, 200);// 
			quantidadeMarcada=0;
		}
	
	}
}

function Revelar(x){
	 document.getElementById("carta"+(x)).src=cartas[x-1].imagemRevelada; // Mostra a imagem do array de "cartas" x-1
}

function IniciarJogo(){ // Tudo isso é inicializado quando a página é carregada ou quando o jogador clicka no reset
	ParesRevelados=0;
	quantidadeMarcada=0;

	Definirimagens();// Inicializa as imagens que vão ser usadas
	EsconderCartas();// Esconde todas as imagens com a da interrogação
	IniciarCartas();// Inicia as classes
	DistribuirCartas();// distribui as imagens entre as cartas e prepara os pares
}

function EsconderCartas(){//Esconde todas cartas
	for (var i = 0 ; i < TotalCartas; i++) {
		EscondeCarta(i+1); // Bota a interrogação em cima de todas as imagens.
	}
}

function EscondeCarta(x){//Esconde a carta x
	 document.getElementById("carta"+(x)).src=CaminhoImagem;
}

function Definirimagens(){ // Define todos os caminhos para as imagens.
	imagens[0]="../img/sonic.png";
	imagens[1]="../img/mega.png";
	imagens[2]="../img/pac.png";
	imagens[3]="../img/scorpion.png";
	imagens[4]="../img/link.png";
	imagens[5]="../img/robotcop.jpg";
	TotalCartas=imagens.length*2;
}

function IniciarCartas(){ // Inicia as cartas, 12 imagens, 6 pares
	for (var i = 0; i < TotalCartas; i++) {
		cartas[i]=new Carta();
		if (i%2==0) {
			pares[Math.floor(i/2)]=new Par(); // Cria i/2 objetos Par | math.floor arredonda para baixo.
		}
	}
}

function DistribuirCartas(){ //Distribui as cartas aleatóriamente
	let cartasAtribuidas;//Guarda quantas cartas faltam receber imagens.
	let controlePar=0;// Guarda quais as cartas do par.
	let imagemAtual=0;// Quantas imagens já foram.
	let contagem;
	let indice;
	cartasAtribuidas=TotalCartas-1;

	while(cartasAtribuidas>=0){
		indice=getRandomInt(cartasAtribuidas)+1; //Pega um valor aleatório.
		contagem=0;
		for (var i = 0; i < TotalCartas; i++) {	
			if (cartas[i].imagemRevelada=="") {// Confere se não tem nenhuma imagem no array cartas[i]
				contagem++;//Apenas para cartas sem imagem a contagem é aumentada
				if (contagem==indice) { 
					cartas[i].imagemRevelada=imagens[imagemAtual];	// Altera o valor de cartas[i] de "" para imagem[0] a imagem do sonic.
					pares[imagemAtual].cartasPar[controlePar]=i; // "pares" guarda os arrays com os valores das cartas que formam o par.
					controlePar++;
					if (controlePar==2) {// Controla se já foram pegas duas cartas por par.
						controlePar=0;
						imagemAtual++;
					}
					break;// Sai do for volta no while
				}
			}
		}
		cartasAtribuidas--; //Esse processo é repetido até cartasAtribuidas chegar a 0.
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max+1)); //math.random gera um numero aleatório de 0 a 1 mas não chega a 1.
}

function ValidarPares(par,cartas){
     	let controle = false;
     	for (var i = 0; i < par.length; i++) {//Verifica todos pares que existem.
     		if (par[i].estado==Escondida) {//Serve apenas os pares escondidos.
     			if (par[i].Completo(cartas)) {//Verifica se as cartas do par atual estão marcadas.
     				par[i].estado=Revelada;//Se estiverem coloca o par no estado marcado.
     				controle= true;// Define o retorno true se algum dos pares deu marcado marcado.
     			}else
     			{
     				par[i].DesmarcaCartas(cartas);//Para todos pares que as cartas não estavam no estado marcado define como escondido
     			}
     		}
     	}
     	return controle;//Retorna true se as 2 cartas que foram marcadas pelo jogador estavam em um dos pares.
 }

class Par{//Classe que controla os pares de cartas
	constructor(){
		this.cartasPar=[];//Define os índices das cartas do par
		this.cartasPar[0]=-1;
		this.cartasPar[1]=-1;
		this.estado=0;// Se o par está revelado ou não
	}

	Completo(cartas){ //Verifica se o jogador acertou o par e revela as cartas.
     	if (cartas[this.cartasPar[0]].estaMarcada() && cartas[this.cartasPar[1]].estaMarcada()) {
     		cartas[this.cartasPar[0]].estado=Revelada;
     		cartas[this.cartasPar[1]].estado=Revelada;
     		return true;
     	}
     	return false;
    }

    DesmarcaCartas(cartas){ // Coloca o estado das cartas do par em escondido
     	cartas[this.cartasPar[0]].estado=Escondida;
    	cartas[this.cartasPar[1]].estado=Escondida;
    }
     
};

class Carta{//Classe que controla as cartas do jogo
	constructor(){
		this.imagemRevelada="";//Imagem que a carta esconde
		this.estado=0;// Se a carta está escondida revelada ou marcada
	}

	estaMarcada(){
		if (this.estado==Marcada) { // Checa se a carta escolhida está marcada
			return true;
		}
		return false;
	}
	
	estaEscondida(){
		if (this.estado==Escondida) { // Checa se a carta escolhida está escondida
			return true;
		}
		return false;
	}	

};