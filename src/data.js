export const data = {
  // برندها و مدل‌های زیر صرفاً نمونهٔ چیدمان‌اند. پس از تأیید شرکت جایگزین شوند.
  brands: [
    {name:'SIEMENS', plc:['S7-1200','S7-1500','S7-300'], hmi:['SIMATIC Basic Panel','SIMATIC Comfort Panel']},
    {name:'DELTA', plc:['DVP Series','AS Series'], hmi:['DOP-100 Series']},
    {name:'FATEK', plc:['FBs Series','B1 Series'], hmi:[]},
    {name:'WEINTEK', plc:[], hmi:['iE Series','cMT Series']}
  ],
  projects: [
    {id:'flange', name:'فلنج اتصال صنعتی', type:'machining', label:'ماشین‌کاری', material:'فولاد — نمونه', process:'تراش CNC و سوراخ‌کاری — نمونه', description:'نمونهٔ نمایش یک قطعهٔ اتصالی. در نسخهٔ نهایی، کاربرد قطعه، الزامات ساخت و جزئیات پروژه در این قسمت قرار می‌گیرد.',shape:'flange'},
    {id:'shaft', name:'شفت انتقال حرکت', type:'machining', label:'ماشین‌کاری', material:'فولاد آلیاژی — نمونه', process:'تراش و پرداخت — نمونه', description:'نمونهٔ نمایش شفت صنعتی. توضیحات مربوط به شرایط کاری، جنس، ابعاد و کنترل کیفیت با اطلاعات پروژهٔ واقعی جایگزین می‌شود.',shape:'shaft'},
    {id:'fixture', name:'فیکسچر مونتاژ', type:'design', label:'طراحی و ساخت', material:'آلومینیوم — نمونه', process:'مدل‌سازی سه‌بعدی و فرز CNC — نمونه', description:'نمونهٔ نمایش ابزار نگهدارندهٔ قطعات. مسئلهٔ مشتری، راهکار طراحی و کاربرد مجموعه در خط تولید اینجا معرفی می‌شود.',shape:'fixture'}
  ]
};

export const documents = []; // { title, file: "files/catalog.pdf" }
