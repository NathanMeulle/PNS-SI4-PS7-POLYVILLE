package fr.unice.polytech.si4.ps7.alihm2;
/**
 * Classe représentant un commercant
 * @author nathan
 */
public class Commercant extends Personne {
    private String nom;
    private String prenom;

    public Commercant(String nom, String prenom) {
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
