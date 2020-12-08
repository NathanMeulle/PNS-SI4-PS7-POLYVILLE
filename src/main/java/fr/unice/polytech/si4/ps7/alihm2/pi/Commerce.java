package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.Commercant;
import fr.unice.polytech.si4.ps7.alihm2.utils.Horaire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe représentant un commerce
 * @author nathan
 */
public class Commerce extends PI {
    private String nom;
    private Commercant commercant;
    private String categorie;
    private Horaire horaire;

    public Commerce(Position position, String nom, Commercant commercant, String categorie, Horaire horaire) {
        super(position);
        this.nom = nom;
        this.commercant = commercant;
        this.categorie = categorie;
        this.horaire = horaire;
    }

    public String getNom() {
        return nom;
    }

    public Commercant getCommercant() {
        return commercant;
    }

    public String getCategorie() {
        return categorie;
    }

    public Horaire getHoraire() {
        return horaire;
    }
}
