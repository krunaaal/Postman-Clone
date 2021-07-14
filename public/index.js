let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = 'none';

let custom = document.getElementById("radio-two2");
let paramCount = 1;

function getElementFromStirng(html) {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
}

custom.addEventListener('click', () => {
    document.getElementById("jsonBox").style.display = 'none';
    document.getElementById("parameterBox").style.display = 'block';
})

let jsonf = document.getElementById("radio-one1");

jsonf.addEventListener('click', () => {
    document.getElementById("jsonBox").style.display = 'block';
    document.getElementById("parameterBox").style.display = 'none';
})

let addParam = document.getElementById("addParam");
addParam.addEventListener('click', () => {
    let params = document.getElementById("params");
    let html = `
            <div class="row my-3">
            Parameter ${++paramCount}:
                <div class="col">
                    <input type="text" class="form-control" id="Key${paramCount}" placeholder="Key" aria-label="First name">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="Value${paramCount}" placeholder="Value" aria-label="Last name">
                </div>
                <button class="btn btn-secondary col-1 delParam">-</button>
            </div>
    `
    let paramEle = getElementFromStirng(html);
    params.appendChild(paramEle);

    let delParam = document.getElementsByClassName("delParam");
    for (item of delParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    let reqType = document.querySelector("input[name='switch-one']:checked").value;
    let conType = document.querySelector("input[name='switch-one1']:checked").value;
    let url = document.getElementById('urlField').value;
    if (url == "") {
        alert("please enter URL");
    }

    else {
        document.getElementById('responsePrism').innerHTML = "Fetchin data...";
        console.log(url)
        if (conType == "custom") {
            data = {};
            for (let i = 1; i <= paramCount; i++) {
                if (document.getElementById('Key' + i) != undefined) {
                    let key = document.getElementById('Key' + i).value;
                    let value = document.getElementById('Value' + i).value;
                    data[key] = value;
                }
            }
            data = JSON.stringify(data);
        }

        else {
            data = document.getElementById('jsonText').value;
        }


        if (reqType == "get") {
            fetch(url, {
                method: 'get'
            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responsePrism').innerHTML = text;

                });
        }
        else {
            fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responsePrism').innerHTML = text;
                });
        }
    }
})