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
        threshold = row[3]
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
                #  convert dictionary to key: value pairs
                val = str(dict).replace("'", "")
                results.append(val[1:-1])
        if(results!=[]):
            for message in results:
                print(message)
                cur.execute("INSERT INTO MESSAGE (message,username,type) VALUES (%s,%s,%s)",(message,controller,0))
        conn.commit()
        # get derivate using another influx query to do predictive analysis

        prediction_query = 'from(bucket: "'+bucket+'")\
            |> range(start:-5m)\
            |> filter(fn: (r) => r["_field"] == "'+metric+'")\
            |> filter(fn: (r) => r["host"] == "'+host+'")\
            |> derivative(unit: 1m,  nonNegative: true, columns: ["_value"], timeColumn: "_time")\
            |> tail(n:1)'
            
        prediction_result = query_Api.query(org=org, query=prediction_query)
        
        value_query = 'from(bucket: "'+bucket+'")\
            |> range(start:-5m)\
            |> filter(fn: (r) => r["_field"] == "'+metric+'")\
            |> filter(fn: (r) => r["host"] == "'+host+'")\
            |> tail(n:1)'
            
        value_result = query_Api.query(org=org, query=prediction_query)
        
        mres = [ {} for i in range(prediction_result.__len__())]
        
        tx = 0
        i = 0
        for result in prediction_result: # length 1
            for record in result.records:
                tx = record.get_time()
                mres[i]["_derivative"] = record.get_value()
                mres[i]["_app"] = record.values.get("_measurement")
                i+=1
        i = 0
        for result in value_result: # length 1
            for record in result.records:
                mres[0]["_value"] = record.get_value()
                i+=1
        
        # calculate the likely point in time where threshold = derivative
        List = []
        for res in mres:
            if(res.get("_derivative") is not None and res.get("_derivative") !=0):
                txs = (threshold-res.get("_value"))/res.get("_derivative")
                List.append("At:"+str(tx)+" Host "+host+" is likely to cross the threshold on "+res.get("_app")+" in "+str(txs)+" ")
        # finally insert the metrics into our database and log the sql query
        message = "\n".join(List)
        cur.execute("INSERT INTO MESSAGE (message,username,type) VALUES (%s,%s,%s)",(message,controller,1))
        
    time.sleep(120)
    
cur.close()
conn.commit()
conn.close()