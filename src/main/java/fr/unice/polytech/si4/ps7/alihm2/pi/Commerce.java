package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.Commercant;
import fr.unice.polytech.si4.ps7.alihm2.utils.PlageHoraire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
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
    private LinkedHashMap<String, List<PlageHoraire>> horaires;

    public Commerce(int id, Position position, String nom, Commercant commercant, String categorie, LinkedHashMap<String, List<PlageHoraire>> horaires) {
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

    public LinkedHashMap<String, List<PlageHoraire>> getHoraires() {
        return horaires;
    }
}
