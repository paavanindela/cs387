UPDATE controller SET status=2 WHERE username='pk35007';
INSERT INTO HOST(hostname, ipAddress, macAddress, osType, influx) VALUES('aquib-HP-Laptop-15-bs0xx', '10.9.80.234','00:00:00:00:00:00', 1, true);
INSERT INTO HOST(hostname, ipAddress, macAddress, osType, influx) VALUES('chaithanya-G3-3579', '10.23.45.56','00:00:00:00:00:00', 1, true);
INSERT INTO HOST(hostname, ipAddress, macAddress, osType, influx) VALUES('paavan-Inspiron-5584', '10.45.34.234','00:00:00:00:00:00', 1, true);
INSERT INTO HOST(hostname, ipAddress, macAddress, osType, influx) VALUES('rsr-pc', '10.45.67.12','00:00:00:00:00:00', 1, true);
INSERT INTO HOST(hostname, ipAddress, macAddress, osType, influx) VALUES('DESKTOP-PAKL5GJ', '23.23.34.21','00:00:00:00:00:00', 1, true);
INSERT INTO ControllerHost(username, hostname) VALUES('rsr', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO ControllerHost(username, hostname) VALUES('rsr', 'chaithanya-G3-3579');
INSERT INTO ControllerHost(username, hostname) VALUES('rsr', 'paavan-Inspiron-5584');
INSERT INTO ControllerHost(username, hostname) VALUES('rsr', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('demo', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('examdb', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab2db', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab3db', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('labexam', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab4db', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres_global', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('project', 1, 'root', 'aquib-HP-Laptop-15-bs0xx'); 
INSERT INTO Application(name, status, owner, hostname) VALUES('demo', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('examdb', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab2db', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab3db', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('labexam', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab4db', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres_global', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('project', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('demo', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('examdb', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab2db', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab3db', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('labexam', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab4db', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres_global', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('project', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('demo', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('examdb', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab2db', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab3db', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('labexam', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('lab4db', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgres_global', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('project', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('cpu', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('disk', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('diskio', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('kernel', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('mem', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgresql', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('processes', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat_lookup', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('swap', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');
INSERT INTO Application(name, status, owner, hostname) VALUES('system', 1, 'root', 'aquib-HP-Laptop-15-bs0xx');

INSERT INTO Application(name, status, owner, hostname) VALUES('cpu', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('disk', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('diskio', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('kernel', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('mem', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgresql', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('processes', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat_lookup', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('swap', 1, 'root', 'chaithanya-G3-3579');
INSERT INTO Application(name, status, owner, hostname) VALUES('system', 1, 'root', 'chaithanya-G3-3579');

INSERT INTO Application(name, status, owner, hostname) VALUES('cpu', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('disk', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('diskio', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('kernel', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('mem', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgresql', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('processes', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat_lookup', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('swap', 1, 'root', 'paavan-Inspiron-5584');
INSERT INTO Application(name, status, owner, hostname) VALUES('system', 1, 'root', 'paavan-Inspiron-5584');

INSERT INTO Application(name, status, owner, hostname) VALUES('cpu', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('disk', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('diskio', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('kernel', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('mem', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('postgresql', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('processes', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat_lookup', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('procstat', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('swap', 1, 'root', 'rsr-pc');
INSERT INTO Application(name, status, owner, hostname) VALUES('system', 1, 'root', 'rsr-pc');

INSERT INTO Metric(name) VALUES('blks_hit');
INSERT INTO Metric(name) VALUES('blks_read');
INSERT INTO Metric(name) VALUES('cpu_time');
INSERT INTO Metric(name) VALUES('cpu_usage');
INSERT INTO Metric(name) VALUES('cpu_time_system');
INSERT INTO Metric(name) VALUES('cpu_time_user');
INSERT INTO Metric(name) VALUES('deadlocks');
INSERT INTO Metric(name) VALUES('num_threads');
INSERT INTO Metric(name) VALUES('memory_swap');
INSERT INTO Metric(name) VALUES('memory_usage');
INSERT INTO Metric(name) VALUES('total_threads');
INSERT INTO Metric(name) VALUES('tup_deleted');
INSERT INTO Metric(name) VALUES('tup_fetched');
INSERT INTO Metric(name) VALUES('tup_inserted');
INSERT INTO Metric(name) VALUES('tup_returned');
INSERT INTO Metric(name) VALUES('tup_updated');
INSERT INTO Metric(name) VALUES('usage_system');
INSERT INTO Metric(name) VALUES('usage_user');
INSERT INTO Metric(name) VALUES('used_percent');

