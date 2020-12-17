# Created by nathan at 17/12/2020
Feature: # Create a Json DataBase

  Scenario: Create a complete Json File for Ville
    When I create a JSON to mock the Ville
    Then there is a "longueur" in the Json
    Then there is a "largeur" in the Json
    Then there is a "commerces" in the Json
    Then there is a "parking" in the Json
    Then there is a "zones" in the Json

  Scenario: Create a complete Json File for Position
    When I create a JSON to mock the Positions
    Then there is a "clients" in the Json
    Then there is a "policiers" in the Json
