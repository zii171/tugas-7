# Products API (NestJS)

REST API sederhana untuk manajemen produk menggunakan NestJS, dengan data disimpan
**in-memory** (array di dalam service, tanpa database).

## 🚀 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dalam mode development (auto-reload)
npm run start:dev

# atau jalankan biasa
npm run start
```

Server akan berjalan di `http://localhost:3000`.

## 📦 Struktur Folder

```
src/
├── main.ts                          # Entry point + ValidationPipe global
├── app.module.ts                    # Root module
└── products/
    ├── products.module.ts
    ├── products.controller.ts       # Routing & handler HTTP
    ├── products.service.ts          # Data dummy + business logic
    ├── interfaces/
    │   └── product.interface.ts     # Tipe data Product
    └── dto/
        ├── create-product.dto.ts    # Validasi body POST
        └── update-product.dto.ts    # Validasi body PUT (semua field opsional)
```

## 📋 Daftar Endpoint

| Method | Endpoint                       | Deskripsi                                              |
|--------|---------------------------------|---------------------------------------------------------|
| GET    | `/products`                    | Mengembalikan semua produk                              |
| GET    | `/products/available`          | Filter produk dengan `stock > 0` dan `isAvailable = true` |
| GET    | `/products/category/:category` | Filter produk berdasarkan kategori                      |
| GET    | `/products/:id`                | Mengembalikan produk dengan id tertentu                 |
| POST   | `/products`                    | Menambah produk baru (id auto-increment)                |
| PUT    | `/products/:id`                | Update produk (hanya field yang dikirim yang diubah)    |
| DELETE | `/products/:id`                | Menghapus produk                                        |

> ⚠️ Catatan urutan route: `/products/available` dan `/products/category/:category`
> sengaja didefinisikan **sebelum** `/products/:id` di controller, supaya kata
> "available" atau "category" tidak ikut tertangkap sebagai parameter `:id`.

## 🧪 Contoh Penggunaan (cURL)

### 1. Mendapatkan semua produk
```bash
curl http://localhost:3000/products
```

### 2. Mendapatkan produk berdasarkan ID
```bash
curl http://localhost:3000/products/1
```
Jika ID tidak ditemukan, akan mengembalikan response **404**:
```json
{
  "statusCode": 404,
  "message": "Produk dengan ID 99 tidak ditemukan",
  "error": "Not Found"
}
```

### 3. Menambah produk baru
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Microphone",
    "price": 600000,
    "category": "Audio",
    "stock": 12,
    "isAvailable": true
  }'
```
Catatan: field `isAvailable` opsional, jika tidak dikirim defaultnya `true`.
Field `id` dan `createdAt` di-generate otomatis oleh server.

### 4. Update produk (partial update)
```bash
curl -X PUT http://localhost:3000/products/2 \
  -H "Content-Type: application/json" \
  -d '{ "price": 175000, "stock": 40 }'
```
Hanya field `price` dan `stock` yang akan berubah, field lain tetap sama.

### 5. Menghapus produk
```bash
curl -X DELETE http://localhost:3000/products/5
```

### 6. Filter produk berdasarkan kategori
```bash
curl http://localhost:3000/products/category/Elektronik
```

### 7. Filter produk yang tersedia (stock > 0 dan isAvailable = true)
```bash
curl http://localhost:3000/products/available
```

## 📊 Data Dummy (10 produk)

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

Data ke-5 dan ke-8 sengaja `isAvailable: false` / `stock: 0` agar endpoint
`/products/available` bisa diuji dengan benar (keduanya tidak akan muncul di hasil filter).
