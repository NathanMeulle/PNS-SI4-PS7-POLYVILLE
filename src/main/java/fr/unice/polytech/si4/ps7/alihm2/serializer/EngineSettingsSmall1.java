package fr.unice.polytech.si4.ps7.alihm2.serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.unice.polytech.si4.ps7.alihm2.*;
import fr.unice.polytech.si4.ps7.alihm2.pi.Commerce;
import fr.unice.polytech.si4.ps7.alihm2.pi.Parking;
import fr.unice.polytech.si4.ps7.alihm2.serializer.data.DataCommerce;
import fr.unice.polytech.si4.ps7.alihm2.serializer.data.DataName;
import fr.unice.polytech.si4.ps7.alihm2.utils.PlageHoraire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;
import fr.unice.polytech.si4.ps7.alihm2.utils.Semaine;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
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
    protected static final int LONGEUR = 180;
    protected static final int LARGEUR = 310;
    protected static final double D = 0.04;
    protected List<Client> clients;
    protected List<Policier> policiers;
    protected List<Parking> parkings;
    protected List<Zone> zones;
    private static final int NB_CLIENTS = 3000;
    private static final int NB_COMMERANTS = 30; // dans la limite de 400
    private static final int NB_PARKING = 4;
    private static final int NB_SEMAINE_HORAIRE = 4;
    private Random rand;

    public EngineSettingsSmall1() {
        this.oM = new ObjectMapper();
        this.commercants = initCommercants();
        this.commerces = new ArrayList<>();
        initCommerces();
        this.parkings = initParkings();
        this.zones = initZones();
        this.ville = new Ville(LONGEUR, LARGEUR, commercants, commerces, parkings, zones);
        this.clients = initClient();
        this.policiers = initPolicier();
    }

    private List<Double> createPosition() {
        double x = (Math.random() * (LONGEUR + 1)) / 10000.0 + 43.6055;
        double y = (Math.random() * (LARGEUR + 1)) / 10000.0 + 7.0500;
        return List.of(x, y);
    }

    private List<Client> initClient() {
        try {
            rand = SecureRandom.getInstanceStrong();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        List<Client> tmp = new ArrayList<>();
        for (int k = 0; k < NB_CLIENTS; k++) {
            double x = (this.rand.nextGaussian() * D) / 7 + 43.6154;
            double y = (this.rand.nextGaussian() * D) / 7 + 7.0719;
            tmp.add(new Client(k, new Position(x, y), Math.random() < 0.5 ? ModeDeplacement.BUS : ModeDeplacement.VOITURE));
        }
        return tmp;
    }

    private List<Policier> initPolicier() {
        List<Policier> tmp = new ArrayList<>();

        for (int k = 0; k < NB_CLIENTS / 20; k++) {//un policier pour 20 clients
            List<Double> c = createPosition();
            tmp.add(new Policier(NB_CLIENTS + k, new Position(c.get(0), c.get(1))));
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
        for (int k = 0; k < NB_COMMERANTS; k++) {
            commercantList.add(new Commercant(initPositionCommerces(), nom.get(k), prenom.get(k)));
        }
        return commercantList;
    }

    private void initCommerces() {
        DataCommerce data = new DataCommerce();
        ArrayList<String> categorie = data.getCategorie();
        Collections.shuffle(categorie);
        DataName dataName = new DataName();
        ArrayList<String> nom = dataName.getNom();
        Collections.shuffle(nom); //Mélange de la liste

        for (int k = 0; k < commercants.size(); k++) {
            List<Semaine> h = initHoraire();
            Position p = commercants.get(k).getPosition();
            int i = (int) (Math.random() * 120);
            commerces.add(new Commerce(k, p, "Chez " + commercants.get(k).getNom(), commercants.get(k), categorie.get(k % categorie.size()), h, i + (i%3==0?" avenue de ":" rue de ") + dataName.getNom().get(i)));
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
             x = (Math.random() * (LONGEUR + 1)) / 10000.0 + 43.6055;
             y = (Math.random() * (LARGEUR + 1)) / 10000.0 + 7.0500;
        } while (positions.contains(new Position(x, y)));
        return new Position(x, y);
    }

    private List<Semaine> initHoraire() {
        List<Semaine> res = new ArrayList<>();
        List<String> jour = List.of("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
        for (int i = 0; i < NB_SEMAINE_HORAIRE; i++) {
            LinkedHashMap<String, List<PlageHoraire>> tmp = new LinkedHashMap<>();
            for (String j : jour) {
                int matinOuverture = (int) (Math.random() * ((10 - 6) + 1)) + 6;
                int matinFermeture = (int) (Math.random() * ((14 - 11) + 1)) + 11;
                int soirOuverture = (int) (Math.random() * (15 - matinFermeture)) + matinFermeture+1;
                int soirFermeture = (int) (Math.random() * ((23 - 18) + 1)) + 18;
                tmp.put(j, List.of(new PlageHoraire(matinOuverture, matinFermeture, (int) (Math.random() * (NB_CLIENTS /10.0 + 1))), new PlageHoraire(soirOuverture, soirFermeture, (int) (Math.random() * (NB_CLIENTS /10.0 + 1)))));
            }
            tmp.put("Dimanche", List.of(new PlageHoraire(0, 0, 0), new PlageHoraire(0, 0, 0)));
            res.add(new Semaine(tmp));
        }
        return res;
    }


    private List<Parking> initParkings() {
        List<Parking> tmp = new ArrayList<>();
        for (int k = 0; k < NB_PARKING; k++) {
            int nbPlace = (int) (Math.random() * ((300 - 50) + 1)) + 50;
            List<Double> c = createPosition();
            Position p = new Position(c.get(0), c.get(1));
            tmp.add(new Parking(k + NB_COMMERANTS, nbPlace, p, initHoraireParking()));
        }
        return tmp;
    }

    private List<Semaine> initHoraireParking() {
        List<Semaine> res = new ArrayList<>();
        List<String> jour = List.of("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
        for (int i = 0; i < NB_SEMAINE_HORAIRE; i++) {
            LinkedHashMap<String, List<PlageHoraire>> tmp = new LinkedHashMap<>();
            for (String j : jour) {
                int matinOuverture = (int) (Math.random() * ((8 - 6) + 1)) + 6;
                int soirFermeture = (int) (Math.random() * ((23 - 20) + 1)) + 20;
                tmp.put(j, List.of(new PlageHoraire(matinOuverture, soirFermeture, (int) (Math.random() * (NB_CLIENTS / 10.0 + 1)))));
            }
            res.add(new Semaine(tmp));
        }
        return res;
    }
    private List<Zone> initZones() {
        Zone zoneA =  new Zone("Zone A", new Position( 43.6254, 7.0839));
        Zone zoneB =  new Zone("Zone B", new Position( 43.6254, 7.0569));
        Zone zoneC =  new Zone("Zone C", new Position( 43.6054, 7.0839));
        Zone zoneD =  new Zone("Zone D", new Position( 43.6054, 7.0569));
        return List.of(zoneA, zoneB, zoneC, zoneD);
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
