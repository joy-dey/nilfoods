/* 
---------------- Custom Functions ----------------
*/
const elem = (el) => {
  return document.querySelector(el);
};
const goBack = () => {
  window.history.back(-1);
};
const reDirect = (url) => {
  window.location.href = url;
};
const activeMenu = (activeState) => {
  let navNum = activeState - 1;
  const navItems = document.querySelectorAll("#menuDown li");

  navItems.forEach(function (item, count) {
    item.classList.add("diss");
    if (count == navNum) {
      item.classList.remove("diss");
    }
  });
};
const fTop = () => {
  window.scrollTo(0, 0);
};
const navShow = (num) => {
  elem("#menuDown").classList.remove("navNone");
  activeMenu(num);
};
const navRem = () => {
  elem("#menuDown").classList.add("navNone");
};
const dResJSON = (resP) => {
  if (!resP.ok) {
    console.error("Error 404 ! File not Found for the given fetch request.");
    alert(
      "There is a problem in accessing the Server Please Try again later !"
    );
  } else {
    return resP.json();
  }
};
const dResTEXT = (resP) => {
  if (!resP.ok) {
    console.error("Error 404 ! File not Found for the given fetch request.");
    alert(
      "There is a problem in accessing the Server Please Try again later !"
    );
  } else {
    return resP.text();
  }
};
const catchErr = (errP) => {
  console.error(errP);
  alert("Internal Error C.L. Please Contact the Developers !");
};
/* CartLength is a temporary counter for triggering the cart Page if(cartLength > 0){ cartOpen();😄 }*/
let cartLength = 0;
const cartItems = [];
const addToCartDruba = (item) => {
  cartLength++;
  cartItems.push(item);
  if (cartLength == 1) {
    alert(parseInt(cartLength) + " item added to your cart !");
  } else {
    alert(parseInt(cartLength) + " items added to your cart !");
  }
};

/* Login in Function to SET the username and state locally */
if (elem("#lgFrm")) {
  (() => {
    elem("#lgFrm").addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(
        "https://nilfoods.xcellentcomputel.in/admin/model/loginUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: elem("#username").value,
            pass: elem("#password").value,
          }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            console.error("API not Found for Check User");
            alert("There was a problem.. Please Try again Later");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data[0] == 1) {
            localStorage.setItem("usernameRAW", elem("#username").value);
            localStorage.setItem("userState", "1");
            window.location.href = "main.html";
          } else {
            alert("Wrong Credentials ! Please Enter the credentials again.");
            elem("#username").focus;
            localStorage.setItem("usernameRAW", "0");
            localStorage.setItem("userState", "0");
          }
        })
        .catch((err) => {
          console.error("There was a problem in the Code : " + err);
          localStorage.setItem("usernameRAW", "0");
          localStorage.setItem("userState", "0");
        });
    });
  })();
}

let logoutFromHere = () => {
  localStorage.removeItem("usernameRAW");
  localStorage.removeItem("userState");
  window.location.href = "index.html";
};

/* Check Entry User for Login and Sign up Form whether the user is sign in or not */
let checkEnUser = () => {
  if (
    localStorage.getItem("usernameRAW") == null &&
    localStorage.getItem("userState") != "1"
  ) {
    return;
  } else {
    localStorage.removeItem("usernameRAW");
    localStorage.removeItem("userState");
    window.location.href = "index.html";
  }
};

/* sfn = Skip for Now, for the preview of the App without logging in */
let sfn = () => {
  localStorage.setItem("usernameRAW", "demo");
  localStorage.setItem("userState", 1);
  window.location.href = "index.html";
};

/* Calling the onload functions */
fTop();
activeMenu(0);
