package fr.unice.polytech.si4.ps7.alihm2.pi;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe décrivant un point d'intérêt
 * @author nathan
 */
public abstract class PI {
    private Position position;

    public PI(Position position) {
        this.position = position;
    }

    public Position getPosition() {
        return position;
    }
}
