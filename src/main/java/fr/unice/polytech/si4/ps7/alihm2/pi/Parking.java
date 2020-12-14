package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.utils.PlageHoraire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

import java.util.HashMap;
import java.util.List;

/**
 * Classe représentant un parking dans la ville
 * @author nathan
 */
public class Parking {
    private int id;
    private Position position;
    private int nbPlaces;
    private HashMap<String, List<PlageHoraire>> horaires;

    public Parking(int id, int nbPlaces, Position position, HashMap<String, List<PlageHoraire>> horaires) {
        this.id = id;
        this.nbPlaces = nbPlaces;
        this.position = position;
        this.horaires = horaires;
    }

    public int getId() {
        return id;
    }

    public Position getPosition() {
        return position;
    }

    public int getNbPlaces() {
        return nbPlaces;
    }

    public HashMap<String, List<PlageHoraire>> getHoraires() {
        return horaires;
    }
}
