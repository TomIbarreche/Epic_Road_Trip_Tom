INSERT INTO roles ("label",description) VALUES
('admin','All rights.')
,('user','A simple user.');
INSERT INTO users (user_name,first_name,last_name,email,"password",phone,birthday,created_at,updated_at,role_id) VALUES
('admin','Administrator','god','admin@roadtrip.eu','$2a$12$3xhaxNHbdg35gi0/5PrkUuFwfaPgyIOUBVptTpK4eUlYZfuI/SqFW','','2020-02-12','2021-06-04 14:40:59.583','2021-06-04 14:40:59.583',1)
,('simpleuser','Simple','user','simple.user@roadtrip.eu','$2a$12$3xhaxNHbdg35gi0/5PrkUuFwfaPgyIOUBVptTpK4eUlYZfuI/SqFW','','2020-02-12','2021-06-04 14:40:59.583','2021-06-04 14:40:59.583',2)
;
