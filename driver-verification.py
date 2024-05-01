import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()  # Load the .env file

def connect_to_db():
    """Connect to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            dbname=os.environ['DATABASE'],
            user=os.environ['USER_DB_NAME'],
            password=os.environ['DATABASE_PASS'],
            host=os.environ['HOST_NAME']
        )
        print("Connected to database.")
        return conn
    except psycopg2.Error as e:
        print(e)
        return None

def verify_drivers():
    """Verify drivers based on data in OCR table."""
    conn = connect_to_db()
    if conn is not None:
        try:
            cur = conn.cursor()

            # Retrieve records from OCR table
            cur.execute("SELECT * FROM ocr")
            ocr_records = cur.fetchall()

            for record in ocr_records:
                driver_licno = record[1]
                driver_licesp = record[2]
                driver_photo = record[3]

                # Locate corresponding record in drivers table based on driver_photo
                cur.execute("SELECT * FROM drivers WHERE driver_photo = %s", (driver_photo,))
                driver_record = cur.fetchone()

                if driver_record and not driver_record[8]:  # Check if driver_verified is False
                    # Compare driver_licno and driver_licesp with values from drivers table
                    if driver_record[3] == driver_licno and driver_record[6] == driver_licesp:
                        # Update driver_verified field to True
                        cur.execute("UPDATE drivers SET driver_verified = TRUE, driving_hrs=0 WHERE driver_photo = %s", (driver_photo,))
                        print("Driver was Verified! Now the driver can be assigned trips.")
                    else:
                        # Update driver_verified field to False
                        cur.execute("UPDATE drivers SET driver_verified = FALSE WHERE driver_photo = %s", (driver_photo,))
                        print("Driver verification Unsuccessful for driver with photo:", driver_photo)
                elif driver_record:
                    print("Driver with photo:", driver_photo, "has already been verified.")

            # Commit the changes
            conn.commit()
            print("Driver verification completed.")

        except psycopg2.Error as e:
            print(e)
        finally:
            # Close cursor and connection
            cur.close()
            conn.close()
            print("Connection closed.")
    else:
        print("Failed to connect to the database.")


if __name__ == "__main__":
    verify_drivers()
