package fr.unice.polytech.si4.ps7.alihm2;

import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

/**
 * Classe représentant un client
 * @author nathan
 */
public class Client extends Personne {
    private ModeDeplacement modeDeplacement;
    private int id;

    public Client(Position position, int id, ModeDeplacement modeDeplacement) {
        super(position);
        this.id = id;
        this.modeDeplacement = modeDeplacement;
    }

    public ModeDeplacement getModeDeplacement() {
        return modeDeplacement;
    }

    public Position getPosiiton(){
        return super.getPosition();
    }

    public int getId() {
        return id;
    }
}
