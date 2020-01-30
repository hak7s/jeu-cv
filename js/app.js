class JeuCV {
    constructor() {
        this.observateurs = []
    }
    ajouteObservateur(observateur) {
        this.observateurs.push(observateur)
    }
    afficheBloc() {
        this.notifie()
    }
    notifie() {
        this.observateurs.forEach(observateur => {
            observateur.notifie()
        })
    }
}

var jeu_cv = new JeuCV()
