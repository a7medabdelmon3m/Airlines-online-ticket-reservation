

const flights = [
  //  CAI → RUH
  {
    from: "CAI",
    to: "RUH",
    date: "2025-08-25",
    time: "10:00",
    seats: { Economy: 80, Business: 30, First_Class: 10 },
    prices: { Economy: "100$", Business: "200$", First_Class: "300$" }
  },
  {
    from: "CAI",
    to: "RUH",
    date: "2025-08-26",
    time: "18:30",
    seats: { Economy: 60, Business: 15, First_Class: 5 },
    prices: { Economy: "120$", Business: "220$", First_Class: "320$" }
  },
  {
    from: "CAI",
    to: "RUH",
    date: "2025-08-27",
    time: "06:45",
    seats: { Economy: 40, Business: 15, First_Class: 5 },
    prices: { Economy: "95$", Business: "210$", First_Class: "310$" }
  },

  //  RUH → CAI
  {
    from: "RUH",
    to: "CAI",
    date: "2025-08-28",
    time: "09:00",
    seats: { Economy: 70, Business: 20, First_Class: 10 },
    prices: { Economy: "110$", Business: "210$", First_Class: "310$" }
  },
  {
    from: "RUH",
    to: "CAI",
    date: "2025-08-29",
    time: "21:15",
    seats: { Economy: 50, Business: 15, First_Class: 5 },
    prices: { Economy: "105$", Business: "205$", First_Class: "305$" }
  },

  //  CAI → DXB
  {
    from: "CAI",
    to: "DXB",
    date: "2025-08-25",
    time: "14:00",
    seats: { Economy: 60, Business: 20, First_Class: 10 },
    prices: { Economy: "150$", Business: "250$", First_Class: "400$" }
  },
  {
    from: "CAI",
    to: "DXB",
    date: "2025-08-27",
    time: "22:30",
    seats: { Economy: 55, Business: 20, First_Class: 10 },
    prices: { Economy: "145$", Business: "245$", First_Class: "390$" }
  },

  //  DXB → CAI
  {
    from: "DXB",
    to: "CAI",
    date: "2025-08-28",
    time: "18:30",
    seats: { Economy: 50, Business: 15, First_Class: 5 },
    prices: { Economy: "160$", Business: "260$", First_Class: "420$" }
  },
  {
    from: "DXB",
    to: "CAI",
    date: "2025-08-30",
    time: "07:00",
    seats: { Economy: 45, Business: 15, First_Class: 5 },
    prices: { Economy: "155$", Business: "255$", First_Class: "410$" }
  },

  //  CAI → DOH
  {
    from: "CAI",
    to: "DOH",
    date: "2025-08-26",
    time: "11:15",
    seats: { Economy: 70, Business: 20, First_Class: 5 },
    prices: { Economy: "130$", Business: "230$", First_Class: "350$" }
  },
  {
    from: "CAI",
    to: "DOH",
    date: "2025-08-28",
    time: "20:45",
    seats: { Economy: 75, Business: 20, First_Class: 5 },
    prices: { Economy: "135$", Business: "240$", First_Class: "360$" }
  },

  //  DOH → CAI
  {
    from: "DOH",
    to: "CAI",
    date: "2025-08-29",
    time: "13:00",
    seats: { Economy: 55, Business: 15, First_Class: 5 },
    prices: { Economy: "140$", Business: "245$", First_Class: "365$" }
  },

  //  CAI → AMM
  {
    from: "CAI",
    to: "AMM",
    date: "2025-08-25",
    time: "08:00",
    seats: { Economy: 70, Business: 30, First_Class: 10 },
    prices: { Economy: "115$", Business: "215$", First_Class: "330$" }
  },

  //  AMM → CAI
  {
    from: "AMM",
    to: "CAI",
    date: "2025-08-27",
    time: "16:30",
    seats: { Economy: 60, Business: 20, First_Class: 5 },
    prices: { Economy: "120$", Business: "220$", First_Class: "340$" }
  }
];



let searchbtn = document.getElementById("search"); 
let result1 = document.querySelector(".box"); 
let result2 = document.querySelector(".box2"); 
let  loging_status = false ; 
let ticket = {
  airline: "SKY",
  status: "مؤكد",
  ticket_no: "176-1234567890",
  pnr: "Q7X3N2",
  from: {
    code: "CAI",
    city: "القاهرة",
    time: "2025-09-25T10:30",
    readable_time: "10:30 ص",
    date: "الخميس 25 سبتمبر 2025",
    flight_no: "MS985"
  },
  to: {
    code: "DXB",
    city: "دبي",
    time: "2025-09-25T14:45",
    readable_time: "2:45 م",
    date: "الخميس 25 سبتمبر 2025",
    gate: "B12"
  },
  duration: "4س 15د",
  passenger: {
    name: "أحمد محمد علي",
    gender: "ذكر",
    birth_date: "1994-03-10",
    nationality: "مصري",
    passport: "A1234567",
    class: "اقتصادية",
    seat: "12A",
    baggage: "حقيبة مشحونة 23كج + يدوي 7كج"
  },
  notes: [
    "يجب مطابقة الاسم مع جواز السفر.",
    "الحضور للمطار قبل الإقلاع بـ 3 ساعات للرحلات الدولية.",
    "تنطبق شروط شركة الطيران على تغيير أو إلغاء التذكرة."
  ]
};

