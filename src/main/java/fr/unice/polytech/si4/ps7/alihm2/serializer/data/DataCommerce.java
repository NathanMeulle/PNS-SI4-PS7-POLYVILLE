package fr.unice.polytech.si4.ps7.alihm2.serializer.data;

import java.util.ArrayList;
import java.util.List;

/**
 * Classe contenant les types de commerces
 * @author nathan
 */
public class DataCommerce {

    private ArrayList<String> categorie;

    public DataCommerce() {
        this.categorie = new ArrayList<>(List.of("Presse","Bar","Boucherie","Boulangerie","Bureautique","Cave A Vins","Chocolatier","Fleuristes","Garage","Magasins De Bricolage","Magasin De Chaussures","Epicerie","Pressing","Plombier","Restaurant","Traiteur","Gymnase","Pharmacie"));
    }

    public ArrayList<String> getCategorie() {
        return categorie;
    }
}
