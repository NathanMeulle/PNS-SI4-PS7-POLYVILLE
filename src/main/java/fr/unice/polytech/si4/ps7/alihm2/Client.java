package fr.unice.polytech.si4.ps7.alihm2;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe représentant un client
 * @author nathan
 */
public class Client {
    private int id;
    private Position position;
    private ModeDeplacement modeDeplacement;

    public Client(int id, Position position, ModeDeplacement modeDeplacement) {
        this.position = position;
        this.id = id;
        this.modeDeplacement = modeDeplacement;
    }

    public int getId() {
        return id;
    }

    public Position getPosition(){
        return position;
    }

    public ModeDeplacement getModeDeplacement() {
        return modeDeplacement;
    }

}
