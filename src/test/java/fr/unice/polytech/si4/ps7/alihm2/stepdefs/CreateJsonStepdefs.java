package fr.unice.polytech.si4.ps7.alihm2.stepdefs;

import fr.unice.polytech.si4.ps7.alihm2.serializer.Engine;
import io.cucumber.java8.En;

import static org.junit.jupiter.api.Assertions.*;

public class CreateJsonStepdefs implements En {
    String json;
    public CreateJsonStepdefs() {
        When("^I create a JSON to mock the Ville$", () -> {
            json = Engine.thisToJson(Engine.engineSettings);
        });
        Then("^there is a \"([^\"]*)\" in the Json$", (String arg0) -> {
            assertTrue(json.contains(arg0));
        });
        When("^I create a JSON to mock the Positions$", () -> {
            json = Engine.thisToJson2(Engine.engineSettings);
        });


    }
}
