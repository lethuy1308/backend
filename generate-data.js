import { faker } from "@faker-js/faker";
import fs from "fs";

faker.location = { country: "Viet Nam" };
const randomCategories = (n) => {
  if (n <= 0) return [];

  const categoryList = [];
  for (let index = 0; index < n; index++) {
    const category = {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  }
  return categoryList;
};

const randomProductList = (categories, n) => {
  if (categories.length == 0) return [];

  const productList = [];

  categories.forEach((category) => {
    for (let index = 0; index < n; index++) {
      const product = {
        categoryId: category.id,
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        color: faker.color.rgb(),
        price: faker.commerce.price(1, 100),
        description: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos(400, 400),
        quantity: faker.number.int({ min: 1, max: 100 }),
        sold: faker.number.int({ min: 1, max: 100 }),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    }
  });

  return productList;
};
// console.log(faker.string.uuid());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.price());
// console.log(faker.commerce.department());
// console.log(faker.person.fullName());
const main = () => {
  const newImages = [
    "https://vn-live-01.slatic.net/p/cc083d1ad0a1bd59185f058e1f246cbd.jpg",
    "https://rcc.vn/wp-content/uploads/2021/01/nuoc-ep-can-tay-loai-thuc-uong-healthy-bo-duong-nuoc-ep-can-tay-5.jpg",
    "https://healthyfarm.com.vn/wp-content/uploads/2023/04/Banh-Hat.jpg",
    "https://nvhphunu.vn/wp-content/uploads/2023/12/Hoc-Pha-Che-Do-Uong-Healthy-Kham-pha-lop-day-pha-che.jpeg",
    //1
    "https://salt.tikicdn.com/cache/w1200/ts/product/a0/15/d5/e4debaacaeac46f8c68184ce71597a54.png",
    "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lpxghi7klv4ic5",
    "https://file.hstatic.net/1000357530/article/dong_gia_sua_hat-01_8c1007ea96254ad7a757632d5e0f7fcf.jpg",
    "https://viethealthy.com/images/Uploads/sp_suachuahylap_1kg.jpg",
    //2
    "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmu40t1t1ujj43.webp", // bánh quy ăn kiêng
    "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m188fxl9fk3e65", // bánh Biscotti Nguyên Cám Ăn Kiêng
    "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqu2xelqz86vc9.webp", // bánh gạo lứt
    "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m188484e77ne96", // bánh dừa sấy khô
    "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgkefx2p8p9zde.webp", // trái cây sấy khô
    //3
    "https://down-vn.img.susercontent.com/file/e71f774549683b809cf557f067bca340.webp", // nc trái cây
    "https://product.hstatic.net/1000282430/product/upload_dfa941f9c8e446459c938499f49719fb_master.jpg", // ép ổi
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bachhoaxanh.com%2Fkinh-nghiem-hay%2Ftop-5-do-uong-cuc-healthy-bao-ve-suc-khoe-ngay-tet-1412033&psig=AOvVaw297YxF7DBQgw3rkh4M3Wsn&ust=1728926873697000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIj7hO7wi4kDFQAAAAAdAAAAABAE",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcaphesach.com.vn%2Ftra-bi-dao-hat-chia%2F&psig=AOvVaw2M1IKPOgTq5taJiGskjf9F&ust=1728926977276000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPja_Ybxi4kDFQAAAAAdAAAAABAE",
    ,
  ];
  const categories = randomCategories(4);
  console.log(categories);
  let productList = randomProductList(categories, 17);

  productList = productList.map((product, index) => {
    if (index < 4) {
      return {
        ...product,
        categoryId: 1, // Fixed the spelling of 'categoryId'
        image: newImages[index],
      };
    } else if (index >= 4 && index < 8) {
      return {
        ...product,
        categoryId: 2, // Fixed the spelling of 'categoryId'
        image: newImages[index],
      };
    } else if (index >= 8 && index <14) {
      return {
        ...product,
        categoryId: 3, // Fixed the spelling of 'categoryId'
        image: newImages[index],
      };
    } else if (index >= 14 && index <18) {
      return {
        ...product,
        categoryId: 4, // Fixed the spelling of 'categoryId'
        image: newImages[index],
      };
    } else {
      return {
        ...product
      };
    }
    // Optionally handle cases where index >= 20 or other edge cases if necessary
  });

  console.log(productList);
  

  const newCategoryNames = [
    "Best Sellers",
    "Favorite Products",
    "Food",
    "Drinking water",
  ];
  const categorie = categories.map((category, index) => ({
    id: index + 1,
    name: newCategoryNames[index], // cập nhật tên mới hoặc giữ tên cũ
    updatedAt: Date.now(),
  }));
  console.log(categorie);
  const db = {
    categories: categorie,
    products: productList,
    users: [],
    carts: [],
    orders: [],
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("đã lưu file vào thành công");
  });
};
main();
