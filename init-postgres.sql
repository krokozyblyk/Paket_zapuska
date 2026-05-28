-- PostgreSQL Database Schema for Prizma
-- Run this script in pgAdmin or psql to create the database

-- Drop all tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS bonus_transactions CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS animal_reservations CASCADE;
DROP TABLE IF EXISTS service_bookings CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS weekly_services CASCADE;
DROP TABLE IF EXISTS weekly_products CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS product_photos CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS animal_photos CASCADE;
DROP TABLE IF EXISTS zoo_passports CASCADE;
DROP TABLE IF EXISTS animals CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    last_name VARCHAR(50),
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    city VARCHAR(50),
    role VARCHAR(20) DEFAULT 'client',
    avatar_url VARCHAR(255),
    bonus_balance INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    parent_category_id INTEGER REFERENCES categories(category_id),
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
    store_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    rating DECIMAL(2, 1),
    working_hours VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animals (
    animal_id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(store_id),
    name VARCHAR(100),
    breed VARCHAR(100),
    age INTEGER,
    age_months INTEGER,
    gender VARCHAR(20),
    price DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'available',
    description TEXT,
    reserved_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE zoo_passports (
    passport_id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animals(animal_id) ON DELETE CASCADE,
    passport_number VARCHAR(50),
    species VARCHAR(100),
    breed VARCHAR(100),
    color VARCHAR(100),
    gender VARCHAR(20),
    birth_date DATE,
    weight DECIMAL(6, 2),
    sterilized BOOLEAN DEFAULT false,
    blood_type VARCHAR(20),
    allergies VARCHAR(500),
    chronic_conditions VARCHAR(500),
    registration_date DATE,
    owner_full_name VARCHAR(200),
    owner_phone VARCHAR(20),
    owner_address VARCHAR(300),
    vaccines JSONB,
    parasites_treatments JSONB,
    microchip_number VARCHAR(50),
    microchip_date DATE,
    vet_clinic VARCHAR(200),
    vet_phone VARCHAR(20),
    vet_doctor VARCHAR(200),
    last_vet_visit DATE,
    next_vet_visit DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animal_photos (
    animal_photo_id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animals(animal_id) ON DELETE CASCADE,
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    category_name VARCHAR(100),
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(category_id),
    name VARCHAR(200) NOT NULL,
    purchase_price DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    discount_price DECIMAL(10, 2),
    stock_quantity INTEGER,
    production_date DATE,
    expiration_date DATE,
    description TEXT,
    composition TEXT,
    bonus_eligible BOOLEAN DEFAULT true,
    bonus_price INTEGER,
    rating DECIMAL(2, 1) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_photos (
    photo_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    photo_url VARCHAR(255),
    sort_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE promotions (
    promotion_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(category_id),
    product_id INTEGER REFERENCES products(product_id),
    name VARCHAR(100),
    description TEXT,
    discount_percent INTEGER,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weekly_products (
    weekly_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    week_start_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weekly_services (
    weekly_service_id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(service_id) ON DELETE CASCADE,
    week_start_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER DEFAULT 1,
    use_bonus BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    product_id INTEGER REFERENCES products(product_id),
    animal_id INTEGER REFERENCES animals(animal_id),
    service_id INTEGER REFERENCES services(service_id),
    item_id INTEGER,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    user_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    type VARCHAR(50),
    title VARCHAR(200),
    body TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    store_id INTEGER REFERENCES stores(store_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20),
    total_amount DECIMAL(10, 2),
    total_without_discount DECIMAL(10, 2),
    bonus_used INTEGER DEFAULT 0,
    bonus_earned INTEGER DEFAULT 0,
    delivery_date DATE,
    delivery_time VARCHAR(20),
    payment_method VARCHAR(20),
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER,
    price_at_time DECIMAL(10, 2),
    use_bonus BOOLEAN DEFAULT false,
    bonus_price_at_time INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bonus_transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(order_id),
    amount INTEGER,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    service_id INTEGER REFERENCES services(service_id),
    store_id INTEGER REFERENCES stores(store_id),
    animal_id INTEGER REFERENCES animals(animal_id),
    booking_date DATE,
    time_slot VARCHAR(20),
    phone VARCHAR(20),
    notes TEXT,
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animal_reservations (
    reservation_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    animal_id INTEGER REFERENCES animals(animal_id),
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_animals_store ON animals(store_id);
CREATE INDEX idx_animals_status ON animals(status);
CREATE INDEX idx_services_user ON services(user_id);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_animal ON reviews(animal_id);
CREATE INDEX idx_reviews_service ON reviews(service_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_bookings_user ON service_bookings(user_id);
CREATE INDEX idx_bookings_date ON service_bookings(booking_date);

CREATE UNIQUE INDEX idx_favorites_user_product ON favorites(user_id, product_id);
CREATE UNIQUE INDEX idx_cart_user_product ON cart(user_id, product_id);

-- Data will be seeded by the application seeder on first run
-- The seeder creates all data including users with proper bcrypt-hashed passwords
-- Do NOT insert any data here or the seeder will skip (it checks if users table is empty)

SELECT 'Database initialized successfully! Run the application to seed data.' as result;
