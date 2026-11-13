const img = (id) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1400&q=85';

const imageSets = {
  property: [
    'photo-1600607687939-ce8a6c25118c','photo-1600566753086-00f18fb6b3ea','photo-1600607687920-4e2a09cf159d','photo-1600566753190-17f0baa2a6c3','photo-1600585154340-be6161a56a0c',
    'photo-1600607687644-c7171b42498f','photo-1600566752355-35792bedcfea','photo-1487958449943-2429e8be8625','photo-1486406146926-c627a92ad1ab','photo-1497366811353-6870744d04b2'
  ],
  coffee: [
    'photo-1442512595331-e89e73853f31','photo-1495474472287-4d71bcdd2085','photo-1509042239860-f550ce710b93','photo-1445116572660-236099ec97a0','photo-1511920170033-f8396924c348',
    'photo-1447933601403-0c6688de566e','photo-1498804103079-a6351b050096','photo-1501339847302-ac426a4a7cbb','photo-1517701550927-30cf4ba1dba5','photo-1497515114629-f71d768fd07c'
  ],
  ecommerce: [
    'photo-1523275335684-37898b6baf30','photo-1542291026-7eec264c27ff','photo-1526170375885-4d8ecf77b99f','photo-1503602642458-232111445657','photo-1529139574466-a303027c1d8b',
    'photo-1521572163474-6864f9cf17ab','photo-1543076447-215ad9ba6923','photo-1523381210434-271e8be1f52b','photo-1490481651871-ab68de25d43d','photo-1515886657613-9f3515b0c78f'
  ],
  tech: [
    'photo-1518770660439-4636190af475','photo-1519389950473-47ba0277781c','photo-1485827404703-89b55fcc595e','photo-1451187580459-43490279c0fa','photo-1550751827-4bd374c3f58b',
    'photo-1516321318423-f06f85e504b3','photo-1535223289827-42f1e9919769','photo-1558618666-fcd25c85cd64','photo-1526374965328-7f61d4dc18c5','photo-1523961131990-5ea7c61b2107'
  ],
  food: [
    'photo-1555939594-58d7cb561ad1','photo-1504674900247-0877df9cc836','photo-1540189549336-e6e99c3679fe','photo-1512621776951-a57141f2eefd','photo-1547592180-85f173990554',
    'photo-1498837167922-ddd27525d352','photo-1476224203421-9ac39bcb3327','photo-1559847844-5315695dadae','photo-1543353071-873f17a7a088','photo-1565299624946-b28f40a0ae38'
  ]
};
const gallery = (key) => imageSets[key].map(img);

