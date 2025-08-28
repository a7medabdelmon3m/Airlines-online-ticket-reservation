import { generatePNRs, seatNum, weight, getArrival,flights , 
   cityName, formatArabicDate, getFlightById, saveTempTicket,
    getTempTickets, clearTempTickets } from "./generate.js";



let searchbtn = document.getElementById("search"); 
let result1 = document.querySelector(".box"); 
let result2 = document.querySelector(".box2"); 
let  loging_status = false ; 




// let ticket = {
//   airline: "SKY",
//   status: "مؤكد",
//   ticket_no: "176-1234567890",
//   pnr: "Q7X3N2",
//   from: {
//     code: "CAI",
//     city: "القاهرة",
//     time: "2025-09-25T10:30",
//     readable_time: "10:30 ص",
//     date: "الخميس 25 سبتمبر 2025",
//     flight_no: "MS985"
//   },
//   to: {
//     code: "DXB",
//     city: "دبي",
//     time: "2025-09-25T14:45",
//     readable_time: "2:45 م",
//     date: "الخميس 25 سبتمبر 2025",
//     gate: "B12"
//   },
//   duration: "4س 15د",
//   passenger: {
//     name: "أحمد محمد علي",
//     gender: "ذكر",
//     birth_date: "1994-03-10",
//     nationality: "مصري",
//     passport: "A1234567",
//     class: "اقتصادية",
//     seat: "12A",
//     baggage: "حقيبة مشحونة 23كج + يدوي 7كج"
//   },
//   notes: [
//     "يجب مطابقة الاسم مع جواز السفر.",
//     "الحضور للمطار قبل الإقلاع بـ 3 ساعات للرحلات الدولية.",
//     "تنطبق شروط شركة الطيران على تغيير أو إلغاء التذكرة."
//   ]
// };

// function saveTicket(newTicket) {
//   let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
//   tickets.push(newTicket);
//   localStorage.setItem("tickets", JSON.stringify(tickets));
// }
// function getTickets() {
//   return JSON.parse(localStorage.getItem("tickets")) || [];
// }



