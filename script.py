import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
import argparse,psycopg2 as pg,csv,os
from psycopg2 import extras
import time


bucket = 'PROJECT'
org= 'DBIS'
token = 'xtCBDq4AwKb1tAm9ns46dti2g-9oPct_VaUdg1x_akJEXehxD1mvHo_EvjgoBaY39dDLUSW-WTyJfCTJXJzx5A=='
url = 'http://localhost:8086/'

client = influxdb_client.InfluxDBClient(
    url = url,
    token = token,
    org = org
)
query_Api = client.query_api()
conn = pg.connect(
         dbname = 'project',
            user = 'postgres',
            password = 'password',
            host = 'localhost',
            port = 5433
        )
# except Exception as e:
#     print(e)
cur = conn.cursor()   
while(True):
    #  get metrics from alert metrics on postgres
    cur.execute("SELECT * FROM threshold")
    rows = cur.fetchall()
    # for each row in alert_metrics
    for row in rows:
        controller = row[0]
        host = row[1]
        metric = row[2]
        threshold = 0
        print(controller,host,metric,threshold)
        # define the flux query to check whether the value is greater than threshold or not 
        query = f'''from(bucket: "{bucket}")
            |> range(start:-5m)
            |> filter(fn: (r) => r["_field"] == "{metric}")
            |> filter(fn: (r) => r["_value"] >= {threshold})
            |> filter(fn: (r) => r["host"] == "{host}")
            |> last()'''
            
        result = query_Api.query(org=org, query=query)
        
        results = []
        for table in result:
            for record in table.records:
                db = record.values.get("db")
                app = record.values.get("_measurement")
                ti = record.get_time()
                val = record.get_value()
                dict = {
                        "db": db,
                        "host": host,
                        "application": app,
                        "time": str(ti),
                        "value": round(val,2)
                    }
                #  erase fields that are none 
                if (db is None):
                    dict.pop("db")
                if (host is None):
                    dict.pop("host")
                if (app is None):
                    dict.pop("application")
                results.append(str(dict))
        if(results!=[]):
            message = "".join(str(results))
            print(message)
            cur.execute("INSERT INTO MESSAGE (message,type) VALUES (%s)",(message,0))
        conn.commit()
        # get derivate using another influx query to do predictive analysis

        prediction_query = f'''from(bucket: "{bucket}")\
            |> range(start:-5m)\
            |> filter(fn: (r) => r["_field"] == "{metric}")\
            |> filter(fn: (r) => r["host"] >= "{host}")\
            |> derivative(unit: 1s,  nonNegative: true, columns: ["_value"], timeColumn: "_time")\
            |> tail(n,1)\
            '''

        prediction_result = query_Api.query(org=org, query=prediction_query)
        
        print(prediction_query)
        # finally insert the metrics into our database and log the sql query
    
    time.sleep(120)
    
cur.close()
conn.commit()
conn.close()