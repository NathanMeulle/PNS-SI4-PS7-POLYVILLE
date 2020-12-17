package fr.unice.polytech.si4.ps7.alihm2.utils;



import java.util.LinkedHashMap;
import java.util.List;

public class Semaine {
    private LinkedHashMap<String, List<PlageHoraire>> horaires;

    public Semaine(LinkedHashMap<String, List<PlageHoraire>> horaires) {
        this.horaires = horaires;
    }

    public LinkedHashMap<String, List<PlageHoraire>> getSemaine() {
        return horaires;

    }
}
