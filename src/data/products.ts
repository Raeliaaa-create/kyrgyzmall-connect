export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: 'hot' | 'new' | 'top';
  description: string;
  sizes?: string[];
  colors?: string[];
  seller: Seller;
  reviews: Review[];
}

export interface Seller {
  id: string;
  name: string;
  location: string;
  row: string;
  container: string;
  phone: string;
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  nameRu: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'clothing', name: 'Clothing', nameRu: 'Одежда', icon: '👕' },
  { id: 'shoes', name: 'Shoes', nameRu: 'Обувь', icon: '👟' },
  { id: 'electronics', name: 'Electronics', nameRu: 'Электроника', icon: '📱' },
  { id: 'kidswear', name: 'Kidswear', nameRu: 'Детское', icon: '🧸' },
  { id: 'home', name: 'Home', nameRu: 'Для дома', icon: '🏠' },
  { id: 'accessories', name: 'Accessories', nameRu: 'Аксессуары', icon: '⌚' },
  { id: 'cosmetics', name: 'Cosmetics', nameRu: 'Косметика', icon: '💄' },
  { id: 'bags', name: 'Bags', nameRu: 'Сумки', icon: '👜' },
];

export const sellers: Seller[] = [
  { id: 's1', name: 'Fashion House', location: 'Dordoi', row: 'A5', container: '12', phone: '+996 555 123 456', rating: 4.8 },
  { id: 's2', name: 'TechZone', location: 'Dordoi', row: 'B10', container: '47', phone: '+996 555 234 567', rating: 4.9 },
  { id: 's3', name: 'Kids Paradise', location: 'Dordoi', row: 'C3', container: '88', phone: '+996 555 345 678', rating: 4.7 },
  { id: 's4', name: 'Home Style', location: 'Dordoi', row: 'D7', container: '23', phone: '+996 555 456 789', rating: 4.6 },
  { id: 's5', name: 'Beauty World', location: 'Dordoi', row: 'E2', container: '56', phone: '+996 555 567 890', rating: 4.8 },
  { id: 's6', name: 'Bag Master', location: 'Dordoi', row: 'F9', container: '34', phone: '+996 555 678 901', rating: 4.5 },
];

const generateReviews = (): Review[] => {
  const reviewTexts = [
    'Отличное качество! Рекомендую.',
    'Быстрая доставка, товар как на фото.',
    'Хороший продавец, буду заказывать ещё.',
    'Размер подошёл идеально.',
    'Цена/качество на высоте!',
  ];
  return [
    { id: 'r1', author: 'Айгуль М.', rating: 5, text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)], date: '2024-12-01' },
    { id: 'r2', author: 'Бакыт К.', rating: 4, text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)], date: '2024-12-05' },
  ];
};

