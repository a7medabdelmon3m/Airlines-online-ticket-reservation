

const flights = [
  //  CAI → RUH
  { from: "CAI", to: "RUH", date: "2025-08-25", time: "10:00", available_seats: 120,
    prices: { Economy: "100$", Business: "200$", First_Class: "300$" } },
  { from: "CAI", to: "RUH", date: "2025-08-25", time: "10:00", available_seats: 120,
    prices: { Economy: "100$", Business: "200$", First_Class: "300$" } },
  { from: "CAI", to: "RUH", date: "2025-08-25", time: "10:00", available_seats: 120,
    prices: { Economy: "100$", Business: "200$", First_Class: "300$" } },
  { from: "CAI", to: "RUH", date: "2025-08-26", time: "18:30", available_seats: 80,
    prices: { Economy: "120$", Business: "220$", First_Class: "320$" } },
  { from: "CAI", to: "RUH", date: "2025-08-27", time: "06:45", available_seats: 60,
    prices: { Economy: "95$", Business: "210$", First_Class: "310$" } },

  //  RUH → CAI
  { from: "RUH", to: "CAI", date: "2025-08-28", time: "09:00", available_seats: 100,
    prices: { Economy: "110$", Business: "210$", First_Class: "310$" } },
  { from: "RUH", to: "CAI", date: "2025-08-29", time: "21:15", available_seats: 70,
    prices: { Economy: "105$", Business: "205$", First_Class: "305$" } },

  //  CAI → DXB
  { from: "CAI", to: "DXB", date: "2025-08-25", time: "14:00", available_seats: 90,
    prices: { Economy: "150$", Business: "250$", First_Class: "400$" } },
  { from: "CAI", to: "DXB", date: "2025-08-27", time: "22:30", available_seats: 85,
    prices: { Economy: "145$", Business: "245$", First_Class: "390$" } },

  // DXB → CAI
  { from: "DXB", to: "CAI", date: "2025-08-28", time: "18:30", available_seats: 70,
    prices: { Economy: "160$", Business: "260$", First_Class: "420$" } },
  { from: "DXB", to: "CAI", date: "2025-08-30", time: "07:00", available_seats: 65,
    prices: { Economy: "155$", Business: "255$", First_Class: "410$" } },

  //  CAI → DOH
  { from: "CAI", to: "DOH", date: "2025-08-26", time: "11:15", available_seats: 95,
    prices: { Economy: "130$", Business: "230$", First_Class: "350$" } },
  { from: "CAI", to: "DOH", date: "2025-08-28", time: "20:45", available_seats: 100,
    prices: { Economy: "135$", Business: "240$", First_Class: "360$" } },

  //  DOH → CAI
  { from: "DOH", to: "CAI", date: "2025-08-29", time: "13:00", available_seats: 75,
    prices: { Economy: "140$", Business: "245$", First_Class: "365$" } },

  //  CAI → AMM
  { from: "CAI", to: "AMM", date: "2025-08-25", time: "08:00", available_seats: 110,
    prices: { Economy: "115$", Business: "215$", First_Class: "330$" } },

  //  AMM → CAI
  { from: "AMM", to: "CAI", date: "2025-08-27", time: "16:30", available_seats: 85,
    prices: { Economy: "120$", Business: "220$", First_Class: "340$" } }
];


let searchbtn = document.getElementById("search"); 
let result1 = document.querySelector(".box"); 
let result2 = document.querySelector(".box2"); 

function createCard(element, container) {
  let card = document.createElement("div"); 
  card.classList.add("available-trips"); 

  card.innerHTML = `
    <h3>من: ${element.from} ✈ لـ ${element.to}</h3>
    <div class="date-time">
      <p><i class="fa-solid fa-calendar-days"></i> التاريخ: ${element.date}</p>
      <p>🕒 الوقت: ${element.time}</p>
      <p>💺 المقاعد المتاحة: ${element.available_seats}</p>
      <p>💰 السياحية: ${element.prices.Economy}</p>
      <p>💼 رجال الأعمال: ${element.prices.Business}</p>
      <p>🏆 الدرجة الأولى: ${element.prices.First_Class}</p>
    </div>
    <input type="button" value="حجز" class="book btn btn-warning" 
           data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop">
  `;

  container.appendChild(card);

  let bookBtn = card.querySelector(".book");
  bookBtn.addEventListener("click", function () {
    form1.style.display = "block";
    form2.style.display = "none";
  });
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
  } else {
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

  }
  else 
  {
    alert("البريد أو كلمة المرور غير صحيحة !") ;
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
  form1.style.display = "none";
  let user_board = document.querySelector(".container2");
  user_board.style.display = "block";
  closeOffensive()


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
closeOffensive()
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
function closeOffensive(){
    let offcanvasElement = document.querySelector("#staticBackdrop"); 
    let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement); 
    offcanvasInstance.hide(); // يقفل الـ offcanvas

}


//  localStorage.removeItem("users");
















