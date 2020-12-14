package fr.unice.polytech.si4.ps7.alihm2.serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.unice.polytech.si4.ps7.alihm2.*;
import fr.unice.polytech.si4.ps7.alihm2.pi.Commerce;
import fr.unice.polytech.si4.ps7.alihm2.pi.Parking;
import fr.unice.polytech.si4.ps7.alihm2.serializer.data.DataCommerce;
import fr.unice.polytech.si4.ps7.alihm2.serializer.data.DataName;
import fr.unice.polytech.si4.ps7.alihm2.utils.PlageHoraire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

import java.util.*;


/**
 * Classe contenant les données de la simultaion
 * @author nathan
 */
public class EngineSettingsSmall1 implements EngineSettingsInterface {

    protected ObjectMapper oM;
    protected Ville ville;
    protected List<Commercant> commercants;
    protected List<Commerce> commerces;
    protected final int longeur = 180;
    protected final int largeur = 315;
    protected List<Client> clients;
    protected List<Policier> policiers;
    protected List<Parking> parkings;
    private final int nbClients = 3000;
    private final int nbCommerants = 30; // dans la limite de 400
    private final int nbParking = 4;

    public EngineSettingsSmall1() {
        this.oM = new ObjectMapper();
        this.commercants = initCommercants();
        this.commerces = new ArrayList<>();
        initCommerces();
        this.parkings = initParkings();
        this.ville = new Ville(longeur, largeur, commercants, commerces, parkings);
        this.clients = initClient();
        this.policiers = initPolicier();
    }

    private List<Double> createPosition() {
        double x = (Math.random() * (this.longeur + 1)) / 10000.0 + 43.6055;
        double y = (Math.random() * (this.largeur + 1)) / 10000.0 + 7.0500;
        return List.of(x, y);
    }

    private List<Client> initClient() {
        List<Client> tmp = new ArrayList<>();

        for (int k = 0; k < nbClients; k++) {
            Random r = new Random();
            double x = (r.nextGaussian() * (this.longeur + 1)) / 10000.0 + 43.6055;
            double y = (r.nextGaussian() * (this.largeur + 1)) / 10000.0 + 7.0500;
            tmp.add(new Client(k, new Position(x, y), Math.random() < 0.5 ? ModeDeplacement.BUS : ModeDeplacement.VOITURE));
        }
        return tmp;
    }

    private List<Policier> initPolicier() {
        List<Policier> tmp = new ArrayList<>();

        for (int k = 0; k < nbClients / 20; k++) {//un policier pour 20 clients
            List<Double> c = createPosition();
            tmp.add(new Policier(nbClients + k, new Position(c.get(0), c.get(1))));
        }
        return tmp;


    }

    private List<Commercant> initCommercants() {
        DataName data = new DataName();
        ArrayList<String> nom = data.getNom();
        ArrayList<String> prenom = data.getPrenom();
        Collections.shuffle(nom); //Mélange de la liste
        Collections.shuffle(prenom);

        List<Commercant> commercantList = new ArrayList<>();
        for (int k = 0; k < nbCommerants; k++) {
            commercantList.add(new Commercant(initPositionCommerces(), nom.get(k), prenom.get(k)));
        }
        return commercantList;
    }

    private void initCommerces() {
        DataCommerce data = new DataCommerce();
        ArrayList<String> categorie = data.getCategorie();
        Collections.shuffle(categorie);

        for (int k = 0; k < commercants.size(); k++) {
            HashMap<String, List<PlageHoraire>> h = initHoraire();
            Position p = commercants.get(k).getPosition();
            commerces.add(new Commerce(k, p, "Chez " + commercants.get(k).getNom(), commercants.get(k), categorie.get(k % categorie.size()), h));
        }
    }

    private Position initPositionCommerces() {
        double x;
        double y;
        ArrayList<Position> positions = new ArrayList<>();
        if (commercants != null) {
            for (Commercant c : commercants) {
                positions.add(c.getPosition());
            }
        }
        do {
             x = (Math.random() * (this.longeur + 1)) / 10000.0 + 43.6055;
             y = (Math.random() * (this.largeur + 1)) / 10000.0 + 7.0500;
        } while (positions.contains(new Position(x, y)));
        return new Position(x, y);
    }

    private HashMap<String, List<PlageHoraire>> initHoraire() {
        HashMap<String, List<PlageHoraire>> tmp = new HashMap<>();
        List<String> jour = List.of("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
        for (String j : jour) {
            int matinOuverture = (int) (Math.random() * ((10 - 6) + 1)) + 6;
            int matinFermeture = (int) (Math.random() * ((14 - 11) + 1)) + 11;
            int soirOuverture = (int) (Math.random() * ((15 - matinFermeture)) + 1) + matinFermeture;
            int soirFermeture = (int) (Math.random() * ((23 - 18)) + 1) + 18;
            tmp.put(j, List.of(new PlageHoraire(matinOuverture, matinFermeture), new PlageHoraire(soirOuverture, soirFermeture)));
        }
        tmp.put("Dimanche", List.of(new PlageHoraire(0, 0), new PlageHoraire(0, 0)));

        return tmp;
    }


    private List<Parking> initParkings() {
        List<Parking> tmp = new ArrayList<>();
        for (int k = 0; k < nbParking; k++) {
            int nbPlace = (int) (Math.random() * ((300 - 50) + 1)) + 50;
            List<Double> c = createPosition();
            Position p = new Position(c.get(0), c.get(1));
            tmp.add(new Parking(k + nbCommerants, nbPlace, p, initHoraireParking()));
        }
        return tmp;
    }

    private HashMap<String, List<PlageHoraire>> initHoraireParking() {
        HashMap<String, List<PlageHoraire>> tmp = new HashMap<>();
        List<String> jour = List.of("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
        for (String j : jour) {
            int matinOuverture = (int) (Math.random() * ((8 - 6) + 1)) + 6;
            int soirFermeture = (int) (Math.random() * ((23 - 20)) + 1) + 20;
            tmp.put(j, List.of(new PlageHoraire(matinOuverture, soirFermeture)));
        }
        return tmp;
    }


    public ObjectMapper getoM() {
        return oM;
    }

    @Override
    public Ville getVille() {
        return ville;
    }

    @Override
    public List<Client> getClients() {
        return clients;
    }

    @Override
    public List<Policier> getPoliciers() {
        return policiers;
    }
}
