package fr.unice.polytech.si4.ps7.alihm2.serializer;

import fr.unice.polytech.si4.ps7.alihm2.Client;

import java.util.List;

/**
 * Structure du Json
 * @author nathan
 */
public class EngineSettingClientPositions {

    private List<Client> clients;

    public EngineSettingClientPositions(List<Client> clients) {
        this.clients = clients;
    }

    public List<Client> getClients() {
        return clients;
    }
}

