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

/* Grand Price for the CART */
let gGrandPrice = 0;

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
    await fetch(
      "https://nilfoods.xcellentcomputel.in/gstsoft/model/sm_fnt.php"
    )
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        let outputBanner = ``;
        data.forEach(function (img) {
          outputBanner += `
                    <img class="img-fluid" src="https://nilfoods.xcellentcomputel.in/gstsoft/${img.b_img}" />
                `;
        });
        elem("#upBanner").innerHTML = outputBanner;
      })
      .catch((err) => {
        catchErr(err);
      });

    await fetch(
      "https://nilfoods.xcellentcomputel.in/gstsoft/model/sm_down.php"
    )
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        let outputBanner = ``;
        data.forEach(function (img) {
          outputBanner += `
              <img class="img-fluid" src="https://nilfoods.xcellentcomputel.in/gstsoft/${img.b_img}" />
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
  fetch("model/frCategory.json")
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
      reDirect("#!/prod/c:" + elem("#txtSearch").value);
    });
  }
});
app.controller("categoryCtrl", function () {
  fTop();
  navShow(3);

  fetch("model/category.json")
    .then((res) => {
      return dResJSON(res);
    })
    .then((data) => {
      if (data[0] != 0) {
        let accordionCate = `<div role="tablist" id="accordion-1">`;
        data.forEach(function (category, count) {
          count += 1;
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
                            >${category.c_items.length}</span
                        >
                        </div>
                    </div>
                    </div>
                    <div class="collapse item-${count}" role="tabpanel" data-parent="#accordion-1">
                    <div class="card-body">
                    <ul class="list-group">
                        `;
          category.c_items.forEach(function (subCat) {
            accordionCate += `
                        <li class="list-group-item" onclick='reDirect("#!/prod/${subCat.cs_link}")'>
                            <span>${subCat.cs_name}</span>
                        </li>
                        `;
          });
          accordionCate += `
                    </ul>
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
/* TODO: Discuss about the below functionality */
app.controller("cartCtrl", function () {
  fTop();
  navRem();
  if (cartLength > 0) {
    elem("#mainCart").classList.remove("hidden");
    elem("#emptyCartSEC").classList.add("hidden");
    elem("#cartDYNAMIC");
    if (cartItems.length > 0) {
      let output = ``;
      let TotalPrice = 0;
      let prcDiscount = "20";
      let dlvCharge = "50";
      cartItems.forEach(function (items) {
        output += `
                <div class="row py-2 bg-white">
                    <div class="col-3 px-2">
                    <img class="img-fluid" src="${items[1]}" />
                    </div>
                    <div class="col-5 px-1 d-flex flex-column justify-content-center">
                        <p class="text-muted font-weight-bold mb-0 tWrap2">${items[0]}</p>
                        <p class="text-primary mb-0 tWrap1">${items[2]}</p>
                    </div>
                    <div
                    class="col-4 d-flex flex-column justify-content-center align-items-center px-2"
                    >
                    <input type="number" class="form-control mr-1" inputmode="tel" value="1">
                    <select class="form-control mr-1">
                      <option value="kgs">kgs</option>
                      <option value="gm">gm</option>
                      <option value="PCs">PCs</option>
                    </select>
                    </div>
                </div>
                `;
        TotalPrice += parseInt(items[2]);
      });
      elem("#cartDYNAMIC").innerHTML = output;
      elem("#totalPrice").innerHTML = "₹ " + TotalPrice;
      elem("#discNum").innerHTML = "- ₹ " + prcDiscount;
      elem("#dlvCharge").innerHTML = "₹ " + dlvCharge;
      let grndPrice =
        parseInt(TotalPrice) - parseInt(prcDiscount) + parseInt(dlvCharge);
      elem("#grndPrice").innerHTML = "₹ " + grndPrice;
      gGrandPrice = grndPrice;
    }
  } else {
    elem("#mainCart").classList.add("hidden");
    elem("#emptyCartSEC").classList.remove("hidden");
  }
});
/* TODO: Discuss about the below functionality */
app.controller("orderPlaceCtrl", function () {
  fTop();
  navRem();
  if (cartItems.length > 0) {
    fetch("model/profile.json")
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
        if (data.length > 1) {
          console.error("Developer!.. Please Send only one array as JSON");
          alert("There is a problem in the server");
        }
        elem("#cartTotal").innerHTML = gGrandPrice;
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
});
/* TODO: Discuss about the below functionality */
app.controller("editProfileCtrl", function () {
  fTop();
  navRem();
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
});
app.controller("orderHistoryCtrl", function () {
  fTop();
  navRem();
  fetch("model/orderHistory.json")
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
                    <p class="text-primary">₹ ${items.p_price}</p>
                    <button class="btn btn-primary" onclick='addToCart(["${items.p_name}","${items.p_img}","${items.p_price}"])'>Add</button>
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
    fetch("model/products.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: $routeParams.id,
      }),
    })
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
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
                                onclick='addToCart(["${item.p_name}","${item.p_img}","${item.p_price}"])'
                                > 
                                Add to Cart
                              </button>
                            </div>
                        </div>
                    </div>
                  `;
        });
        elem("#priceListing").innerHTML = output;
      })
      .catch((err) => {
        catchErr();
      });
  } else if (rp[0] == "id") {
    fetch("model/product.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: $routeParams.id,
      }),
    })
      .then((res) => {
        return dResJSON(res);
      })
      .then((data) => {
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
                                onclick='addToCart(["${item.p_name}","${item.p_img}","${item.p_price}"])'
                                > 
                                Add to Cart
                              </button>
                            </div>
                        </div>
                    </div>
                  `;
        });
        elem("#priceListing").innerHTML = output;
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
