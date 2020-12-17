package fr.unice.polytech.si4.ps7.alihm2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.unice.polytech.si4.ps7.alihm2.pi.Commerce;
import fr.unice.polytech.si4.ps7.alihm2.pi.Parking;

import java.util.List;
/**
 * Classe représentant la ville
 * @author nathan
 */
public class Ville {
    private int longueur;
    private int largeur;
    private List<Commercant> commercants;
    private List<Commerce> commerces;
    private List<Parking> parkings;
    private List<Zone> zones;

    public Ville(int longueur, int largeur, List<Commercant> commercants, List<Commerce> commerces, List<Parking> parkings, List<Zone> zones) {
        this.longueur = longueur;
        this.largeur = largeur;
        this.commercants = commercants;
        this.commerces = commerces;
        this.parkings = parkings;
        this.zones = zones;
    }

    public int getLongueur() {
        return longueur;
    }

    public int getLargeur() {
        return largeur;
    }

    @JsonIgnore
    public List<Commercant> getCommercants() {
        return commercants;
    }

    public List<Commerce> getCommerces() {
        return commerces;
    }

    public List<Parking> getParkings() {
        return parkings;
    }

    public List<Zone> getZones() {
        return zones;
    }
}
