package fr.unice.polytech.si4.ps7.alihm2.serializer;

import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.IOException;
/**
 * Classe moteur générant le Json
 * @author nathan
 */
public class Engine {
    public static EngineSettingsInterface engineSettings = new EngineSettingsSmall1();//A modifier pour changer la simulation



    public static void main(String[] args) {
        String json = thisToJson(engineSettings);
        System.out.println(json);
    }


    /**
     * Crée un json d'entrée d'initialisation pour la simulation avec les paramètres de engineSettings
     * @return Un Json sous forme de string
     */
    public static String thisToJson(EngineSettingsInterface engineSettings) {
        try {
            engineSettings.getoM().configure(SerializationFeature.INDENT_OUTPUT, true);
            return engineSettings.getoM().writeValueAsString(new EngineSettingsInit(engineSettings.getVille()));
        } catch (IOException e) {
            System.err.println(e);
            return "{}";
        }
    }
}
