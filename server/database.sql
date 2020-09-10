-- DROP TABLE IF EXISTS public.users;
DROP TABLE public.users (
	"_id" serial NOT NULL,
	"email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
	"firstname" varchar (50) NOT NULL,
	"lastname" varchar (50) NOT NULL,
  "status" boolean NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- DROP TABLE IF EXISTS public.locations;
DROP TABLE public.locations (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "latitude" integer NOT NULL,
  "longitude" integer NOT NULL,
  "onset" date NOT NULL,
  "date_visited" date NOT NULL,
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

 INSERT INTO public.locations VALUES (1, 'Starbucks', -122.0842499, 37.4224764, '2020-03-23', '2020-03-20', 1);
 INSERT INTO public.locations VALUES (2, 'Alfred Coffee', -192.0842499, 39.4224764, '2020-04-23', '2020-04-13', 2);
 INSERT INTO public.locations VALUES (3, 'Rubios', -102.0842499, 17.4224764, '2020-07-23', '2020-07-08', 3);
 INSERT INTO public.locations VALUES (4, 'Sidecar Doughnuts & Coffee',-162.0842499, 87.4224764, '2020-08-23', '2020-08-13', 4);
 INSERT INTO public.locations VALUES (5, 'Salt & Straw', -145.0842499, 31.4224764, '2020-03-23', '2020-03-20', 1);
 INSERT INTO public.locations VALUES (6, 'Blue Bottle Coffee', -180.0842499, 30.4224764, '2020-04-23', '2020-04-13', 2);
 INSERT INTO public.locations VALUES (7, 'Gratitude Cafe', -105.0842499, 12.4224764, '2020-07-23', '2020-07-08', 3);
 INSERT INTO public.locations VALUES (8, 'Afters Ice Cream', -153.0842499, 89.4224764, '2020-08-23', '2020-08-13', 4);

 select setval('public.users__id_seq', 5, false);
 select setval('public.locations__id_seq', 9, false);

