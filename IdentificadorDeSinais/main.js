
var camera = document.getElementById("camera");
Webcam.attach(camera);

Webcam.set({
    width:350, 
    height:300, 
    image_format:'png',
    png_quality:90
});

function tirarFoto(){
    Webcam.snap((uri)=>{
        document.getElementById("resultado").innerHTML = "<img id='foto'  src="+uri+">";
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZbusGdCQl/",pronto);

function pronto(){
    console.log("pronto");
}
function check(){
    img = document.getElementById("foto");
    classifier.classify(img, gotResult)
}
var prev1 = '';
var prev2 = '';
function gotResult(erro, resultado){
  if(erro){
    console.log(erro);
  }else{

    console.log(resultado);
    prev1 = resultado[0].label;
    prev2 = resultado[1].label;
    document.getElementById("resultado1").innerHTML = prev1;
    document.getElementById("resultado2").innerHTML = prev2;
    
    speak();
    
    if(prev1 == 'vitória'){
        document.getElementById("emoji").innerHTML = "&#9996";
    }
    if(prev2 == 'vitória'){
        document.getElementById("emoji2").innerHTML = "&#9996";
    }
    if(prev1 == 'ok'){
        document.getElementById("emoji1").innerHTML = "&#128076";
    }
    if(prev2 == 'ok'){
        document.getElementById("emoji2").innerHTML = "&#128076";
    }
    if(prev1 == 'joinha'){
        document.getElementById("emoji1").innerHTML = "&#128077";

    }
    if(prev2 == 'joinha'){
        document.getElementById("emoji2").innerHTML = "&#128077";

    }
    if(prev1 == "tranquilo"){
        document.getElementById("emoji1").innerHTML = "&#129304";
    }
    if(prev2 == 'tranquilo'){
        document.getElementById("emoji2").innerHTML = "&#129304";
    }
  }

}

function speak(){
   
    var synth = window.speechSynthesis;
    var fala1 = "A primeira previsão é " + prev1;
    var fala2 = "A segunda previsão é " + prev2;
    var utterThis = new SpeechSynthesisUtterance(fala1 + fala2);
    synth.speak(utterThis);
}