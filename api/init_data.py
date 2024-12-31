init_json_structure = {
    "main_data": {
        "weather": [
            {
                "id": 1,
                "name": "Sunny",
                "description": "A bright and sunny day with clear skies.",
                "min_temperature": 20,
                "max_temperature": 30,
                "added_at": "123-12-28T09:00:00",
                "ended_at": "123-12-28T12:00:00"
            },
            {
                "id": 2,
                "name": "Stormy",
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
                "name": "Goblin Cave",
                "description": "A dark, foreboding cave where goblins reside.",
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
        "characters": [
            {
                "id": 1,
                "name": "Arwen",
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
                "added_at": "123-12-27T18:30:00"
            },
            {
                "id": 2,
                "name": "Protector",
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
                "added_at": "123-12-28T09:30:00"
            }
        ],
        "item_type": [
            {
                "id": 1,
                "name": "Weapon",
                "added_at": "123-12-28T09:30:00"
            },
            {
                "id": 2,
                "name": "Accessory",
                "added_at": "123-12-28T09:30:00"
            }
        ],
        "item_status": [
            {
                "id": 1,
                "name": "New",
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
                "name": "Find the Artifact",
                "description": "Locate the lost artifact in the Mystic Forest.",
                "current_amount": 0,
                "target_amount": 1,
                "completion_percentage": 0,
                "is_active": "true",
                "started_at": "123-12-28T09:30:00",
                "ended_at": ""
            },
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
        "events_reward": [
            {
                "id": 1,
                "event_id": 1,
                "item_id": 1,
                "experience": 50,
                "added_at": "123-12-28T09:30:00"
            }
        ],
        "journey": [
            {
                "id": 1,
                "current_event_id": 1,
                "step_number": 1,
                "started_at": "123-12-28T09:30:00",
                "ended_at": ""
            }
        ],
    },
    "generator_response_data": {
        "prompt": "Arwen has the new items and skills that he found due his long trip, new character and relationships. As Arwen steps deeper into the Mystic Forest, dark clouds gather overhead, signaling a sudden change in weather. He hears a distant cry for help and notices an ominous cave nearby. The choices he makes now will shape the journey ahead.",
        "steps": [
            {
                "id": 1,
                "description": "Arwen rushes toward the source of the cry for help.",
                "risk_level": "high",
                "time_estimate": "30 minutes"
            },
            {
                "id": 2,
                "description": "Arwen decides to investigate the cave entrance for potential danger.",
                "risk_level": "medium",
                "time_estimate": "20 minutes"
            },
            {
                "id": 3,
                "description": "Arwen seeks shelter from the approaching storm and evaluates his inventory.",
                "risk_level": "low",
                "time_estimate": "15 minutes"
            },
            {
                "id": 4,
                "description": "Arwen uses his skills to prepare for the challenges ahead, training with his sword in the clearing.",
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
                    "added_at": "123-12-28T09:30:00"
                }
            ],
            "new_skills": [
                {
                    "id": 2,
                    "name": "Thunder Strike",
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