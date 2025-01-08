import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from init_data import init_json_structure
from user_data_generator import user_data_json

# Load environment variables from .env file
load_dotenv()

client = OpenAI(api_key=os.getenv("API_KEY"))

def generate_story(input_data):
    #check if the input data is empty use initial data json
    if not input_data:
        input_data = user_data_json

    """
    Generate the next part of the story based on input JSON data.
    """


    # user_prompt = (
    #     f"Here is the **current game state**: {json.dumps(input_data, indent=2)}.\n\n"
    #     "You should generate new story content in `generator_response_data` based on **current game state** and the user's **choosed_step**.\n\n"
    #     "Notes:\n"
    #     " - `prev_generator_response_data` contains the story and possible steps list from the **previous steps**.\n"
    #     " - `main_data` represents the current state of the game, updated with `outcome` from previous steps.\n"
    #     " - `user_data.choosed_step` is the user-selected action from the `prev_generator_response_data.steps`.\n"
    #     "Guidelines:\n"
    #     " - Ensure all new updates described in `generator_response_data.outcome` are merged into `main_data` under their respective sections.\n"
    #     " - `generator_response_data.prompt` should narrate the consequences of the `choosed_step`, preparing for the next steps.\n"
    #     " - `generator_response_data.steps` should offer logical continuations based on the resolved `choosed_step`.\n"
    #     " - You must ONLY resolve the step specified in `user_data.choosed_step.id`. No content or updates from other steps in `prev_generator_response_data.steps` or `generator_response_data.steps` should influence or subsequent story.\n"
    #     " - Validate the consistency of your output JSON and ensure it matches the structure and logic of `main_data`.\n"
    #     " - Provide a 'logs' section summarizing all updates that applied to the 'main_data'.\n\n"
    # )

    user_prompt = (
        f"Here is the **current game state**: {json.dumps(input_data, indent=2)}.\n\n"
        "You should generate new story content in `generator_response_data` based on **current game state** and the user's **choosed_step**.\n\n"
        "Notes:\n"
        " - `prev_generator_response_data` contains the story and possible steps list from the **previous steps**.\n"
        " - `main_data` represents the current state of the game, updated with `outcome` from previous steps.\n"
        " - `user_data.choosed_step` is the user-selected action from the `prev_generator_response_data.steps`.\n"
        "Guidelines:\n"
        " - Ensure all new updates included in `generator_response_data.outcome` are merged into `main_data` under their respective sections.\n"
        " - `generator_response_data.prompt` should narrate the consequences of the `choosed_step`, preparing for the next steps.\n"
        " - `generator_response_data.steps` should offer logical continuations based on the resolved `choosed_step`, tailored to the current environment, character stats, and known skills or items.\n"
        " - Introduce variability and dynamic world-building by reflecting the impact of weather, relationships, and ongoing quests in the prompt and steps.\n"
        " - Add subtle hints of character growth or progression (e.g., relationship changes, new abilities unlocked) without resolving future steps.\n"
        " - Include emotional and environmental details in the narrative to immerse the user, referencing world state (weather, time of day, etc.) from `main_data`.\n"
        " - Always ensure potential next steps consider the risk level, the characters available resources, and possible randomness for success.\n"
        " - You must ONLY resolve the step specified in `user_data.choosed_step.id`. No content or updates from other steps in `prev_generator_response_data.steps` or `generator_response_data.steps` should influence subsequent story.\n"
        " - Validate the consistency of your output JSON and ensure it matches the structure and logic of `main_data`.\n"
        " - Provide a 'logs' section summarizing all updates that applied to the 'main_data', with clear reasoning for stat and relationship changes.\n\n"
    )



    system_prompt = (
        "You are a fantasy RPG story generator set in a medieval world of magic.\n\n"
        "We store data in tables matching the following JSON structure:\n"
        f"{json.dumps(init_json_structure, indent=2)}\n\n"

        "### Explanation of main_data sections:\n"
        "- **weather**: Weather entries (e.g., Sunny, Stormy) with start/end timestamps.\n"
        "- **current_world_status**: Tracks current weather_id, overall in-game date (game_date), and start time.\n"
        "- **current_world_history**: A chronological record of key moments and events that shape the world's narrative. It includes concise descriptions of significant occurrences. This history evolves based on user-chosen steps and serves to build a cohesive and immersive storyline.\n"
        "- **grounds**: Large world regions.\n"
        "- **locations**: Points of interest within grounds.\n"
        "- **current_world_chooses**: Logs major user actions/choices.\n"
        "- **language**: Available languages.\n"
        "- **race**: Playable or NPC races (Elf, Human, etc.).\n"
        "- **characters**: All characters (stats, experience, description, etc.).\n"
        "- **skills_type**: Categories of skills (Combat, Magic, etc.).\n"
        "- **skills**: Skill definitions (mana cost, success chance...).\n"
        "- **skill_effects**: Possible effects like Damage, Heal.\n"
        "- **skill_effects_rel**: Links skills to effects.\n"
        "- **character_skills_list_rel**: Which skills each character knows.\n"
        "- **character_relationship**: Relationship types (Friend, Protector...).\n"
        "- **character_relationship_rel**: Actual relationships between characters.\n"
        "- **character_status_dict**: Possible statuses (Healthy, Poisoned...).\n"
        "- **character_status_rel**: A character's current status + reason.\n"
        "- **item_rarity**: Rarity definitions (Common, Rare...).\n"
        "- **item_type**: Categories (Weapon, Accessory...).\n"
        "- **item_status**: Condition of an item (New, Broken...).\n"
        "- **items**: The item definitions.\n"
        "- **inventory**: Which items each character holds.\n"
        "- **party_members**: Who is in the hero's party.\n"
        "- **events**: Quests or missions (progress, is_active, etc.).\n"
        "- **events_reward**: Rewards for completing events.\n"
        "- **journey**: Tracks the user's progression and steps.\n\n"

        "### Output Requirements:\n"
        "Your output must be valid JSON with:\n"
        "1) `generator_response_data`: The next story prompt, new steps, and the outcome based on the selected `choosed_step`.\n\n"
        "   - 'generator_response_data.prompt': A short narrative for the chosen step only from `user_data.choosed_step`.\n"
        "   - 'generator_response_data.steps': Potential next actions (description, risk_level, time_estimate).\n"
        "   - 'generator_response_data.outcome': Newly added/updated entities (grounds, locations, events, weather, items, item_types, skills, characters, relationships, etc.), stat changes, time progression from the chosen step.\n"
        "2) `main_data`: The updated snapshot of the entire game world based on new outcome.\n"

        "### Instructions for Outcome Generation:\n"
        "1. Reflect ONLY the consequences of the user's selected `choosed_step` from `user_data`. Do NOT include or resolve:\n"
        "   - Future actions.\n"
        "   - Unchosen steps from `prev_generator_response_data.steps`.\n\n"
        "2. `generator_response_data.outcome` must:\n"
        "   - Focus exclusively on the selected step.\n"
        "   - Avoid assumptions or resolving anything outside the `choosed_step` scope.\n"
        "   - Describe updates strictly related to the chosen action.\n\n"

        "### Validation Rules:\n"
        "1. Ensure all 'outcome.new_*' entities are added to 'main_data' under their respective sections (Example: `outcome.new_characters` to characters, `outcome.new_skill`s to `skills`, etc.).\n"
        "2. Apply 'outcome.time_spent.updated_game_date' to 'main_data.current_world_status.game_date'.\n"
        "3. Update 'journey[].step_number' by incrementing it by 1.\n"
        "4. Update character stats, inventory, relationships, and other sections as described in new 'outcome'.\n"
        "5. Check that 'logs' match the actual changes in the 'main_data'.\n"
        "6. Avoid duplication of data (e.g., duplicate characters, items, or events).\n"

        # "### Instructions for Narrative Generation:\n"
        # "1. Use 'prev_generator_response_data.prompt' as context to create a cohesive story continuation.\n"
        # "2. Reflect the user's `choosed_step.description` in the new narrative.\n"
        # "3. Ensure that only the selected `choosed_step` is resolved in the `outcome.description`.\n"
        # "4. Keep the tone consistent with a medieval fantasy world.\n"
        # "5. Avoid referencing unused steps or resolving anything beyond the user's choice.\n"

        "### Instructions for Narrative Generation:\n"
        "1. Use 'prev_generator_response_data.prompt' as context to create a cohesive story continuation.\n"
        "2. Reflect the user's `choosed_step.description` in the new narrative.\n"
        "3. Ensure that only the selected `choosed_step` is resolved in the `outcome.description`.\n"
        "4. Include emotional responses, environmental details, and relationship dynamics in the narrative to deepen immersion.\n"
        "5. Add emojis, sounds, or other sensory details to enhance the user's experience.\n"
        "6. Tailor the narrative to reflect the characters current health, stamina, mana, and relationships from `main_data`.\n"
        "7. Keep the tone consistent with a medieval fantasy world, with natural transitions between resolved steps and new challenges.\n"
        "8. Add hooks or unresolved elements (e.g., 'Arwen notices a strange emblem on the travelers robe') to enhance story depth while avoiding resolution of future steps.\n"

        # "### Instructions for main_data Updates:\n"
        # "1. Merge 'outcome.new_*' entries into 'main_data'.\n"
        # "2. Increment 'journey[].step_number'.\n"
        # "3. Update 'main_data.current_world_status.game_date' with 'outcome.time_spent.updated_game_date'.\n"
        # "4. Reflect all stat changes (e.g., experience, health, mana) in characters.\n"
        # "5. Reflect user `choosed_step` in 'current_world_chooses'.\n"
        # "6. Ensure all updates described in 'logs' are applied to 'main_data'.\n\n"

        "### Instructions for main_data Updates:\n"
        "1. Merge 'outcome.new_*' entries into 'main_data'.\n"
        "2. Increment 'journey[].step_number'.\n"
        "3. Update 'main_data.current_world_status.game_date' with 'outcome.time_spent.updated_game_date'.\n"
        "4. Reflect all stat changes (e.g., experience, health, mana) in characters, providing reasoning for these updates in the logs.\n"
        "5. Dynamically update `current_world_chooses` with concise descriptions of major actions, including emotional or relationship impacts.\n"
        "6. Ensure all weather or environmental changes are logged in `main_data.weather` and referenced in narrative prompts.\n"
        "7. Adjust risk levels, time estimates, and subsequent step suggestions based on world state and the character's capabilities.\n"
        "8. Reflect user `choosed_step` in 'current_world_chooses' with a clear connection to the ongoing story.\n"
        "9. Include any relationship progression or setbacks in 'character_relationship_rel' based on recent events.\n"
        "10. Ensure all updates described in 'logs' are applied to 'main_data', adding detailed justifications where applicable.\n\n"

        "Important Notes:\n"
        " - Never include 'prev_generator_response_data' in the final output.\n"
        " - Resolve only the user's chosen step.\n"
        " - Always validate the consistency of your output JSON."
    )

    

    try:
        chat_completion = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type":"json_object"},
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user", 
                    "content": user_prompt
                },
            ],
        )

        # Extract the generated message content
        finish_reason = chat_completion.choices[0].finish_reason
        if(finish_reason == "stop"):
            data = chat_completion.choices[0].message.content
            # Convert the content to JSON
            return json.loads(data)
        else:
            return {"error": "Generation incomplete. Try increasing tokens or re-check the model prompt."}
    except Exception as e:
        return {"error": str(e)}
