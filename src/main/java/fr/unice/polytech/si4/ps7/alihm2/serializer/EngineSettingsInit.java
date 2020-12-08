package fr.unice.polytech.si4.ps7.alihm2.serializer;

import fr.unice.polytech.si4.ps7.alihm2.Ville;

/**
 * Structure du Json d'entrée fourni à l'initialisation de la simulation
 * @author nathan
 */
public class EngineSettingsInit {
    private Ville ville;

    public EngineSettingsInit(Ville ville) {
        this.ville = ville;
    }

    public Ville getVille() {
        return ville;
    }
}
