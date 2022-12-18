if (window.location.pathname.includes("signup.html")) {
  let userNameInp = document.querySelector("#user_name");
  let userMailInp = document.querySelector("#user_email");
  let passwordInp = document.querySelector("#user_password");
  let passwordConfirmInp = document.querySelector("#user_rePassword");
  let addUser = document.querySelector("#add_user");

  //message that display if not valid
  var nameMsg = document.querySelector(".username .invalid-feedback");
  var mailMsg = document.querySelector(".userEmail .invalid-feedback");
  var userPassMsg = document.querySelector(".userPassword .invalid-feedback");
  var userRePassMsg = document.querySelector(
    ".passwordConfirm .invalid-feedback"
  );

  //username validation
  let nameRegx = /^(?=.{5,15}$)([a-zA-Z][a-z0-9][a-zA-Z]*$)/;
  userNameInp.addEventListener("blur", function () {
    if (userNameInp.value != "" && nameRegx.test(userNameInp.value) == true) {
      nameMsg.style.display = "none";
    } else {
      nameMsg.style.display = "block";
    }
  });
  //userMail validation
  let mailRegx =
    /^[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]{0,}@[a-z0-9]{0,65}(\.[a-z]{1,6}){1,4}$/;
  userMailInp.addEventListener("blur", function () {
    if (userMailInp.value != "" && mailRegx.test(userMailInp.value) == true) {
      mailMsg.style.display = "none";
      return userMailInp.value;
    } else {
      mailMsg.style.display = "block";
    }
  });
  //username validation
  var passwordRegx = /^(?=.{8,}$)([a-zA-Z0-9])*$/;
  passwordInp.addEventListener("blur", function () {
    if (
      passwordInp.value != "" &&
      passwordRegx.test(passwordInp.value) == true
    ) {
      userPassMsg.style.display = "none";
    } else {
      userPassMsg.style.display = "block";
    }
  });
  passwordConfirmInp.addEventListener("blur", function () {
    if (
      passwordConfirmInp.value != "" &&
      passwordConfirmInp.value === passwordInp.value &&
      passwordRegx.test(passwordConfirmInp.value) == true
    ) {
      userRePassMsg.style.display = "none";
    } else {
      userRePassMsg.style.display = "block";
    }
  });

  //fetch data

  addUser.addEventListener("click", function (e) {
    e.preventDefault();
    let temp = "";
    if (
      userNameInp.value != "" &&
      nameRegx.test(userNameInp.value) == true &&
      userMailInp.value != "" &&
      mailRegx.test(userMailInp.value) == true &&
      passwordInp.value != "" &&
      passwordRegx.test(passwordInp.value) == true &&
      passwordConfirmInp.value != "" &&
      passwordConfirmInp.value === passwordInp.value &&
      passwordRegx.test(passwordConfirmInp.value) == true
    ) {
      //creat object
      temp = userMailInp.value;
      let data = {
        userName: userNameInp.value,
        email: userMailInp.value,
        password: passwordInp.value,
        password_confirmation: passwordConfirmInp.value,
      };
      fetch("https://goldblv.com/api/hiring/tasks/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => console.log("response", response.json()))
        .catch((err) => console.log(err));
      localStorage.setItem("useEmail", userMailInp.value);
      window.location = "../../task/success.html";
    } else {
      alert("you Must Fill All Fields");
    }
  });
}
if (window.location.pathname.includes("success.html")) {
  document.getElementById("userMail").innerHTML =
    localStorage.getItem("useEmail");
  function mailToSend(e) {
    window.location = "mailto:" + localStorage.getItem("useEmail");
  }
}
