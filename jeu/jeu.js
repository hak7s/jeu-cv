var positionJoueurX = 0
var positionJoueurY = 0
var largeurCanvas
var hauteurCanvas
var speed = 30 // vitesse mouvement du joueur
var HAUTEUR_CARRE = 20
var HAUTEUR_RECTANGLE = 300
var speed_obstacle = 2
var LARGEUR_CARRE = 20
var LARGEUR_RECTANGLE = 15
var ctx // Ecran ou je dessine mes Objets ( carre, obstacles)
var obstacles = []
var ecarts = []
var score = 0
var colors = ["#807052", "#FFC757", "#FFE0A3", "#80632B", "#CCB483"]

function init() {
    // lance les boucles de jeux ainsi que les evenements
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    largeurCanvas = canvas.width
    hauteurCanvas = canvas.height
    positionJoueurY = hauteurCanvas / 2 - HAUTEUR_CARRE / 2
    positionJoueurX = 100 - HAUTEUR_CARRE / 2

    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (positionJoueurY - speed > 0) positionJoueurY -= speed
                break
            case 'ArrowDown':
                if (positionJoueurY + speed < hauteurCanvas - HAUTEUR_CARRE)
                    positionJoueurY += speed
                break
        }
    })
    setInterval(jeu, 5)
    setInterval(creationObstacle, 1500)
}

function creationObstacle() {
    hauteurMinimum = 20
    hauteurMaximum = 200
    height = Math.floor(Math.random() * (hauteurMaximum - hauteurMinimum + 1) + hauteurMinimum) // genere une hauteur aleatoire pour lobnstacle du haut

    ecartMinimum = 50
    ecartMaximum = 100
    ecart = Math.floor(Math.random() * (ecartMaximum - ecartMinimum + 1) + ecartMinimum) //genere une hauteur aleatoire pour l ecart

    ecarts.push({
        x: largeurCanvas,
        collision: function(largeur) {
            if (!this.checkpoint) {
                if (largeur > this.x && largeur < this.x + LARGEUR_RECTANGLE) {
                    this.checkpoint = true
                    score++
                    speed_obstacle += 0.1

                    if (score % 3 == 0 && score != 0)
                        parent.jeu_cv.afficheBloc()
                }
            }
        },
        checkpoint: false,
    })

    obstacles.push({
        x: largeurCanvas,
        y: 0,
        collision: function(point_superieur_gauche_x, point_superieur_gauche_y, largeur) {
            if (
                point_superieur_gauche_x + largeur > this.x &&
                point_superieur_gauche_x + largeur < this.x + LARGEUR_RECTANGLE
            ) {
                if (point_superieur_gauche_y < this.y + this.hauteur) {
                    obstacles = []
                    ecarts = []
                    speed_obstacle = 1
                    score = 0
                }
            }
        },
        hauteur: height,
    })

    obstacles.push({
        x: largeurCanvas,
        y: height + ecart,
        collision: function(
            point_superieur_gauche_x,
            point_superieur_gauche_y,
            largeur,
            hauteur
        ) {
            if (
                point_superieur_gauche_x + largeur > this.x &&
                point_superieur_gauche_x + largeur < this.x + LARGEUR_RECTANGLE
            ) {
                if (point_superieur_gauche_y + hauteur > this.y) {
                    obstacles = []
                    ecarts = []
                    speed_obstacle = 1
                    score = 0
                }
            }
        },
        hauteur: hauteurCanvas - height - ecart, // La hauteur totale du canvas moins la hauteur du premier obstacle moins la hauteur de l ecart
    })

    // speed_obstacle+=10
    // console.log(obstacles);
}

function testCollision() {
    obstacles.forEach(function(obstacle) {
        obstacle.collision(
            positionJoueurX,
            positionJoueurY,
            LARGEUR_CARRE,
            HAUTEUR_CARRE
        )
    })
    ecarts.forEach(function(ecart) {
        ecart.collision(
            positionJoueurX,
            positionJoueurY,
            LARGEUR_CARRE,
            HAUTEUR_CARRE
        )
    })
}

function jeu() {
    // boucle de jeu
    testCollision() // test les collisions
    draw() // reffraichi l ecran et affiche les objets
}

function clear() {

    ctx.fillStyle = 'white'
    ctx.clearRect(0, 0, largeurCanvas, hauteurCanvas)

}
// ici on rajoute l'image 
var img = new Image();
img.src = '/image/image1mini.png';


function drawObstacle() {
    // ctx.fillStyle = 'blue'
    for (let i = 0; i < obstacles.length; i++) { // fait le tour de tous les obstacles
        obstacles[i].x -= speed_obstacle // reduire leur position x (de droite a gauche)
        ctx.fillStyle = colors[i % 5]
        ctx.fillRect(
            obstacles[i].x,
            obstacles[i].y,
            LARGEUR_RECTANGLE,
            obstacles[i].hauteur
        ) // affiche l obstacle
    }
    for (let i = 0; i < ecarts.length; i++) {
        ecarts[i].x -= speed_obstacle
    }
}

// Fin du code des fonctions de notre bibliothèque
function draw() {
    clear()
    ctx.font = '20px serif'
    ctx.fillText('Score: ' + score, 0, 16)
    // ctx.fillRect(positionJoueurX, positionJoueurY, LARGEUR_CARRE, HAUTEUR_CARRE) // dessine le carré
    drawObstacle() // fait avancer les obstacles

    ctx.drawImage(img, 0, 0, 300, 300, positionJoueurX, positionJoueurY, 30, 30);
}

init()