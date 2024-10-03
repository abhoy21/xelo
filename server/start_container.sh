#!/bin/bash

# Function to generate a random username
generate_random_username() {
    # Define an array of names
    names=("shadow_hunter" "moon_samurai" "neon_ninja" "crimson_blade" "starlight_priest" "void_emperor" "phoenix_knight" "chaos_summoner" "demon_fang" "thunder_senshi" "serene_sorceress" "mystic_wolf" "frost_ranger" "blaze_dragoon" "wind_assassin" "celestial_guardian" "spirit_slinger" "silver_samurai" "midnight_scholar" "cyber_exorcist" "flame_ronin" "cosmic_wanderer" "dragon_lancer" "vortex_archer" "eternal_shogun")

    
    # Pick a random name from the array
    random_name=${names[RANDOM % ${#names[@]}]}
    
    # Generate a random number between 1 and 1000
    random_number=$((RANDOM % 1000 + 1))
    
    # Combine name and number to create a username
    echo "${random_name}${random_number}"
}

# Generate a random username for the container
USER_NAME=$(generate_random_username)
CONTAINER_NAME="user_container_$USER_NAME"

# Check if container already exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Container already running for $USER_NAME"
else
    # Run a new container for the user
    echo "Starting new container: $CONTAINER_NAME"
    docker-compose up -d --name $CONTAINER_NAME
fi