let currentFlightId = null;
function createCard(element, container) {
  let card = document.createElement("div"); 
  card.classList.add("available-trips"); 
 card.dataset.flightId = element.id;
  card.innerHTML = `
    <h3>من: ${element.from} ✈ لـ ${element.to}</h3>
    <div class="date-time">
      <p><span>📅التاريخ: </span>   ${element.date}</p>
      <p><span>🕒 الوقت:</span>  ${element.time}</p>
      <p> <span>💺المقاعد المتاحة: </span>  ${element.seats.economy + element.seats.firstClass + element.seats.business }</p>
      <p><span>💰السياحية:</span>  ${element.prices.economy}</p>
      <p><span>💼 رجال الأعمال: </span> ${element.prices.business}</p>
      <p> <span>🏆الدرجة الأولى: </span>  ${element.prices.firstClass}</p>
    </div>
    <input type="button" value="حجز" class="book btn btn-warning" >
  `;
  
  
  container.appendChild(card) ;


let bookBtn = card.querySelector(".book");

bookBtn.addEventListener("click", function () {
  currentFlightId = element.id;
  
  if (loging_status) {
    document.querySelector(".container .booking-board").style.display = "block"; 
    closeOffcanvas();

    // نخزن رقم الرحلة اللي اختارها المستخدم
    currentFlightId = element.id;

    let clone = card.cloneNode(true);
    let btn = clone.querySelector(".book");
    if (btn) btn.remove();
    let booked_card = document.querySelector(".ticket-details");
    booked_card.innerHTML = "" ; 
    booked_card.append(clone)

    let classes = document.querySelectorAll(".count");
    classes[0].innerHTML = element.seats.economy; 
    classes[1].innerHTML = element.seats.business; 
    classes[2].innerHTML = element.seats.firstClass; 
  } else {
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
function fillData(flightId) {
  let my_flight = getFlightById(flightId); 
  let genderInput = document.querySelector('input[name="gender1"]:checked');
  let classType = document.querySelector("#class1").value;

  return {
    pnr: generatePNRs(),

    from: {
      code: my_flight.from,
      city: cityName(my_flight.from),
      time: my_flight.time,
      readable_time: "",
      date: my_flight.date,
      flight_no: my_flight.flightNumber
    },

    to: {
      code: my_flight.to,
      city: cityName(my_flight.to),
      time: getArrival(my_flight.date, my_flight.time, my_flight.duration).arrivalTime,
      readable_time: "",
      date: getArrival(my_flight.date, my_flight.time, my_flight.duration).arrivalDate,
      gate: my_flight.gate
    },

    duration: my_flight.duration,
    passenger: {
      name: document.querySelector("#fullname1").value,
      gender: genderInput ? genderInput.value : "",
      birth_date: document.querySelector("#birthdate1").value,
      nationality: document.querySelector("#nationality1").value,
      passport: document.querySelector("#passport1").value,
      classType: classType,
      seat: seatNum(classType, my_flight.seats[classType]),
      baggage: weight(classType)
    }
  };
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




// localStorage.removeItem("users");



// المتغيرات الأساسية
let passenger_count;
let passengerIndex = 1;  // أول راكب
let numPassengers = document.getElementById("numPassengers"); // حقل عدد الركاب
let count_confirm = document.querySelector(".count-confirm");
let record = document.querySelector(".record");

// حدث زر "تأكيد عدد الركاب"
count_confirm.addEventListener("click", function(){
  passenger_count = Number(numPassengers.value);
  
  if (!passenger_count || passenger_count <= 0) {
    alert("⚠️ من فضلك أدخل عدد الركاب صحيح");
    return;
  }

  // تعطيل الحقل والزر بعد التأكيد
  numPassengers.disabled = true;      
  this.disabled = true;               
  this.innerText = "تم التأكيد ✅";   

  // بدء إدخال بيانات الركاب
  passengerIndex = 1;
  document.querySelector("#pass-num").innerText = passengerIndex;
  document.querySelector(".passenger-data").style.display = "block";
});

// حدث زر "حفظ بيانات الراكب"
record.addEventListener("click", function(){
  if (!currentFlightId) {
    alert("⚠️ من فضلك اختر رحلة أولاً");
    return;
  }

  let passengerForm = document.querySelector("#passenger-form1");
  if (!inputValidation(passengerForm)) {
    alert("⚠️ من فضلك املأ جميع الحقول");
    return;
  }

  // تعبئة بيانات التذكرة
  let ticket_data = fillData(currentFlightId);

  // حفظ التذكرة مؤقتاً
  saveTempTicket(ticket_data);

  // إعادة ضبط النموذج للراكب التالي
  passengerForm.reset();

  if (passengerIndex < passenger_count) {
    passengerIndex++;
    document.querySelector("#pass-num").innerText = passengerIndex;
  } else {
    alert("✅ تم إدخال بيانات جميع الركاب");
    document.querySelector(".passenger-data").style.display = "none";

    // عرض كل التذاكر المؤقتة في الكونسل للمراجعة
   
  }
});
 console.log(getTempTickets());



//=================== data recording =============


//=================== payment operation =============

  const paymentSelect = document.getElementById("payment-method");
  const cardDetails = document.getElementById("card-details");
  const payBtn = document.getElementById("pay-btn");

  paymentSelect.addEventListener("change", function () {
    if (this.value === "card") {
      cardDetails.style.display = "block";
      payBtn.textContent = "ادفع الآن";
    } else if (this.value === "paypal") {
      cardDetails.style.display = "none";
      payBtn.textContent = "ادفع عبر PayPal";
    } else if (this.value === "vodafone") {
      cardDetails.style.display = "none";
      payBtn.textContent = "ادفع عبر Vodafone Cash";
    } else if (this.value === "fawry") {
      cardDetails.style.display = "none";
      payBtn.textContent = "اطلب كود فوري";
    }
  });

  // الحالة الافتراضية = بطاقة
  cardDetails.style.display = "block";


  






