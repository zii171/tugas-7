# Tugas 7: Membuat API Products

API Products menggunakan NestJS

## Cara Menjalankan

```bash

# 1. Download File Zip
Dibagian menu code ditengah kiri 

# 2. Ekstrak File
Ekstrak File Zip Tugas 7

# 3. Install File
npm install

# 4. Jalankan dalam mode development 
npm run start:dev

```

Server akan berjalan di `http://localhost:3000`.

## Struktur Folder

```
src/
├── main.ts                         
├── app.module.ts                   
└── products/
    ├── products.module.ts
    ├── products.controller.ts       
    ├── products.service.ts         
    ├── interfaces/
    │   └── product.interface.ts    
    └── dto/
        ├── create-product.dto.ts   
        └── update-product.dto.ts   
```

## Daftar Endpoint

| Method | Endpoint                       | Deskripsi                                                  |
|--------|--------------------------------|------------------------------------------------------------|
| GET    | `/products`                    | Mengembalikan semua produk                                 |
| GET    | `/products/available`          | Filter produk dengan `stock > 0` dan `isAvailable = true`  |
| GET    | `/products/category/:category` | Filter produk berdasarkan kategori                         |
| GET    | `/products/:id`                | Mengembalikan produk dengan id tertentu                    |
| POST   | `/products`                    | Menambah produk baru (id auto-increment)                   |
| PUT    | `/products/:id`                | Update produk (hanya field yang dikirim yang diubah)       |
| DELETE | `/products/:id`                | Menghapus produk                                           |



## Data Dummy (10 produk)

| ID | Nama              | Harga      | Kategori    | Stock | isAvailable |
|----|-------------------|-----------:|-------------|------:|-------------|
| 1  | Laptop            | 10.000.000 | Elektronik  | 10    | true        |
| 2  | Mouse             | 150.000    | Aksesoris   | 50    | true        |
| 3  | Keyboard          | 300.000    | Aksesoris   | 30    | true        |
| 4  | Monitor           | 2.500.000  | Elektronik  | 15    | true        |
| 5  | Headset           | 500.000    | Audio       | 25    | false       |
| 6  | Webcam            | 350.000    | Aksesoris   | 20    | true        |
| 7  | Printer           | 1.200.000  | Elektronik  | 8     | true        |
| 8  | Speaker Bluetooth | 450.000    | Audio       | 0     | false       |
| 9  | Flashdisk 64GB    | 75.000     | Aksesoris   | 100   | true        |
| 10 | Tablet            | 3.500.000  | Elektronik  | 5     | true        |
