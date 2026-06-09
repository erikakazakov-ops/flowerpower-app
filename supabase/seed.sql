-- Run this in your Supabase SQL Editor to set up the products table

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  category text not null,
  description text not null default '',
  image text not null default '',
  in_stock boolean not null default true,
  created_at timestamptz default now()
);

-- Seed with initial products
insert into products (name, price, category, description, image, in_stock) values
  ('Roosid punased',   24.99, 'Roosid',      'Klassikalised punased roosid armastuse väljendamiseks',       '/images/hero.jpg',     true),
  ('Tulipiid segud',   19.99, 'Tulipiid',    'Värvilised kevadised tulipiid, mis toovad rõõmu',             '/images/services.jpg', true),
  ('Peonid roosa',     29.99, 'Peonid',      'Lopsakad roosad peonid, täis romantilisust',                  '/images/about.jpg',    true),
  ('Päevalilled',      17.99, 'Päevalilled', 'Säravad päevalilled, mis toovad suvise tuju',                 '/images/events.jpg',   true),
  ('Orhideed valged',  39.99, 'Orhideed',    'Elegaantsed valged orhideed luksuslikuks kingituseks',        '/images/store.jpg',    true),
  ('Lavendel kimp',    15.99, 'Lavendel',    'Aroomne lavendelikimp lõõgastumiseks',                        '/images/hero.jpg',     false),
  ('Hortensiad sinised',22.99,'Hortensiad',  'Uhked sinised hortensiad atmosfääri loomiseks',               '/images/services.jpg', true),
  ('Segakimp premium', 49.99, 'Segakimbud',  'Hoolikalt valitud segakimp kõige erilisematele hetkedele',    '/images/about.jpg',    true),
  ('Lilled roosa segakimp',34.99,'Segakimbud','Romantiline roosa segakimp armsamale',                       '/images/events.jpg',   true)
on conflict do nothing;
