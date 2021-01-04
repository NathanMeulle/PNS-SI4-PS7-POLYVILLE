export default {

    methods: {
        /** Renvoie une liste une liste triée en fonction de l'attribut position de ses éléments **/
        sortItems(liste) {
            return liste.sort((a, b) => a.position - b.position)
        },

        /** Déplacement des éléments du DSL (drag) **/
        startDrag: (evt, item) => {
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('itemID', item.id)
        },

        /** Gère le relachement des éléments du DSL (drop) **/
        onDrop(evt, list) {
            this.error = '';
            const itemID = evt.dataTransfer.getData('itemID');
            if (itemID !== "") {
                const item = this.items.find(itemTmp => itemTmp.id === Number(itemID));
                if (item.list === 2 || list !== 2) {
                    item.list = item.type
                } else {
                    this.duplication(item);
                    item.list = list
                }
                console.log("ajout à la liste : ", item.list);
                if (list === 2) {
                    item.position = this.listProg.length + 1
                }
            }
        },

        /** Duplique un item du DSL pour pouvoir utiliser plusieurs fois les mêmes cases dans le programme **/
        duplication(item) {
            let len = this.items.length;
            this.items[len] = {
                id: len,
                title: item.title,
                position: item.position,
                type: item.type,
                list: item.list
            }
        },

        /** Vérifie que la valeur donnée en input est bien un nombre puis l'attribue **/
        validation(id) {
            this.error = '';
            const item = this.items.find(itemTmp => itemTmp.id === id);
            if (!isNaN(this.message[item.id])) item.input = this.message[item.id];
            else this.error = 'Le champ est vide';
            this.message[item.id] = ""
        },

        /** Supprime une case du programme **/
        suppr(item) {
            item.list = -1
        },

        /** Déplace une case d'un cran vers le haut du programme **/
        up(selected) {
            let save = 0;
            let check = this.listProg[0].id === selected.id;
            console.log(check);
            this.listProg.forEach((item, index) => {
                if (selected.id === item.id && !check) {
                    save = this.listProg[index - 1].position;
                    this.listProg[index - 1].position = selected.position;
                    selected.position = save
                }
            })
        },

        /** Déplace une case d'un cran vers le bas du programme **/
        down(selected) {
            let save = 0;
            let check = this.listProg[this.listProg.length - 1].id === selected.id;
            this.listProg.forEach((item, index) => {
                if (selected.id === item.id && !check) {
                    save = this.listProg[index + 1].position;
                    this.listProg[index + 1].position = selected.position;
                    selected.position = save
                }
            })
        },

        /** Ajout d'une case à mon programme sans drag and drop **/
        right(item) {
            this.duplication(item);
            item.list = 2;
            console.log("ajout à la liste : ", item.list);
            item.position = this.listProg.length + 1
        }
    }

}
