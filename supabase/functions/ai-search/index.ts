import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Product data for search
const products = [
  // CLOTHING
  { id: 'c1', name: 'Футболка оверсайз женская', price: 650, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'clothing', badge: 'hot', description: 'Стильная оверсайз футболка из хлопка. Идеальна для повседневной носки.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Черный', 'Серый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c2', name: 'Футболка оверсайз однотонная', price: 590, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', category: 'clothing', description: 'Базовая футболка свободного кроя.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Розовый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c3', name: 'Футболка с принтом', price: 720, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', category: 'clothing', badge: 'new', description: 'Модная футболка с ярким принтом.', sizes: ['M', 'L', 'XL'], colors: ['Белый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c4', name: 'Джинсы женские скинни', price: 1300, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', category: 'clothing', badge: 'top', description: 'Облегающие джинсы высокой посадки.', sizes: ['26', '27', '28', '29', '30'], colors: ['Синий', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c5', name: 'Джинсы мом', price: 1450, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400', category: 'clothing', description: 'Джинсы свободного кроя мом.', sizes: ['26', '27', '28', '29'], colors: ['Голубой'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c6', name: 'Джинсы классические', price: 1250, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'clothing', description: 'Классические прямые джинсы.', sizes: ['28', '30', '32', '34'], colors: ['Темно-синий'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c7', name: 'Худи унисекс', price: 1100, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', category: 'clothing', badge: 'hot', description: 'Теплое худи с капюшоном и карманом.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Серый', 'Черный', 'Бордовый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c8', name: 'Худи с принтом', price: 1250, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400', category: 'clothing', badge: 'new', description: 'Стильное худи с модным принтом.', sizes: ['M', 'L', 'XL'], colors: ['Белый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c9', name: 'Свитер вязаный', price: 1500, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', category: 'clothing', description: 'Уютный вязаный свитер на зиму.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Коричневый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c10', name: 'Платье летнее', price: 980, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', category: 'clothing', badge: 'top', description: 'Легкое летнее платье с цветочным принтом.', sizes: ['S', 'M', 'L'], colors: ['Цветочный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c14', name: 'Куртка джинсовая', price: 2200, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', category: 'clothing', badge: 'hot', description: 'Стильная джинсовая куртка.', sizes: ['S', 'M', 'L'], colors: ['Синий'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c15', name: 'Пальто демисезонное', price: 3500, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', category: 'clothing', badge: 'top', description: 'Элегантное пальто на осень/весну.', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'c17', name: 'Костюм спортивный', price: 2100, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', category: 'clothing', description: 'Удобный спортивный костюм.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Серый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  
  // SHOES
  { id: 'sh1', name: 'Кроссовки мужские', price: 1800, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'shoes', badge: 'hot', description: 'Легкие спортивные кроссовки для бега.', sizes: ['40', '41', '42', '43', '44'], colors: ['Красный', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh2', name: 'Кроссовки белые', price: 1650, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', category: 'shoes', description: 'Классические белые кроссовки.', sizes: ['38', '39', '40', '41', '42'], colors: ['Белый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh3', name: 'Кроссовки спортивные', price: 1950, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', category: 'shoes', badge: 'new', description: 'Профессиональные беговые кроссовки.', sizes: ['40', '41', '42', '43'], colors: ['Синий', 'Оранжевый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh4', name: 'Туфли женские', price: 2200, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'shoes', badge: 'top', description: 'Элегантные женские туфли на каблуке.', sizes: ['36', '37', '38', '39'], colors: ['Черный', 'Бежевый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh5', name: 'Ботинки зимние', price: 3200, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'shoes', badge: 'hot', description: 'Теплые зимние ботинки на меху.', sizes: ['39', '40', '41', '42', '43'], colors: ['Коричневый', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'sh6', name: 'Сандалии летние', price: 890, image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400', category: 'shoes', description: 'Удобные летние сандалии.', sizes: ['36', '37', '38', '39', '40'], colors: ['Бежевый', 'Белый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  
  // ELECTRONICS
  { id: 'e1', name: 'Power Bank 20000mAh', price: 1200, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', category: 'electronics', badge: 'hot', description: 'Портативное зарядное устройство большой емкости.', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e2', name: 'Power Bank 10000mAh', price: 750, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400', category: 'electronics', description: 'Компактный павербанк.', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e3', name: 'Наушники беспроводные', price: 2500, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'electronics', badge: 'hot', description: 'Bluetooth наушники с шумоподавлением.', colors: ['Черный', 'Белый'], sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e4', name: 'Смарт-часы', price: 4500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'electronics', badge: 'top', description: 'Умные часы с пульсометром и GPS.', colors: ['Черный', 'Серебро'], sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  { id: 'e5', name: 'Зарядка беспроводная', price: 950, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400', category: 'electronics', description: 'Беспроводная зарядка для смартфона.', sellerId: 's2', sellerName: 'TechZone', row: 'B10', container: '47' },
  
  // KIDSWEAR
  { id: 'k1', name: 'Платье детское', price: 750, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', category: 'kidswear', badge: 'hot', description: 'Нарядное платье для девочки.', sizes: ['98', '104', '110', '116'], colors: ['Розовый', 'Белый'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k2', name: 'Комбинезон детский', price: 1200, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', category: 'kidswear', description: 'Теплый комбинезон на зиму.', sizes: ['80', '86', '92', '98'], colors: ['Синий', 'Красный'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k3', name: 'Школьная форма', price: 1800, image: 'https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?w=400', category: 'kidswear', badge: 'top', description: 'Комплект школьной формы.', sizes: ['122', '128', '134', '140'], colors: ['Темно-синий'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  { id: 'k4', name: 'Костюм детский спортивный', price: 1100, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'kidswear', description: 'Спортивный костюм для детей.', sizes: ['104', '110', '116', '122'], colors: ['Серый', 'Синий'], sellerId: 's3', sellerName: 'Kids Paradise', row: 'C3', container: '88' },
  
  // BAGS
  { id: 'bg1', name: 'Сумка женская', price: 1800, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', category: 'bags', badge: 'hot', description: 'Элегантная женская сумка из эко-кожи.', colors: ['Черный', 'Бежевый', 'Красный'], sellerId: 's6', sellerName: 'Bag Master', row: 'F9', container: '34' },
  { id: 'bg2', name: 'Рюкзак городской', price: 1500, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'bags', description: 'Вместительный городской рюкзак.', colors: ['Черный', 'Серый', 'Синий'], sellerId: 's6', sellerName: 'Bag Master', row: 'F9', container: '34' },
  { id: 'bg3', name: 'Клатч вечерний', price: 1200, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400', category: 'bags', badge: 'new', description: 'Стильный клатч для вечерних выходов.', colors: ['Золотой', 'Серебряный', 'Черный'], sellerId: 's6', sellerName: 'Bag Master', row: 'F9', container: '34' },
  
  // COSMETICS
  { id: 'cos1', name: 'Набор косметики', price: 2500, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'cosmetics', badge: 'hot', description: 'Подарочный набор декоративной косметики.', sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  { id: 'cos2', name: 'Крем для лица', price: 850, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b40?w=400', category: 'cosmetics', description: 'Увлажняющий крем для лица.', sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  { id: 'cos3', name: 'Помада матовая', price: 450, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 'cosmetics', badge: 'new', description: 'Стойкая матовая помада.', colors: ['Красный', 'Розовый', 'Нюд'], sellerId: 's5', sellerName: 'Beauty World', row: 'E2', container: '56' },
  
  // HOME
  { id: 'h1', name: 'Подушка декоративная', price: 450, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', category: 'home', description: 'Мягкая декоративная подушка.', colors: ['Бежевый', 'Серый', 'Розовый'], sellerId: 's4', sellerName: 'Home Style', row: 'D7', container: '23' },
  { id: 'h2', name: 'Плед теплый', price: 1200, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'home', badge: 'hot', description: 'Уютный теплый плед.', colors: ['Серый', 'Бежевый'], sellerId: 's4', sellerName: 'Home Style', row: 'D7', container: '23' },
  { id: 'h3', name: 'Постельное белье', price: 2200, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', category: 'home', badge: 'top', description: 'Комплект постельного белья из сатина.', sellerId: 's4', sellerName: 'Home Style', row: 'D7', container: '23' },
  
  // ACCESSORIES
  { id: 'ac1', name: 'Часы наручные', price: 3500, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', category: 'accessories', badge: 'top', description: 'Стильные наручные часы.', colors: ['Золотой', 'Серебряный', 'Черный'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'ac2', name: 'Очки солнцезащитные', price: 1200, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category: 'accessories', badge: 'hot', description: 'Модные солнцезащитные очки.', colors: ['Черный', 'Коричневый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
  { id: 'ac3', name: 'Ремень кожаный', price: 650, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'accessories', description: 'Классический кожаный ремень.', colors: ['Черный', 'Коричневый'], sellerId: 's1', sellerName: 'Fashion House', row: 'A5', container: '12' },
];

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

    let prompt = '';
    const messages: any[] = [];

    // Build products context for AI
    const productsContext = products.map(p => 
      `ID: ${p.id}, Название: ${p.name}, Категория: ${p.category}, Цена: ${p.price} KGS, Описание: ${p.description}, Цвета: ${p.colors?.join(', ') || 'не указано'}`
    ).join('\n');

    if (searchType === 'text') {
      prompt = `Ты - AI помощник для поиска товаров на рынке KyrgyzMall в Кыргызстане. 
      
Пользователь ищет: "${query}"

Вот список доступных товаров:
${productsContext}

Найди наиболее подходящие товары для запроса пользователя. Учитывай:
- Прямое совпадение названия или описания
- Синонимы и похожие слова (например, "кофта" = "худи", "свитер")
- Категории товаров
- Цвета и характеристики

Верни JSON массив ID товаров, которые наиболее подходят для запроса, отсортированный по релевантности (максимум 10 товаров).
Формат: {"productIds": ["c7", "c8", "c9"]}

Отвечай ТОЛЬКО JSON, без дополнительного текста.`;

      messages.push({
        role: 'user',
        content: prompt
      });
    } else if (searchType === 'image') {
      prompt = `Ты - AI помощник для визуального поиска товаров на рынке KyrgyzMall.

Пользователь загрузил изображение товара. Проанализируй изображение и определи:
1. Тип товара (одежда, обувь, аксессуары, электроника и т.д.)
2. Цвет
3. Стиль
4. Особенности

Вот список доступных товаров:
${productsContext}

Найди товары из списка, которые наиболее похожи на изображение. Учитывай тип товара, цвет, стиль.

Верни JSON массив ID товаров, которые визуально похожи (максимум 8 товаров).
Формат: {"productIds": ["c1", "sh2", "bg3"], "detectedItem": "описание товара на изображении"}

Отвечай ТОЛЬКО JSON, без дополнительного текста.`;

      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { 
            type: 'image_url', 
            image_url: { 
              url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}` 
            } 
          }
        ]
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Слишком много запросов. Попробуйте позже.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || '';
    
    console.log('AI Response:', aiResponse);

    // Parse AI response
    let parsedResponse;
    try {
      // Extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback: return some products based on simple matching
      const lowerQuery = (query || '').toLowerCase();
      const fallbackProducts = products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      ).slice(0, 8);
      
      return new Response(JSON.stringify({
        products: fallbackProducts,
        detectedItem: null
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get matching products
    const productIds = parsedResponse.productIds || [];
    const matchedProducts = productIds
      .map((id: string) => products.find(p => p.id === id))
      .filter(Boolean);

    console.log(`Found ${matchedProducts.length} matching products`);

    return new Response(JSON.stringify({
      products: matchedProducts,
      detectedItem: parsedResponse.detectedItem || null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Search error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Ошибка поиска' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
