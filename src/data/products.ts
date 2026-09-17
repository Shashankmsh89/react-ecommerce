export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
    productCode?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "iPhone 16 Pro",
        imageUrl:
            "https://upgreat.ee/ugvam/resource/images/IPHONE_16PRO--white_titanium--1.jpg",
        category: "Smartphone",
        rating: 4.8,
        reviewCount: 320,
        productCode: "IPH16PRO001",
    },
    {
        id: 2,
        name: "Samsung Galaxy S25",
        imageUrl:
            "https://cdn.idealo.com/folder/Product/205569/4/205569450/s4_produktbild_max/samsung-galaxy-s25.jpg",
        category: "Smartphone",
        rating: 4.7,
        reviewCount: 320,
        productCode: "SAMS25-001",
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        imageUrl:
            "https://static.ftshp.digital/img/p/4/2/3/9/4/3/423943.jpg",
        category: "Shoes",
        rating: 4.6,
        reviewCount: 320,
        productCode: "NIKEAM27001",
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        imageUrl:
            "https://www.pakbyte.pk/cdn/shop/files/Sony-WH-1000XM5-Wireless-Headphones-Midnight-Blue-PakByte-Computers-26342357532739.jpg?v=1753669596",
        category: "Headphones",
        rating: 4.9,
        reviewCount: 320,
        productCode: "SONYWH1000XM5",
    },
    {
        id: 5,
        name: "Apple Watch Series 10",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/2/2e/Apple_Watch_Series_10.jpeg",
        category: "Smartwatch",
        rating: 4.7,
        reviewCount: 320,
        productCode: "APWS1001",
    },
];