package fr.unice.polytech.si4.ps7.alihm2.utils;

/**
 * Classe décrivant les horaires d'ouverture, fermeture
 * @author nathan
 */

public class PlageHoraire {
    private int heureOuverture;
    private int heureFermeture;
    private int affluence;

    public PlageHoraire(int heureOuverture, int heureFermeture, int affluence) {
        this.heureOuverture = heureOuverture;
        this.heureFermeture = heureFermeture;
        this.affluence = affluence;

    }

    public int getHeureOuverture() {
        return heureOuverture;
    }

    public int getHeureFermeture() {
        return heureFermeture;
    }

    public int getAffluence() {
        return affluence;
    }
}
