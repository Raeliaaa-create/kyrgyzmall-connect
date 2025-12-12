import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Complete product database with Russian names, descriptions, and location info
const products = [
  // CLOTHING
  { id: 'c1', name: 'Футболка оверсайз женская белая', price: 650, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'clothing', badge: 'hot', description: 'Стильная оверсайз футболка из хлопка белого цвета. Идеальна для повседневной носки.', keywords: 'футболка оверсайз белая женская хлопок повседневная', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Черный', 'Серый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c2', name: 'Футболка оверсайз однотонная', price: 590, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', category: 'clothing', description: 'Базовая футболка свободного кроя однотонная.', keywords: 'футболка базовая однотонная свободная', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Розовый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c3', name: 'Футболка с принтом', price: 720, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', category: 'clothing', badge: 'new', description: 'Модная футболка с ярким принтом.', keywords: 'футболка принт яркая модная', sizes: ['M', 'L', 'XL'], colors: ['Белый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c4', name: 'Джинсы женские скинни', price: 1300, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', category: 'clothing', badge: 'top', description: 'Облегающие джинсы высокой посадки для женщин.', keywords: 'джинсы скинни женские облегающие высокая посадка', sizes: ['26', '27', '28', '29', '30'], colors: ['Синий', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c5', name: 'Джинсы мом голубые', price: 1450, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400', category: 'clothing', description: 'Джинсы свободного кроя мом голубого цвета.', keywords: 'джинсы мом голубые свободные', sizes: ['26', '27', '28', '29'], colors: ['Голубой'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c6', name: 'Джинсы классические прямые', price: 1250, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'clothing', description: 'Классические прямые джинсы темно-синего цвета.', keywords: 'джинсы классические прямые темно-синие', sizes: ['28', '30', '32', '34'], colors: ['Темно-синий'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c7', name: 'Худи унисекс чёрное', price: 1100, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', category: 'clothing', badge: 'hot', description: 'Теплое худи с капюшоном и карманом чёрного цвета. Подходит для мужчин и женщин.', keywords: 'худи черное унисекс капюшон карман теплое кофта толстовка', sizes: ['S', 'M', 'L', 'XL'], colors: ['Серый', 'Черный', 'Бордовый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c8', name: 'Худи с принтом белое', price: 1250, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400', category: 'clothing', badge: 'new', description: 'Стильное худи с модным принтом белого цвета.', keywords: 'худи принт белое стильное модное кофта толстовка', sizes: ['M', 'L', 'XL'], colors: ['Белый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c9', name: 'Свитер вязаный бежевый', price: 1500, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', category: 'clothing', description: 'Уютный вязаный свитер на зиму бежевого цвета.', keywords: 'свитер вязаный бежевый зимний уютный кофта', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Коричневый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c10', name: 'Платье летнее цветочное', price: 980, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', category: 'clothing', badge: 'top', description: 'Легкое летнее платье с цветочным принтом.', keywords: 'платье летнее цветочное легкое женское', sizes: ['S', 'M', 'L'], colors: ['Цветочный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c11', name: 'Куртка джинсовая синяя', price: 2200, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', category: 'clothing', badge: 'hot', description: 'Стильная джинсовая куртка синего цвета.', keywords: 'куртка джинсовая синяя стильная джинсовка', sizes: ['S', 'M', 'L'], colors: ['Синий'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c12', name: 'Пальто демисезонное бежевое', price: 3500, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', category: 'clothing', badge: 'top', description: 'Элегантное пальто на осень и весну бежевого цвета.', keywords: 'пальто демисезонное бежевое элегантное осеннее весеннее', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c13', name: 'Костюм спортивный серый', price: 2100, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', category: 'clothing', description: 'Удобный спортивный костюм серого цвета.', keywords: 'костюм спортивный серый удобный', sizes: ['S', 'M', 'L', 'XL'], colors: ['Серый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c14', name: 'Рубашка хлопковая белая', price: 890, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', category: 'clothing', badge: 'new', description: 'Классическая рубашка из натурального хлопка белого цвета.', keywords: 'рубашка хлопковая белая классическая', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Голубой'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  
  // SHOES
  { id: 'sh1', name: 'Кроссовки мужские красные', price: 1800, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'shoes', badge: 'hot', description: 'Легкие спортивные кроссовки для бега красного цвета.', keywords: 'кроссовки мужские красные спортивные бег', sizes: ['40', '41', '42', '43', '44'], colors: ['Красный', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh2', name: 'Кроссовки белые классические', price: 1650, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', category: 'shoes', description: 'Классические белые кроссовки на каждый день.', keywords: 'кроссовки белые классические повседневные', sizes: ['38', '39', '40', '41', '42'], colors: ['Белый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh3', name: 'Кроссовки спортивные синие', price: 1950, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', category: 'shoes', badge: 'new', description: 'Профессиональные беговые кроссовки синего цвета.', keywords: 'кроссовки спортивные синие беговые профессиональные', sizes: ['40', '41', '42', '43'], colors: ['Синий', 'Оранжевый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh4', name: 'Туфли женские на каблуке', price: 2200, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'shoes', badge: 'top', description: 'Элегантные женские туфли на каблуке черного цвета.', keywords: 'туфли женские каблук черные элегантные', sizes: ['36', '37', '38', '39'], colors: ['Черный', 'Бежевый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh5', name: 'Ботинки зимние тёплые', price: 3200, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'shoes', badge: 'hot', description: 'Теплые зимние ботинки на меху коричневого цвета.', keywords: 'ботинки зимние тёплые мех коричневые', sizes: ['39', '40', '41', '42', '43'], colors: ['Коричневый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh6', name: 'Сандалии летние бежевые', price: 890, image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400', category: 'shoes', description: 'Удобные летние сандалии бежевого цвета.', keywords: 'сандалии летние бежевые удобные', sizes: ['36', '37', '38', '39', '40'], colors: ['Бежевый', 'Белый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  
  // ELECTRONICS
  { id: 'e1', name: 'Power Bank 20000mAh', price: 1200, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', category: 'electronics', badge: 'hot', description: 'Портативное зарядное устройство большой емкости 20000 мАч.', keywords: 'павербанк зарядка портативная 20000 аккумулятор', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e2', name: 'Power Bank 10000mAh компактный', price: 750, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400', category: 'electronics', description: 'Компактный павербанк 10000 мАч.', keywords: 'павербанк компактный зарядка 10000', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e3', name: 'Наушники беспроводные чёрные', price: 2500, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'electronics', badge: 'hot', description: 'Bluetooth наушники с шумоподавлением чёрного цвета.', keywords: 'наушники беспроводные bluetooth чёрные шумоподавление', colors: ['Черный', 'Белый'], sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e4', name: 'Смарт-часы с пульсометром', price: 4500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'electronics', badge: 'top', description: 'Умные часы с пульсометром и GPS.', keywords: 'смарт часы умные пульсометр gps фитнес', colors: ['Черный', 'Серебро'], sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e5', name: 'Зарядка беспроводная', price: 950, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400', category: 'electronics', description: 'Беспроводная зарядка для смартфона.', keywords: 'зарядка беспроводная смартфон телефон', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e6', name: 'Наушники вкладыши белые', price: 1200, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', category: 'electronics', badge: 'new', description: 'Беспроводные наушники вкладыши белого цвета.', keywords: 'наушники вкладыши беспроводные белые', colors: ['Белый'], sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e7', name: 'Колонка Bluetooth портативная', price: 1800, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', category: 'electronics', description: 'Портативная Bluetooth колонка с хорошим звуком.', keywords: 'колонка bluetooth портативная музыка', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  
  // KIDSWEAR
  { id: 'k1', name: 'Платье детское нарядное розовое', price: 750, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', category: 'kidswear', badge: 'hot', description: 'Нарядное платье для девочки розового цвета.', keywords: 'платье детское нарядное девочка розовое праздничное', sizes: ['98', '104', '110', '116'], colors: ['Розовый', 'Белый'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k2', name: 'Комбинезон детский зимний', price: 1200, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', category: 'kidswear', description: 'Теплый комбинезон на зиму для детей.', keywords: 'комбинезон детский зимний тёплый', sizes: ['80', '86', '92', '98'], colors: ['Синий', 'Красный'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k3', name: 'Школьная форма комплект', price: 1800, image: 'https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?w=400', category: 'kidswear', badge: 'top', description: 'Комплект школьной формы тёмно-синего цвета.', keywords: 'школьная форма комплект школа дети ученики', sizes: ['122', '128', '134', '140'], colors: ['Темно-синий'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k4', name: 'Костюм детский спортивный', price: 1100, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Спортивный костюм для детей.', keywords: 'костюм детский спортивный дети', sizes: ['104', '110', '116', '122'], colors: ['Серый', 'Синий'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k5', name: 'Игрушка плюшевый медвежонок', price: 650, image: 'https://images.unsplash.com/photo-1559715541-d4fc97ce3e80?w=400', category: 'kidswear', badge: 'new', description: 'Мягкая плюшевая игрушка медвежонок.', keywords: 'игрушка плюшевая медвежонок мягкая дети мишка медведь', sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k6', name: 'Игрушка плюшевый зайчик', price: 550, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'kidswear', description: 'Мягкая плюшевая игрушка зайчик.', keywords: 'игрушка плюшевая зайчик мягкая дети заяц', sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  
  // BAGS
  { id: 'bg1', name: 'Сумка женская чёрная', price: 1800, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', badge: 'hot', description: 'Элегантная женская сумка из эко-кожи чёрного цвета.', keywords: 'сумка женская чёрная эко-кожа элегантная', colors: ['Черный', 'Бежевый', 'Красный'], sellerId: 's6', sellerName: 'Bag Master', row: 'F9', container: '34' },
  { id: 'bg2', name: 'Рюкзак городской чёрный', price: 1500, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', description: 'Вместительный городской рюкзак чёрного цвета.', keywords: 'рюкзак городской чёрный вместительный', colors: ['Черный', 'Серый', 'Синий'], sellerId: 's6', sellerName: 'Bag Master', row: 'F9', container: '34' },
  { id: 'bg3', name: 'Клатч вечерний золотой', price: 1200, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', category: 'bags', badge: 'new', description: 'Стильный клатч для вечерних выходов золотого цвета.', keywords: 'клатч вечерний золотой стильный праздничный', colors: ['Золотой', 'Серебряный', 'Черный'], sellerId: 's6', sellerName: 'Bag Master', row: 'F9', container: '34' },
  
  // COSMETICS
  { id: 'cos1', name: 'Набор косметики подарочный', price: 2500, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', badge: 'hot', description: 'Подарочный набор декоративной косметики.', keywords: 'косметика набор подарочный декоративная макияж', sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  { id: 'cos2', name: 'Крем для лица увлажняющий', price: 850, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b40?w=400', category: 'cosmetics', description: 'Увлажняющий крем для лица.', keywords: 'крем лицо увлажняющий уход кожа', sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  { id: 'cos3', name: 'Помада матовая красная', price: 450, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'cosmetics', badge: 'new', description: 'Стойкая матовая помада красного цвета.', keywords: 'помада матовая красная стойкая губы', colors: ['Красный', 'Розовый', 'Нюд'], sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  { id: 'cos4', name: 'Блеск для губ розовый', price: 350, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400', category: 'cosmetics', description: 'Блеск для губ с розовым оттенком.', keywords: 'блеск губы розовый глянец косметика', colors: ['Розовый', 'Прозрачный'], sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  { id: 'cos5', name: 'Тушь для ресниц чёрная', price: 550, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', category: 'cosmetics', badge: 'top', description: 'Объёмная тушь для ресниц чёрного цвета.', keywords: 'тушь ресницы чёрная объёмная макияж', sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  
  // HOME
  { id: 'h1', name: 'Подушка декоративная бежевая', price: 450, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', category: 'home', description: 'Мягкая декоративная подушка бежевого цвета.', keywords: 'подушка декоративная бежевая мягкая дом интерьер', colors: ['Бежевый', 'Серый', 'Розовый'], sellerId: 's4', sellerName: 'Home Style', row: 'D7', container: '23' },
  { id: 'h2', name: 'Плед тёплый серый', price: 1200, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'home', badge: 'hot', description: 'Уютный тёплый плед серого цвета.', keywords: 'плед тёплый серый уютный дом', colors: ['Серый', 'Бежевый'], sellerId: 's4', sellerName: 'Home Style', row: 'D7', container: '23' },
  { id: 'h3', name: 'Постельное бельё сатин', price: 2200, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', category: 'home', badge: 'top', description: 'Комплект постельного белья из сатина.', keywords: 'постельное бельё сатин комплект спальня', sellerId: 's4', sellerName: 'Home Style', row: 'D7', container: '23' },
  
  // ACCESSORIES
  { id: 'ac1', name: 'Часы наручные золотые', price: 3500, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', category: 'accessories', badge: 'top', description: 'Стильные наручные часы золотого цвета.', keywords: 'часы наручные золотые стильные аксессуары', colors: ['Золотой', 'Серебряный', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'ac2', name: 'Очки солнцезащитные чёрные', price: 1200, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category: 'accessories', badge: 'hot', description: 'Модные солнцезащитные очки чёрного цвета.', keywords: 'очки солнцезащитные чёрные модные лето', colors: ['Черный', 'Коричневый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'ac3', name: 'Ремень кожаный чёрный', price: 650, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'accessories', description: 'Классический кожаный ремень чёрного цвета.', keywords: 'ремень кожаный чёрный классический', colors: ['Черный', 'Коричневый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
];

// Russian word normalization and synonyms
const synonyms: Record<string, string[]> = {
  'худи': ['толстовка', 'кофта', 'свитшот', 'hoodie'],
  'толстовка': ['худи', 'кофта', 'свитшот'],
  'кофта': ['худи', 'толстовка', 'свитер', 'джемпер'],
  'футболка': ['майка', 'топ', 'тишка'],
  'джинсы': ['штаны', 'брюки', 'деним'],
  'кроссовки': ['кроссы', 'сникеры', 'sneakers', 'обувь спортивная'],
  'наушники': ['гарнитура', 'headphones', 'аирподсы', 'airpods'],
  'сумка': ['сумочка', 'bag', 'портфель'],
  'рюкзак': ['ранец', 'backpack'],
  'помада': ['губная помада', 'lipstick'],
  'блеск': ['глосс', 'gloss', 'блеск для губ'],
  'игрушка': ['игрушки', 'плюшевая', 'мягкая игрушка'],
  'медвежонок': ['мишка', 'медведь', 'bear', 'teddy'],
  'платье': ['сарафан', 'dress'],
  'школьная': ['школьный', 'школа', 'ученики'],
  'форма': ['униформа', 'комплект'],
  'чёрный': ['черный', 'черное', 'черная', 'black'],
  'белый': ['белое', 'белая', 'white'],
  'красный': ['красное', 'красная', 'red'],
};

// Normalize Russian text (handle ё/е, lowercase, etc.)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^\wа-яa-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate fuzzy match score
function fuzzyMatch(query: string, target: string): number {
  const normQuery = normalizeText(query);
  const normTarget = normalizeText(target);
  
  // Exact match
  if (normTarget.includes(normQuery)) return 1.0;
  
  // Word-by-word matching
  const queryWords = normQuery.split(' ').filter(w => w.length > 1);
  const targetWords = normTarget.split(' ');
  
  let matchCount = 0;
  for (const qw of queryWords) {
    for (const tw of targetWords) {
      if (tw.includes(qw) || qw.includes(tw)) {
        matchCount++;
        break;
      }
      // Check synonyms
      const qwSynonyms = synonyms[qw] || [];
      if (qwSynonyms.some(syn => tw.includes(syn) || syn.includes(tw))) {
        matchCount += 0.8;
        break;
      }
    }
  }
  
  return queryWords.length > 0 ? matchCount / queryWords.length : 0;
}

// Search products by text query
function searchByText(query: string): Array<{ product: typeof products[0]; score: number }> {
  const normQuery = normalizeText(query);
  const results: Array<{ product: typeof products[0]; score: number }> = [];
  
  for (const product of products) {
    const searchText = `${product.name} ${product.description} ${product.keywords || ''} ${product.category} ${(product.colors || []).join(' ')}`;
    
    let score = 0;
    
    // Name match (highest priority)
    const nameScore = fuzzyMatch(query, product.name);
    score += nameScore * 0.5;
    
    // Keywords match
    const keywordScore = fuzzyMatch(query, product.keywords || '');
    score += keywordScore * 0.3;
    
    // Description match
    const descScore = fuzzyMatch(query, product.description);
    score += descScore * 0.15;
    
    // Category match
    if (normalizeText(product.category).includes(normQuery)) {
      score += 0.05;
    }
    
    // Badge boost
    if (product.badge === 'hot' && score > 0) score *= 1.1;
    if (product.badge === 'top' && score > 0) score *= 1.05;
    
    if (score > 0.1) {
      results.push({ product, score });
    }
  }
  
  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchType, query, imageBase64 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`AI Search - Type: ${searchType}, Query: ${query?.substring(0, 50) || 'image'}`);

    // TEXT SEARCH
    if (searchType === 'text' && query) {
      // First, try local fuzzy search
      const localResults = searchByText(query);
      
      if (localResults.length >= 3) {
        // If we have good local results, return them
        console.log(`Local search found ${localResults.length} results`);
        const topProducts = localResults.slice(0, 12).map(r => r.product);
        
        return new Response(JSON.stringify({
          products: topProducts,
          detectedItem: null,
          searchMethod: 'fuzzy'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // If local search didn't find enough, use AI
      const productsContext = products.map(p => 
        `ID:${p.id}|${p.name}|${p.category}|${p.keywords || ''}|${p.price}KGS`
      ).join('\n');

      const prompt = `Ты - умный поисковик товаров на рынке Дордой в Кыргызстане. Понимаешь русский язык, синонимы, опечатки.

Запрос пользователя: "${query}"

Список товаров:
${productsContext}

Найди подходящие товары. Учитывай:
- Синонимы: худи=толстовка=кофта, кроссовки=сникеры, футболка=майка
- Опечатки и вариации написания
- Цвета: чёрный=черный, белый и т.д.
- Частичные совпадения

Верни ТОЛЬКО JSON: {"productIds": ["id1", "id2", ...]}
Максимум 10 товаров, отсортированных по релевантности.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI Gateway error:', response.status, errorText);
        
        // Return local results as fallback
        const fallbackProducts = localResults.slice(0, 8).map(r => r.product);
        return new Response(JSON.stringify({
          products: fallbackProducts.length > 0 ? fallbackProducts : products.slice(0, 6),
          detectedItem: null,
          searchMethod: 'fallback'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || '';
      console.log('AI Text Response:', aiResponse);

      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const productIds = parsed.productIds || [];
          const matchedProducts = productIds
            .map((id: string) => products.find(p => p.id === id))
            .filter(Boolean);
          
          return new Response(JSON.stringify({
            products: matchedProducts,
            detectedItem: null,
            searchMethod: 'ai'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
      }
      
      // Fallback
      return new Response(JSON.stringify({
        products: localResults.slice(0, 8).map(r => r.product),
        detectedItem: null,
        searchMethod: 'fallback'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // IMAGE SEARCH
    if (searchType === 'image' && imageBase64) {
      const productsContext = products.map(p => 
        `ID:${p.id}|${p.name}|${p.category}|Цвета:${(p.colors || []).join(',')}|${p.price}KGS`
      ).join('\n');

      const imageUrl = imageBase64.startsWith('data:') 
        ? imageBase64 
        : `data:image/jpeg;base64,${imageBase64}`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [{
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: `Ты - AI для визуального поиска товаров на рынке Дордой.

Проанализируй изображение и определи:
1. Тип товара (одежда, обувь, электроника, косметика, аксессуары, игрушки и т.д.)
2. Цвет
3. Стиль/особенности

Список товаров в каталоге:
${productsContext}

Найди похожие товары из списка. Верни JSON:
{
  "productIds": ["id1", "id2", ...],
  "detectedItem": "описание товара на русском"
}

Максимум 8 товаров. Приоритет товарам того же типа и похожего цвета.`
              },
              { 
                type: 'image_url', 
                image_url: { url: imageUrl } 
              }
            ]
          }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI Vision error:', response.status, errorText);
        
        if (response.status === 429) {
          return new Response(JSON.stringify({ 
            error: 'Слишком много запросов. Попробуйте через минуту.' 
          }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Return random products as fallback
        const randomProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 6);
        return new Response(JSON.stringify({
          products: randomProducts,
          detectedItem: 'Не удалось распознать товар',
          searchMethod: 'fallback'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || '';
      console.log('AI Vision Response:', aiResponse);

      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const productIds = parsed.productIds || [];
          const matchedProducts = productIds
            .map((id: string) => products.find(p => p.id === id))
            .filter(Boolean);
          
          console.log(`Image search found ${matchedProducts.length} products`);
          
          return new Response(JSON.stringify({
            products: matchedProducts,
            detectedItem: parsed.detectedItem || null,
            searchMethod: 'ai-vision'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (parseError) {
        console.error('Vision parse error:', parseError);
      }
      
      // Fallback for image search
      const randomProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 6);
      return new Response(JSON.stringify({
        products: randomProducts,
        detectedItem: 'Товар распознан частично',
        searchMethod: 'fallback'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // No valid search type
    return new Response(JSON.stringify({
      error: 'Укажите текстовый запрос или загрузите изображение',
      products: []
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Search error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Ошибка поиска',
      products: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
