package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.Commercant;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;
import fr.unice.polytech.si4.ps7.alihm2.utils.Semaine;

import java.util.List;

/**
 * Classe représentant un commerce
 * @author nathan
 */
public class Commerce extends PI {
    private int id;
    private String nom;
    private Commercant commercant;
    private String categorie;
    private List<Semaine> horaires;

    public Commerce(int id, Position position, String nom, Commercant commercant, String categorie, List<Semaine> horaires) {
        super(position);
        this.id = id;
        this.nom = nom;
        this.commercant = commercant;
        this.categorie = categorie;
        this.horaires = horaires;
    }

    public int getId() {
        return id;
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

    public List<Semaine> getHoraires() {
        return horaires;
    }
}
