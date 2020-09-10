-- DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users
(
  "_id" serial NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "firstname" varchar (50) NOT NULL,
  "lastname" varchar (50) NOT NULL,
  "status" boolean NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
)
WITH (
  OIDS=FALSE
);

-- DROP TABLE IF EXISTS public.locations;
CREATE TABLE public.locations
(
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "latitude" numeric NOT NULL,
  "longitude" numeric NOT NULL,
  "onset" date NOT NULL,
  "date_visited" date NOT NULL,
  "user_id" bigint NOT NULL,
  CONSTRAINT "locations_pk" PRIMARY KEY ("_id")
  -- FOREIGN KEY "user_id" REFERENCES public.users("_id")
)
WITH (
  OIDS=FALSE
);

ALTER TABLE public.locations ADD FOREIGN KEY ("user_id") REFERENCES public.users("_id");

INSERT INTO public.users
VALUES
  (1, 'cc@gmail.com', 'helloworld', 'Catherine', 'Chiu', FALSE);
INSERT INTO public.users
VALUES
  (2, 'jm@gmail.com', 'helloworld', 'John', 'Madrigal', FALSE);
INSERT INTO public.users
VALUES
  (3, 'mh@gmail.com', 'helloworld', 'Michelle', 'Holland', TRUE);
INSERT INTO public.users
VALUES
  (4, 'sk@gmail.com', 'helloworld', 'Serena', 'Kuo', TRUE);

INSERT INTO public.locations
VALUES
  (1, 'Starbucks', 37.4224764, -122.0842499, '2020-03-23', '2020-03-20', 1);
INSERT INTO public.locations
VALUES
  (2, 'Alfred Coffee', 34.0839, 118.3754, '2020-04-23', '2020-04-13', 2);
INSERT INTO public.locations
VALUES
  (3, 'Rubios', 39.743943, -105.020089, '2020-07-23', '2020-07-08', 3);
INSERT INTO public.locations
VALUES
  (4, 'Sidecar Doughnuts & Coffee', 34.0214608, -118.4982049, '2020-08-23', '2020-08-13', 4);
INSERT INTO public.locations
VALUES
  (5, 'Salt & Straw', 45.4891595, -122.7344734, '2020-03-23', '2020-03-20', 1);
INSERT INTO public.locations
VALUES
  (6, 'Blue Bottle Coffee', 37.3202302, -121.950044, '2020-04-23', '2020-04-13', 2);
INSERT INTO public.locations
VALUES
  (7, 'Gratitude Cafe', 33.9979655, -118.476053, '2020-07-23', '2020-07-08', 3);
INSERT INTO public.locations
VALUES
  (8, 'Afters Ice Cream', 34.1547327, -118.4504157, '2020-08-23', '2020-08-13', 4);

select setval('public.users__id_seq', 5, false);
select setval('public.locations__id_seq', 9, false);

-- DROP TABLE public.locations;
-- DROP TABLE public.users