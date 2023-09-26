#!/usr/bin/python3
import psycopg2
from psycopg2 import sql
import uuid
#from psycopg2.extensions import Point
#from django.contrib.gis.geos import Point

# Database connection parameters
db_params = {
        'host': 'localhost',      # Change to your database host
        'database': 'mapty',      # Change to your database name
        'user': 'dennis',  # Change to your database username
        'password': 'dkamau476'  # Change to your database password
        }

# Sample data to insert
data_to_insert = [
        {
            'id': str(uuid.uuid4()),
            'coords_start': (-1.2824, 36.8089),  # Replace with your coordinates
            'coords_end': (-1.2870, 36.8123),    # Replace with your coordinates
            'name': 'Uhuru Park',        # Replace with your location name
            'type': 'running'        # Replace with your location name
            },
        {
            'id': str(uuid.uuid4()),
            'coords_start': (-1.2674, 36.8112),
            'coords_end': (-1.2697, 36.8128),
            'name': 'Arboretum Park',
            'type': 'cycling'
            }
        ]

# SQL statement to insert data
insert_sql = sql.SQL("""
    INSERT INTO v1_demo (id, coords_start, coords_end, name, type)
    VALUES (%s, ST_MakePoint(%s, %s), ST_MakePoint(%s, %s), %s, %s)
    """)

try:
    # Establish a connection to the database
    connection = psycopg2.connect(**db_params)

    # Create a cursor object
    cursor = connection.cursor()

    # Insert each record into the table
    for record in data_to_insert:
        cursor.execute(insert_sql, (
            record['id'],
            record['coords_start'][0],
            record['coords_start'][1],
            record['coords_end'][0],
            record['coords_end'][1],
            record['name'],
            record['type']
        ))

    # Commit the transaction
    connection.commit()

    print("Data inserted successfully!")

except (Exception, psycopg2.DatabaseError) as error:
    print("Error:", error)

finally:
    # Close the cursor and connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()

