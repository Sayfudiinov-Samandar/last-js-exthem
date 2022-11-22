const elResultList = document.querySelector('.res-list')
const elResulItemTemplate = document.querySelector('.ind-templata').content


const fragment = new DocumentFragment()


async function getDefaoutOrder() {

    try {
        const response = await fetch(`http://${IP4}:5000/order`, {
            method:"GET",
            headers: {
                Authorization: tokenLogin
            },

        })
        const data = await response.json();
        makeList(data)
        console.log(data);
    } catch (error) {
        console.log(error);
    }

}

async function DeletePRoduct(id) {
    try {
        let res = await fetch(`http://${IP4}:5000/order/` + id, {
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

function makeList(array) {
    elResultList.innerHTML = ""
    array.forEach(item => {
        console.log(item);
        let cloneTemp = elResulItemTemplate.cloneNode(true)
        cloneTemp.querySelector(".product-img").src = `http://${IP4}:5000/${item.product_img}`
        cloneTemp.querySelector(".product-name").textContent = item.product_name
        cloneTemp.querySelector(".product-desc").textContent = item.product_desc
        cloneTemp.querySelector(".product-sum").textContent = item.product_price
        cloneTemp.querySelector(".btn-ind").dataset.id = item.id

        cloneTemp.querySelector(".btn-ind").addEventListener("click", (evt) => {
            DeletePRoduct(evt.target.dataset.id)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })



        fragment.appendChild(cloneTemp)
    });
    elResultList.appendChild(fragment)
}

getDefaoutOrder()