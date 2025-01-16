import React, { useState, useEffect } from "react";
import { fetchData } from "../services/api";
import Header from "../components/Header/Header";
import Story from "../components/Story/Story";
import Logs from "../components/Logs/Logs";
import Characters from "../components/Characters/Characters";
import StepButtons from "../components/Steps/StepButtons";
import World from "../components/World/World";
import Party from "../components/Party/Party";

import Loader from "../components/Shared/Loader";
import ErrorMessage from "../components/Shared/ErrorMessage";

import EnvironmentSoundPlayer from "../components/Sound/EnvironmentSoundPlayer";
import soundMap from "../components/Sound/SoundList";

function findMatchingSound(soundMap, environment) {
    const { place, weather, daytime, mood } = environment;

    console.log("Environment:", place, weather, daytime, mood);

    const searchTerms = [place.toLowerCase(), weather.toLowerCase(), daytime.toLowerCase(), mood.toLowerCase()];

    // Score matches based on the number of matching terms
    const scoredMatches = Object.keys(soundMap)
        .map(key => {
            const keyLower = key.toLowerCase();
            const score = searchTerms.reduce((count, term) => (keyLower.includes(term) ? count + 1 : count), 0);
            return { key, score };
        })
        .filter(match => match.score > 0) // Keep only matches with at least one matching term
        .sort((a, b) => b.score - a.score); // Sort by score in descending order

    console.log("Scored Matches:", scoredMatches);

    // Return the highest-scoring match or null if no matches are found
    return scoredMatches.length > 0 ? soundMap[scoredMatches[0].key] : soundMap[0];
}

