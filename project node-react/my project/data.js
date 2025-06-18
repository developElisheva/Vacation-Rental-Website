export const advertiser = [
    { email: 'elisheva2107@gmail.com', password: 'eli@2107', phone: '0527102107', addPhone: '026796493', apartments: 'eli@2107' },
    { email: 'dasi6743420@gmail.com', password: 'dasi@3420', phone: '0556743420', addPhone: '025870980', apartments: 'eli@2107' },
    { email: 'michal65918@gmail.com', password: 'michal@4300', phone: '0548564300', addPhone: '025800866', apartments: 'eli@2107' },
    { email: 'n0777027773@gmail.com', password: 'tamar@7773', phone: '0533188571', addPhone: '0777027773', apartments: 'eli@2107' },
    { email: 'chedva4663@gmail.com', password: 'chedva@4663', phone: '0583284663', addPhone: '026482068', apartments: 'eli@2107' },
    { email: 'en593258@gmail.com', password: 'elisheva@3258', phone: '0548593258', addPhone: '026438603', apartments: 'eli@2107' }
]
export const apartments = [
    { name: "טירת כנרת", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "וילה", city: "צפת", address: "צהל", beds: 7, additives: [""], price: 3500, advertiser: "1" },
    { name: "מצפה נוף", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "צימר", city: "טבריה", address: "הירדן", beds: 5, additives: [], price: 4000, advertiser: "5" },
    { name: "קסם הזוהר", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "לופט", city: "ירושלים", address: "גבעת מרדכי", beds: 20, additives: [], price: 8000, advertiser: "5" },
    { name: "בל באילת", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "לופט", city: "בני ברק", address: "רבי עקיבא", beds: 15, additives: [], price: 9000, advertiser: "5" },
    { name: "אחוזת המשכן", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "צימר", city: "תל אביב", address: "יפו", beds: 22, additives: [], price: 10, advertiser: "5" },
    { name: "שלווה בהר", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "צימר", city: "תל אביב", address: "בן גוריון", beds: 9, additives: [], price: 7000, advertiser: "5" },
    { name: "וילה פומלה", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "וילה", city: "צפת", address: "הארי", beds: 10, additives: [], price: 6000, advertiser: "2" },
    { name: "שירת הים", description: "", img: `${process.env.PUBLIC_URL}/pictures Car/1.png`, category: "מלון", city: "טבריה", address: "הגליל", beds: 2, additives: [], price: 850, advertiser: "5" }
]
export const category = [
    { name: 'צימר', apartments: 'eli@2107' },
    { name: 'וילה', apartments: 'eli@2107' },
    { name: 'דירות', apartments: 'eli@2107' },
    { name: 'לופטים', apartments: 'eli@2107' },
    { name: 'מלונות', apartments: 'eli@2107' }
]
export const city = [
    { name: 'ירושלים', apartments: 'eli@2107' },
    { name: 'בני ברק', apartments: 'eli@2107' },
    { name: 'תל אביב', apartments: 'eli@2107' },
    { name: 'צפת', apartments: 'eli@2107' },
    { name: 'טבריה', apartments: 'eli@2107' }
]