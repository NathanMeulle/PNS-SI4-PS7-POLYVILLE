package fr.unice.polytech.si4.ps7.alihm2;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe représentant un policier
 * @author nathan
 */
public class Policier {
    private int id;
    private Position position;

    public Policier(int id, Position position) {
        this.position = position;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public Position getPosition(){
        return position;
    }
}