export const initialProjects = [
  {
    id:'p1', slug:'rawasi', category:'property', year:'2025', featured:true, published:true,
    title:{ar:'رواسي العقارية',en:'Rawasi Real Estate'}, client:{ar:'رواسي للتطوير العقاري',en:'Rawasi Development'},
    short:{ar:'هوية معمارية تعكس الثبات والثقة، وتمنح المكان حضورًا يليق بقيمته.',en:'An architectural identity expressing stability, trust and lasting value.'},
    description:{ar:'علامة عقارية تجمع بين الرؤية المعاصرة والارتباط بالمكان.',en:'A real-estate brand combining contemporary vision with a strong sense of place.'},
    challenge:{ar:'ابتكار حضور بصري يوازن بين الفخامة والوضوح في سوق تنافسي.',en:'Creating a distinctive visual presence balancing prestige and clarity.'},
    strategy:{ar:'اعتمدنا هندسة بسيطة ومساحات هادئة ونظامًا طباعيًا راسخًا.',en:'A restrained geometric system, calm layouts and confident typography.'},
    solution:{ar:'نظام بصري مرن يعمل عبر المطبوعات والواجهات والمنصات الرقمية.',en:'A flexible visual system across print, signage and digital touchpoints.'},
    palette:['#183D8F','#C6A76A','#F3F1EC','#222936'], cover:gallery('property')[0], gallery:gallery('property'), tags:['Branding','Real Estate']
  },
  {
    id:'p2', slug:'bun', category:'coffee', year:'2025', featured:true, published:true,
    title:{ar:'بُن — محمصة مختصة',en:'BUN Specialty Coffee'}, client:{ar:'بُن للقهوة المختصة',en:'BUN Specialty Coffee'},
    short:{ar:'تجربة دافئة تحتفي بتفاصيل القهوة من الحبة إلى الفنجان.',en:'A warm experience celebrating coffee from bean to cup.'},
    description:{ar:'علامة قهوة مختصة بروح محلية ولمسة معاصرة.',en:'A specialty coffee brand with a local soul and a contemporary touch.'},
    challenge:{ar:'تقديم علامة تبدو أصيلة وحديثة في آن واحد.',en:'Making a brand feel both authentic and contemporary.'},
    strategy:{ar:'استلهمنا الألوان من التحميص والأرض والخامات الطبيعية.',en:'A palette inspired by roasting, earth and natural materials.'},
    solution:{ar:'هوية مرنة للتغليف والأكواب وتجربة المتجر.',en:'A flexible identity for packaging, cups and the café experience.'},
    palette:['#3E2B22','#C88B55','#E9DDCB','#29231F'], cover:gallery('coffee')[0], gallery:gallery('coffee'), tags:['Branding','Food & Beverage']
  },
  {
    id:'p3', slug:'nawa', category:'ecommerce', year:'2024', featured:true, published:true,
    title:{ar:'نواة للتجارة الرقمية',en:'Nawa Digital Store'}, client:{ar:'نواة',en:'Nawa'},
    short:{ar:'هوية مرنة لمتجر رقمي يجعل التسوق أكثر بساطة ووضوحًا.',en:'A flexible identity making digital shopping simple and clear.'},
    description:{ar:'منصة تجارة إلكترونية لمنتجات مختارة بعناية.',en:'An e-commerce platform for thoughtfully selected products.'},
    challenge:{ar:'بناء شخصية مرنة تناسب فئات منتجات متعددة.',en:'Building a flexible personality for multiple product categories.'},
    strategy:{ar:'نظام لوني واضح وعناصر رسومية قابلة للتوسع.',en:'A clear color system and scalable graphic elements.'},
    solution:{ar:'لغة بصرية نشطة تعمل على المتجر والتغليف والحملات.',en:'An energetic visual language across store, packaging and campaigns.'},
    palette:['#E65A42','#222B3B','#F8F6F1','#D6DCE5'], cover:gallery('ecommerce')[0], gallery:gallery('ecommerce'), tags:['Branding','Retail']
  },
  {
    id:'p4', slug:'madar', category:'tech', year:'2024', featured:false, published:true,
    title:{ar:'مدار للحلول التقنية',en:'Madar Tech Solutions'}, client:{ar:'مدار',en:'Madar'},
    short:{ar:'لغة بصرية دقيقة تعبّر عن الابتكار والاتصال والموثوقية.',en:'A precise visual language for innovation, connection and reliability.'},
    description:{ar:'شركة تقنية تقدم حلولًا رقمية للأعمال.',en:'A technology company providing digital solutions for businesses.'},
    challenge:{ar:'تبسيط مفاهيم تقنية معقدة داخل علامة سهلة التذكر.',en:'Translating complex technology into a memorable brand.'},
    strategy:{ar:'بناء شبكة هندسية ونظام أيقونات موحد.',en:'A geometric grid and a consistent icon system.'},
    solution:{ar:'هوية تقنية نظيفة ومتوازنة للاستخدام الرقمي.',en:'A clean, balanced identity designed for digital use.'},
    palette:['#173B91','#39B7B0','#101A2B','#F4F7FB'], cover:gallery('tech')[0], gallery:gallery('tech'), tags:['Branding','Technology']
  },
  {
    id:'p5', slug:'sufra', category:'food', year:'2024', featured:false, published:true,
    title:{ar:'سُفرة — مطعم معاصر',en:'Sufra Contemporary Dining'}, client:{ar:'سُفرة',en:'Sufra'},
    short:{ar:'هوية شهية تحتفي بالمذاق والضيافة واللحظات المشتركة.',en:'An inviting identity celebrating flavor, hospitality and shared moments.'},
    description:{ar:'علامة مطعم تجمع روح المطبخ المحلي بلمسة حديثة.',en:'A restaurant brand bringing local cuisine into a modern setting.'},
    challenge:{ar:'ابتكار أسلوب يبرز جودة الطعام ودفء الضيافة.',en:'Expressing food quality and heartfelt hospitality.'},
    strategy:{ar:'ألوان غنية وتكوينات مرنة مستوحاة من المائدة.',en:'Rich colors and flexible compositions inspired by the dining table.'},
    solution:{ar:'منظومة متكاملة للقائمة والتغليف واللافتات.',en:'A cohesive system for menus, packaging and signage.'},
    palette:['#9C3E2E','#E8B85D','#F4EBDD','#2D2A27'], cover:gallery('food')[0], gallery:gallery('food'), tags:['Branding','Restaurant']
  }
];

