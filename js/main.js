

const flights = [
  {
    from: "CAI",
    to: "RUH",
    date: "2025-08-25",
    time: "10:00",
    seats: { 
      Economy: 80, 
      Business: 30, 
      First_Class: 10 
    },
    prices: { 
      Economy: "100$", 
      Business: "200$", 
      First_Class: "300$" 
    }
  },
  {
    from: "CAI",
    to: "RUH",
    date: "2025-08-26",
    time: "18:30",
    seats: { 
      Economy: 60, 
      Business: 15, 
      First_Class: 5 
    },
    prices: { 
      Economy: "120$", 
      Business: "220$", 
      First_Class: "320$" 
    }
  }
];



let searchbtn = document.getElementById("search"); 
let result1 = document.querySelector(".box"); 
let result2 = document.querySelector(".box2"); 
let  loging_status = false ; 
// دالة للحصول على ارقام عشواية 



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
















