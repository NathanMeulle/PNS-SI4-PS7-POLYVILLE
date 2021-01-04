export default {
    methods:{
        /** Méthode permettant d'analyser un programme comportant un Si **/
        Si(){
            this.checkError();
            if(this.programme[0].title === 'Si'){
                if(this.programme.length >1 && this.programme[1].title === 'citoyens') this.SiCitoyens();
                else this.error = 'Programme inconnu'
            }
        },

        /** Méthode permettant d'analyser un programme comportant Si + citoyens **/
        SiCitoyens(){
            let nbCitoyens = 0;
            if(this.programme[2].title.substring(0,4) === 'Zone'){
                this.zones[0] = this.programme[2].title;
                if(this.programme[3].title === 'Plus grand que'){
                    this.infOrSup = 'sup';
                    if(this.programme[4].title === 'Input'){
                        nbCitoyens = Number(this.programme[4].input);
                        if(this.programme[5].title === 'Alors'){
                            this.alorsCitoyens(nbCitoyens)
                        }
                        else this.error = 'Programme inconnu'
                    }
                    else this.error = "Il faut donner un nombre après la case 'citoyens'"
                }
                else this.error = 'Programme inconnu'
            }
        },

        /** Méthode appellée par SiCitoyens pour gérer le Alors, envoie la requête au store**/
        alorsCitoyens(nbCitoyens){
            let nbPoliciers = 0;
            if(this.programme[6].title === 'Input'){
                if(this.programme[7].title === 'policiers') {
                    this.deplacementPoliciers(nbCitoyens,nbPoliciers)
                }
                else this.error = 'Programme inconnu'
            }
            else if(this.programme[6].title === "afficher" && this.programme[7].title === "événement"){
                this.affichageEvenement(nbCitoyens)
            }
            else this.error = 'Programme inconnu'
        },

        deplacementPoliciers(nbCitoyens,nbPoliciers){
            nbPoliciers = Number(this.programme[6].input);
            if (this.programme[8].title.substring(0, 4) === 'Zone') {
                this.zones[1] = this.programme[8].title;
                console.log("ici : ",nbCitoyens,this.infOrSup,this.zones[0],nbPoliciers,this.zones[1]);
                this.reussite ="Déplacement de policiers effectué";
                if(!this.macro) {
                    let regles = this.$store.getters.getRegles;
                    let existe = this.verifierExistence('Presence policier',regles);
                    console.log("existe :",existe);
                    if (!existe) this.$store.dispatch('deplacerPoliciers', {
                        citoyens: nbCitoyens,
                        cond: this.infOrSup, zone1: this.zones[0], policiers: nbPoliciers, zone2: this.zones[1]
                    });
                    else {
                        this.type = {programme: this.programme,titre: "Conflit concernant le déplacement des policiers"};
                        this.showModal=true
                    }
                }
                else{
                    this.programme[this.programme.length] = "déplacement de policiers "+this.zones[1]+" en fonction des citoyens "+
                        this.zones[0]+" (entrer d'abord le nombre de citoyens puis le nombre de policiers)";
                    console.log(this.programme);
                    this.$store.commit('addMacro', this.programme);
                    this.reussite = "Raccourci créé"
                }
            }
            else this.error = 'Programme inconnu'
        },

        affichageEvenement(nbCitoyens){
            if(this.programme.length === 8){
                console.log(nbCitoyens)
                this.reussite = "Condition d'affichage de l'événement appliquée"
                this.error = ""
                let regle = ["condition affichage",nbCitoyens,this.zones[0]]
                this.$emit("ajoutRegleEvenement", regle)
            }
            else this.error = "Avez vous ajouté une case en trop ? Programme presque correct concernant l'affichage d'un événement"
        },

        /** Affiche une erreur correspondant au respect ou non des règles Si/Alors **/
        checkError(){
            let valid = this.checkIfThen();
            if(valid === 1) this.error = 'Il est nécessaire de mettre une case "Alors" si vous avez utilisé une cas "Si" et inversement';
            if(valid === 2) this.error = 'Il est nécessaire de mettre la case "Si" avant la case "Alors"'
        },

        /** Renvoie un entier correspondant au non respect des règles Si/Alors **/
        checkIfThen(){
            let posIf = -1;
            let posThen = -1;
            let presence = false;
            this.programme.forEach((item,index)=>{
                if(item.title === "Si") {
                    posIf = index;
                    presence = true
                }
                else if (item.title === "Alors"){
                    posThen = index;
                    presence = true
                }
            });
            if(!presence) return 0;
            if(posIf === -1 || posThen === -1) return 1;
            if (posIf > posThen) return 2;
            return 0
        },

        /** Renvoie l'heure donnée dans un programme **/
        getHeure(){
            this.programme.forEach((item,index)=>{
                if(item.title === "heures"){
                    if(index === 0 || this.programme[index-1].title!== 'Input') this.error = "Il est nécessaire d'écrire une heure";
                    else{
                        this.heure = Number(this.programme[index-1].input)
                    }
                }
            })
        },

        /** Gestion d'un programme contenant une case Pour **/
        Pour(){
            if(this.programme.length>0 &&this.programme[0].title === 'Pour tous'){
                if(this.programme.length>1 && this.programme[1].title==='magasins') this.forMagasin();
                else this.error = 'Programme inconnu'
            }
        },

        /** Gestion d'un programme qui parcoure tous les magasins, envoie la requête au store **/
        forMagasin(){
            if(this.programme[2].title === "fermeture"){
                this.getHeure();
                console.log(this.heure);
                if(this.heure === -1) this.error = 'Il faut donner une heure de fermeture';
                else if (this.heure<0 || this.heure>24) this.error = "Le nombre donné n'est pas une heure";
                else{
                    if(!this.macro){
                        this.reussite = "Changement d'heure de fermeture effectué";
                        let regles = this.$store.getters.getRegles;
                        let existe = this.verifierExistence('Fermeture magasins',regles);
                        if(!existe) this.$store.dispatch('setClosingHour',this.heure);
                        else {
                            this.type = {programme: this.programme,titre: "Conflit concernant l'heure de fermeture des magasins"};
                            this.showModal=true
                        }
                    }
                    else {
                        this.programme[this.programme.length] = "changement d'heure de fermeture des magasins";
                        console.log(this.programme);
                        this.$store.commit('addMacro', this.programme);
                        this.reussite = "Raccourci créé"
                    }
                }
            }
            else if(this.programme[2].title === "réinitialiser"){
                this.reinit()
            }
            else this.error = 'Programme inconnu'
        },

        /** Envoie une requête de réinitialisation des horaires au store si le programme est correct **/
        reinit(){
            if(this.programme.length===5 && (this.programme[3].title === "heures" && this.programme[4].title === "fermeture")){
                if(!this.macro) {
                    this.$store.dispatch('setClosingHour', -1);
                    this.reussite = "Horaires des magasins réinitialisées"
                }
                else {
                    this.programme[this.programme.length] = "réinitialisation des horaires de fermeture des magasins";
                    console.log(this.programme);
                    this.$store.commit('addMacro', this.programme);
                    this.reussite = "Raccourci créé"
                }
            }
            else this.error = 'Si vous voulez réinitialiser les heures de fermetures, ajoutez les cases "heures" et "fermeture" dans cet ordre.'
        },

        /** Vérifie si une règle existe déjà pour éviter les conflits **/
        verifierExistence(titre,regles){
            let existence = false;
            regles.forEach((item)=>{
                if(item.titre === titre){
                    existence = true
                }
            });
            return existence
        }
    }
}
