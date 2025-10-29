-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
);

-- Enable RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON public.categories;
CREATE POLICY "Allow public read access" ON public.categories FOR SELECT USING (true);

-- 2. Seed categories from mock data
INSERT INTO public.categories (id, name, image) VALUES
('pimentas', 'Pimentas', 'https://img.usecurling.com/p/400/400?q=chili%20peppers'),
('temperos-secos', 'Temperos Secos', 'https://img.usecurling.com/p/400/400?q=dried%20herbs'),
('molhos-especiais', 'Molhos Especiais', 'https://img.usecurling.com/p/400/400?q=specialty%20sauce'),
('especiarias', 'Especiarias', 'https://img.usecurling.com/p/400/400?q=spices')
ON CONFLICT (id) DO NOTHING;

-- 3. Drop existing produtos table and recreate with correct schema
DROP TABLE IF EXISTS public.produtos CASCADE;

CREATE TABLE public.produtos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    description TEXT,
    preco NUMERIC NOT NULL,
    promotional_price NUMERIC,
    images TEXT[],
    category_id TEXT REFERENCES public.categories(id),
    stock INTEGER NOT NULL DEFAULT 0,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 0.0,
    review_count INTEGER NOT NULL DEFAULT 0,
    type TEXT NOT NULL DEFAULT 'simple',
    variations JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for produtos
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON public.produtos;
CREATE POLICY "Allow public read access" ON public.produtos FOR SELECT USING (true);


-- 4. Seed products from mock data
INSERT INTO public.produtos (nome, description, preco, promotional_price, images, category_id, stock, rating, review_count, type, variations) VALUES
('Pimenta Calabresa em Flocos', 'Ideal para dar um toque picante em pizzas, massas e carnes. Sabor intenso e aroma marcante.', 12.5, NULL, ARRAY['https://img.usecurling.com/p/600/600?q=calabrian%20chili%20flakes', 'https://img.usecurling.com/p/600/600?q=spicy%20chili%20flakes'], 'pimentas', 50, 4.8, 125, 'simple', NULL),
('Orégano Desidratado', 'Um clássico da culinária mediterrânea, perfeito para molhos, saladas e pratos à base de tomate.', 8.9, 7.5, ARRAY['https://img.usecurling.com/p/600/600?q=dried%20oregano', 'https://img.usecurling.com/p/600/600?q=oregano%20spice'], 'temperos-secos', 100, 4.9, 210, 'simple', NULL),
('Molho Barbecue Artesanal', 'Nosso molho barbecue exclusivo, com um toque defumado e adocicado. Perfeito para churrascos.', 22.0, NULL, ARRAY['https://img.usecurling.com/p/600/600?q=artisanal%20barbecue%20sauce', 'https://img.usecurling.com/p/600/600?q=bbq%20sauce%20bottle'], 'molhos-especiais', 30, 5.0, 88, 'variable', '{"id": "v1", "name": "Tamanho", "options": {"250ml": {"sku": "BBQ-250", "stock": 20, "priceModifier": 0}, "500ml": {"sku": "BBQ-500", "stock": 10, "priceModifier": 8}}}'),
('Cúrcuma em Pó (Açafrão-da-terra)', 'Especiaria de cor vibrante e sabor terroso, conhecida por suas propriedades anti-inflamatórias.', 15.75, NULL, ARRAY['https://img.usecurling.com/p/600/600?q=turmeric%20powder', 'https://img.usecurling.com/p/600/600?q=turmeric%20spice%20bowl'], 'especiarias', 80, 4.7, 95, 'simple', NULL),
('Páprica Doce', 'Pó de pimentão seco, de sabor suave e adocicado, ideal para colorir e temperar pratos.', 9.50, NULL, ARRAY['https://img.usecurling.com/p/600/600?q=sweet%20paprika'], 'especiarias', 120, 4.6, 150, 'simple', NULL),
('Mix de Ervas Finas', 'Uma combinação sofisticada de ervas para dar um toque gourmet em carnes, aves e saladas.', 14.00, 11.99, ARRAY['https://img.usecurling.com/p/600/600?q=fine%20herbs%20mix'], 'temperos-secos', 60, 4.8, 99, 'simple', NULL),
('Molho de Pimenta Habanero', 'Para os amantes de picância extrema. Sabor frutado e ardência intensa.', 25.00, NULL, ARRAY['https://img.usecurling.com/p/600/600?q=habanero%20hot%20sauce'], 'molhos-especiais', 25, 4.9, 75, 'simple', NULL),
('Sal Rosa do Himalaia', 'Sal puro e rico em minerais, com um sabor mais suave que o sal comum.', 18.50, NULL, ARRAY['https://img.usecurling.com/p/600/600?q=himalayan%20pink%20salt'], 'especiarias', 200, 4.7, 300, 'variable', '{"id": "v2", "name": "Granulação", "options": {"Fino": {"sku": "SALT-F", "stock": 120, "priceModifier": 0}, "Grosso": {"sku": "SALT-G", "stock": 80, "priceModifier": 2}}}');
