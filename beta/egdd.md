---
waltz:
  title: Educational Game Design Document Template
meta:
  version: 0.0.2
  gdd authors:
    - Amaad Rafi
    - Yasser Abdelaal
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Lmntor

## Elevator Pitch

You are an alchemist who finds recipes for compounds while traversing a dungeon/ platform environment. You use these recipes to create new spells or compounds used to fight the boss at the end of the level. You also need to collect the compound that will act as a key to get to the next level. Once you have defeated the boss, you can use the compounds you have collected in order to fight enemies on later levels. 

## Influences (Brief)

- *Influence #1*:
  - Medium: Chemistry
  - Explanation: We both struggled with chemistry so this is our way of learning a little bit
- *Influence #2*:
  - Medium: Mario
  - Explanation: Classic platformer that everybody knows and enjoys, we want it to be fun 

## Core Gameplay Mechanics (Brief)

- *Gameplay Mechanic #1*: Move up, down, left, right
- *Gameplay Mechanic #2*: attack using spells
- *Gameplay Mechanic #3*: collecting recipes
- *Gameplay Mechanic #4*: switching the compound in use

# Learning Aspects

## Learning Domains

Chemistry - learn the formulas for chemical compounds and their effects.

## Target Audiences

Anyone who wants to learn a basic understanding of chemical compounds

## Target Contexts

This can be played at any point during a students free time or during class in order to teach problems in the domains we have chosen

## Learning Objectives

- *Formal Learning Objective #1*: By the end of instruction, players will be able to predict the compound produced by combining two elements
- *Formal Learning Objective #2*: By the end of instruction, given a structure, players will be able to identify the compound
## Prerequisite Knowledge

- *Prerequisite Learning Objective #1*: Basic understanding of some elements from the periodic table.

## Assessment Measures

Will be measured by showing the number of correct and incorrect answers (scoreboard)

# What sets this project apart?

- *Reason #1*: Platformer with a puzzle that teaches chemistry

# Player Interaction Patterns and Modes

## Player Interaction Pattern

Our game is a single player game where the player interacts with the world by traversing it and locating tools that will assist them in completing the stage. 

## Player Modes

- There will be a main menu at the start of the game and the player will be able to choose a mode to play. There will be no transitions since the player just picks one and plays.
  - *Player mode #1*:  Story Mode - classic story mode that gets more difficult as it progresses.

# Gameplay Objectives
- *Primary Objective #1*: Collect elements
    - Description: *Player collects the elements that are spread across the current level*
    - Alignment: LO 1
 *Primary Objective #2*: Form compound
    - Description: *Use the right amount of collected elements to form a certain compound*
    - Alignment: LOs 2
 *Primary Objective #3*: Defeat the boss
    - Description: *Defeat the boss by using previously formed compounds*
    - Alignment: LOs 1,2
# Procedures/Actions

The user can move around the map using WASD or the arrow keys and shoot with the spacebar or mouse. The user can also access their lab/inventory using “I” or “L” in which they can utilize the collected elements and form compounds to use as they advance through the level..

# Rules

- There will be a finite amount of elements spread throughout the level which the player must collect.
- The player will have a recipe book in which a recipe for previously formed compounds will be stored.
- There will be some sort of hint on the level that will guide the player into forming certain compounds.

# Objects/Entities

- There is a player that moves throughout the level
- There will be various elements that need to be spread across each level
- There will be a recipe book that will store formulas
- There will be a enemies of certain elements/compounds that react different to incoming attacks
- There will be bosses that will also react differently to incoming attacks based on the compound

## Core Gameplay Mechanics (Detailed)

- Controlling the main character*: You move the character using the assigned keys throughout the map
- Collecting elements: Pick up elements spread across the level
- Use single elements: Use single elements to aid you in your journey. Example, neon would light up a dark map
- Form a compound: Using the collected elements, form a compound in the lab/inventory
- Defeat enemies: Attack enemies using an attack based on the element/compound they’re weak against
- Defeating the boss: Use your knowledge and compound from previous levels, defeat the boss with different attacks.
    
## Feedback

When fighting enemies, they will react to an attack from the player based on what kind of enemy it is. For example, if you fight a water enemy and you attack them with the water compound, they will get bigger. This can be expanded further with different enemy types and each element/compound will have different effects.  

As the player advances in the game, they will acquire more compound recipes and the knowledge to make them which ties in directly with learning objective 1. They will also remember how to defeat certain enemies by creating a reaction that will clear a path to the boss(learning objective 2).

# Story and Gameplay

## Presentation of Rules

The first level will act as a tutorial stage where the player will be prompted to collect certain elements and a recipe in order to defeat the boss. There will be no smaller enemies in order to allow the player to fully understand what they are doing, however they will fight a boss at the end of the level to understand how making the compound can assist them in the future. 

## Presentation of Content

The player will collect elements scattered across the level and learn to use them individually or form compounds by combining them. They will be provided hints on which elements to use to form certain compounds. Their knowledge will be tested by them having to form compounds on their own prior to a boss fight and by the interactions their attacks have with various enemies.

## Story (Brief)

You are an alchemist using the power of chemistry to fight monsters to collect rare elements. 

## Storyboarding

- *Example elements and their uses*:
  - Hydrogen + oxygen2 - combine to make water 
  - Neon + Glass Tube + Electricity = light up dark room
  - Helium = reduces gravity on player if used on self or make enemies lighter/float
  - Molybdenum = used on player to provide defense at the expense of being able to move
  - Palladium = hydrogen magnet, collects hydrogen from the air
  - Silver/Gold = conduct electricity but most importantly flex with jewelry 


![Storyboard Sketch](Storyboard.jpg)

# Assets Needed

## Aesthetics

The game should have an adventure-like theme that gives the player a sense of discovery and openness, allowing the player to feel free creativity as they progress. As they fight a boss, the game will pick up pace and they will feel a sense of slight urgency, however it should be a fun experience without stress. 


## Graphical

- Characters List
  - *AlKMo - main character
  - Enemies/Boss based on elements
- Textures:
  - Platform levels
- Environment Art/Textures:
  - *Background Images*


## Audio

- Music List (Ambient sound)
  - *Background Music*: *Netherplace*
  - *Boss Music*: *Crimson Balrog (Maple Story)*
  
- Sound List (SFX)
  - *Collect element*: *pick up sound*
  - *Use skill/element*: *sound effect based on skill*
  - *Combine elements*: *sound effect based on compound*
  - *Hit monster*: *some sort of hit sound*
  - *Jump*: *jump sound effect*
  - *Take damage*: *hurt sound effect*