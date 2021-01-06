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
                        console.log(nbCitoyens)
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
                this.reussite ="Déplacement de policiers effectué";
                if(!this.macro) {
                    let regles = this.$store.getters.getRegles;
                    let existe = this.verifierExistence('Presence policier',regles);
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
                let regle = {
                    "name" : "condition affichage",
                    "nbCitize" :nbCitoyens,
                    "zone" : this.zones[0],
                }
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
        getHeure(pos){
            if(this.programme[pos] !== undefined && this.programme[pos].title === "heures"){
               
                if(pos < 1 || this.programme[pos-1].title!== 'Input' || this.programme[pos-1].input === "") this.error = "Il est nécessaire d'écrire une heure";
                else{
                    this.heure = Number(this.programme[pos-1].input)
                    if(this.heure === -1) this.error = 'Il faut donner une heure de fermeture';
                    else if (this.heure<0 || this.heure>24) this.error = "Le nombre donné n'est pas une heure";
                    else{
                        if(!this.macro){
                            this.reussite = "Changement d'heure de fermeture effectué";
                            let regles = this.$store.getters.getRegles;
                            let existe = this.verifierExistence('Fermeture magasins'+this.zoneToApply,regles);
                            if(!existe){
                                this.$store.dispatch('setClosingHour', {hour : this.heure, zone : this.zoneToApply});
                            } 
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
            }
            else{
                this.heure = -1;
            }
        },

        /** Gestion d'un programme contenant une case Pour **/
        Pour(){
            
            if(this.programme.length>0){
                this.programme.forEach((item,index)=>{
                    if(item.title === "Pour tous"){
                        this.checkEntity(index+1);
                    }
                })
            }
        },
        /** Vérifie qu'on a bien une Entité */
        checkEntity(pos){
            
            if( !(this.programme[pos] !== undefined && this.programme[pos].type===3) ){
                this.error = "Une condition 'Pour tout' doit être accompagnée d'une Entité";
            }
            else if(this.programme[pos].title === 'magasins'){
                if(this.programme[pos+1]!==undefined){
                    if(this.programme[pos+1].type === 6){
                        this.zoneToApply = this.programme[pos+1].title;
                        this.checkDiverse(pos+2);
                    }
                    else{
                        this.zoneToApply = "";
                        this.checkDiverse(pos+1);
                    }   
                }
                else if (this.programme[pos-2] !== undefined && this.programme.length <=5){
                    // cas où la case diverse est avant le 'Pour tous'
                    this.checkDiverse(pos-2);
                }
                else{
                    this.error = "Il manque une case 'divers'";
                }
            }
            else if (this.programme[pos].title === 'policiers') {
                this.error = 'Programme inconnu';
            }
            else if (this.programme[pos].title === 'citoyens'){
                this.error = 'Programme inconnu';
            }
            else if(this.programme[1].title==='Boulangerie'||this.programme[1].title==='Bar') this.forMagasinEvent();
        },

        /** Gestion d'un programme qui parcoure un type de magasin pour la gestion d'événement **/
        forMagasinEvent(){
            if(this.programme.length === 10) {
                if (this.programme[2].title === 'Si' && this.programme[3].title === 'citoyens') {
                    if(this.programme[4].title === 'Zone du magasin'){
                        this.forMagasinEventZone()
                    }
                    else this.error = 'Ajoutez la case "Zone du magasin"'
                }
            }
            else this.error = 'Programme inconnu'
        },

        forMagasinEventZone(){
            let nbCitoyens = -1;
            if(this.programme[5].title.substring(0,4) === 'Plus'){
                if(this.programme[5].title === 'Plus grand que') this.infOrSup = 'sup';
                else this.infOrSup = 'inf';
                if(this.programme[6].title === 'Input') {
                    nbCitoyens = Number(this.programme[6].input)
                    if (this.programme[7].title === 'Alors') {
                        if (this.programme[8].title === 'afficher' && this.programme[9].title === 'événement') {
                            let regle = ["condition affichage pour type de magasins",nbCitoyens]
                            this.$emit("ajoutRegleEvenement", regle)
                            this.error =''
                            this.reussite = "Programme validé"
                        }
                        else this.error = "Programme inconnu"
                    }
                    else this.error = "Veuillez donner une instruction à appliquer"
                }
                else this.error = "Veuillez donner le nombre de citoyens limite"
            }
            else this.error = "Ajouter une condition 'Plus grand que' ou 'Plus petit que'"
        },          

        /** traite les cases de 'Données' et les cases 'Divers' */
        checkDiverse(pos){
            if( this.programme[pos] === undefined){
                this.error = 'Programme inconnu';
            }
            else if (this.programme[pos].title === 'heures') {
                this.getHeure(pos);
            }
            else if (this.programme[pos].title === 'fermeture'){
                 if (this.checkReinitialiser(pos-1)){ // cas réinitialiser avant le 'magasins' 
                 
                 }
                 else if (this.programme[pos+2] !== undefined){
                    this.getHeure(pos+2);
                 }
                 else{
                    this.error = "Il faut donner une heure de fermeture";
                 }
            }
            else if (this.programme[pos].title === 'réinitialiser') {
                this.checkDiverse(pos+2);// cas réinitialiser après le 'magasins' 
            }
            else{
                this.error = 'Programme inconnu';
            }
        },

        // traitement d'un programme avec 'réinitialiser' dedans
        checkReinitialiser(pos){
            if( this.programme[pos-1] !== undefined && this.programme[pos-1].title  === 'réinitialiser'){
                this.reinit(pos-1);
                return true;
            }
            return false;
        },


        /** Envoie une requête de réinitialisation des horaires au store si le programme est correct **/
        reinit(pos){
            if(this.programme.length===5 && (this.programme[pos+1].title === "heures" && this.programme[pos+2].title === "fermeture")){
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
