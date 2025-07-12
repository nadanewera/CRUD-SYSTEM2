
var productInputName = document.getElementById('productName');
var productInputPrice = document.getElementById('productPrice');
var productInputCategory = document.getElementById('productCategory');
var productInputDerscrption = document.getElementById('ProductDescription');
var imgInput=document.getElementById('')
// var searchInput= document.getElementById('searchInput')=this.valu
var productImage = document.getElementById('productImage')
 var isformvalid = false ; 





var productList = [] //database


// if(localStorage.getItem('product')!=null)
// {
// productList = JSON.parse(localStorage.getItem('products'))   // get from localstorage[string=>stringify]
// display()
// }


productList = JSON.parse(localStorage.getItem('products')) || [] // get from localstorage[string=>stringify]
display()






// function geInputValue() {

//     // var imgName=productImage.files[0]? productImage.files[0].name:"default.png"   // if condition اختصار ل   
//     //or  
//      var imgName=productImage.files[0]?.name ||"Image-not-found.png"

//     console.log(imgName) //key index
//     var productObject = {


//         name: productInputName.value.trim(),  // get value 
//         price: productInputPrice.value.trim(),
//         category: productInputCategory.value.trim(),
//         description: productInputDerscrption.value.trim() , 
//         imgName  // اختصار ل imgName:imgName   لما يكون هم الاتين نفس الاسم 
//     }


//     productList.push(productObject);
//     display()
//     localStorage.setItem('products', JSON.stringify(productList))  // step1 save  to local storage
//     clearInputs()


// }







// function geInputValue() {


//     if(isformvalid){
        


//         var file = productImage.files[0];

//     if (file) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             var imgBase64 = e.target.result; // الصورة في شكل base64

//             var productObject = {
//                 name: productInputName.value.trim(),
//                 price: productInputPrice.value.trim(),
//                 category: productInputCategory.value.trim(),
//                 description: productInputDerscrption.value.trim(),
//                 imgURL: imgBase64 // بدل imgName
//             };

//             productList.push(productObject);
//             localStorage.setItem('products', JSON.stringify(productList));
//             display();
//             clearInputs();
//         };

//         reader.readAsDataURL(file); // يحول الصورة إلى base64
//     } else {
//         // لو المستخدم ما اختارش صورة
//         var productObject = {
//             name: productInputName.value.trim(),
//             price: productInputPrice.value.trim(),
//             category: productInputCategory.value.trim(),
//             description: productInputDerscrption.value.trim(),
//             imgURL: "imgs/Image-not-found.png"
//         };

//         productList.push(productObject);
//         localStorage.setItem('products', JSON.stringify(productList));
//         display();
//         clearInputs();
//     }
//     }
    
// }





function geInputValue() {
    var name = productInputName.value.trim();
    var price = productInputPrice.value.trim();
    var category = productInputCategory.value.trim();
    var description = productInputDerscrption.value.trim();
    var file = productImage.files[0];

    if (
        name !== "" &&
        price !== "" &&
        category !== "" &&
        description !== "" &&
        isformvalid &&
        file
    ) {
        // الحالة 1: كل حاجة صح وفي صورة
        var reader = new FileReader();
        reader.onload = function (e) {
            var productObject = {
                name,
                price,
                category,
                description,
                imgURL: e.target.result
            };
            productList.push(productObject);
            localStorage.setItem('products', JSON.stringify(productList));
            display();
            clearInputs();
            alert("تم إضافة المنتج بنجاح (مع صورة).");
        };
        reader.readAsDataURL(file);

    } else if (
        name !== "" &&
        price !== "" &&
        category !== "" &&
        description !== "" &&
        isformvalid
    ) {
        // الحالة 2: كل حاجة صح بس مفيش صورة
        var productObject = {
            name,
            price,
            category,
            description,
            imgURL: "imgs/Image-not-found.png"
        };
        productList.push(productObject);
        localStorage.setItem('products', JSON.stringify(productList));
        display();
        clearInputs();
        alert("تم إضافة المنتج بنجاح (بدون صورة).");
    } else {
        // الحالة 3: في خطأ في البيانات
        alert(" يرجى ملء جميع الحقول بشكل صحيح قبل الإضافة.");
    }
}





// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function display() {

    var carton = ``

    for (var i = 0; i < productList.length; i++) {
        carton += `
        
         <div class="col-md-3 ">
            <div class="shadow">
                <img src="${productList[i].imgURL}" onerror="this.src='imgs/Image-not-found.png'" class="w-100" id="imgProduct">

            </div>
            <div class="p-3">
                <h4 class="text-capitalize">${productList[i].name}</h4>
                <h6 class="text-capitalize">${productList[i].category}</h6>
        
                <p class="text-capitalize">${productList[i].price}EGP</p>
                <p>${productList[i].description}</p>
                  <button class="btn btn-danger"  onclick="deleteProduct(${i}) "><i class="fa-solid fa-trash"></i></button>
                 <button class="btn btn-warning" onclick="uptadteproduct(${i})  " ><i class="fa-solid fa-pen-to-square"></i></button>
          

                
            </div>
        </div>
        `
    }

    document.getElementById('elementrow').innerHTML = carton;



}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clearInputs() {

    productInputName.value = ""
    productInputPrice.value = ""
    productInputCategory.value = ""
    productInputDerscrption.value = ""
    productImage.value = "";


}



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productList));
    display();
}


var itemIndex;


function uptadteproduct(productindex) {

    itemIndex = productindex

    document.getElementById('savebtn').style.display = "block"

    document.getElementById('addbtn').style.display = "none"

    productInputName.value = productList[productindex].name
    productInputPrice.value = productList[productindex].price
    productInputCategory.value = productList[productindex].category
    productInputDerscrption.value = productList[productindex].description
}




// function saveproduct() {


//     document.getElementById('savebtn').style.display = "none"
//     document.getElementById('addbtn').style.display = "block"
//     productList[itemIndex].name = productInputName.value
//     productList[itemIndex].price = productInputPrice.value
//     productList[itemIndex].category = productInputCategory.value
//     productList[itemIndex].description = productInputDerscrption.value
//      productList[itemIndex].imgURL=imgProduct.value
//     localStorage.setItem('products', JSON.stringify(productList));
//     display()
//     clearInputs()


// }







// ///////////////////////////////////////////////////

function search(searchWorld) {
    var carton = ``;


    for (var i = 0; i < productList.length; i++) {

        console.log(searchWorld);
        if (productList[i].name.toLowerCase().includes(searchWorld.toLowerCase())) {



            carton += `
        
         <div class="col-md-3">
            <div class="shadow">
                <img src="imgs/5"   class="w-100">
             </div>                                                                                                     
            <div class="p-3">
                <h4 class="text-capitalize">${productList[i].name.toLowerCase().replace(searchWorld.toLowerCase(), `<span>${searchWorld}</span>`)}</h4>
                <h6 class="text-capitalize">${productList[i].category} </h6>
        
                <p class="text-capitalize">${productList[i].price}EGP</p>
                <p>${productList[i].description}</p>
                  <button class="btn btn-danger"  onclick="deleteProduct(${i}) "><i class="fa-solid fa-trash"></i></button>
                 <button class="btn btn-warning" onclick="uptadteproduct(${i})  " ><i class="fa-solid fa-pen-to-square"></i></button>
          

                
            </div>
        </div>
        `
        }
    }

    document.getElementById('elementrow').innerHTML = carton;
}

//////// localStorage//////////
// localStorage.setItem()
// localStorage.getItem()
// localStorage.removeitem()
//localStorage.clear()
















var productPattern = {
    productName: /^[A-Za-z0-9-/s]{3,50}$/,
    productCategory: /^[A-Za-z0-9-/s]{2,50}$/,
    productPrice: /^[1-9][0-9]*$/,
    productDerscrption: /^[\w\s]{0,1000}$/
}

function validate(input) {
    if (productPattern[input.id].test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        // document.getElementById('productAlert').classList.replace('d-block', 'd-none') // hide alert
        input.nextElementSibling.classList.replace('d-block', 'd-none')

        // return true
        isformvalid=true
    } else {

        input.classList.add('is-invalid'); // لإظهار الحدود الحمراء على input
        input.classList.remove('is-valid');

        //     document.getElementById('productAlert').classList.replace('d-none','d-block') // show alert
        input.nextElementSibling.classList.replace('d-none', 'd-block')

    //  return false
    isformvalid=false
    }

}
