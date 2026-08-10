require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const menuItemsData = [
  { 
    customId: 1, 
    category: "Trà Trái Cây",
    name: "Trà Đào Cam Sả", 
    desc: "Vị chua thanh mát, thơm lừng đánh thức mọi giác quan.", 
    price: "45.000đ", 
    img: "/images/ly-ca-phe-lanh.png" 
  },
  { 
    customId: 2, 
    category: "Sinh Tố",
    name: "Sinh Tố Xoài", 
    desc: "Xoài chín ngọt lịm, sánh mịn thơm béo tự nhiên.", 
    price: "55.000đ", 
    img: "/images/bac-xiu-may.png" 
  },
  { 
    customId: 3, 
    category: "Trà Trái Cây",
    name: "Trà Dâu Tằm", 
    desc: "Dâu tằm tươi hòa quyện vị trà thanh dịu, ngọt ngào.", 
    price: "50.000đ", 
    img: "/images/cold-brew.png" 
  },
  { 
    customId: 4, 
    category: "Đặc Biệt",
    name: "Trà Sữa Trân Châu", 
    desc: "Trà sữa đậm vị, trân châu dẻo dai thơm ngon khó cưỡng.", 
    price: "50.000đ", 
    img: "/images/ly-ca-phe-nong.png" 
  },
  { 
    customId: 5, 
    category: "Trà Trái Cây",
    name: "Trà Dưa Hấu", 
    desc: "Mát lạnh, ngọt thanh từ dưa hấu tươi mọng nước.", 
    price: "45.000đ", 
    img: "/images/ly-ca-phe-lanh.png" 
  },
  { 
    customId: 6, 
    category: "Cà Phê",
    name: "Cà Phê Đen Đá", 
    desc: "Đậm đà nguyên chất, tỉnh táo cho ngày mới năng động.", 
    price: "35.000đ", 
    img: "/images/espresso.png" 
  },
  { 
    customId: 7, 
    category: "Cà Phê",
    name: "Cà Phê Dừa", 
    desc: "Hòa quyện béo ngậy giữa cà phê và nước cốt dừa.", 
    price: "55.000đ", 
    img: "/images/bac-xiu-may.png" 
  },
  { 
    customId: 8, 
    category: "Đặc Biệt",
    name: "Trà Trái Cây Nhiệt Đới", 
    desc: "Tổng hòa trái cây nhiệt đới tươi mát, giàu vitamin.", 
    price: "55.000đ", 
    img: "/images/cold-brew.png" 
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing
    await MenuItem.deleteMany({});
    console.log('🧹 Cleared existing menu items');

    // Insert new
    await MenuItem.insertMany(menuItemsData);
    console.log('🌱 Successfully seeded menu items');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
