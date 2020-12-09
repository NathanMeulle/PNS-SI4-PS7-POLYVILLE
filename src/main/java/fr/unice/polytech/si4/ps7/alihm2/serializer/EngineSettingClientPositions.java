package fr.unice.polytech.si4.ps7.alihm2.serializer;

import fr.unice.polytech.si4.ps7.alihm2.Client;
import fr.unice.polytech.si4.ps7.alihm2.Policier;

import java.util.List;

/**
 * Structure du Json
 * @author nathan
 */
public class EngineSettingClientPositions {

    private List<Client> clients;

    private List<Policier> policiers;

    public EngineSettingClientPositions(List<Client> clients, List<Policier> policiers) {
        this.clients = clients;
        this.policiers = policiers;
    }

    public List<Client> getClients() {
        return clients;
    }

    public List<Policier> getPoliciers() {
        return policiers;
    }
}

