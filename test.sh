#!/bin/bash

collection_path="./tps.json"
duration=1  # Duration in seconds
concurrent_requests=200

end_time=$((SECONDS + duration))

while [ $SECONDS -lt $end_time ]; do
    # Launch multiple Newman instances in the background
    for ((i=1; i<=$concurrent_requests; i++)); do
        newman run "$collection_path" &
    done

    wait
done