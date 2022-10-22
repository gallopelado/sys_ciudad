CREATE TABLE IF NOT EXISTS public.ciudades
(
    id SERIAL,
    descri character varying(60) UNIQUE,
    CONSTRAINT ciudad_pkey PRIMARY KEY (id)
)