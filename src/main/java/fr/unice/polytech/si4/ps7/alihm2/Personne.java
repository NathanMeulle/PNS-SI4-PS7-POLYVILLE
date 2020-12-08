package fr.unice.polytech.si4.ps7.alihm2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;
/**
 * Classe représentant les personnes
 * @author nathan
 */
public abstract class Personne {
    private Position position;

    public Personne(Position position) {
        this.position = position;
    }

    @JsonIgnore
    public Position getPosition() {
        return position;
    }
}
