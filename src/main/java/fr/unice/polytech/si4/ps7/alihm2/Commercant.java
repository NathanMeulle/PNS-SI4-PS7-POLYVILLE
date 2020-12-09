package fr.unice.polytech.si4.ps7.alihm2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe représentant un commercant
 * @author nathan
 */
public class Commercant {
    private String nom;
    private String prenom;
    private Position position;

    public Commercant(Position position, String nom, String prenom) {
        this.position=position;
        this.nom = nom;
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    @JsonIgnore
    public Position getPosition() {
        return position;
    }
}
