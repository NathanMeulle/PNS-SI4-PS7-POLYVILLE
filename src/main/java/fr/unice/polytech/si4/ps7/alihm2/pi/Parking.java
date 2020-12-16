package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;
import fr.unice.polytech.si4.ps7.alihm2.utils.Semaine;

import java.util.List;

/**
 * Classe représentant un parking dans la ville
 * @author nathan
 */
public class Parking {
    private int id;
    private Position position;
    private int nbPlaces;
    private List<Semaine> horaires;

    public Parking(int id, int nbPlaces, Position position, List<Semaine> horaires) {
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

    public List<Semaine> getHoraires() {
        return horaires;
    }
}
