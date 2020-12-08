package fr.unice.polytech.si4.ps7.alihm2.serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.unice.polytech.si4.ps7.alihm2.Client;
import fr.unice.polytech.si4.ps7.alihm2.Ville;

import java.util.List;

public interface EngineSettingsInterface {
    ObjectMapper getoM();
    Ville getVille();
    List<Client> getClients();
}
