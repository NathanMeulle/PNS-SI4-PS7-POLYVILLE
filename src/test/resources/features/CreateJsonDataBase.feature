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

  Scenario: Each Store/Parking has its own schedule
    When I create a JSON to mock the Ville
    Then each store has its own schedule

  Scenario: Each Store has a schedule in the right format
    When I create a JSON to mock the Ville
    Then each store has opening and closing hours between 0 and 24 hours

  Scenario: Each Parking has a schedule in the right format
    When I create a JSON to mock the Ville
    Then each parking has opening and closing hours between 0 and 24 hours