function saveTicket(newTicket) {
  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.push(newTicket);
  localStorage.setItem("tickets", JSON.stringify(tickets));
}
function getTickets() {
  return JSON.parse(localStorage.getItem("tickets")) || [];
}




function createCard(element, container) {
  let card = document.createElement("div"); 
  card.classList.add("available-trips"); 

  card.innerHTML = `
    <h3>من: ${element.from} ✈ لـ ${element.to}</h3>
    <div class="date-time">
      <p><span>📅التاريخ: </span>   ${element.date}</p>
      <p><span>🕒 الوقت:</span>  ${element.time}</p>
      <p> <span>💺المقاعد المتاحة: </span>  ${element.seats.Economy + element.seats.First_Class + element.seats.Business }</p>
      <p><span>💰السياحية:</span>  ${element.prices.Economy}</p>
      <p><span>💼 رجال الأعمال: </span> ${element.prices.Business}</p>
      <p> <span>🏆الدرجة الأولى: </span>  ${element.prices.First_Class}</p>
    </div>
    <input type="button" value="حجز" class="book btn btn-warning" >
  `;
  
  
  container.appendChild(card);

let bookBtn = card.querySelector(".book");

bookBtn.addEventListener("click", function () {
  if (loging_status) {
    document.querySelector(".container .booking-board").style.display = "block"; 
    closeOffcanvas();
    let clone = card.cloneNode(true);
    let btn = clone.querySelector(".book");
    if (btn) btn.remove();
    let booked_card = document.querySelector(".ticket-details");
    booked_card.innerHTML = "" ; 
    booked_card.append(clone)
    let classes = document.querySelectorAll(".count")  ;
    classes[0].innerHTML = element.seats.Economy ; 
    classes[1].innerHTML = element.seats.Business ; 
    classes[2].innerHTML = element.seats.First_Class ; 
    
  } 

  else {
    
    let offcanvasElement = document.querySelector("#staticBackdrop");
    let bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.show();
    form1.style.display = "block"; 
    form2.style.display = "none";
  }
  

});
// مكان تاكيد الحجز 
// *******************************************************************
// *******************************************************************
// *******************************************************************
// *******************************************************************

// مكان تاكيد الحجز 



}

function searchFlights(from, to, date, container) {
    let found = false;
    flights.forEach(element => {
        if (from === element.from && to === element.to && element.date === date) {
            found = true;
            createCard(element, container);
        }
    });
    if (!found) {
        container.innerHTML = "<p>❌ لا توجد رحلات مطابقة — جرب تغيير التاريخ أو الوجهة</p>";
    }
}


searchbtn.addEventListener("click", function() {
    result1.innerHTML = "";
    result2.innerHTML = "";  
    
    const tripType = document.querySelector('input[name="trip"]:checked')?.value; 
    const fcity = document.getElementById("fromcity").value;
    const tcity = document.getElementById("tocity").value;
    const departDate = document.getElementById("ddepart").value;
    const returnDate = document.getElementById("dreturn").value;
    
    let found1 = false;
    let found2 = false ; 

    if (tripType === "oneway") {

        searchFlights(fcity, tcity, departDate, result1);
    }

      // ==========go================= 
    
     if (tripType === "roundtrip")
    {
          searchFlights(fcity, tcity, departDate, result1);
          searchFlights(tcity, fcity, returnDate, result2);

    }
});
 
let form1 = document.querySelector("#loginf");
let form2 = document.querySelector("#signupf");

let login = document.querySelector("#login");
login.addEventListener("click", function () {
  form1.style.display = "block";
  form2.style.display = "none";
});


let signup = document.querySelector("#sign");
signup.addEventListener("click", function () {
  form2.style.display = "block";
  form1.style.display = "none";
});

let signWord = document.querySelector("#signWord");

signWord.addEventListener("click", function () {
  form2.style.display = "block";
  form1.style.display = "none";
});

let Cancel = document.querySelector(".cancel") ;
Cancel.addEventListener("click", function () {
  form1.style.display = "block";
  form2.style.display = "none";
  document.querySelector("#signupf").reset();

});




// ================ users database ================= 


// دالة لإضافة مستخدم وحفظة في الذاكرة الدائمة

