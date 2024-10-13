import db from "@/app/lib/db"
import { Availability } from "@prisma/client";

import { Role, Order_Status } from '@prisma/client';



async function main() {
    try {


        // Delete existing data to prevent duplicates
        await db.orderItem.deleteMany();
        await db.order.deleteMany();
        await db.product.deleteMany();
        await db.shop.deleteMany();
        await db.user.deleteMany();
        await db.shopKeeper.deleteMany();

        // Create users
        const user = await db.user.create({
            data: {
                email: 'user@example.com',
                password: 'securepassword',
                name: 'John Doe',
            },
        });

        const shopKeeper = await db.shopKeeper.create({
            data: {
                name: 'Jane Smith',
                contact_info: "1234567890",
                managed_shops: 1,
                role: Role.Seller,
            },
        });

        // Create shops
        const shop = await db.shop.create({
            data: {
                name: 'Shop 1',
                address: '123 Main St',
                rating: 5,
                contact_info: "9876543210",
                isActive: true,
                Shopkeeper_id: shopKeeper.shopkeeper_id, // Link to the ShopKeeper
            },
        });

        // Seed products
        const products = [
            {
                name: 'Product 1',
                description: 'Description for product 1',
                category: ['Category A', 'Category B'],
                price: 1000,
                image: 'https://example.com/image1.jpg',
                status: Availability.Available,
                shopId: shop.id,
            },
            {
                name: 'Product 2',
                description: 'Description for product 2',
                category: ['Category C'],
                price: 2000,
                image: 'https://example.com/image2.jpg',
                status: Availability.Out_of_stock,
                shopId: shop.id,
            },
        ];

        for (const product of products) {
            await db.product.create({
                data: product,
            });
        }

        // Create an order
        const order = await db.order.create({
            data: {
                total_amount: 3000,
                userId: user.id,
                status: Order_Status.pending,
            },
        });

        const product1 = await db.product.findFirst({ where: { name: 'Product 1' } });
        const product2 = await db.product.findFirst({ where: { name: 'Product 2' } });



        // Create order items
        const orderItems = [
            {
                quantity: 2,
                OrderId: order.order_id,
                ProductId: product1?.pid
            },
            {
                quantity: 1,
                OrderId: order.order_id,
                ProductId: product2?.pid
            },
        ];

        for (const item of orderItems) {
            await db.orderItem.create({
                data: {
                    quantity: item.quantity,
                    OrderId: item.OrderId,
                    ProductId: item.ProductId || "123456789"
                }
            });
        }

        console.log('Seeding completed!');
    } catch (error) {
        console.log(error)
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
