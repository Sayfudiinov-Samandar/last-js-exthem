const elAdminForm = document.querySelector(".praduct-form");
const elPraductName = elAdminForm.querySelector(".praduct-input__name");
const elPraductDesc = elAdminForm.querySelector(".praduct-input__desc");
const elPraductImg = elAdminForm.querySelector(".praduct-input__img");
const elPraductPrice = elAdminForm.querySelector(".praduct-input__price");


const elAdminFormEdit = document.querySelector(".edit-form ");
const elPraductNameEdit = elAdminFormEdit.querySelector(".edit-name");
const elPraductDescEdit = elAdminFormEdit.querySelector(".edit-desc");
const elPraductImgEdit = elAdminFormEdit.querySelector(".edit-file");
const elPraductPriceEdit = elAdminFormEdit.querySelector(".edit-sum");

const elResultList = document.querySelector(".praduct-list");
const elTEmpList = document.querySelector(".list-teplate").content;
let fragment = new DocumentFragment();



if (!tokenLogin) {
    window.location.reload();
    window.location.pathname = "login.html";
};


async function postPraduct() {
    try {
        let dataForm = new FormData()
        dataForm.append("product_name", elPraductName.value)
        dataForm.append("product_desc", elPraductDesc.value)
        dataForm.append("product_img", elPraductImg.files[0])
        dataForm.append("product_price", elPraductPrice.value)

        const response = await fetch(`http://${IP4}:5000/product`, {
            method: "POST",

            headers: {
                Authorization: tokenLogin
            },

            body: dataForm
        
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}





function makeList(array) {
    elResultList.innerHTML=""
    if (array.length > 0) {
        array.forEach(item => {
            console.log(item);
            let cloneTEmplae = elTEmpList.cloneNode(true)
            cloneTEmplae.querySelector(".list__item-img").src = `http://${IP4}:5000/${item.product_img}`
            cloneTEmplae.querySelector(".list__item-name").textContent = item.product_name
            cloneTEmplae.querySelector(".product-desc").textContent = item.product_desc
            cloneTEmplae.querySelector(".product-sum").textContent = item.product_price

            cloneTEmplae.querySelector(".list__item-edit").dataset.productID = item.id
            cloneTEmplae.querySelector(".list__item-delete").dataset.productID = item.id

            fragment.appendChild(cloneTEmplae)
        });
        elResultList.appendChild(fragment)

    }
}

async function editPRoduct(id) {
    try {
        let dataForm = new FormData()

        dataForm.append("product_name", elPraductNameEdit.value)
        dataForm.append("product_desc", elPraductDescEdit.value)
        dataForm.append("product_img", elPraductImgEdit.files[0])
        dataForm.append("product_price", elPraductPriceEdit.value)
        console.log(dataForm);

        let res = await fetch(`http://${IP4}:5000/product/` + id, {
            method: "PUT",
            headers: {
                Authorization: tokenLogin
            },
            body: dataForm 
        })
        let data = await res.json()
        
        console.log(data);
    } catch (error) {
        console.log(error);
    }

}

async function DeletePRoduct(id) {
    try {
        let res = await fetch(`http://${IP4}:5000/product/` + id, {
            method: "DELETE",
            headers: {
                Authorization: tokenLogin
            }
        })
        let data = await res.json()
        
        console.log(data);
    } catch (error) {
        console.log(error);
    }

}

elResultList.addEventListener("click", (evt) => {
    if (evt.target.matches(".list__item-edit")) {
        const id = evt.target.dataset.productID;
        console.log(id);

        elAdminFormEdit.addEventListener("submit",(evt)=>{
            evt.preventDefault()
            editPRoduct(id)

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })
    }else if(evt.target.matches(".list__item-delete")){
        const id = evt.target.dataset.productID;
        console.log(id);
        DeletePRoduct(id)
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
})


elAdminForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    getProduct()
    setTimeout(() => {
        window.location.reload()
    }, 2000)
})




async function getProduct() {
    try {
        const response = await fetch(`http://${IP4}:5000/product`, {
            headers: {
                Authorization: tokenLogin
            },
        });
        const data = await response.json();
        makeList(data)
    } catch (error) {
        console.log(error);
    }
}
getProduct()


