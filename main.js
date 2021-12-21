

//v3.afficher();
var collectionVoitures = [];
window.onload = function () {
    // Ajouter une voiture dans la collection
    document
        .querySelector('form#formVoiture button:first-of-type')
        .addEventListener('click', function () {
            var v = Object.create(Voiture);
            v.couleur = document.getElementById('couleurVoiture').value;
            v.type = document.getElementById('typeVoiture').value;
            v.vitesse = document.getElementById('vitesseVoiture').value;
            collectionVoitures.push(v);
            document.querySelector("form#formVoiture button:nth-of-type(2)").disabled = false; // desactive le bouton

        });
    // Ajouter les voitures sur la ligne de départ
    document.querySelector("form#formVoiture button:nth-of-type(2)").addEventListener('click', function () {
        document.querySelector("form#formVoiture button:last-of-type").disabled = false;
        document.querySelector("form#formVoiture button:nth-of-type(1)").disabled = true;
        this.disabled = true;
        for (var i = 0; i < collectionVoitures.length; i++) {
            afficherVoiture(collectionVoitures[i]);
        }
        // depart de la course
        document.querySelector("form#formVoiture button:last-of-type").addEventListener('click', function () {
            var interval = setInterval(function () {
                for (var i = 1; i < collectionVoitures.length + 1; i++) {
                    var pos = parseInt(document.querySelector("body div div:nth-of-type(" + (i) + ")").style.paddingLeft);// position instantané
                    var deplacer = pos + parseInt(collectionVoitures[i - 1].vitesse);
                    document.querySelector("body div div:nth-of-type(" + (i) + ")").style.paddingLeft = "" + deplacer + "px";
                    // fin de la course
                    if (pos > parseInt(window.innerWidth) - 150) {
                        clearInterval(interval);
                        document.querySelector("footer").innerHTML += "<h2>La voiture numéro " + i + " gagne</h2>"; // affiche le vainceur
                        var blocs = document.querySelectorAll("footer>div");
                        // afficher le podium
                        for (var j = 0; j < blocs.length; j++) {
                            blocs[j].className = "podium";
                        }
                        console.log(collectionVoitures[i - 1].type);
                        // positionner les voitures sur le podium
                        var classement = collectionVoitures.sort((a, b) => b.vitesse - a.vitesse);

                        positionnerVoiture(classement[0], 1, 2);
                        positionnerVoiture(classement[1], 2, 1);
                        positionnerVoiture(classement[2], 2, 3);
                        document.querySelector("footer div:first-of-type div:nth-of-type(2)").className = "rebon";
                    }
                }
            }, 10);
        });
    });
};

function afficherVoiture(o, i) {
    document.querySelector('div').innerHTML +=
        "<div style=padding-left:0px><img src='" +
        o.type +
        ".png' style='background-color:" +
        o.couleur +
        "'/></div>";
}
function positionnerVoiture(voiture, divf, divpf) {
    document.querySelector("footer div:nth-of-type(" + divf + ") div:nth-of-type(" + divpf + ")").innerHTML = "<img src='" +
        voiture.type +
        ".png' style='background-color:" +
        voiture.couleur +
        "'/>";
}


var Clics = 0;

function OnClick() {
  Clics++;
  document.getElementById("nombreClics").innerHTML = Clics;
}
document.getElementById("boutonClic").addEventListener('click', OnClick);


