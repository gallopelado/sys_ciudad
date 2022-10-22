CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL,
    nick character varying(60) UNIQUE,
    email character varying(60),
    pass text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)