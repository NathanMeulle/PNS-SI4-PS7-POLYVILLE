package fr.unice.polytech.si4.ps7.alihm2.serializer;

import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;

/**
 * Classe moteur générant le Json
 * @author nathan
 */
public class Engine {
    public static EngineSettingsInterface engineSettings = new EngineSettingsSmall1();//A modifier pour changer la simulation



    public static void main(String[] args) {
        String json = thisToJson(engineSettings);
        //System.out.println(json);

        String jsonPosition = thisToJson2(engineSettings);
        //System.out.println(jsonPosition);

        saveJsonFile(json, jsonPosition);

    }

    private static void saveJsonFile(String json, String jsonPosition) {
        try {
            // Enregistre la sortie initiale.
            PrintStream sortieOriginale = System.out;

            // Créé un nouveau fichier de sortie
            PrintStream fichierDeSortie = new PrintStream("VilleMock.js");
            PrintStream fichierDeSortie2 = new PrintStream("PositionMock.js");
            System.out.println("\n Json Créé !");

            // Redirige la sortie vers le fichier .js
            System.setOut(fichierDeSortie);
            System.out.println("export const VilleMock = [\n");
            System.out.println(json);
            System.out.println("\n]");

            System.setOut(fichierDeSortie2);
            System.out.println("export const PositionMock = [\n");
            System.out.println(jsonPosition);
            System.out.println("\n]");

            System.setOut(sortieOriginale);

        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        }
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

    public static String thisToJson2(EngineSettingsInterface engineSettings) {
        try {
            engineSettings.getoM().configure(SerializationFeature.INDENT_OUTPUT, true);
            return engineSettings.getoM().writeValueAsString(new EngineSettingClientPositions(engineSettings.getClients()));
        } catch (IOException e) {
            System.err.println(e);
            return "{}";
        }
    }
}
