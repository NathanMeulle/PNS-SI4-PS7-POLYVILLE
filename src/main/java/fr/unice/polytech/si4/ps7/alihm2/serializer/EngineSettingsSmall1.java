package fr.unice.polytech.si4.ps7.alihm2.serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.unice.polytech.si4.ps7.alihm2.Client;
import fr.unice.polytech.si4.ps7.alihm2.Commercant;
import fr.unice.polytech.si4.ps7.alihm2.ModeDeplacement;
import fr.unice.polytech.si4.ps7.alihm2.Ville;
import fr.unice.polytech.si4.ps7.alihm2.pi.Commerce;
import fr.unice.polytech.si4.ps7.alihm2.serializer.data.DataCommerce;
import fr.unice.polytech.si4.ps7.alihm2.serializer.data.DataName;
import fr.unice.polytech.si4.ps7.alihm2.utils.Horaire;
import fr.unice.polytech.si4.ps7.alihm2.utils.PlageHoraire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Position;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


/**
 * Classe contenant les données de la simultaion
 * @author nathan
 */
public class EngineSettingsSmall1 implements EngineSettingsInterface {

    protected ObjectMapper oM;
    protected Ville ville;
    protected List<Commercant> commercants;
    protected List<Commerce> commerces;
    protected final int longeur = 20;// >=20
    protected final int largeur = 20;// >=20
    protected List<Client> clients;


    public EngineSettingsSmall1() {
        this.oM = new ObjectMapper();
        this.commercants = initCommercants();
        this.commerces = new ArrayList<>();
        initCommerces();
        this.ville = new Ville(longeur, largeur, commercants, commerces);
        this.clients = initClient();
    }

    private List<Client> initClient() {
        List<Client> tmp = new ArrayList<>();

        for (int k = 0; k < 300; k++) { // dans la limite de k<400
            int x = (int) (Math.random() * (this.longeur + 1));
            int y = (int) (Math.random() * (this.largeur + 1));
            tmp.add(new Client(k, new Position(x,y), Math.random()<0.5?ModeDeplacement.BUS:ModeDeplacement.VOITURE));
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
        for (int k = 0; k < 20; k++) { // dans la limite de k<400
            commercantList.add(new Commercant(initPositionCommerces(),nom.get(k), prenom.get(k)));
        }
        return commercantList;
    }

    private void initCommerces() {
        DataCommerce data = new DataCommerce();
        ArrayList<String> categorie = data.getCategorie();
        Collections.shuffle(categorie);

        for (int k = 0; k < commercants.size(); k++) {
            Horaire h = initHoraire();
            Position p = commercants.get(k).getPosition();
            commerces.add(new Commerce(p, "Chez " + commercants.get(k).getNom(), commercants.get(k), categorie.get(k % categorie.size()), h));
        }
    }

    private Position initPositionCommerces() {
        int x;
        int y;
        ArrayList<Position> positions = new ArrayList<>();
        if (commercants!=null) {
            for (Commercant c : commercants) {
                positions.add(c.getPosition());
            }
        }
        do {
            x = (int) (Math.random() * (this.longeur + 1));
            y = (int) (Math.random() * (this.largeur + 1));
        } while (positions.contains(new Position(x,y)));
        return new Position(x,y);
    }

    private Horaire initHoraire() {
        Horaire tmp = new Horaire();
        List<String> jour = List.of("Lundi", "Mardi", "Mercredi", "Jeudi", "Samedi");
        for (String j : jour){
            int matinOuverture = (int) (Math.random() * ((10 - 6) + 1)) + 6;
            int matinFermeture = (int) (Math.random() * ((14 - 11) + 1)) + 11;
            int soirOuverture = (int) (Math.random() * ((15 - matinFermeture)) + 1) + matinFermeture;
            int soirFermeture = (int) (Math.random() * ((23 - 18)) + 1) + 18;
            tmp.addHoraire(j, List.of(new PlageHoraire(matinOuverture, matinFermeture), new PlageHoraire(soirOuverture, soirFermeture)));
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
}
