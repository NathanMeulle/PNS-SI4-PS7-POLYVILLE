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
    private int longeur;
    private int largeur;
    private List<Commercant> commercants;
    private List<Commerce> commerces;
    private List<Parking> parkings;


    public Ville(int longeur, int largeur, List<Commercant> commercants, List<Commerce> commerces, List<Parking> parkings) {
        this.longeur = longeur;
        this.largeur = largeur;
        this.commercants = commercants;
        this.commerces = commerces;
        this.parkings = parkings;
    }

    public int getLongeur() {
        return longeur;
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
}
