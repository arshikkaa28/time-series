#!/bin/bash
# Description: Deletes metrics older than 30 days from MongoDB

# Database Configuration
DB_NAME="time-series-monitor"
COLLECTION_NAME="metrics"

# Calculate the cutoff date (30 days ago in ISO 8601 format)
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  CUTOFF_DATE=$(date -v-30d -u +"%Y-%m-%dT%H:%M:%SZ")
else
  # Linux
  CUTOFF_DATE=$(date -u -d "30 days ago" +"%Y-%m-%dT%H:%M:%SZ")
fi

echo "Cleaning up data older than $CUTOFF_DATE..."

# Execute MongoDB query to delete old records
mongosh $DB_NAME --eval "
  db.$COLLECTION_NAME.deleteMany({
    timestamp: { \$lt: ISODate('$CUTOFF_DATE') }
  })
"

echo "Cleanup completed."
