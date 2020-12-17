package fr.unice.polytech.si4.ps7.alihm2;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

public class Zone {
    private String id;
    private Position position;

    public Zone(String id, Position position) {
        this.id = id;
        this.position = position;
    }

    public String getId() {
        return id;
    }

    public Position getPosition() {
        return position;
    }
}
