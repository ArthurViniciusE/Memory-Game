const CaminhoImagem="../img/interrogacao.png"; // imagem da carta tampada
const Revelada=1; //identifica que a carta ja esta revelada apos acertar um par								
const Escondida=0;//identifica que a carta esta escondida e nao foi clicada nem revelada antes
const Marcada=-1;// identifica que a carta foi clicada no par de cartas atual

var pares=[];//liga 2 cartas em um par que contem a msm imagem
var imagens=[];// contêm todas imagens usadas para o jogo menos a que esconde
var cartas=[];// cria objetos que gerenciam o estado e a imagem de cada imagem que representa uma carta
var quantidadeMarcada;// conta se o jogador clicou em 0, 1 ou 2 cartas
var TotalCartas;//define o total de cartas, é usado para automatizar varios loops
var indicesEscolhidos=[];// salva os indices das 2 cartas que o jogador clicou atualmente

function MarcaCarta(x){// funçao chamada no onclick para falar q o jogador clicou em uma carta
	indice=x-1 // define os índices que vão ser usados no array, tem -1 pq eu comecei a apartir do número 1
	if (!cartas[indice].estaMarcada() && cartas[indice].estaEscondida()&& quantidadeMarcada<2) { // checa se a carta está marcada, e se quantidade de cartas marcadas é menor que 2
		cartas[indice].estado=Marcada;// muda o estado da carta clickada para marcada
		Revelar(x); // mostra a carta
		indicesEscolhidos[quantidadeMarcada]=indice; // array que separa os índices escolhidos indicesEscolhidos[0]= 0 / IE[1]=1
		quantidadeMarcada++;//coloca q o jogador clicou em mais uma carta
	}
	console.log("Voce clicou na carta: "+x);//mostra no console qual carta foi clicaca
	if(quantidadeMarcada==2){//se o jogador tiver clicado em duas cartas entra no if para fazer as validaçoes
			quantidadeMarcada=0;
		}
}

function Revelar(x){
	 document.getElementById("carta"+(x)).src=cartas[x-1].imagemRevelada; // mostra a imagem do array de "cartas" x-1
}
function IniciarJogo(){ // Tudo isso é inicializado quando a página é carregada ou clicado no restart
	quantidadeMarcada=0;

	Definirimagens();// falas as imagens qq vao ser usadas
	EsconderCartas();// coloca todas cartas com a imagem de escondida
	IniciarCartas();// inicia as classes
	DistribuirCartas();// distribui as imagens entre as cartas e prepara os pares
}
function EsconderCartas(){//esconde todas cartas
	for (var i = 0 ; i < TotalCartas; i++) {
		EscondeCarta(i+1); // bota a interrogação em cima de todas as imagens.
	}
}
function EscondeCarta(x){//esconde a carta x
	 document.getElementById("carta"+(x)).src=CaminhoImagem;
}
function Definirimagens(){ // define todos textos de caminho para as imagens
	imagens[0]="../img/sonic.png";
	imagens[1]="../img/mega.png";
	imagens[2]="../img/pac.png";
	imagens[3]="../img/scorpion.png";
	imagens[4]="../img/link.png";
	imagens[5]="../img/robotcop.jpg";
	TotalCartas=imagens.length*2;
}
function IniciarCartas(){ // inicia as cartas, 12 imagens, 6 pares
	for (var i = 0; i < TotalCartas; i++) {
		cartas[i]=new Carta();
		if (i%2==0) {
			pares[Math.floor(i/2)]=new Par(); // cria i/2 objetos Par | math.floor arredonda para baixa para evitar numeros quebrados
		}
	}
}
function DistribuirCartas(){ //distribui as cartas aleatóriamente
	let cartasAtribuidas;//quantas cartas faltam receber imagem
	let controlePar=0;// qual a carta do par
	let imagemAtual=0;// quantas imagens já foram
	let contagem;
	let indice;
	cartasAtribuidas=TotalCartas-1; 
	while(cartasAtribuidas>=0){
		indice=getRandomInt(cartasAtribuidas)+1; //pega um valor aleatório
		contagem=0;
		for (var i = 0; i < TotalCartas; i++) {	
			if (cartas[i].imagemRevelada=="") {// confere se não tem nenhuma imagem no array cartas[i]
				contagem++;//apenas para cartas sem imagem a contagem é aumentada
				if (contagem==indice) { 
					cartas[i].imagemRevelada=imagens[imagemAtual];	// altera o valor de cartas[i] de "" para imagem[0] a imagem do sonic
					pares[imagemAtual].cartasPar[controlePar]=i; // pares guarda os arrays com os valores das cartas que formam o par
					controlePar++;
					if (controlePar==2) {// controla se já pegou 2 cartas por par
						controlePar=0;
						imagemAtual++;
					}
					break;//sai do for volta no while
				}
			}
		}
		cartasAtribuidas--; //isso é repetido até cartasAtribuidas chegar a 0.
	}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max+1)); //math.random gera um numero aleatorio de 0 a 1 mas não chega a 1.
}
function ValidarPares(par,cartas){
     	let controle = false;
     	for (var i = 0; i < par.length; i++) {//verifica todos pares que existem
     		if (par[i].estado==Escondida) {//mas apenas os pares escondidos
     			if (par[i].Completo(cartas)) {//verifica se as cartas do par atual estão marcadas
     				par[i].estado=Revelada;//se estiverem coloca o par no estado marcado 
     				controle= true;// define o retorno true se algum dos pares deu marcado marcado
     			}else
     			{
     				par[i].DesmarcaCartas(cartas);//para todos pares q as cartas nao estavao no estado marcado marcado define como escondido escondido
     			}
     		}
     	}
     	return controle;//retorna true se as 2 cartas q forao marcadas pelo jogador estava em um dos pares
 }
class Par{//classe que controla os pares de cartas
	constructor(){
		this.cartasPar=[];//define os indices das cartas do par
		this.cartasPar[0]=-1;
		this.cartasPar[1]=-1;
		this.estado=0;// se o par esta revelado ou nao

	}
     DesmarcaCartas(cartas){ // coloca o estado das cartas do par em escondido
     	cartas[this.cartasPar[0]].estado=Escondida;
     	cartas[this.cartasPar[1]].estado=Escondida;
     }
     
};
class Carta{//classe que controla as cartas do jogo
	constructor(){
		this.imagemRevelada="";//imagem que a carta esconde
		this.estado=0;// se a carta esta escondida revelada ou marcada
	}
	estaMarcada(){
		if (this.estado==Marcada) { // checa se a carta escolhida está marcada
			return true;
		}
		return false;
	}
	estaEscondida(){
		if (this.estado==Escondida) { // checa se a carta escolhida está escondida
			return true;
		}
		return false;
	}	

};