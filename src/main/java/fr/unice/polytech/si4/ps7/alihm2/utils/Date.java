package fr.unice.polytech.si4.ps7.alihm2.utils;

public class Date {
    private int annee;
    private int mois;
    private int jour;
    private PlageHoraire temps;

    public Date(int annee, int mois, int jour, PlageHoraire temps) {
        this.annee = annee;
        this.mois = mois;
        this.jour = jour;
        this.temps = temps;
    }

    public int getAnnee() {
        return annee;
    }

    public int getMois() {
        return mois;
    }

    public int getJour() {
        return jour;
    }

    public PlageHoraire getTemps() {
        return temps;
    }
}