export const initialServices = [
  {id:'s1',icon:'Layers',title:{ar:'بناء الهوية البصرية',en:'Visual Identity'},description:{ar:'تصميم نظام بصري متكامل يعكس شخصية علامتك.',en:'A complete visual system that reflects your brand personality.'}},
  {id:'s2',icon:'PenTool',title:{ar:'تصميم الشعار',en:'Logo Design'},description:{ar:'شعار واضح ومدروس، قابل للتطبيق ويظل حاضرًا في الذاكرة.',en:'A thoughtful, versatile mark designed to be remembered.'}},
  {id:'s3',icon:'Package',title:{ar:'تصميم التغليف',en:'Packaging Design'},description:{ar:'تجربة تغليف تربط المنتج بقصة العلامة وتفاصيلها.',en:'Packaging that connects your product to its brand story.'}},
  {id:'s4',icon:'Monitor',title:{ar:'التصميم الرقمي',en:'Digital Design'},description:{ar:'تطبيق الهوية على المواقع والمنصات والمواد الرقمية.',en:'Applying your identity across digital touchpoints.'}}
];

export const initialTestimonials = [
  {id:'t1',name:'أحمد محمد',role:{ar:'مؤسس علامة تجارية',en:'Brand Founder'},quote:{ar:'تجربة احترافية من فهم الفكرة إلى بناء هوية متكاملة وواضحة.',en:'A thoughtful process from understanding the idea to a cohesive identity.'},visible:true},
  {id:'t2',name:'سارة علي',role:{ar:'مديرة تسويق',en:'Marketing Manager'},quote:{ar:'التفاصيل كانت دقيقة والتواصل سلس والنتيجة تجاوزت توقعاتنا.',en:'Every detail felt intentional. The result exceeded our expectations.'},visible:true}
];

export const profileDefaults = {
  name:{ar:'عمرو اليوسفي',en:'Amr Al-Yousofi'}, role:{ar:'مصمم هويات بصرية',en:'Visual Identity Designer'},
  bio:{ar:'أصمم هويات بصرية تمنح الأفكار شخصية واضحة، وتحوّل القيم إلى تجارب يمكن رؤيتها وتذكرها. أؤمن أن التصميم الجيد يبدأ بالفهم، وينمو بالبحث، ويكتمل بالتفاصيل.',en:'I build visual identities that give ideas a clear personality and turn values into experiences people can see and remember.'},
  image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
  skills:['Brand Strategy','Logo Design','Visual Systems','Art Direction','UI Design','Typography'],
  experience:[{ar:'تصميم هويات بصرية لعلامات ناشئة ومتوسطة',en:'Visual identities for emerging and growing brands'},{ar:'تطوير أنظمة تصميم للاستخدام الرقمي والمطبوع',en:'Design systems for digital and print applications'}],
  achievements:[{ar:'5 مشاريع هوية ضمن معرض الأعمال',en:'5 identity projects in the portfolio'},{ar:'منهجية عمل تبدأ بالبحث وتنتهي بدليل استخدام',en:'A research-led process ending with brand guidelines'}],
  tools:['Adobe Illustrator','Adobe Photoshop','Figma','InDesign'],
  socials:{whatsapp:'967700000000',email:'hello@howiya.design',instagram:'https://instagram.com/',facebook:'https://facebook.com/'}
};