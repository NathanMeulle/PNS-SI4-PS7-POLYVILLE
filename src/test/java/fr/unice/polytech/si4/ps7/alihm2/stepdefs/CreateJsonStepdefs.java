package fr.unice.polytech.si4.ps7.alihm2.stepdefs;

import fr.unice.polytech.si4.ps7.alihm2.Ville;
import fr.unice.polytech.si4.ps7.alihm2.pi.Commerce;
import fr.unice.polytech.si4.ps7.alihm2.pi.Parking;
import fr.unice.polytech.si4.ps7.alihm2.serializer.Engine;
import fr.unice.polytech.si4.ps7.alihm2.serializer.EngineSettingsSmall1;
import fr.unice.polytech.si4.ps7.alihm2.utils.PlageHoraire;
import fr.unice.polytech.si4.ps7.alihm2.utils.Semaine;
import io.cucumber.java8.En;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class CreateJsonStepdefs implements En {
    String json;
    EngineSettingsSmall1 engineSettingsInit;
    public CreateJsonStepdefs() {
        When("^I create a JSON to mock the Ville$", () -> {
            engineSettingsInit = new EngineSettingsSmall1();
            json = Engine.thisToJson(engineSettingsInit);
        });
        Then("^there is a \"([^\"]*)\" in the Json$", (String arg0) -> {
            assertTrue(json.contains(arg0));
        });
        When("^I create a JSON to mock the Positions$", () -> {
            json = Engine.thisToJson2(Engine.engineSettings);
        });
        Then("^each store has its own schedule$", () -> {
            int count = 0;
            String[] a = json.split("\n");
            for (String s : a) {
                if (s.contains("horaires")) count++;
            }
            assertEquals(EngineSettingsSmall1.getNbCommerants()+ EngineSettingsSmall1.getNbParking(), count);
        });
        Then("^each store has opening and closing hours between (\\d+) and (\\d+) hours$", (Integer arg0, Integer arg1) -> {
            Ville ville = engineSettingsInit.getVille();
            for(Commerce c : ville.getCommerces()){
                for (Semaine s : c.getHoraires()) {
                    for (Map.Entry<String, List<PlageHoraire>> map : s.getSemaine().entrySet()) {
                        assertTrue((map.getValue().get(0).getHeureOuverture()>=arg0));
                        assertTrue((map.getValue().get(0).getHeureFermeture()<arg1));
                        assertTrue((map.getValue().get(1).getHeureOuverture()>=arg0));
                        assertTrue((map.getValue().get(1).getHeureFermeture()<arg1));
                    }
                }

            }
        });
        Then("^each parking has opening and closing hours between (\\d+) and (\\d+) hours$", (Integer arg0, Integer arg1) -> {
            Ville ville = engineSettingsInit.getVille();
            for(Parking p : ville.getParkings()){
                for (Semaine s : p.getHoraires()) {
                    for (Map.Entry<String, List<PlageHoraire>> map : s.getSemaine().entrySet()) {
                        assertTrue((map.getValue().get(0).getHeureOuverture()>=arg0));
                        assertTrue((map.getValue().get(0).getHeureFermeture()<arg1));
                    }
                }

            }
        });


    }
}
