/* 
----------------Keywords for Custom Functions----------------

goBack() - Back button Function;
activeMenu(num) - Function to set the Bottom nav active class with number starting from 1 to n;
navShow(num) - Show the menu nav bottom with a parameter that defines the active class;
navRem() - Hide the menu nav bottom;
fTop() - Scroll to the topmost part of the page;
elem(element) - For selecting elements in the DOM. eg, elem('#nav');
dResJSON(res) - returns whether the given response url exist or not, if yes then it returns in JSON format;
dResTEXT(res) - returns whether the given response url exist or not, if yes then it returns in TEXT format;
catchErr(err) - returns the error for the Request made by fetch and shows if there is a problem in the CODE;

------------------------------------------------------------

*/

let urlServe = "https://nilfoods.xcellentcomputel.in/";
let urlServeGST = "gstsoft/";
/* Initial Funtion to See if the User is logged in or not */
(() => {
  if (
    localStorage.getItem("usernameRAW") != null &&
    localStorage.getItem("userState") == "1"
  ) {
    if (localStorage.getItem("usernameRAW") == "demo") {
      return;
    } else {
      fetch(urlServe + urlServeGST + "model/checkUser.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: localStorage.getItem("usernameRAW"),
        }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error("API not Found for Check User");
            alert("There was a problem.. Please Try again Later");
            window.location.href = "login.html";
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data[0] == 1) {
            return;
          } else {
            console.error(
              "The user illegally tried to Enter, the Username was : " +
                localStorage.getItem("usernameRAW")
            );
            alert(
              "Your Account Doesn't Exist.. Please Consider to login again !"
            );
            window.location.href = "login.html";
          }
        })
        .catch((err) => {
          console.error("There was a problem in the Code : " + err);
          alert("There was a problem.. Please Try again Later");
          window.location.href = "login.html";
        });
    }
  } else {
    document.querySelector("body").style.display = "none";
    alert("Please Login to Continue..");
    window.location.href = "login.html";
  }
})();

username = localStorage.getItem("usernameRAW");

let addToCart = async (prdName, lUnit, lQty, lRate, lMRP, el) => {
  if (username == "demo") {
    alert("Please Login in to use the Cart and Buy Items");
    localStorage.removeItem("usernameRAW");
    localStorage.removeItem("userState");
    window.location.href = "login.html";
  } else {
    el.disabled = true;

    await fetch(urlServe + urlServeGST + "model/add_cart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pname: prdName,
        unit: lUnit,
        qty: lQty,
        rate: lRate,
        mrp: lMRP,
        user: username,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("The API was not found for adding the cart");
        } else {
          return res.text();
        }
      })
      .then((data) => {
        alert(data);
      })
      .catch((err) => {
        console.error(err);
      });

    el.disabled = false;
  }
};
let deleteFromCart = async (idR) => {
  await fetch(urlServe + urlServeGST + "model/deleteCart.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: idR,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        console.log("API url not found !");
      } else {
        return res.text();
      }
    })
    .then((data) => {
      alert(data);
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
};
let orderPlace = async () => {
  await fetch(urlServe + urlServeGST + "model/confirm_order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: username,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        console.error("The API was not found for adding the cart");
      } else {
        return res.text();
      }
    })
    .then((data) => {
      alert(data);
      reDirect("#!/orderPlace");
    })
    .catch((err) => {
      console.error(err);
    });
};

/* Grand Price for the CART */
let gGrandPrice = [0, false];

