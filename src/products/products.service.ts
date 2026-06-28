import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 10000000,
      category: 'Elektronik',
      stock: 10,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Mouse',
      price: 150000,
      category: 'Aksesoris',
      stock: 50,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Keyboard',
      price: 300000,
      category: 'Aksesoris',
      stock: 30,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 4,
      name: 'Monitor',
      price: 2500000,
      category: 'Elektronik',
      stock: 15,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 5,
      name: 'Headset',
      price: 500000,
      category: 'Audio',
      stock: 25,
      isAvailable: false,
      createdAt: new Date(),
    },
    {
      id: 6,
      name: 'Webcam',
      price: 350000,
      category: 'Aksesoris',
      stock: 20,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 7,
      name: 'Printer',
      price: 1200000,
      category: 'Elektronik',
      stock: 8,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 8,
      name: 'Speaker Bluetooth',
      price: 450000,
      category: 'Audio',
      stock: 0,
      isAvailable: false,
      createdAt: new Date(),
    },
    {
      id: 9,
      name: 'Flashdisk 64GB',
      price: 75000,
      category: 'Aksesoris',
      stock: 100,
      isAvailable: true,
      createdAt: new Date(),
    },
    {
      id: 10,
      name: 'Tablet',
      price: 3500000,
      category: 'Elektronik',
      stock: 5,
      isAvailable: true,
      createdAt: new Date(),
    },
  ];

  private lastId = 10;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    this.lastId += 1;

    const newProduct: Product = {
      id: this.lastId,
      name: createProductDto.name,
      price: createProductDto.price,
      category: createProductDto.category,
      stock: createProductDto.stock,
      isAvailable: createProductDto.isAvailable ?? true,
      createdAt: new Date(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id); // akan throw NotFoundException kalau tidak ada

    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: number): { message: string; deleted: Product } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
    }

    const deleted = this.products[index];
    this.products.splice(index, 1);

    return {
      message: `Produk dengan ID ${id} berhasil dihapus`,
      deleted,
    };
  }

  // GET /products/category/:category
  findByCategory(category: string): Product[] {
    return this.products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  findAvailable(): Product[] {
    return this.products.filter((p) => p.stock > 0 && p.isAvailable === true);
  }
}
