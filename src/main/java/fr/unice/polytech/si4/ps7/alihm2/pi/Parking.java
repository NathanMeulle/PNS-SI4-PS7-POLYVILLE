package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.utils.Horaire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;
/**
 * Classe représentant un parking dans la ville
 * @author nathan
 */
public class Parking {
    private int id;
    private Position position;
    private int nbPlaces;
    private Horaire horaire;

    public Parking(int id, int nbPlaces, Position position, Horaire horaire) {
        this.id = id;
        this.nbPlaces = nbPlaces;
        this.position = position;
        this.horaire = horaire;
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

    public Horaire getHoraire() {
        return horaire;
    }
}
