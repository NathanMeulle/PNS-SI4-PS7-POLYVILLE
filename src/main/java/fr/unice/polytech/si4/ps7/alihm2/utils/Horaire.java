package fr.unice.polytech.si4.ps7.alihm2.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
/**
 * Classe représentant les horaires des commerces
 * @author nathan
 */
public class Horaire {
    private HashMap<String, List<PlageHoraire>> horaires;

    public Horaire() {
        this.horaires = new HashMap<>();
    }

    public HashMap<String, List<PlageHoraire>> getHoraires() {
        return horaires;
    }

    public void addHoraire(String day, List<PlageHoraire> h){
        this.horaires.put(day, new ArrayList<>(h));
    }
}