const app = angular.module("mainApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
      controller: "homeCtrl",
    })
    .when("/search", {
      templateUrl: "pages/search.html",
      controller: "searchCtrl",
    })
    .when("/category", {
      templateUrl: "pages/productcategory.html",
      controller: "categoryCtrl",
    })
    .when("/cart", {
      templateUrl: "pages/cart.html",
      controller: "cartCtrl",
    })
    .when("/orderPlace", {
      templateUrl: "pages/orderPlace.html",
      controller: "orderPlaceCtrl",
    })
    .when("/profile", {
      templateUrl: "pages/profile.html",
      controller: "profileCtrl",
    })
    .when("/editProfile", {
      templateUrl: "pages/editProfile.html",
      controller: "editProfileCtrl",
    })
    .when("/orderHistory", {
      templateUrl: "pages/orderHistory.html",
      controller: "orderHistoryCtrl",
    })
    .when("/savedAddress", {
      templateUrl: "pages/savedAddrr.html",
      controller: "savedAddressCtrl",
    })
    .when("/changeAddress", {
      templateUrl: "pages/chAddr.html",
      controller: "changeAddressCtrl",
    })
    .when("/help", {
      templateUrl: "pages/help.html",
      controller: "helpCtrl",
    })
    .when("/prod/:id", {
      templateUrl: "pages/prod.html",
      controller: "prodCtrl",
    })
    .otherwise({
      templateUrl: "pages/err.html",
      controller: function () {
        navShow();
      },
    });
});

