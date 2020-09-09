-- DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
	"firstName" varchar (50) NOT NULL,
	"lastName" varchar (50) NOT NULL,
  "status" boolean NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- DROP TABLE IF EXISTS public.locations;
CREATE TABLE public.locations (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "longitude" integer NOT NULL,
  "latitude" integer NOT NULL,
  "onset" date NOT NULL,
  "dateVisited" date NOT NULL,
  "user_id" bigint NOT NULL,
  CONSTRAINT "locations_pk" PRIMARY KEY ("_id")
  -- FOREIGN KEY "user_id" REFERENCES public.users("_id")
) WITH (
  OIDS=FALSE
);

 ALTER TABLE public.locations ADD FOREIGN KEY ("user_id") REFERENCES public.users("_id");

 INSERT INTO public.users VALUES (1, 'cc@gmail.com','helloworld', 'Catherine', 'Chiu',  FALSE);
 INSERT INTO public.users VALUES (2, 'jm@gmail.com', 'helloworld', 'John', 'Madrigal', FALSE);
 INSERT INTO public.users VALUES (3, 'mh@gmail.com', 'helloworld', 'Michelle', 'Holland', TRUE);
 INSERT INTO public.users VALUES (4, 'sk@gmail.com', 'helloworld', 'Serena', 'Kuo',  TRUE);

 INSERT INTO public.locations VALUES (1, 'Starbucks', 37.4224764, -122.0842499, '2020-03-23', '2020-03-20', 1);
 INSERT INTO public.locations VALUES (2, 'Alfred Coffee', 39.4224764, -192.0842499, '2020-04-23', '2020-04-13', 2);
 INSERT INTO public.locations VALUES (3, 'Rubios', 17.4224764, -102.0842499, '2020-07-23', '2020-07-08', 3);
 INSERT INTO public.locations VALUES (4, 'Sidecar Doughnuts & Coffee', 87.4224764, -162.0842499, '2020-08-23', '2020-08-13', 4);
 INSERT INTO public.locations VALUES (5, 'Salt & Straw', 31.4224764, -145.0842499, '2020-03-23', '2020-03-20', 1);
 INSERT INTO public.locations VALUES (6, 'Blue Bottle Coffee', 30.4224764, -180.0842499, '2020-04-23', '2020-04-13', 2);
 INSERT INTO public.locations VALUES (7, 'Gratitude Cafe', 12.4224764, -105.0842499, '2020-07-23', '2020-07-08', 3);
 INSERT INTO public.locations VALUES (8, 'Afters Ice Cream', 89.4224764, -153.0842499, '2020-08-23', '2020-08-13', 4);

 select setval('public.users__id_seq', 5, false);
 select setval('public.locations__id_seq', 9, false);