function Home() {
    let init_json_structure = {
        "main_data": {
            "weather": [
                {
                    "id": 1,
                    "name": "Sunny",
                    "emoji": "☀️",
                    "description": "A bright and sunny day with clear skies.",
                    "min_temperature": 20,
                    "max_temperature": 30,
                    "added_at": "123-12-28T09:00:00",
                    "ended_at": "123-12-28T12:00:00"
                },
                {
                    "id": 2,
                    "name": "Stormy",
                    "emoji": "⛈️",
                    "description": "A sudden storm with heavy rain and strong winds.",
                    "min_temperature": 15,
                    "max_temperature": 25,
                    "added_at": "123-12-28T13:30:00",
                    "ended_at": ""
                }
            ],
            "current_world_status": {
                "id": 1,
                "weather_id": 2,
                "gorunds_id": 2,
                "location_id": 2,
                "event_id": 2,
                "started_at": "123-12-27T09:00:00",
                "game_date": "123-12-28T13:30:00"
            },
            "current_world_history": [
                {
                    "id": 1,
                    "description": "After Arwen woke up in an unfamiliar magical world with no memories of his past life, he embarked on a journey to uncover the mysteries of his arrival and lost memories. Along the way, he encountered new allies, built relationships with them, and continued his quest to help others while learning more about the enigmatic world around him.",
                    "added_at": "123-12-27T18:30:00"
                }
            ],
            "grounds": [
                {
                    "id": 1,
                    "name": "Mystic Forest",
                    "description": "A dense forest shrouded in mystery and magic.",
                    "added_at": "123-12-28T09:20:00"
                },
                {
                    "id": 2,
                    "name": "Goblin Lands",
                    "description": "A treacherous land inhabited by goblins and other dangerous creatures.",
                    "added_at": "123-12-28T12:45:00"
                }
            ],
            "locations": [
                {
                    "id": 1,
                    "name": "Elven Village",
                    "grounds_id": 1,
                    "description": "A hidden village inhabited by elves.",
                    "added_at": "123-12-28T09:25:00"
                },
                {
                    "id": 2,
                    "name": "Cave Entrance",
                    "grounds_id": 2,
                    "description": "The ominous entrance to the Goblin Cave.",
                    "added_at": "123-12-28T12:45:00"
                }
            ],
            "current_world_chooses": [
                {
                    "id": 1,
                    "location_id": 1,
                    "description": "Arwen woke up in a mysterious magical world with no memory of his past life and began his quest to uncover the truth about his arrival.",
                    "added_at": "123-12-27T09:00:00"
                },
                {
                    "id": 2,
                    "location_id": 1,
                    "description": "Arwen decided to explore the nearby Elven Village in search of clues about his past and guidance in this unfamiliar world.",
                    "added_at": "123-12-27T12:30:00"
                },
                {
                    "id": 3,
                    "location_id": 1,
                    "description": "Arwen meet a young human warrior, and decided to join forces to explore the Mystic Forest together.",
                    "added_at": "123-12-27T18:30:00"
                }
            ],
            "language": [
                {
                    "id": 1,
                    "name": "Elvish",
                    "description": "The native language of the elves.",
                    "added_at": "123-12-28T09:35:00"
                },
                {
                    "id": 2,
                    "name": "Human",
                    "description": "The common language spoken by humans.",
                    "added_at": "123-12-28T09:35:00"
                }
            ],
            "race": [
                {
                    "id": 1,
                    "name": "Elf",
                    "description": "A graceful and mystical race.",
                    "added_at": "123-12-28T09:40:00"
                },
                {
                    "id": 2,
                    "name": "Human",
                    "description": "A versatile and adaptable",
                    "added_at": "123-12-28T09:40:00"
                }
            ],
            "class": [
                {
                    "id": 1,
                    "name": "Warrior",
                    "emoji": "⚔️",
                    "description": "A skilled fighter with mastery over weapons and combat techniques.",
                    "added_at": "123-12-28T09:45:00"
                },
                {
                    "id": 2,
                    "name": "Mage",
                    "emoji": "🔮",
                    "description": "A wielder of powerful magic and arcane knowledge.",
                    "added_at": "123-12-28T09:45:00"
                }
            ],
            "characters": [
                {
                    "id": 1,
                    "name": "Arwen",
                    "class_id": 1,
                    "race_id": 1,
                    "gender": "male",
                    "age": 120,
                    "level": 2,
                    "language_id": 1,
                    "current_experience": 130,
                    "next_level_experience": 200,
                    "current_health": 50,
                    "current_mana": 40,
                    "current_stamina": 35,
                    "max_health": 60,
                    "max_mana": 40,
                    "max_stamina": 40,
                    "description": "A young elven warrior.",
                    "is_player": "true",
                    "is_enemy": "false",
                    "is_dead": "false",
                    "added_at": "123-12-27T09:30:00"
                },
                {
                    "id": 2,
                    "name": "Dan",
                    "class_id": 2,
                    "race_id": 2,
                    "gender": "male",
                    "age": 25,
                    "level": 1,
                    "language_id": 1,
                    "current_experience": 0,
                    "next_level_experience": 100,
                    "current_health": 50,
                    "current_mana": 20,
                    "current_stamina": 30,
                    "max_health": 50,
                    "max_mana": 30,
                    "max_stamina": 40,
                    "description": "A young human warrior.",
                    "is_player": "false",
                    "is_enemy": "false",
                    "is_dead": "false",
                    "added_at": "123-12-27T18:30:00"
                },
            ],
            "skills_type": [
                {
                    "id": 1,
                    "name": "Combat"
                }
            ],
            "skills": [
                {
                    "id": 1,
                    "name": "Power Strike",
                    "emoji": "⚔️",
                    "skill_type_id": 1,
                    "skill_level": 1,
                    "skill_mana_cost": 5,
                    "skill_health_cost": 0,
                    "skill_stamina_cost": 10,
                    "success_chance": 85,
                    "is_attack": "true",
                    "added_at": "123-12-28T09:30:00"
                },
                {
                    "id": 2,
                    "name": "Thunder Strike",
                    "emoji": "⚡",
                    "skill_type_id": 1,
                    "skill_level": 1,
                    "skill_mana_cost": 10,
                    "skill_health_cost": 0,
                    "skill_stamina_cost": 15,
                    "success_chance": 90,
                    "is_attack": "true",
                    "added_at": "123-12-28T12:50:00"
                }
            ],
            "skill_effects": [
                {
                    "id": 1,
                    "name": "Damage",
                    "emoji": "💥",
                    "description": "Inflicts damage to an enemy.",
                    "added_at": "123-12-28T09:30:00"
                }
            ],
            "skill_effects_rel": [
                {
                    "id": 1,
                    "skill_id": 1,
                    "effect_id": 1,
                    "effect_value": 20,
                    "duration": 0,
                    "added_at": "123-12-28T09:30:00",
                    "ended_at": ""
                }
            ],
            "character_skills_list_rel": [
                {
                    "id": 1,
                    "skill_id": 1,
                    "character_id": 1,
                    "added_at": "123-12-28T09:30:00",
                    "ended_at": ""
                }
            ],
            "character_relationship": [
                {
                    "id": 1,
                    "name": "Friend",
                    "emoji": "👫",
                    "description": "A bond forged through trust and companionship.",
                    "added_at": "123-12-27T18:30:00"
                },
                {
                    "id": 2,
                    "name": "Protector",
                    "emoji": "🛡️",
                    "description": "A bond forged through mutual respect and courage.",
                    "added_at": "123-12-28T12:55:00"
                }
            ],
            "character_relationship_rel": [
                {
                    "id": 1,
                    "relationship_id": 1,
                    "character_id": 1,
                    "target_character_id": 2,
                    "added_at": "123-12-27T18:30:00",
                    "ended_at": ""
                },
                {
                    "id": 2,
                    "relationship_id": 2,
                    "character_id": 2,
                    "target_character_id": 1,
                    "added_at": "123-12-28T18:55:00",
                    "ended_at": ""
                }
            ],
            "character_status_dict": [
                {
                    "id": 1,
                    "name": "Healthy",
                    "added_at": "123-12-28T09:30:00"
                }
            ],
            "character_status_rel": [
                {
                    "id": 1,
                    "status_id": 1,
                    "character_id": 1,
                    "reason": "In good health.",
                    "added_at": "123-12-28T09:30:00",
                    "ended_at": ""
                }
            ],
            "item_rarity": [
                {
                    "id": 1,
                    "name": "Common",
                    "emoji": "⚪",
                    "color": "#FFFFFF",
                    "added_at": "123-12-28T09:30:00"
                }
            ],
            "item_type": [
                {
                    "id": 1,
                    "name": "Weapon",
                    "emoji": "⚔️",
                    "added_at": "123-12-28T09:30:00"
                },
                {
                    "id": 2,
                    "name": "Accessory",
                    "emoji": "💍",
                    "added_at": "123-12-28T09:30:00"
                }
            ],
            "item_status": [
                {
                    "id": 1,
                    "name": "Good",
                    "color": "#00FF00",
                    "added_at": "123-12-28T09:30:00"
                }
            ],
            "items": [
                {
                    "id": 1,
                    "name": "Iron Sword",
                    "item_type_id": 1,
                    "item_rarity_id": 1,
                    "description": "A basic iron sword.",
                    "price": 10,
                    "added_at": "123-12-28T09:30:00",
                    "item_stats": [
                        {
                            "id": 1,
                            "name": "Damage",
                            "value": 15,
                            "added_at": "123-12-28T09:30:00"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Goblin Dagger",
                    "item_type_id": 1,
                    "item_rarity_id": 1,
                    "description": "A crude dagger used by goblins in combat.",
                    "price": 5,
                    "added_at": "123-12-28T11:15:00",
                    "item_stats": [
                        {
                            "id": 1,
                            "name": "Damage",
                            "value": 5,
                            "added_at": "123-12-28T11:15:00"
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Ancient Amulet",
                    "description": "A mystical amulet that enhances magical power.",
                    "item_rarity_id": 2,
                    "item_type_id": 2,
                    "price": 100,
                    "added_at": "123-12-28T12:45:00",
                    "item_stats": [
                        {
                            "id": 2,
                            "item_id": 3,
                            "name": "Magic Power",
                            "value": 15,
                            "added_at": "123-12-28T12:45:00"
                        }
                    ]
                }
            ],
            "inventory": [
                {
                    "id": 1,
                    "character_id": 1,
                    "item_id": 1,
                    "status_id": 1,
                    "is_equipped": "true",
                    "quantity": 1
                },
                {
                    "id": 2,
                    "character_id": 1,
                    "item_id": 2,
                    "status_id": 1,
                    "is_equipped": "false",
                    "quantity": 1
                },
                {
                    "id": 3,
                    "character_id": 1,
                    "item_id": 3,
                    "status_id": 1,
                    "is_equipped": "false",
                    "quantity": 1
                }
            ],
            "party_members": [
                {
                    "id": 1,
                    "character_id": 1,
                    "added_at": "123-12-27T18:55:00",
                    "ended_at": ""
                },
                {
                    "id": 2,
                    "character_id": 2,
                    "added_at": "123-12-27T18:55:00",
                    "ended_at": ""
                }
            ],
            "events": [
                {
                    "id": 1,
                    "quest_giver_id": 1,
                    "location_id": 1,
                    "grounds_id": 1,
                    "name": "Find the Artifact",
                    "description": "Locate the lost artifact in the Mystic Forest.",
                    "current_amount": 1,
                    "target_amount": 1,
                    "completion_percentage": 100,
                    "is_active": "false",
                    "started_at": "123-12-28T07:30:00",
                    "ended_at": "123-12-28T09:30:00"
                },
                {
                    "id": 2,
                    "quest_giver_id": 1,
                    "location_id": 2,
                    "grounds_id": 2,
                    "name": "Research the Goblin Cave or leave",
                    "description": "Explore the depths of the Goblin Cave and uncover its secrets.",
                    "current_amount": 0,
                    "target_amount": 1,
                    "completion_percentage": 0,
                    "is_active": "true",
                    "started_at": "123-12-28T11:45:00",
                    "ended_at": ""
                }
            ],
            "events_reward": [
                {
                    "id": 1,
                    "event_id": 1,
                    "item_id": 1,
                    "experience": 50,
                    "added_at": "123-12-28T09:30:00"
                }
            ],
        },
        "generator_response_data": {
            "prompt": "Arwen has discovered new items 🛡️ and skills 🪄 during his long journey. Additionally, he has formed new relationships 🤝 and encountered a new character 🧙‍♂️. As Arwen steps deeper into the Mystic Forest 🌲, dark clouds gather overhead, signaling a sudden change in weather ⛈️. He hears a distant cry for help 📢 and notices an ominous cave 🕳️ nearby. ⚠️ The choices he makes now will shape the journey ahead 🔮.",
            "environment": {
                "place": "Forest",
                "weather": "Rain",
                "daytime": "Afternoon",
                "mood": "Mysterious"
            },
            "steps": [
                {
                    "id": 1,
                    "description": "Arwen rushes toward the source of the cry for help ⚡.",
                    "risk_level": "high",
                    "time_estimate": "30 minutes"
                },
                {
                    "id": 2,
                    "description": "Arwen decides to investigate the cave entrance 🕳️ for potential danger.",
                    "risk_level": "medium",
                    "time_estimate": "20 minutes"
                },
                {
                    "id": 3,
                    "description": "Arwen seeks shelter from the approaching storm ⛈️ and evaluates his inventory 🎒.",
                    "risk_level": "low",
                    "time_estimate": "15 minutes"
                },
                {
                    "id": 4,
                    "description": "⚔️ Arwen uses his skills to prepare for the challenges ahead, training with his sword 🗡️ in the clearing.",
                    "risk_level": "low",
                    "time_estimate": "10 minutes"
                }
            ],
            "outcome": {
                "new_grounds": [
                    {
                        "id": 2,
                        "name": "Goblin Cave",
                        "description": "A dark, foreboding cave where goblins reside.",
                        "added_at": "123-12-28T12:45:00"
                    }
                ],
                "new_locations": [
                    {
                        "id": 2,
                        "name": "Cave Entrance",
                        "grounds_id": 2,
                        "description": "The ominous entrance to the Goblin Cave.",
                        "added_at": "123-12-28T12:45:00"
                    }
                ],
                "new_events": [
                    {
                        "id": 2,
                        "quest_giver_id": 3,
                        "name": "Research the Goblin Cave or leave",
                        "description": "Explore the depths of the Goblin Cave and uncover its secrets.",
                        "current_amount": 0,
                        "target_amount": 10,
                        "completion_percentage": 0,
                        "is_active": "true",
                        "started_at": "123-12-28T11:45:00",
                        "ended_at": ""
                    }
                ],
                "new_weather": {
                    "id": 2,
                    "name": "Stormy",
                    "emoji": "⛈️",
                    "description": "A sudden storm with heavy rain and strong winds.",
                    "min_temperature": 15,
                    "max_temperature": 25,
                    "added_at": "123-12-28T13:30:00",
                    "ended_at": ""
                },
                "new_items": [
                    {
                        "id": 3,
                        "name": "Ancient Amulet",
                        "description": "A mystical amulet that enhances magical power.",
                        "item_rarity_id": 2,
                        "item_type_id": 2,
                        "price": 100,
                        "added_at": "123-12-28T12:45:00",
                        "item_stats": [
                            {
                                "id": 2,
                                "item_id": 3,
                                "name": "Magic Power",
                                "value": 15,
                                "added_at": "123-12-28T12:45:00"
                            }
                        ]
                    }
                ],
                "new_item_types": [
                    {
                        "id": 2,
                        "name": "Accessory",
                        "emoji": "💍",
                        "added_at": "123-12-28T09:30:00"
                    }
                ],
                "new_skills": [
                    {
                        "id": 2,
                        "name": "Thunder Strike",
                        "emoji": "⚡",
                        "skill_type_id": 1,
                        "skill_level": 1,
                        "skill_mana_cost": 10,
                        "skill_health_cost": 0,
                        "skill_stamina_cost": 15,
                        "success_chance": 90,
                        "is_attack": "true",
                        "added_at": "123-12-28T12:50:00"
                    }
                ],
                "new_characters": [
                    {
                        "id": 2,
                        "name": "Dan",
                        "gender": "male",
                        "race_id": 2,
                        "age": 25,
                        "level": 1,
                        "language_id": 1,
                        "current_experience": 0,
                        "next_level_experience": 100,
                        "current_health": 50,
                        "current_mana": 20,
                        "current_stamina": 30,
                        "max_health": 50,
                        "max_mana": 30,
                        "max_stamina": 40,
                        "description": "A young human warrior.",
                        "is_player": "false",
                        "is_enemy": "false",
                        "is_dead": "false",
                        "added_at": "123-12-27T18:30:00"
                    }
                ],
                "new_relationships": [
                    {
                        "id": 2,
                        "name": "Protector",
                        "emoji": "🛡️",
                        "description": "A bond forged through mutual respect and courage.",
                        "added_at": "123-12-28T12:55:00"
                    }
                ],
                "new_relationships_rel": [
                    {
                        "id": 2,
                        "relationship_id": 2,
                        "character_id": 2,
                        "target_character_id": 1,
                        "added_at": "123-12-28T12:55:00",
                        "ended_at": ""
                    }
                ],
                "character_stats": [
                    {
                        "id": 1,
                        "character_id": 1,
                        "experience_gained": 50,
                        "level_gained": 1,
                        "health_remaining": 40,
                        "mana_remaining": 30,
                        "stamina_remaining": 30,
                        "new_level_stats": {
                            "current_health": 50,
                            "current_mana": 40,
                            "current_stamina": 35,
                            "max_health": 60,
                            "max_mana": 40,
                            "max_stamina": 40,
                            "next_level_experience": 200
                        }
                    }
                ],
                "time_spent": {
                    "minutes": 30,
                    "updated_game_date": "123-12-28T13:30:00"
                }
            }
        },
    }

    const [recievedData, setRecievedData] = useState({});
    const [inventory, setInventory] = useState({});
    const [characters, setCharacters] = useState({});
    const [skills, setSkills] = useState({});
    const [party, setParty] = useState({});
    const [events, setEvents] = useState({});
    const [locations, setLocations] = useState({});
    const [grounds, setGrounds] = useState({});
    const [worldChooses, setWorldChooses] = useState({});
    const [worldHistory, setWorldHistory] = useState({});
    const [worldStatus, setWorldStatus] = useState({});
    const [charactersRelationships, setCharactersRelationships] = useState({});
    const [newData, setNewData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputData, setInputData] = useState("");

    const [currentSettingPlayer, setCurrentSettingPlayer] = useState("");
    const [playStatus, setPlayStatus] = useState("stop");

    const handleFetchData = async (dataToSend = {}) => {
        setLoading(true);

        // Set the default sound to play
        const defaultSoundUrl = findMatchingSound(soundMap, { place: "default", weather: "default", daytime: "default", mood: "default" });
        setCurrentSettingPlayer(defaultSoundUrl);
        setPlayStatus("play");

        setError(null);
        try {
            const result = await fetchData(dataToSend);
            setRecievedData(result);

            setNewData({
                ...result,
                user_data: {
                    custom_prompt: inputData,
                    choosed_step: [],
                },
            });

            console.log(result);


            //set inventory data with the items from the result by item_id relation
            const newInventory = result.main_data.inventory.reduce((acc, item) => {
                const itemData = result.main_data.items.find((i) => i.id === item.item_id);
                //if item not found, skip
                if (!itemData) {
                    return acc;
                }

                //get item status
                const itemStatus = result.main_data.item_status.find((i) => i.id === item.status_id);

                //add character name to the item data
                const characterData = result.main_data.characters.find((i) => i.id === item.character_id);
                //get item rarity
                const itemRarity = result.main_data.item_rarity.find((i) => i.id === itemData.item_rarity_id);
                //get item type
                const itemType = result.main_data.item_type.find((i) => i.id === itemData.item_type_id);
                //create group of items by character name
                if (!acc[characterData.name]) {
                    acc[characterData.name] = [];
                }

                //add item to the group
                acc[characterData.name].push({
                    ...itemData,
                    status: itemStatus?.name || "Unknown",
                    status_color: itemStatus?.color || "#000000",
                    quantity: item.quantity,
                    is_equipped: item.is_equipped,
                    rarity: itemRarity?.name || "Unknown",
                    rarity_emoji: itemRarity?.emoji || "❓",
                    type: itemType?.name || "Unknown",
                    type_emoji: itemType?.emoji || "❓",
                });

                return acc;
            }, {});


            //  console.log(newInventory);

            //set inventory data
            setInventory({ ...newInventory });


            //set characters data with language and race name according to the id
            const newCharacters = result.main_data.characters.reduce((acc, character) => {
                //get character language
                const characterLanguage = result.main_data.language.find((i) => i.id === character.language_id);
                // get character race
                const characterRace = result.main_data.race.find((i) => i.id === character.race_id);
                // get character class
                const characterClass = result.main_data.class.find((i) => i.id === character.class_id);
                // get character skills
                const characterSkills = result.main_data.character_skills_list_rel.filter((i) => i.character_id === character.id);
                // get character skills data
                const characterSkillsData = characterSkills.map((i) => result.main_data.skills.find((s) => s.id === i.skill_id));
                // get character status
                const characterStatus = result.main_data.character_status_rel.find((i) => i.character_id === character.id);
                // get character status data
                const characterStatusData = result.main_data.character_status_dict.find((i) => i.id === characterStatus?.status_id);
                // get skills effects
                const characterSkillsEffects = result.main_data.skill_effects_rel.filter((i) => characterSkills.map((s) => s.id).includes(i.skill_id));
                // get character inventory data from the newInventory
                const characterInventory = newInventory[character.name] || [];

                // add skills effects to the character skills data
                characterSkillsData.forEach((skill) => {
                    skill.effects = characterSkillsEffects
                        .filter((i) => i.skill_id === skill.id)
                        .map((i) => result.main_data.skill_effects.find((s) => s.id === i.effect_id));
                    skill.type = result.main_data.skills_type.find((i) => i.id === skill.skill_type_id).name;
                });

                //add character to the group
                acc[character.name] = {
                    ...character,
                    language: characterLanguage?.name || "Unknown",
                    race: characterRace?.name || "Unknown",
                    skills: characterSkillsData,
                    status: characterStatusData?.name || "Unknown",
                    status_emoji: characterStatusData?.emoji || "❓",
                    status_reason: characterStatus?.reason || "Unknown",
                    inventory: characterInventory,
                    class: characterClass?.name || "Unknown",
                    class_emoji: characterClass?.emoji || "❓",
                };

                return acc;
            }
                , {});


            console.log(newCharacters);

            //set characters data
            setCharacters({ ...newCharacters });


            // get world status data
            const newWorldStatus = result.main_data.current_world_status;
            // get current weather data
            const currentWeather = result.main_data.weather.find((i) => i.id === newWorldStatus.weather_id);
            // get current grounds data
            const currentGrounds = result.main_data.grounds.find((i) => i.id === newWorldStatus.gorunds_id);
            // get current location data
            const currentLocation = result.main_data.locations.find((i) => i.id === newWorldStatus.location_id);
            // get current event data
            const currentEvent = result.main_data.events.find((i) => i.id === newWorldStatus.event_id);

            //get event data
            const eventQuestGiver = result.main_data.characters.find((i) => i.id === currentEvent.quest_giver_id);
            const eventReward = result.main_data.events_reward.find((i) => i.event_id === currentEvent.id);
            const eventRewardItem = result.main_data.items.find((i) => i.id === eventReward?.item_id);
            const eventLocation = result.main_data.locations.find((i) => i.id === currentEvent.location_id);
            const eventGrounds = result.main_data.grounds.find((i) => i.id === currentEvent.grounds_id);

            //add event data to the current event
            currentEvent.quest_giver = eventQuestGiver;
            currentEvent.location = eventLocation;
            currentEvent.grounds = eventGrounds;
            currentEvent.reward = {
                ...eventReward,
                item: eventRewardItem,
            };

            // add current grounds, location and event to the world status data
            newWorldStatus.grounds = currentGrounds;
            newWorldStatus.location = currentLocation;
            newWorldStatus.event = currentEvent;

            // set world status data
            setWorldStatus({
                ...newWorldStatus,
                weather: currentWeather,
            });

            // set world history data
            setWorldHistory(result.main_data.current_world_history);

            //set choosed steps data
            setWorldChooses(result.main_data.current_world_chooses);


            //set characters relationship data
            const newCharactersRelationships = result.main_data.character_relationship_rel.reduce((acc, relationship) => {
                //get relationship data
                const relationshipData = result.main_data.character_relationship.find((i) => i.id === relationship.relationship_id);
                //get character data
                const characterData = result.main_data.characters.find((i) => i.id === relationship.character_id);
                //get target character data
                const targetCharacterData = result.main_data.characters.find((i) => i.id === relationship.target_character_id);

                //add relationship to the group
                if (!acc[characterData.name]) {
                    acc[characterData.name] = [];
                }

                acc[characterData.name].push({
                    ...relationshipData,
                    target_character:{
                        id: targetCharacterData.id, // Include only the ID to avoid circular reference
                        name: targetCharacterData.name, // Add other essential fields if needed
                    },
                });

                return acc;
            }

                , {});

            //set characters relationship data
            setCharactersRelationships({ ...newCharactersRelationships });


            //get party members data
            const newParty = result.main_data.party_members.reduce((acc, partyMember) => {
                //get party member character data
                const partyMemberData = result.main_data.characters.find((i) => i.id === partyMember.character_id);

                //get patry member relationship data from charactersRelationships
                const partyMemberRelationships = newCharactersRelationships[partyMemberData.name] || [];

                //add party member relationships to the party member data
                partyMemberData.relationships = partyMemberRelationships;

                //joined date
                partyMemberData.joined_at = partyMember.added_at;

                //add party member to the group
                acc[partyMemberData.name] = partyMemberData;

                return acc;
            }, {});

            //set party members data
            setParty({
                ...newParty,
            });

            //set events data
            const newEvents = result.main_data.events.reduce((acc, event) => {
                //get quest giver data
                const questGiverData = result.main_data.characters.find((i) => i.id === event.quest_giver_id);
                //get event reward data
                const eventRewardData = result.main_data.events_reward.find((i) => i.event_id === event.id);
                //get event reward item data
                const eventRewardItemData = result.main_data.items.find((i) => i.id === eventRewardData?.item_id);

                //add event to the group
                acc[event.name] = {
                    ...event,
                    quest_giver: questGiverData,
                    reward: {
                        ...eventRewardData,
                        item: eventRewardItemData,
                    },
                };

                return acc;
            }, {});

            //set events data
            setEvents({ ...newEvents });


            //set sounds for the current environment
            const soundUrl = findMatchingSound(soundMap, result.generator_response_data.environment);
            if (soundUrl) {
                setCurrentSettingPlayer(soundUrl);
                setPlayStatus("play");
            } else {
                console.warn("No matching sound found for the current environment.");
                setPlayStatus("stop");
            }

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStepClick = (step) => {
        const { generator_response_data, logs, ...restData } = newData;

        const updatedData = {
            ...restData,
            user_data: {
                ...newData.user_data,
                choosed_step: [
                    {
                        id: step.id,
                        description: step.description,
                        risk_level: step.risk_level,
                        time_estimate: step.time_estimate,
                    },
                ],
            },
            prev_generator_response_data: generator_response_data,
        };

        setNewData(updatedData);
        handleFetchData(updatedData);
    };

    useEffect(() => {
        console.log("Updated inventory:", inventory);
    }, [inventory]);

    // Play the sound for the updated environment
    useEffect(() => {
        if (recievedData?.generator_response_data?.environment) {
            const soundUrl = findMatchingSound(soundMap, recievedData.generator_response_data.environment);
            if (soundUrl) {
                console.log("Setting sound for updated environment:", soundUrl);
                setCurrentSettingPlayer(soundUrl);
                setPlayStatus("play");
            } else {
                console.warn("No matching sound found for the updated environment.");
                setPlayStatus("stop");
            }
        }
    }, [recievedData]);

    return (
        <div className="container">
            <Header inputData={inputData} setInputData={setInputData} onInit={() => handleFetchData()} />

            {loading && <Loader message="Loading..." />}
            {error && <ErrorMessage error={error} />}

            <Story prompt={recievedData?.generator_response_data?.prompt} />

            <StepButtons
                steps={recievedData?.generator_response_data?.steps || []}
                onStepClick={handleStepClick}
            />

            <World worldStatus={worldStatus} worldHistory={worldHistory} worldChooses={worldChooses} />

            <Characters characters={characters} />

            <Party partyMembers={party} />

            {playStatus === "play" && <EnvironmentSoundPlayer url={currentSettingPlayer} play={playStatus} />}

            <Logs logs={recievedData?.logs} />
        </div>
    );
}

export default Home;
