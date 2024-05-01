import openpyxl
import psycopg2
from dotenv import load_dotenv
import os
import datetime

load_dotenv()  # Load the .env file

# Load the Excel file
wb = openpyxl.load_workbook('C:/Users/Neel Amarnath Mulik/Downloads/license_det.xlsx')
sheet = wb.active

# Connect to the database
conn = psycopg2.connect(
    dbname=os.environ['DATABASE'],
    user=os.environ['USER_DB_NAME'],
    password=os.environ['DATABASE_PASS'],
    host=os.environ['HOST_NAME']
)
cur = conn.cursor()

# Create the table if it doesn't exist
create_table_stmt = """
    CREATE TABLE IF NOT EXISTS ocr (
        driver_name VARCHAR(255),
        driver_licno VARCHAR(255),
        driver_licesp DATE,
        driver_photo VARCHAR(255)
    );
"""
cur.execute(create_table_stmt)

# Iterate through each row in the sheet, skipping the header row
for i, row in enumerate(sheet.iter_rows(values_only=True)):
    if i == 0:
        continue

    # Check if the record already exists based on driver_licno or driver_photo
    cur.execute("SELECT COUNT(*) FROM ocr WHERE driver_licno = %s OR driver_photo = %s", (row[1], "uploads\\" + row[3]))
    existing_count = cur.fetchone()[0]

    if existing_count == 0:  # Record doesn't exist, insert it
        # Use the date string as it is
        date_string = row[2]
        image_path = "uploads\\" + row[3]

        # Insert the data into the database
        insert_stmt = "INSERT INTO ocr (driver_name, driver_licno, driver_licesp, driver_photo) VALUES (%s, %s, %s, %s)"
        cur.execute(insert_stmt, (row[0], row[1], date_string, image_path))
    else:
        print("Record already exists, skipping insertion.")

# Commit the changes
conn.commit()

# Close the resources
cur.close()
conn.close()
