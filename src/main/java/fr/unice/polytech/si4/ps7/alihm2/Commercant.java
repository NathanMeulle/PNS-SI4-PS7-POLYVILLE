package fr.unice.polytech.si4.ps7.alihm2;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe représentant un commercant
 * @author nathan
 */
public class Commercant extends Personne {
    private String nom;
    private String prenom;

    public Commercant(Position position, String nom, String prenom) {
        super(position);
        this.nom = nom;
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

}
