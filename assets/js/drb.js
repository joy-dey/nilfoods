/* 
---------------- Custom Functions ----------------
*/
const elem = el => { return document.querySelector(el) };
const goBack = () => {
    window.history.back(-1)
}
const reDirect = (url) => {
    window.location.href = url;
}
const activeMenu = (activeState) => {
    let navNum = activeState - 1;
    const navItems = document.querySelectorAll('#menuDown li');

    navItems.forEach(function (item, count) {
        item.classList.add('diss');
        if (count == navNum) {
            item.classList.remove('diss');
        }
    });
};
const fTop = () => {
    window.scrollTo(0, 0);
};
const navShow = (num) => {
    elem('#menuDown').classList.remove('navNone');
    activeMenu(num);
};
const navRem = () => {
    elem('#menuDown').classList.add('navNone');
};
const dResJSON = (resP) => {
    if (!resP.ok) {
        console.log("Error 404 ! File not Found for the given fetch request.");
        alert("There is a problem in accessing the Server Please Try again later !");
    } else {
        return resP.json();
    }
};
const dResTEXT = (resP) => {
    if (!resP.ok) {
        console.log("Error 404 ! File not Found for the given fetch request.");
        alert("There is a problem in accessing the Server Please Try again later !");
    } else {
        return resP.text();
    }
};
const catchErr = (errP) => {
    console.log(errP);
    alert("Internal Error C.L. Please Contact the Developers !");
};
/* CartLength is a temporary counter for triggering the cart Page if(cartLength > 0){ cartOpen();😄 }*/
let cartLength = 0;
const cartItems = [];
const addToCart = (item) => {
    cartLength++;
    cartItems.push(item);
    if (cartLength == 1) {
        alert(parseInt(cartLength) + " item added to your cart !");
    } else {
        alert(parseInt(cartLength) + " items added to your cart !");
    }
};

/* Calling the onload functions */
fTop();
activeMenu(0);
