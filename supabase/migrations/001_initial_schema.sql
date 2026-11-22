-- ==============================================================================
-- MAISON CAFÉ & COMMERCIAL PLATFORM: PRODUCTION POSTGRESQL / SUPABASE SCHEMA
-- File: supabase/migrations/001_initial_schema.sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.roles (name, description) VALUES
    ('admin', 'Full system access and financial controls'),
    ('manager', 'Daily operations, menu, inventory, and reservation management'),
    ('staff', 'Order fulfillment and reservation check-in'),
    ('customer', 'Storefront purchasing and personal booking history')
ON CONFLICT (name) DO NOTHING;

-- 2. User Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    role_id UUID REFERENCES public.roles(id) ON DELETE RESTRICT,
    full_name VARCHAR(150),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Products Table (Prices in integer minor units / Paise for INR)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    base_price_paise INTEGER NOT NULL CHECK (base_price_paise >= 0),
    image_url TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Product Variants Table
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price_delta_paise INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT TRUE
);

-- 6. Modifier Groups & Modifiers (Milk, Extra shots, etc.)
CREATE TABLE IF NOT EXISTS public.modifier_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    required BOOLEAN DEFAULT FALSE,
    min_selection INT DEFAULT 0,
    max_selection INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.modifiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.modifier_groups(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price_delta_paise INTEGER DEFAULT 0 CHECK (price_delta_paise >= 0),
    available BOOLEAN DEFAULT TRUE
);

-- 7. Dining Tables
CREATE TABLE IF NOT EXISTS public.tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_number VARCHAR(20) UNIQUE NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    area VARCHAR(50) DEFAULT 'main_dining',
    active BOOLEAN DEFAULT TRUE
);

-- 8. Table Reservations
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    table_id UUID REFERENCES public.tables(id) ON DELETE RESTRICT,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    guest_count INT NOT NULL CHECK (guest_count > 0),
    status VARCHAR(30) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show')),
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT no_overlapping_reservations EXCLUDE USING gist (
        table_id WITH =,
        tstzrange(start_at, end_at) WITH &&
    )
);

-- 9. Orders Table (Integer minor units / Paise)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    fulfillment_type VARCHAR(30) NOT NULL CHECK (fulfillment_type IN ('pickup', 'dine_in', 'delivery')),
    status VARCHAR(30) DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'paid', 'accepted', 'preparing', 'ready', 'completed', 'cancelled', 'refunded')),
    subtotal_paise INTEGER NOT NULL CHECK (subtotal_paise >= 0),
    tax_paise INTEGER NOT NULL CHECK (tax_paise >= 0),
    delivery_fee_paise INTEGER DEFAULT 0 CHECK (delivery_fee_paise >= 0),
    discount_paise INTEGER DEFAULT 0 CHECK (discount_paise >= 0),
    total_paise INTEGER NOT NULL CHECK (total_paise >= 0),
    delivery_address TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Order Items (Immutable Price Snapshot)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name_snapshot VARCHAR(200) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_paise INTEGER NOT NULL CHECK (unit_price_paise >= 0),
    selected_modifiers JSONB DEFAULT '[]'::jsonb,
    line_total_paise INTEGER NOT NULL CHECK (line_total_paise >= 0)
);

-- 11. Payments Table (Razorpay Integration)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
    provider VARCHAR(50) DEFAULT 'razorpay',
    razorpay_order_id VARCHAR(100) UNIQUE NOT NULL,
    razorpay_payment_id VARCHAR(100) UNIQUE,
    razorpay_signature VARCHAR(255),
    amount_paise INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(30) DEFAULT 'created' CHECK (status IN ('created', 'authorized', 'captured', 'failed', 'refunded')),
    webhook_event_id VARCHAR(100),
    raw_payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Inventory Items
CREATE TABLE IF NOT EXISTS public.inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(20) NOT NULL, -- e.g., 'grams', 'litres', 'units'
    quantity_on_hand DECIMAL(12, 3) NOT NULL DEFAULT 0.0,
    reorder_level DECIMAL(12, 3) DEFAULT 5.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Recipes & Recipe Items (Linking product sales to ingredient deductions)
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID UNIQUE NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS public.recipe_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    inventory_item_id UUID NOT NULL REFERENCES public.inventory_items(id) ON DELETE RESTRICT,
    quantity_required DECIMAL(10, 3) NOT NULL CHECK (quantity_required > 0)
);

-- 14. Stock Movements (Immutable audit trail)
CREATE TABLE IF NOT EXISTS public.stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_item_id UUID NOT NULL REFERENCES public.inventory_items(id) ON DELETE RESTRICT,
    movement_type VARCHAR(30) NOT NULL CHECK (movement_type IN ('order_deduction', 'manual_restock', 'spoilage_waste', 'audit_adjustment', 'order_reversal')),
    quantity_delta DECIMAL(12, 3) NOT NULL,
    reference_id UUID, -- Links to order_id or admin audit
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Coupons & Promotions
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_paise')),
    discount_value INTEGER NOT NULL CHECK (discount_value > 0),
    min_order_paise INTEGER DEFAULT 0,
    max_discount_paise INTEGER,
    usage_limit INT DEFAULT 100,
    times_used INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ
);

-- 16. Loyalty Points
CREATE TABLE IF NOT EXISTS public.loyalty_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    points_balance INT DEFAULT 0 CHECK (points_balance >= 0),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. 3D Scene Hotspots Configuration (Stable Hotspot Mapping)
CREATE TABLE IF NOT EXISTS public.scene_hotspots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotspot_id VARCHAR(100) UNIQUE NOT NULL, -- e.g. 'hotspot-counter-cortado'
    zone VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(200),
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('open_product', 'open_reservation', 'open_story')),
    target_product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    position_x DECIMAL(8, 4) NOT NULL,
    position_y DECIMAL(8, 4) NOT NULL,
    position_z DECIMAL(8, 4) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Audit Logs (Compliance & Financial Security)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID,
    ip_address VARCHAR(50),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_reservations_start ON public.reservations(start_at);
CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_scene_hotspots_id ON public.scene_hotspots(hotspot_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scene_hotspots ENABLE ROW LEVEL SECURITY;

-- Public read access for active products and scene hotspots
CREATE POLICY "Public products viewable by everyone" ON public.products
    FOR SELECT USING (active = TRUE);

CREATE POLICY "Public hotspots viewable by everyone" ON public.scene_hotspots
    FOR SELECT USING (active = TRUE);
