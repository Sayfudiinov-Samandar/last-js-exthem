const elResultList = document.querySelector('.res-list')
const elResulItemTemplate = document.querySelector('.ind-templata').content

const fragment = new DocumentFragment()


async function getDefaout() {

    try {
        const response = await fetch(`http://${IP4}:5000/product`, {
            headers: {
                Authorization: tokenRegistor || tokenLogin
            },
        })
        const data = await response.json();
        console.log(data);
        makeList(data)
    } catch (error) {
        console.log(error);
    }

}

if (!tokenRegistor) {
    window.location.pathname = "registor.html";
}


async function postOrder(id) {
    const formData=new FormData()
    formData.append('product_id', id)
    try {
        const response = await fetch(`http://${IP4}:5000/order`, {
            method: "POST",
            
            headers: {
                Authorization: tokenLogin
            },
            body: formData

        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}




function makeList(array) {
    elResultList.innerHTML = ""
    array.forEach(item => {
        let cloneTemp = elResulItemTemplate.cloneNode(true)
        cloneTemp.querySelector(".product-img").src = `http://${IP4}:5000/${item.product_img}`
        cloneTemp.querySelector(".product-name").textContent = item.product_name
        cloneTemp.querySelector(".product-desc").textContent = item.product_desc
        cloneTemp.querySelector(".product-sum").textContent = item.product_price
        cloneTemp.querySelector(".btn-ind").dataset.id = item.id

        // cloneTemp.querySelector(".btn-ind").addEventListener("click", (evt) => {
        //     postOrder(evt.target.dataset.id)
        // })

        fragment.appendChild(cloneTemp)
    });
    elResultList.appendChild(fragment)
}

getDefaout()


function pause() {
    document.body.classList.add('paused');

    setTimeout(() => {
        window.location.pathname = "login.html";
    }, 86400)
    console.log("pause");

}




window.addEventListener('blur', pause);