function add_save(new_user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(new_user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("تم إنشاء حساب جديد بنجاح ");
}
// دالة الحصول على البيانات من المستخدم 
function getData() {
  return {
    fname: document.querySelector("#firstName").value,
    lname: document.querySelector("#lastName").value,
    email: document.querySelector("#signemail").value,
    passw: document.querySelector("#signpass").value,
    confpassw: document.querySelector("#confirpass").value
  };
}
// دالة التأكد من عدم وجود حقول فارغة 
function inputValidation(form) {
  let inputs = form.querySelectorAll("input");     
  let allFilled = true; 

  inputs.forEach(input => {
    if (input.value.trim() === "") {               
      allFilled = false;
      input.style.border = "2px solid red";        
    } else {
      input.style.border = "";                     
    }
  });

  return allFilled; 
}
// دالة إنشاء الحساب الجديد
function signIn() {
  let User = getData();
  let confirmPass = document.querySelector("#confirpass");

  if (User.passw !== User.confpassw) {
    confirmPass.setCustomValidity("كلمة المرور غير متطابقة");
    confirmPass.reportValidity(); 
    return;
  } 
  else {
    confirmPass.setCustomValidity(""); 
  }
  add_save(User);
  form2.style.display = "none";
  let user_board = document.querySelector(".container2");
  user_board.style.display = "block";
  document.querySelector("#signupf").reset();

  // إضافة بيانات التسجيل للبروفايل
  setProfileinfo(User)
  
}


// الزرار الخاص بإنشاء الحساب
let createBtn = document.querySelector("#create-acount");
let logBtn = document.querySelector("#login-button");
 
// دالة التأكد من وجود بريد مسبق 
  function emailExists(email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some(user => user.email === email);
}
// دالة تسجيل الدخول 
function Login(){
  let log_email = document.querySelector("#inputEmail3").value ;
  let log_password = document.querySelector("#inputPassword3").value ;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let foundUser = users.find(user => user.email === log_email && user.passw === log_password);
  if(foundUser)
  {
    alert("تم تسجيل الدخول بنجاح ") ;
    setProfileinfo(foundUser) ;
    document.querySelector("#loginf").reset();
    form1.style.display = "none";
    let user_board = document.querySelector(".container2");
    user_board.style.display = "block";
    closeOffcanvas() ;
    

  }
  else 
  {
    alert("البريد أو كلمة المرور غير صحيحة !") ;
    return ;
  }
}
// إجراء تسجيل الدخول 
logBtn.addEventListener("click" , function(e){
  let form = e.target.closest("form"); // الفورم اللي الزرار موجود فيه
  if (!inputValidation(form)) {
    alert("⚠️ من فضلك املأ جميع الحقول");
    return;
  }
  Login() ;
  


})
// إجراء إنشاء حساب 
createBtn.addEventListener("click", function (e) {
  let form = e.target.closest("form"); // الفورم اللي الزرار موجود فيه
  if (!inputValidation(form)) {
    alert("⚠️ من فضلك املأ جميع الحقول");
    return;
  }
  let user = getData() ; 
if (emailExists(user.email))
{
  alert("هذا الإميل موجود بالفعل ! جرب إيميل أخر")
  return
}
signIn() ;
closeOffcanvas() ;
});
// دالة لإعداد بيانات البروفايل 
function setProfileinfo(User) {
  let profileName = document.querySelector(".user-avatar h3");
  let profileEmail = document.querySelector(".user-email");
  profileName.innerHTML = User.fname + " " + User.lname;
  profileEmail.innerHTML = User.email;
  setChar(User.fname) ;
  document.querySelector("#staticBackdropLabel").style.display = "none" ;
  document.querySelector(".note-text").style.display = "none" ;
  loging_status = true ; 
}
//  دالة لإعداد ايقونة البروفايل 
function setChar(Name){
 let profileAvatar  ;
 let logn_icon = document.querySelector("#login") ;
 let sign_icon = document.querySelector("#sign") ;
 let lognSignCont = document.querySelector(".lls") ;
 profileAvatar = Name.charAt(0);
 let circle = document.createElement("div") ; 
 circle.setAttribute("data-bs-toggle", "offcanvas");
 circle.setAttribute("data-bs-target", "#staticBackdrop");
 circle.classList.add("show-profile") ;
 circle.innerHTML = profileAvatar ; 
 logn_icon.style.display = "none" ; 
 sign_icon.style.display = "none" ; 
lognSignCont.appendChild(circle) ;
 

}
function closeOffcanvas() {
  let offcanvasElement = document.querySelector("#staticBackdrop"); 
  let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement); 
  if (offcanvasInstance) {
    offcanvasInstance.hide();
  }
}

// ========================= booking =========================




//  localStorage.removeItem("users");



let passenger_count ; 
let count_confirm = document.querySelector(".count-confirm") ; 
count_confirm.addEventListener("click" ,function(){
  passenger_count = document.querySelector("#numPassengers").value ;
if (passenger_count === "")
{
  alert("يجب أن تدخل عدد الركاب")
}
else
{
  passenger_count = Number(passenger_count); 
  
    numPassengers.disabled = true;  
    this.disabled = true;           
    this.innerText = "تم التأكيد ✅"; 

}
 
} ) ;
function fillData() {
  return {
    fullname: document.querySelector("#fullname1").value,
    birthdate: document.querySelector("#birthdate1").value,
    phone: document.querySelector("#phone1").value,
    gender : document.querySelector('input[name="gender1"]:checked').value ,  
    passport: document.querySelector("#passport1").value,
    nationality: document.querySelector("#nationality1").value ,
    class: document.querySelector("#class1").value,

  };
}














