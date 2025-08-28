// دالة لتوليد pnrs عشوائية 
export function generatePNRs(length = 6) {
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pnr = "";
  for (let i = 0; i < length; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}

export function seatNum(class_name, class_seats) {
  const chars = "ABCDEFGH"; 
  let seat_num;

  if (class_name === "economy") {
    seat_num = 153 - class_seats;  
  } else if (class_name === "business") {
    seat_num = 33 - class_seats;    
  } else if (class_name === "first") {
    seat_num = 17 - class_seats;    
  }

  let row = seat_num % 8;
  let col = Math.ceil(seat_num / 8);

  
  if (row !== 0) {
    row -= 1;
  } else {
    row = 7;
  }

  return `${chars[row]}${col}`;
}
export function weight(class_name) {
  let checked_baggage; 
  let cabin_baggage; 

  if (class_name === "economy") {
    checked_baggage = "20–30 كج";
    cabin_baggage = "7–8 كج";
  } 
  else if (class_name === "business") {
    checked_baggage = "40–50 كج";
    cabin_baggage = "2 × 7–8 كج";
  } 
  else if (class_name === "first") {
    checked_baggage = "50–60 كج";
    cabin_baggage = "2–3 × 7–10 كج";
  } 
  else {
    return "الفئة غير معروفة";
  }

  return `حقيبة مشحونة: ${checked_baggage} + حقيبة يدوية: ${cabin_baggage}`;
}
export function getArrival(date, time, duration) {
  // دمج التاريخ مع الوقت عشان نكون Date object
  let departure = new Date(`${date}T${time}:00`);

  // نفك مدة الرحلة (ساعات + دقائق)
  let hours = 0, minutes = 0;
  let hMatch = duration.match(/(\d+)h/);
  let mMatch = duration.match(/(\d+)m/);

  if (hMatch) hours = parseInt(hMatch[1]);
  if (mMatch) minutes = parseInt(mMatch[1]);

  // نجمع المدة على وقت الإقلاع
  departure.setHours(departure.getHours() + hours);
  departure.setMinutes(departure.getMinutes() + minutes);

  // نحول الناتج لتاريخ ووقت وصول
  let arrivalDate = departure.toISOString().split("T")[0]; // YYYY-MM-DD
  let arrivalTime = departure.toTimeString().slice(0,5);   // HH:MM

  return {
    arrivalDate,
    arrivalTime
  };
}


export function cityName(code) {
  const cities = {
    "CAI": "القاهرة",
    "RUH": "الرياض",
    "JED": "جدة",
    "DXB": "دبي",
    "AUH": "أبوظبي",
    "DOH": "الدوحة",
    "AMM": "عمان",
    "BEY": "بيروت",
    "KWI": "الكويت",
    "MCT": "مسقط",
    "TUN": "تونس",
    "ALG": "الجزائر",
    "CMN": "الدار البيضاء",
    "TIP": "طرابلس",
    "KRT": "الخرطوم"
  };

  return cities[code] || "مدينة غير معروفة";
}


export function formatArabicDate(dateStr) {
  const days = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  const months = [
    "يناير","فبراير","مارس","أبريل","مايو","يونيو",
    "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"
  ];

  const date = new Date(dateStr); // مثلاً "2025-09-25"

  const dayName = days[date.getDay()];
  const dayNum = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName} ${dayNum} ${monthName} ${year}`;
}
export function getFlightById(flightId) {
  // البحث عن الرحلة
  const flight = flights.find(f => f.id === flightId);
  
  // لو مش موجودة، نرجع null
  if (!flight) return null;

  return flight;
}

export function saveTempTicket(ticket) {
  // نجيب التذاكر القديمة لو موجودة
  let tickets = JSON.parse(localStorage.getItem("temp_tickets")) || [];

  // نضيف التذكرة الجديدة
  tickets.push(ticket);

  // نرجع نخزنها
  localStorage.setItem("temp_tickets", JSON.stringify(tickets));
}

export function getTempTickets() {
  return JSON.parse(localStorage.getItem("temp_tickets")) || [];
}

export function clearTempTickets() {
  localStorage.removeItem("temp_tickets");
}


  export const flights = [
  // CAI → RUH
  {
    id: "FL1",
    flightNumber: "MS985",
    from: "CAI",
    to: "RUH",
    date: "2025-08-26",
    time: "18:30",
    gate: "A12",
    duration: "2h 30m",
    seats: { economy: 60, business: 15, firstClass: 5 },
    prices: { economy: "120$", business: "220$", firstClass: "320$" }
  },
  {
    id: "FL2",
    flightNumber: "MS986",
    from: "CAI",
    to: "RUH",
    date: "2025-08-27",
    time: "06:45",
    gate: "A14",
    duration: "2h 30m",
    seats: { economy: 40, business: 15, firstClass: 5 },
    prices: { economy: "95$", business: "210$", firstClass: "310$" }
  },

  // RUH → CAI
  {
    id: "FL3",
    flightNumber: "MS987",
    from: "RUH",
    to: "CAI",
    date: "2025-08-28",
    time: "09:00",
    gate: "A21",
    duration: "2h 30m",
    seats: { economy: 70, business: 20, firstClass: 10 },
    prices: { economy: "110$", business: "210$", firstClass: "310$" }
  },
  {
    id: "FL4",
    flightNumber: "MS988",
    from: "RUH",
    to: "CAI",
    date: "2025-08-29",
    time: "21:15",
    gate: "A23",
    duration: "2h 30m",
    seats: { economy: 50, business: 15, firstClass: 5 },
    prices: { economy: "105$", business: "205$", firstClass: "305$" }
  },

  // CAI → DXB
  {
    id: "FL5",
    flightNumber: "MS991",
    from: "CAI",
    to: "DXB",
    date: "2025-08-25",
    time: "14:00",
    gate: "B10",
    duration: "3h 30m",
    seats: { economy: 60, business: 20, firstClass: 10 },
    prices: { economy: "150$", business: "250$", firstClass: "400$" }
  },
  {
    id: "FL6",
    flightNumber: "MS992",
    from: "CAI",
    to: "DXB",
    date: "2025-08-27",
    time: "22:30",
    gate: "B12",
    duration: "3h 30m",
    seats: { economy: 55, business: 20, firstClass: 10 },
    prices: { economy: "145$", business: "245$", firstClass: "390$" }
  },

  // DXB → CAI
  {
    id: "FL7",
    flightNumber: "MS993",
    from: "DXB",
    to: "CAI",
    date: "2025-08-28",
    time: "18:30",
    gate: "B20",
    duration: "3h 30m",
    seats: { economy: 50, business: 15, firstClass: 5 },
    prices: { economy: "160$", business: "260$", firstClass: "420$" }
  },
  {
    id: "FL8",
    flightNumber: "MS994",
    from: "DXB",
    to: "CAI",
    date: "2025-08-30",
    time: "07:00",
    gate: "B22",
    duration: "3h 30m",
    seats: { economy: 45, business: 15, firstClass: 5 },
    prices: { economy: "155$", business: "255$", firstClass: "410$" }
  },

  // CAI → DOH
  {
    id: "FL9",
    flightNumber: "MS997",
    from: "CAI",
    to: "DOH",
    date: "2025-08-26",
    time: "11:15",
    gate: "C8",
    duration: "2h 45m",
    seats: { economy: 70, business: 20, firstClass: 5 },
    prices: { economy: "130$", business: "230$", firstClass: "350$" }
  },
  {
    id: "FL10",
    flightNumber: "MS998",
    from: "CAI",
    to: "DOH",
    date: "2025-08-28",
    time: "20:45",
    gate: "C9",
    duration: "2h 45m",
    seats: { economy: 75, business: 20, firstClass: 5 },
    prices: { economy: "135$", business: "240$", firstClass: "360$" }
  },

  // DOH → CAI
  {
    id: "FL11",
    flightNumber: "MS999",
    from: "DOH",
    to: "CAI",
    date: "2025-08-29",
    time: "13:00",
    gate: "C15",
    duration: "2h 45m",
    seats: { economy: 55, business: 15, firstClass: 5 },
    prices: { economy: "140$", business: "245$", firstClass: "365$" }
  },

  // CAI → AMM
  {
    id: "FL12",
    flightNumber: "MS981",
    from: "CAI",
    to: "AMM",
    date: "2025-08-25",
    time: "08:00",
    gate: "D4",
    duration: "1h 15m",
    seats: { economy: 70, business: 30, firstClass: 10 },
    prices: { economy: "115$", business: "215$", firstClass: "330$" }
  },

  // AMM → CAI
  {
    id: "FL13",
    flightNumber: "MS982",
    from: "AMM",
    to: "CAI",
    date: "2025-08-27",
    time: "16:30",
    gate: "D6",
    duration: "1h 15m",
    seats: { economy: 60, business: 20, firstClass: 5 },
    prices: { economy: "120$", business: "220$", firstClass: "340$" }
  }
];
