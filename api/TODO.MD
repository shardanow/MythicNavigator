[] Save generated response data to DB according to needed blocks and tables where check for existing data.
[] Get data fetched from DB and place it into prev_generator_response_data according resbonsible blocks:
    - For example last 10 records for previous steps
    - Characters list with stats and data
    - Characters skills
    - Characters inventory
    - Current group members
    - Current characters relations
    - Current events
    - Current World history
[] Rebuild response data JSON according to needed blocks and tables where remove unnecessary data that could be calculated on client side.