app.controller("homeCtrl", function () {
  fTop();
  navShow(1);

  /* --------------- Async function for the banner loading-------------------- */
  let sliderShow = async () => {
    await fetch(urlServe + urlServeGST + "model/sm_fnt.php")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        let outputBanner = ``;
        data.forEach(function (img) {
          outputBanner += `
          <img class="img-fluid" src="${urlServe + urlServeGST}${img.b_img}" />
                `;
        });
        elem("#upBanner").innerHTML = outputBanner;
      })
      .catch((err) => {
        catchErr(err);
      });

    await fetch(urlServe + urlServeGST + "model/sm_down.php")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        let outputBanner = ``;
        data.forEach(function (img) {
          outputBanner += `
              <img class="img-fluid" src="${urlServe + urlServeGST}${
            img.b_img
          }" />
          `;
        });
        elem("#dnBanner").innerHTML = outputBanner;
      })
      .catch((err) => {
        catchErr(err);
      });

    slickkInitial();
  };
  /* Calling the function for showing the slider after the thing is loaded */
  sliderShow();
  /* --------------------- Category Show -------------------- */
  fetch(urlServe + urlServeGST + "model/frCategory.php")
    .then((res) => {
      return dResJSON(res);
    })
    .then((data) => {
      let outputBanner = ``;
      data.forEach(function (category) {
        outputBanner += `
            <div class="category-holder d-flex justify-content-center align-items-center" onclick='reDirect("#!/prod/${category.c_id}")'>
              <div class="image-holder">
                <img src="${category.c_img}" alt="${category.c_name}" class="img-fluid rounded-circle" />
                <span class="d-block category-text small text-center font-weight-bold text-secondary tWrap1">
                  ${category.c_name}
                </span>
              </div>
            </div>
          `;
      });
      elem("#frCategory").innerHTML = outputBanner;
    })
    .catch((err) => {
      catchErr(err);
    });
  fetch("model/fds.json")
    .then((res) => {
      return dResJSON(res);
    })
    .then((data) => {
      let outputBanner = ``;
      data.forEach(function (category) {
        outputBanner += `
                    <img class="img-fluid" src="${category.c_img}" onclick='reDirect("#!/prod/${category.c_id}")' />
                `;
      });
      elem("#fds").innerHTML = outputBanner;
    })
    .catch((err) => {
      catchErr(err);
    });
  fetch("model/snacks.json")
    .then((res) => {
      return dResJSON(res);
    })
    .then((data) => {
      let outputBanner = ``;
      data.forEach(function (category) {
        outputBanner += `
                    <img class="img-fluid" src="${category.c_img}" onclick='reDirect("#!/prod/${category.c_id}")' />
                `;
      });
      elem("#snacks").innerHTML = outputBanner;
    })
    .catch((err) => {
      catchErr(err);
    });
});
app.controller("searchCtrl", function () {
  fTop();
  navShow(2);
  elem("#txtSearch").focus();

  if (elem("#btnSearchOpen")) {
    elem("#frmSearch").addEventListener("submit", (e) => {
      e.preventDefault();
      reDirect("#!/prod/id:" + elem("#txtSearch").value);
    });
  }
});
app.controller("categoryCtrl", function () {
  fTop();
  navShow(3);

  fetch(urlServe + urlServeGST + "model/category_show_main.php")
    .then((res) => {
      return dResJSON(res);
    })
    .then((data) => {
      if (data[0] != 0) {
        let accordionCate = `<div role="tablist" id="accordion-1">`;
        data.forEach(function (category, count) {
          count += 1;
          let listItem = 0;
          if (category.c_items != 0) {
            listItem = category.c_items.length;
          } else {
            listItem =
              "<p class='text-danger' style='opacity: 0.7;'>No Product</p>";
          }
          accordionCate += `
                    <div class="card mb-3">
                    <div class="card-header" role="tab">
                    <div
                        class="row"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-${count}"
                        href="#accordion-1 .item-${count}"
                    >
                        <div class="col-3 px-1">
                        <img class="img-fluid catIMG" src="${category.c_img}" />
                        </div>
                        <div class="col-9">
                        <h5 class="mb-0">
                            <a class="text-secondary text-decoration-none">${category.c_name}</a>
                        </h5>
                        <span class="d-block text-muted mt-2 small"
                            >${listItem}</span
                        >
                        </div>
                    </div>
                    </div>
                    <div class="collapse item-${count}" role="tabpanel" data-parent="#accordion-1">
                    <div class="card-body">
                        `;
          if (category.c_items[0] != 0) {
            accordionCate += `
            <ul class="list-group">
            `;
            category.c_items.forEach(function (subCat) {
              accordionCate += `
              <li class="list-group-item" onclick='reDirect("#!/prod/${subCat.cs_link}")'>
              <span>${subCat.cs_name}</span>
              </li>
              `;
              accordionCate += `
            </ul>
            `;
            });
          } else {
            accordionCate += `<p class='text-center' style='margin:0; opacity: 0.5'>No Items</p>`;
          }
          accordionCate += `
                    </div>
                    </div>
                </div>
                `;
        });
        accordionCate += "</div>";
        elem("#acd").innerHTML = accordionCate;
      } else {
        elem("#acd").innerHTML = `
        <div>
          <p class="text-danger text-center">There was a problem.. Please Try again Later</p> 
        </div>
        `;
        console.error("There was a problem in the PHP Code..");
      }
    })
    .catch((err) => {
      catchErr(err);
    });
});
app.controller("cartCtrl", function () {
  fTop();
  navRem();

  fetch(urlServe + urlServeGST + "model/cart_view.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: username,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        console.error("API not found for CART VIEW");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data[0] != 0) {
        elem("#mainCart").classList.remove("hidden");
        elem("#emptyCartSEC").classList.add("hidden");
        let theoutput = ``;
        let TotalPrice = 0;
        let prcDiscount = "20";
        let dlvCharge = "50";
        data.forEach(function (items) {
          theoutput += `
                <div class="row py-2 bg-white">
                    <div class="col-3 px-2">
                    <img class="img-fluid" src="assets/img/product-image.png" />
                    </div>
                    <div class="col-3 px-1 d-flex flex-column justify-content-center">
                        <p class="text-muted font-weight-bold mb-0 tWrap2">${items.pname}</p>
                        <p class="text-primary mb-0 tWrap1">${items.rate}</p>
                    </div>
                    <div
                    class="col-6 d-flex flex-row justify-content-center align-items-center px-2"
                    >
                    <input type="number" class="form-control" style="width: 50px" inputmode="tel" value="${items.qty}">
                      <select class="form-control mr-1" style="width: 80px">
                        <option value="pc">pc</option>
                        <option value="kg">kg</option>
                        <option value="gm">gm</option>
                      </select>
                      <button 
                        class="btn btn-danger d-flex" 
                        style="height: 38px; justify-content: center;align-items: center;"
                        onclick="deleteFromCart('${items.id}')"
                      >
                        <i class='fas fa-close'></i>
                      </button>
                    </div>
                </div>
                `;
          TotalPrice += parseFloat(items.rate);
        });
        elem("#cartDYNAMIC").innerHTML = theoutput;
        elem("#totalPrice").innerHTML = "₹ " + TotalPrice;
        elem("#discNum").innerHTML = "- ₹ " + prcDiscount;
        elem("#dlvCharge").innerHTML = "₹ " + dlvCharge;
        let grndPrice =
          parseFloat(TotalPrice) -
          parseFloat(prcDiscount) +
          parseFloat(dlvCharge);
        elem("#grndPrice").innerHTML = "₹ " + grndPrice;
        gGrandPrice[0] = grndPrice;
        gGrandPrice[1] = true;
      } else {
        elem("#mainCart").classList.add("hidden");
        elem("#emptyCartSEC").classList.remove("hidden");
      }
    })
    .catch((err) => {
      console.log("Code Error : " + err);
    });
});
app.controller("orderPlaceCtrl", function () {
  fTop();
  navRem();
  if (gGrandPrice[1] == true) {
    fetch("model/profile.json")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data.length > 1) {
          console.error("Developer!.. Please Send only one array as JSON");
          alert("There is a problem in the server");
        }
        elem("#cartTotal").innerHTML = gGrandPrice[0];
        elem("#profileName").innerHTML = data[0].name;
        elem("#profileAddress").innerHTML = data[0].address;
        elem("#profilePin").innerHTML = data[0].pin;
      })
      .catch((err) => {
        catchErr(err);
      });
  } else {
    alert("You aren't Supposed to be Here !");
    reDirect("#!/");
  }
});
app.controller("profileCtrl", function () {
  fTop();
  navShow(5);
  if (username == "demo") {
    elem("#sinout").innerHTML = `
          <i class="fa fa-sign-in mr-3 text-primary"></i>
          Sign In
    `;
    elem("#profile_img").src = "assets/img/product-image.png";
    elem("#profile_name").innerHTML = "demo";
  } else {
    elem("#sinout").innerHTML = `
        <i class="fa fa-sign-out mr-3 text-danger"></i>
        Sign out
    `;
    fetch("model/profile.json")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data.length > 1) {
          console.log("Developer!.. Please Send only one array as JSON");
          alert("There is a problem in the server");
        }
        elem("#profile_img").src = data[0].img;
        elem("#profile_name").innerHTML = data[0].name;
      })
      .catch((err) => {
        catchErr(err);
      });
  }
});
/* TODO: Discuss about the below functionality */
app.controller("editProfileCtrl", function () {
  fTop();
  navRem();
  if (username == "demo") {
    alert("Please Login in to Edit your profile");
    localStorage.removeItem("usernameRAW");
    localStorage.removeItem("userState");
    window.location.href = "login.html";
  } else {
    fetch("model/profile.json")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data.length > 1) {
          console.log("Developer!.. Please Send only one array as JSON");
          alert("There is a problem in the server");
        }
        elem("#txtName").value = data[0].name;
        elem("#txtEmail").value = data[0].email;
        elem("#txtAddress").value = data[0].address;
        elem("#txtGender").value = data[0].gender;
        elem("#txtPhone").value = data[0].phone;
        elem("#txtPIN").value = data[0].pin;
      })
      .catch((err) => {
        catchErr(err);
      });
  }
});
app.controller("orderHistoryCtrl", function () {
  fTop();
  navRem();
  if (username == "demo") {
    alert("Please Login in to check your Order History");
    localStorage.removeItem("usernameRAW");
    localStorage.removeItem("userState");
    window.location.href = "login.html";
  } else {
    fetch(urlServe + urlServeGST + "model/orderHistory.php")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data.length > 0) {
          let output = `<div class="container mt-3">`;
          data.forEach(function (items) {
            output += `
                <div class="row py-2 bg-white">
                    <div class="col-3 px-2">
                    <img class="img-fluid orHis" src="${items.p_img}" />
                    </div>
                    <div class="col-5 px-1">
                    <p class="text-muted font-weight-bold mb-0 small">${items.p_name}</p>
                    <span class="text-secondary small">${items.p_desc}</span>
                    </div>
                    <div
                    class="col-4 d-flex flex-column justify-content-center align-items-end px-2"
                    >
                    <button class="btn btn-primary" onclick='reDirect("#!/prod/id:${items.p_name}")'>Open</button>
                    </div>
                </div>
                `;
          });
          output += `</div>`;
          elem("#orderHIST").innerHTML = output;
          elem("#orderHIST").classList.remove("hidden");
          elem("#noItemsSec").classList.add("hidden");
        } else {
          elem("#orderHIST").classList.add("hidden");
          elem("#noItemsSec").classList.remove("hidden");
        }
      })
      .catch((err) => {
        catchErr(err);
      });
  }
});
/* TODO: Discuss about the below functionality */
app.controller("savedAddressCtrl", function () {
  fTop();
  navRem();
});
/* TODO: Discuss about the below functionality */
app.controller("changeAddressCtrl", function () {
  fTop();
  navRem();
});
/* TODO: Discuss about the below functionality */
app.controller("helpCtrl", function () {
  fTop();
  navRem();
});
app.controller("prodCtrl", function ($routeParams) {
  fTop();
  navRem();

  let rp = $routeParams.id;
  rp = rp.split(":");

  if (rp[0] == "c" || rp[0] == "id") {
    elem("#searchTextbx").innerHTML = rp[1];
  } else {
    elem("#searchTextbx").innerHTML = rp;
  }

  if (rp[0] == "c") {
    fetch(urlServe + urlServeGST + "model/product_category_view.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prods: rp[1],
      }),
    })
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data[0] != 0) {
          let output = "";
          data.forEach(function (item) {
            output += `
                    <div class="col-6 col-sm-12 col-md-4 col-lg-3 px-1 my-3">
                        <div class="item-holder text-center">
                            <img class="img-fluid w-75 rounded" src="${item.p_img}">
                            <p class="h6 mt-2">${item.p_name}</p>
                            <p class="h6 text-success">₹ ${item.p_price}</p>
                            <div class="d-flex justify-content-center">
                              <button 
                                class="btn btn-primary mr-2 mb-2" 
                                type="button"
                                onclick='addToCart("${item.p_name}","${item.p_unit}","1","${item.p_rate}","${item.p_mrp}",this)'
                                > 
                                Add to Cart
                              </button>
                            </div>
                        </div>
                    </div>
                  `;
          });
          elem("#priceListing").innerHTML = output;
        } else {
          elem("#priceListing").innerHTML = `    
          <div class="col-12 mt-3">
            <p class="text-danger text-center">No Items Found !</p>
          </div>
        `;
        }
      })
      .catch((err) => {
        catchErr();
      });
  } else if (rp[0] == "id") {
    fetch(urlServe + urlServeGST + "model/product_name_view.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: rp[1],
      }),
    })
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data[0] != 0) {
          let output = "";
          data.forEach(function (item) {
            output += `
                    <div class="col-6 col-sm-12 col-md-4 col-lg-3 px-1 my-3">
                        <div class="item-holder text-center">
                            <img class="img-fluid w-75 rounded" src="${item.p_img}">
                            <p class="h6 mt-2">${item.p_name}</p>
                            <p class="h6 text-success">₹ ${item.p_price}</p>
                            <div class="d-flex justify-content-center">
                              <button 
                                class="btn btn-primary mr-2 mb-2" 
                                type="button"
                                onclick='addToCart("${item.p_name}","${item.p_unit}","1","${item.p_rate}","${item.p_mrp}",this)'
                              > 
                                Add to Cart
                              </button>
                            </div>
                        </div>
                    </div>
                  `;
          });
          elem("#priceListing").innerHTML = output;
        } else {
          elem("#priceListing").innerHTML = `    
          <div class="col-12 mt-3">
            <p class="text-danger text-center">No Items Found !</p>
          </div>
        `;
        }
      })
      .catch((err) => {
        catchErr();
      });
  } else {
    elem("#priceListing").innerHTML = `    
      <div class="col-12 mt-3">
        <p class="text-danger text-center">Invalid Product Search !</p>
      </div>
    `;
    console.error(undefined);
  }
});
