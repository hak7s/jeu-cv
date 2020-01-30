class Cv {
    constructor() {
        this.blocs_affiche = 0
        // Cache tous les blocs à l'initialisation recupere toutes les div dont le nom
        // de class commence par 'bloc-'  (^ == débute par)
        $("div[class^='bloc-']").css('opacity', '0')
        parent.jeu_cv.ajouteObservateur(this)
    }
    notifie() {
        this.ajouteBloc()
    }
    ajouteBloc() {
        this.blocs_affiche += 1
        $('.bloc-' + this.blocs_affiche).animate({
                opacity: '1',
            },
            300
        )
    }
}

var cv = new Cv()