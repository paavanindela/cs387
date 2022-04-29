from this import d
import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
import argparse,psycopg2 as pg,csv,os
from psycopg2 import extras
import time

bucket = 'PROJECT'
org= 'DBIS'
token = 'xtCBDq4AwKb1tAm9ns46dti2g-9oPct_VaUdg1x_akJEXehxD1mvHo_EvjgoBaY39dDLUSW-WTyJfCTJXJzx5A=='
url = 'http://10.9.70.125:8086/'

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
    
    metric = "usage_system"
    threshold = 0
    
    # define the flux query to check whether the value is greater than threshold or not 
    query = 'from(bucket: "'+bucket+'")\
        |> range(start:-5m)\
        |> filter(fn: (r) => r["_field"] == "'+metric+'")\
        |> filter(fn: (r) => r["_value"] >= '+str(threshold)+')\
        |> last()'
    result = query_Api.query(org=org, query=query)
    
    results = []
    for table in result:
        for record in table.records:
            db = record.values.get("db")
            host = record.values.get("host")
            cpu = record.values.get("cpu")
            ti = record.get_time()
            val = record.get_value()
            dict = {
                    "db": db,
                    "host": host,
                    "cpu": cpu,
                    "time": str(ti),
                    "value": round(val,2)
                }
            #  erase fields that are none 
            if (db is None):
                dict.pop("db")
            if (host is None):
                dict.pop("host")
            if (cpu is None):
                dict.pop("cpu")
            results.append(str(dict))
    message = "\n".join(results)
    print(message)
    
    # get derivate using another influx query to do predictive analysis
    
    
    # finally insert the metrics into our database and log the sql query
    
    break
    
cur.close()
conn.commit()
conn.close()