export const products: Product[] = [
  // CLOTHING (20 products)
  { id: 'c1', name: 'Футболка оверсайз женская', price: 650, originalPrice: 850, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'clothing', badge: 'hot', description: 'Стильная оверсайз футболка из хлопка. Идеальна для повседневной носки.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Черный', 'Серый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c2', name: 'Футболка оверсайз однотонная', price: 590, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', category: 'clothing', description: 'Базовая футболка свободного кроя.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Розовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c3', name: 'Футболка с принтом', price: 720, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', category: 'clothing', badge: 'new', description: 'Модная футболка с ярким принтом.', sizes: ['M', 'L', 'XL'], colors: ['Белый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c4', name: 'Джинсы женские скинни', price: 1300, originalPrice: 1600, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', category: 'clothing', badge: 'top', description: 'Облегающие джинсы высокой посадки.', sizes: ['26', '27', '28', '29', '30'], colors: ['Синий', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c5', name: 'Джинсы мом', price: 1450, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400', category: 'clothing', description: 'Джинсы свободного кроя мом.', sizes: ['26', '27', '28', '29'], colors: ['Голубой'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c6', name: 'Джинсы классические', price: 1250, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'clothing', description: 'Классические прямые джинсы.', sizes: ['28', '30', '32', '34'], colors: ['Темно-синий'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c7', name: 'Худи унисекс', price: 1100, originalPrice: 1400, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', category: 'clothing', badge: 'hot', description: 'Теплое худи с капюшоном и карманом.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Серый', 'Черный', 'Бордовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c8', name: 'Худи с принтом', price: 1250, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400', category: 'clothing', badge: 'new', description: 'Стильное худи с модным принтом.', sizes: ['M', 'L', 'XL'], colors: ['Белый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c9', name: 'Свитер вязаный', price: 1500, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', category: 'clothing', description: 'Уютный вязаный свитер на зиму.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c10', name: 'Платье летнее', price: 980, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', category: 'clothing', badge: 'top', description: 'Легкое летнее платье с цветочным принтом.', sizes: ['S', 'M', 'L'], colors: ['Цветочный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c11', name: 'Юбка мини', price: 750, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj5a?w=400', category: 'clothing', description: 'Короткая юбка на каждый день.', sizes: ['XS', 'S', 'M'], colors: ['Черный', 'Бежевый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c12', name: 'Брюки классические', price: 1200, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', category: 'clothing', description: 'Элегантные классические брюки.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Серый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c13', name: 'Рубашка хлопковая', price: 890, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', category: 'clothing', badge: 'new', description: 'Классическая рубашка из натурального хлопка.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Голубой'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c14', name: 'Куртка джинсовая', price: 2200, originalPrice: 2800, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', category: 'clothing', badge: 'hot', description: 'Стильная джинсовая куртка.', sizes: ['S', 'M', 'L'], colors: ['Синий'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c15', name: 'Пальто демисезонное', price: 3500, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', category: 'clothing', badge: 'top', description: 'Элегантное пальто на осень/весну.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c16', name: 'Шорты джинсовые', price: 680, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400', category: 'clothing', description: 'Летние джинсовые шорты.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Голубой', 'Белый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c17', name: 'Костюм спортивный', price: 2100, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', category: 'clothing', description: 'Удобный спортивный костюм.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Серый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c18', name: 'Блузка шелковая', price: 1350, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400', category: 'clothing', badge: 'new', description: 'Нежная блузка из искусственного шелка.', sizes: ['S', 'M', 'L'], colors: ['Белый', 'Розовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c19', name: 'Кардиган длинный', price: 1650, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', category: 'clothing', description: 'Удлиненный кардиган на пуговицах.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Серый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'c20', name: 'Жилет стеганый', price: 1800, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400', category: 'clothing', badge: 'hot', description: 'Теплый стеганый жилет.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Зеленый'], seller: sellers[0], reviews: generateReviews() },

  // SHOES (20 products)
  { id: 's1', name: 'Кроссовки мужские', price: 1800, originalPrice: 2200, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'shoes', badge: 'hot', description: 'Легкие спортивные кроссовки для бега.', sizes: ['40', '41', '42', '43', '44'], colors: ['Красный', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's2', name: 'Кроссовки белые', price: 1650, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', category: 'shoes', description: 'Классические белые кроссовки.', sizes: ['38', '39', '40', '41', '42'], colors: ['Белый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's3', name: 'Кроссовки спортивные', price: 1950, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', category: 'shoes', badge: 'new', description: 'Профессиональные беговые кроссовки.', sizes: ['40', '41', '42', '43'], colors: ['Синий', 'Оранжевый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's4', name: 'Туфли женские', price: 2200, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'shoes', badge: 'top', description: 'Элегантные женские туфли на каблуке.', sizes: ['36', '37', '38', '39'], colors: ['Черный', 'Бежевый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's5', name: 'Ботинки зимние', price: 3200, originalPrice: 4000, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'shoes', badge: 'hot', description: 'Теплые зимние ботинки на меху.', sizes: ['39', '40', '41', '42', '43'], colors: ['Коричневый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's6', name: 'Сандалии летние', price: 890, image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400', category: 'shoes', description: 'Удобные летние сандалии.', sizes: ['36', '37', '38', '39', '40'], colors: ['Бежевый', 'Белый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's7', name: 'Мокасины кожаные', price: 1600, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400', category: 'shoes', description: 'Мягкие кожаные мокасины.', sizes: ['40', '41', '42', '43', '44'], colors: ['Коричневый', 'Синий'], seller: sellers[0], reviews: generateReviews() },
  { id: 's8', name: 'Слипоны женские', price: 950, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', category: 'shoes', badge: 'new', description: 'Легкие слипоны на лето.', sizes: ['36', '37', '38', '39'], colors: ['Белый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's9', name: 'Кеды высокие', price: 1400, image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400', category: 'shoes', description: 'Классические высокие кеды.', sizes: ['38', '39', '40', '41', '42'], colors: ['Белый', 'Черный', 'Красный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's10', name: 'Балетки', price: 780, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', category: 'shoes', description: 'Женские балетки на плоской подошве.', sizes: ['36', '37', '38', '39'], colors: ['Черный', 'Бежевый', 'Красный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's11', name: 'Ботильоны', price: 2800, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'shoes', badge: 'top', description: 'Стильные женские ботильоны.', sizes: ['36', '37', '38', '39', '40'], colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's12', name: 'Лоферы', price: 1750, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400', category: 'shoes', description: 'Классические лоферы унисекс.', sizes: ['38', '39', '40', '41', '42'], colors: ['Черный', 'Бордовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's13', name: 'Угги', price: 2400, originalPrice: 3000, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'shoes', badge: 'hot', description: 'Теплые зимние угги.', sizes: ['36', '37', '38', '39', '40'], colors: ['Бежевый', 'Серый', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's14', name: 'Шлепанцы', price: 450, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400', category: 'shoes', description: 'Пляжные шлепанцы.', sizes: ['36', '37', '38', '39', '40', '41', '42'], colors: ['Черный', 'Синий', 'Розовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's15', name: 'Эспадрильи', price: 850, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400', category: 'shoes', badge: 'new', description: 'Летние эспадрильи.', sizes: ['37', '38', '39', '40'], colors: ['Синий', 'Бежевый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's16', name: 'Ботинки челси', price: 2600, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400', category: 'shoes', description: 'Классические ботинки челси.', sizes: ['40', '41', '42', '43', '44'], colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's17', name: 'Босоножки на каблуке', price: 1900, image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400', category: 'shoes', badge: 'top', description: 'Элегантные босоножки.', sizes: ['36', '37', '38', '39'], colors: ['Золотой', 'Серебряный', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's18', name: 'Кроссовки платформа', price: 2100, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', category: 'shoes', description: 'Модные кроссовки на платформе.', sizes: ['36', '37', '38', '39', '40'], colors: ['Белый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 's19', name: 'Сапоги высокие', price: 3800, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'shoes', description: 'Высокие сапоги на зиму.', sizes: ['36', '37', '38', '39', '40'], colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 's20', name: 'Кроссовки на липучках', price: 1350, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400', category: 'shoes', description: 'Удобные кроссовки на липучках.', sizes: ['38', '39', '40', '41', '42'], colors: ['Белый', 'Серый'], seller: sellers[0], reviews: generateReviews() },

  // ELECTRONICS (20 products)
  { id: 'e1', name: 'Power Bank 20000mAh', price: 1200, originalPrice: 1500, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', category: 'electronics', badge: 'hot', description: 'Портативное зарядное устройство большой емкости.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e2', name: 'Power Bank 10000mAh', price: 750, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400', category: 'electronics', description: 'Компактный павербанк.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e3', name: 'Power Bank 30000mAh', price: 1800, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', category: 'electronics', badge: 'top', description: 'Павербанк максимальной емкости.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e4', name: 'Наушники беспроводные', price: 2500, originalPrice: 3200, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'electronics', badge: 'hot', description: 'Bluetooth наушники с шумоподавлением.', colors: ['Черный', 'Белый'], seller: sellers[1], reviews: generateReviews() },
  { id: 'e5', name: 'Наушники TWS', price: 1800, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', category: 'electronics', badge: 'new', description: 'Беспроводные TWS наушники.', colors: ['Белый', 'Черный'], seller: sellers[1], reviews: generateReviews() },
  { id: 'e6', name: 'Смарт-часы', price: 3500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'electronics', badge: 'top', description: 'Умные часы с измерением пульса.', colors: ['Черный', 'Серебро', 'Золото'], seller: sellers[1], reviews: generateReviews() },
  { id: 'e7', name: 'Фитнес-браслет', price: 1500, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', category: 'electronics', description: 'Браслет для отслеживания активности.', colors: ['Черный', 'Синий', 'Розовый'], seller: sellers[1], reviews: generateReviews() },
  { id: 'e8', name: 'Колонка Bluetooth', price: 1900, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', category: 'electronics', badge: 'hot', description: 'Портативная колонка с мощным звуком.', colors: ['Черный', 'Красный', 'Синий'], seller: sellers[1], reviews: generateReviews() },
  { id: 'e9', name: 'USB-хаб', price: 650, image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400', category: 'electronics', description: 'USB разветвитель на 4 порта.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e10', name: 'Зарядка быстрая', price: 890, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400', category: 'electronics', description: 'Быстрое зарядное устройство 65W.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e11', name: 'Кабель Type-C', price: 250, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'electronics', description: 'Кабель USB-C для зарядки.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e12', name: 'Webcam HD', price: 2200, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400', category: 'electronics', badge: 'new', description: 'Веб-камера высокого разрешения.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e13', name: 'Мышь беспроводная', price: 780, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', category: 'electronics', description: 'Эргономичная беспроводная мышь.', colors: ['Черный', 'Белый'], seller: sellers[1], reviews: generateReviews() },
  { id: 'e14', name: 'Клавиатура механическая', price: 2800, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400', category: 'electronics', badge: 'top', description: 'Игровая механическая клавиатура с RGB.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e15', name: 'Подставка для ноутбука', price: 1100, image: 'https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=400', category: 'electronics', description: 'Алюминиевая подставка с охлаждением.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e16', name: 'Светодиодная лента', price: 450, image: 'https://images.unsplash.com/photo-1558618047-f4b511cc0e86?w=400', category: 'electronics', description: 'RGB лента для декора.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e17', name: 'Картридер', price: 350, image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400', category: 'electronics', description: 'Универсальный картридер SD/microSD.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e18', name: 'Селфи-палка', price: 550, image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400', category: 'electronics', description: 'Селфи-палка с Bluetooth.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e19', name: 'Кольцевая лампа', price: 1600, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400', category: 'electronics', badge: 'hot', description: 'LED лампа для съемки.', seller: sellers[1], reviews: generateReviews() },
  { id: 'e20', name: 'Электронная книга', price: 8500, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', category: 'electronics', description: 'E-ink ридер для чтения.', seller: sellers[1], reviews: generateReviews() },

  // KIDSWEAR (20 products)
  { id: 'k1', name: 'Платье летнее детское', price: 750, originalPrice: 950, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', category: 'kidswear', badge: 'hot', description: 'Яркое летнее платье для девочки.', sizes: ['98', '104', '110', '116'], colors: ['Розовый', 'Желтый'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k2', name: 'Платье праздничное', price: 1200, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', category: 'kidswear', badge: 'new', description: 'Нарядное платье на праздник.', sizes: ['104', '110', '116', '122'], colors: ['Белый', 'Розовый'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k3', name: 'Платье джинсовое', price: 890, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', category: 'kidswear', description: 'Джинсовое платье для девочки.', sizes: ['98', '104', '110'], colors: ['Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k4', name: 'Костюм спортивный детский', price: 1100, image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400', category: 'kidswear', badge: 'top', description: 'Удобный спортивный костюм.', sizes: ['104', '110', '116', '122', '128'], colors: ['Серый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k5', name: 'Джинсы детские', price: 680, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Джинсы для мальчика/девочки.', sizes: ['98', '104', '110', '116'], colors: ['Синий', 'Черный'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k6', name: 'Футболка детская', price: 350, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Хлопковая футболка с принтом.', sizes: ['98', '104', '110', '116', '122'], colors: ['Белый', 'Желтый', 'Голубой'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k7', name: 'Куртка демисезонная', price: 1800, originalPrice: 2300, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', badge: 'hot', description: 'Легкая куртка на весну/осень.', sizes: ['104', '110', '116', '122'], colors: ['Синий', 'Красный'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k8', name: 'Комбинезон зимний', price: 3500, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', badge: 'top', description: 'Теплый зимний комбинезон.', sizes: ['86', '92', '98', '104'], colors: ['Розовый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k9', name: 'Пижама детская', price: 550, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Мягкая хлопковая пижама.', sizes: ['98', '104', '110', '116'], colors: ['Розовый', 'Голубой'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k10', name: 'Шапка детская', price: 280, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Вязаная шапка с помпоном.', sizes: ['48-50', '50-52', '52-54'], colors: ['Розовый', 'Серый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k11', name: 'Кроссовки детские', price: 1200, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', badge: 'new', description: 'Легкие кроссовки для детей.', sizes: ['25', '26', '27', '28', '29', '30'], colors: ['Белый', 'Розовый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k12', name: 'Сандалии детские', price: 650, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Летние сандалии.', sizes: ['24', '25', '26', '27', '28'], colors: ['Розовый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k13', name: 'Рюкзак школьный', price: 980, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'kidswear', badge: 'hot', description: 'Ортопедический школьный рюкзак.', colors: ['Розовый', 'Синий', 'Черный'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k14', name: 'Носки детские (5 пар)', price: 250, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Набор хлопковых носков.', sizes: ['22-24', '25-27', '28-30'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k15', name: 'Шорты детские', price: 380, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Легкие летние шорты.', sizes: ['98', '104', '110', '116'], colors: ['Синий', 'Серый'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k16', name: 'Свитер детский', price: 750, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Теплый вязаный свитер.', sizes: ['104', '110', '116', '122'], colors: ['Серый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k17', name: 'Боди для малыша', price: 320, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Хлопковое боди.', sizes: ['56', '62', '68', '74', '80'], colors: ['Белый', 'Розовый', 'Голубой'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k18', name: 'Юбка для девочки', price: 450, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', badge: 'new', description: 'Пышная юбка-пачка.', sizes: ['98', '104', '110', '116'], colors: ['Розовый', 'Белый', 'Фиолетовый'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k19', name: 'Толстовка детская', price: 680, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Толстовка с капюшоном.', sizes: ['104', '110', '116', '122', '128'], colors: ['Серый', 'Розовый', 'Синий'], seller: sellers[2], reviews: generateReviews() },
  { id: 'k20', name: 'Варежки детские', price: 180, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Теплые варежки на зиму.', sizes: ['2-3 года', '4-5 лет', '6-7 лет'], colors: ['Розовый', 'Синий', 'Красный'], seller: sellers[2], reviews: generateReviews() },

  // HOME (20 products)
  { id: 'h1', name: 'Постельное белье', price: 1800, originalPrice: 2200, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', category: 'home', badge: 'hot', description: 'Комплект постельного белья из хлопка.', sizes: ['1.5-спальный', '2-спальный', 'Евро'], colors: ['Белый', 'Серый', 'Бежевый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h2', name: 'Подушка ортопедическая', price: 1200, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', category: 'home', badge: 'top', description: 'Подушка с эффектом памяти.', seller: sellers[3], reviews: generateReviews() },
  { id: 'h3', name: 'Одеяло летнее', price: 950, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', category: 'home', description: 'Легкое одеяло на лето.', sizes: ['1.5-спальный', '2-спальный'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h4', name: 'Полотенце банное', price: 450, image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=400', category: 'home', description: 'Махровое полотенце 70x140.', colors: ['Белый', 'Голубой', 'Розовый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h5', name: 'Набор полотенец', price: 1100, image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=400', category: 'home', badge: 'new', description: 'Набор из 3 полотенец.', colors: ['Белый', 'Серый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h6', name: 'Плед флисовый', price: 780, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'home', description: 'Мягкий флисовый плед.', colors: ['Серый', 'Бежевый', 'Коричневый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h7', name: 'Шторы готовые', price: 1500, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400', category: 'home', description: 'Готовые шторы на люверсах.', colors: ['Бежевый', 'Серый', 'Белый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h8', name: 'Ковер прикроватный', price: 2200, originalPrice: 2800, image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400', category: 'home', badge: 'hot', description: 'Мягкий ковер 80x150.', colors: ['Серый', 'Бежевый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h9', name: 'Подушка декоративная', price: 380, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', category: 'home', description: 'Декоративная подушка 45x45.', colors: ['Разные'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h10', name: 'Ваза стеклянная', price: 550, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400', category: 'home', description: 'Элегантная ваза для цветов.', colors: ['Прозрачный', 'Синий', 'Зеленый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h11', name: 'Свечи ароматические', price: 320, image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400', category: 'home', badge: 'new', description: 'Набор ароматических свечей.', seller: sellers[3], reviews: generateReviews() },
  { id: 'h12', name: 'Корзина для белья', price: 680, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'home', description: 'Плетеная корзина для белья.', colors: ['Бежевый', 'Белый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h13', name: 'Органайзер для вещей', price: 450, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'home', description: 'Складной органайзер.', colors: ['Серый', 'Бежевый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h14', name: 'Зеркало настенное', price: 1800, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400', category: 'home', badge: 'top', description: 'Круглое зеркало в раме.', seller: sellers[3], reviews: generateReviews() },
  { id: 'h15', name: 'Часы настенные', price: 980, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', category: 'home', description: 'Стильные настенные часы.', colors: ['Черный', 'Белый', 'Золотой'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h16', name: 'Рамка для фото', price: 250, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400', category: 'home', description: 'Рамка 10x15 см.', colors: ['Белый', 'Черный', 'Дерево'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h17', name: 'Коврик в ванную', price: 380, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'home', description: 'Антискользящий коврик.', colors: ['Белый', 'Серый', 'Голубой'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h18', name: 'Шкатулка для украшений', price: 650, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'home', badge: 'new', description: 'Шкатулка с зеркалом.', colors: ['Белый', 'Розовый'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h19', name: 'Крючки настенные', price: 180, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'home', description: 'Набор крючков (4 шт).', colors: ['Черный', 'Белый', 'Золотой'], seller: sellers[3], reviews: generateReviews() },
  { id: 'h20', name: 'Светильник настольный', price: 1200, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', category: 'home', description: 'LED лампа для стола.', colors: ['Белый', 'Черный'], seller: sellers[3], reviews: generateReviews() },

  // ACCESSORIES (20 products)
  { id: 'a1', name: 'Часы наручные', price: 2500, originalPrice: 3200, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', category: 'accessories', badge: 'hot', description: 'Стильные кварцевые часы.', colors: ['Серебро', 'Золото', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a2', name: 'Часы спортивные', price: 1800, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', category: 'accessories', description: 'Спортивные часы с подсветкой.', colors: ['Черный', 'Синий'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a3', name: 'Часы классические', price: 3500, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', category: 'accessories', badge: 'top', description: 'Классические часы на кожаном ремешке.', colors: ['Коричневый', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a4', name: 'Солнцезащитные очки', price: 980, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category: 'accessories', badge: 'hot', description: 'Модные солнцезащитные очки.', colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a5', name: 'Очки авиаторы', price: 1200, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category: 'accessories', description: 'Классические авиаторы.', colors: ['Золотой', 'Серебро'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a6', name: 'Ремень кожаный', price: 650, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'accessories', description: 'Ремень из натуральной кожи.', sizes: ['90', '95', '100', '105', '110'], colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a7', name: 'Шарф шерстяной', price: 780, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400', category: 'accessories', badge: 'new', description: 'Теплый шерстяной шарф.', colors: ['Серый', 'Бежевый', 'Бордовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a8', name: 'Перчатки кожаные', price: 890, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400', category: 'accessories', description: 'Кожаные перчатки на зиму.', sizes: ['S', 'M', 'L'], colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a9', name: 'Кепка бейсболка', price: 450, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400', category: 'accessories', description: 'Хлопковая кепка.', colors: ['Черный', 'Белый', 'Синий'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a10', name: 'Шляпа панама', price: 580, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400', category: 'accessories', badge: 'new', description: 'Модная панама на лето.', colors: ['Бежевый', 'Черный', 'Белый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a11', name: 'Кошелек женский', price: 1100, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', category: 'accessories', badge: 'hot', description: 'Кошелек из экокожи.', colors: ['Черный', 'Красный', 'Бежевый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a12', name: 'Кошелек мужской', price: 950, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', category: 'accessories', description: 'Портмоне из кожи.', colors: ['Черный', 'Коричневый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a13', name: 'Браслет серебряный', price: 1500, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', category: 'accessories', badge: 'top', description: 'Браслет из серебра 925.', seller: sellers[0], reviews: generateReviews() },
  { id: 'a14', name: 'Серьги золотые', price: 2800, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', category: 'accessories', description: 'Серьги с позолотой.', seller: sellers[0], reviews: generateReviews() },
  { id: 'a15', name: 'Колье с подвеской', price: 680, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', category: 'accessories', description: 'Элегантное колье.', colors: ['Серебро', 'Золото'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a16', name: 'Зонт автомат', price: 750, image: 'https://images.unsplash.com/photo-1534309466160-70b22cc6252c?w=400', category: 'accessories', description: 'Зонт-автомат складной.', colors: ['Черный', 'Синий', 'Бордовый'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a17', name: 'Галстук шелковый', price: 550, image: 'https://images.unsplash.com/photo-1598032895455-1c03aa15dcda?w=400', category: 'accessories', description: 'Классический галстук.', colors: ['Синий', 'Красный', 'Черный'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a18', name: 'Платок шелковый', price: 480, image: 'https://images.unsplash.com/photo-1598032895455-1c03aa15dcda?w=400', category: 'accessories', badge: 'new', description: 'Платок для шеи.', colors: ['Разные'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a19', name: 'Заколка для волос', price: 180, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', category: 'accessories', description: 'Набор заколок.', colors: ['Золото', 'Серебро'], seller: sellers[0], reviews: generateReviews() },
  { id: 'a20', name: 'Резинки для волос', price: 120, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', category: 'accessories', description: 'Набор резинок (10 шт).', colors: ['Разные'], seller: sellers[0], reviews: generateReviews() },

  // COSMETICS (20 products)
  { id: 'cos1', name: 'Помада матовая', price: 450, originalPrice: 600, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'cosmetics', badge: 'hot', description: 'Стойкая матовая помада.', colors: ['Красный', 'Розовый', 'Nude'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos2', name: 'Помада глянцевая', price: 380, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'cosmetics', description: 'Блестящая помада.', colors: ['Коралл', 'Ягодный'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos3', name: 'Блеск для губ', price: 320, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'cosmetics', badge: 'new', description: 'Увлажняющий блеск.', colors: ['Розовый', 'Прозрачный'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos4', name: 'Тушь для ресниц', price: 550, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', category: 'cosmetics', badge: 'top', description: 'Объемная тушь черная.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos5', name: 'Тени для век', price: 680, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', category: 'cosmetics', description: 'Палетка теней 12 цветов.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos6', name: 'Подводка для глаз', price: 350, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', category: 'cosmetics', description: 'Черная подводка-фломастер.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos7', name: 'Тональный крем', price: 780, originalPrice: 950, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', badge: 'hot', description: 'Легкий тональный крем SPF15.', colors: ['Светлый', 'Средний', 'Темный'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos8', name: 'Пудра компактная', price: 450, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', description: 'Матирующая пудра.', colors: ['Светлый', 'Средний'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos9', name: 'Румяна', price: 380, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', description: 'Румяна нежного оттенка.', colors: ['Персик', 'Розовый'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos10', name: 'Хайлайтер', price: 520, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', badge: 'new', description: 'Сияющий хайлайтер.', colors: ['Золотой', 'Серебряный'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos11', name: 'Крем для лица', price: 650, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'cosmetics', description: 'Увлажняющий дневной крем.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos12', name: 'Сыворотка для лица', price: 980, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'cosmetics', badge: 'top', description: 'Сыворотка с гиалуроновой кислотой.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos13', name: 'Маска для лица', price: 180, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'cosmetics', description: 'Тканевая маска.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos14', name: 'Мицеллярная вода', price: 350, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'cosmetics', description: 'Средство для снятия макияжа.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos15', name: 'Духи женские', price: 2500, originalPrice: 3200, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', category: 'cosmetics', badge: 'hot', description: 'Парфюмерная вода 50 мл.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos16', name: 'Духи мужские', price: 2200, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', category: 'cosmetics', description: 'Туалетная вода 50 мл.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos17', name: 'Набор кистей', price: 850, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', badge: 'new', description: 'Набор кистей для макияжа (7 шт).', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos18', name: 'Лак для ногтей', price: 180, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', description: 'Стойкий лак.', colors: ['Красный', 'Розовый', 'Nude', 'Черный'], seller: sellers[4], reviews: generateReviews() },
  { id: 'cos19', name: 'Крем для рук', price: 220, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'cosmetics', description: 'Питательный крем.', seller: sellers[4], reviews: generateReviews() },
  { id: 'cos20', name: 'Бальзам для губ', price: 150, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'cosmetics', description: 'Увлажняющий бальзам.', colors: ['Без цвета', 'Розовый'], seller: sellers[4], reviews: generateReviews() },

  // BAGS (20 products)
  { id: 'b1', name: 'Сумка женская', price: 2200, originalPrice: 2800, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', badge: 'hot', description: 'Стильная сумка на каждый день.', colors: ['Черный', 'Бежевый', 'Красный'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b2', name: 'Сумка кросс-боди', price: 1500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', description: 'Компактная сумка через плечо.', colors: ['Черный', 'Коричневый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b3', name: 'Сумка шоппер', price: 1800, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', badge: 'new', description: 'Вместительная сумка-шоппер.', colors: ['Черный', 'Бежевый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b4', name: 'Рюкзак городской', price: 1650, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', badge: 'top', description: 'Удобный рюкзак для города.', colors: ['Черный', 'Серый', 'Синий'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b5', name: 'Рюкзак кожаный', price: 2800, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', description: 'Рюкзак из экокожи.', colors: ['Черный', 'Коричневый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b6', name: 'Рюкзак мини', price: 1200, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', badge: 'hot', description: 'Маленький стильный рюкзак.', colors: ['Черный', 'Розовый', 'Белый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b7', name: 'Клатч вечерний', price: 1100, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', category: 'bags', description: 'Элегантный клатч.', colors: ['Черный', 'Золотой', 'Серебряный'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b8', name: 'Портфель деловой', price: 3500, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', category: 'bags', badge: 'top', description: 'Портфель для документов.', colors: ['Черный', 'Коричневый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b9', name: 'Сумка для ноутбука', price: 1900, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', category: 'bags', description: 'Сумка для ноутбука 15.6".', colors: ['Черный', 'Серый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b10', name: 'Поясная сумка', price: 780, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', badge: 'new', description: 'Модная поясная сумка.', colors: ['Черный', 'Красный', 'Белый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b11', name: 'Дорожная сумка', price: 2400, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', description: 'Вместительная дорожная сумка.', colors: ['Черный', 'Серый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b12', name: 'Спортивная сумка', price: 1350, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', description: 'Сумка для тренировок.', colors: ['Черный', 'Синий', 'Розовый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b13', name: 'Чемодан маленький', price: 4500, originalPrice: 5500, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400', category: 'bags', badge: 'hot', description: 'Чемодан для ручной клади.', colors: ['Черный', 'Красный', 'Серебро'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b14', name: 'Чемодан средний', price: 5800, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400', category: 'bags', description: 'Чемодан среднего размера.', colors: ['Черный', 'Синий'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b15', name: 'Косметичка', price: 450, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', category: 'bags', description: 'Дорожная косметичка.', colors: ['Розовый', 'Черный', 'Белый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b16', name: 'Органайзер для сумки', price: 380, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', category: 'bags', description: 'Вставка-органайзер.', colors: ['Бежевый', 'Черный'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b17', name: 'Сумка пляжная', price: 650, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', badge: 'new', description: 'Большая пляжная сумка.', colors: ['Бежевый', 'Синий'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b18', name: 'Сумка-мешок', price: 980, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', description: 'Мягкая сумка-мешок.', colors: ['Черный', 'Коричневый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b19', name: 'Кошелек-клатч', price: 750, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', category: 'bags', description: 'Большой кошелек на молнии.', colors: ['Черный', 'Красный', 'Бежевый'], seller: sellers[5], reviews: generateReviews() },
  { id: 'b20', name: 'Барсетка', price: 850, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', category: 'bags', description: 'Мужская барсетка.', colors: ['Черный', 'Коричневый'], seller: sellers[5], reviews: generateReviews() },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
};

export const getRelatedProducts = (product: Product): Product[] => {
  // AI recommendation logic - suggest complementary items
  const categoryMappings: Record<string, string[]> = {
    'clothing': ['shoes', 'accessories', 'bags'],
    'shoes': ['clothing', 'accessories', 'bags'],
    'electronics': ['accessories', 'home'],
    'kidswear': ['accessories', 'bags'],
    'home': ['accessories', 'electronics'],
    'accessories': ['clothing', 'bags', 'cosmetics'],
    'cosmetics': ['accessories', 'bags'],
    'bags': ['clothing', 'accessories'],
  };
  
  const relatedCategories = categoryMappings[product.category] || [];
  const related: Product[] = [];
  
  relatedCategories.forEach(cat => {
    const catProducts = getProductsByCategory(cat).slice(0, 2);
    related.push(...catProducts);
  });
  
  return related.slice(0, 6);
};

export const getSimilarProducts = (product: Product): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 5);
};
