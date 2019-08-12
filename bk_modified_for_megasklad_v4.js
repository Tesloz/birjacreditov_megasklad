var bkScriptSource = 'birjakreditov.com';
var getBodyInterval = null;
var documentBodyForBK = document.getElementsByTagName('body');
var partner_id_cont = document.getElementsByClassName('bk_container');

function createRequestObject() {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    return new XHR()
}

function getBkHashFromServerFunction() {
    var bkButtonScriptTag = document.querySelectorAll('script[src="https://test.bkred.ru/bkapi/bk.js"]');
    if (bkButtonScriptTag.length > 0) bkScriptSource = 'test.bkred.ru';
    var partner_id = partner_id_cont[0].getAttribute('partner');
    var inRHTML = document.body.innerHTML;
    var json = 'url=' + encodeURIComponent(document.URL) + '&html=' + encodeURIComponent(inRHTML);
    var req = createRequestObject();
    req.open('POST', 'https://' + bkScriptSource + '/anketa/prepare/partner_id/' + partner_id, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
        var status;
        var jsonin;
        if (req.readyState == 4) {
            if (req.status == 200) {
                jsonin = JSON.parse(req.responseText);
                console.log(jsonin);
                if (jsonin.data == 'good') {
                    console.log('horosho');
                    var d = document.getElementsByClassName('bk_buy_button');
                    var f = document.getElementsByClassName('bk_container');
                    d[0].setAttribute("title", "Купить в кредит с помощью Вкредит.рф");
                    if (jsonin.style != '') d[0].setAttribute("style", jsonin.style);
                    document.getElementById('bk_hash').value = jsonin.hash
                    console.log(jsonin.hash);
                } else {
                    console.log(jsonin.data)
                }
            }
        }
    };
    req.send(json)
}

function addBkHashFunction() {
    var bk_hash_element = document.querySelectorAll('input[id="bk_hash"]');
    if (bk_hash_element.length == 0) {
        var bk_iframe_cont = document.createElement('div');
        bk_iframe_cont.innerHTML = '<input type="hidden" id="bk_hash" />' + '<div id="bk_close">' + '<a href="javascript:bk_frame_hide()">' + '<img src="https://' + bkScriptSource + '/public/images/anketa2/structure/close.png" ' + 'alt="Закрыть" /></a></div>' + '<iframe id="bk_frame" name=""></iframe></div>';
        bk_iframe_cont.id = 'bk_iframe_cont';
        bk_iframe_cont.style.display = 'none';
        document.body.insertBefore(bk_iframe_cont, document.body.firstChild);
        getBkHashFromServerFunction()
    }
}

function getBodyForBkFunction() {
    documentBodyForBK = document.getElementsByTagName('body');
    partner_id_cont = document.getElementsByClassName('bk_container');
    if (documentBodyForBK.length > 0 && partner_id_cont.length > 0) {
        clearInterval(getBodyInterval);
        addBkHashFunction()
    } else {}
}

$( document ).ready(function() {
if (documentBodyForBK.length > 0 && partner_id_cont.length > 0) {
    addBkHashFunction()
} else {
    getBodyInterval = setInterval(getBodyForBkFunction, 500)
}
});

var contin = document.createElement('div');
var contin2 = document.createElement('div');

function bk_frame_hide() {
    document.getElementById('bk_iframe_cont').style.display = 'none';
    document.getElementById('bk_frame').setAttribute('src', '');
    try {
        document.getElementById('bk_iframe_cont').removeChild(contin)
    } catch (e) {}
    try {
        document.getElementById('bk_iframe_cont').removeChild(contin2)
    } catch (e) {}
}

function continue_hide() {
    document.getElementById('bk_iframe_cont').removeChild(contin);
    document.getElementById('bk_iframe_cont').removeChild(contin2)
}

function showMess() {
    contin.className = "continue";
    contin.style.height = document.getElementById('bk_iframe_cont').offsetHeight + 'px';
    contin2.className = "continue2";
    contin2.innerHTML = '<div class="descIndexText">Вы можете продолжить покупки В кредит, либо оформить заявку сейчас</div>' + '<div class="continue-buttons">' + '<div class="cont-btn">' + '<button class="btnBK btn-contBK" onClick="bk_frame_hide()">Продолжить покупки</button>' + '</div>' + '<div class="order-btn">' + '<button class="btnBK btn-orderBK" onClick="continue_hide()">Оформить заявку</button>' + '</div>' + '</div>' + '<style>' + '.continue {' + 'width: 100%; ' + 'position: absolute; ' + 'top: 0; ' + 'left: 0; ' + 'background-color: #000; ' + 'opacity: 0.3; ' + 'border-radius: 7px; ' + '-moz-border-radius: 7px; ' + '-webkit-border-radius: 7px; ' + 'z-index: 600; ' + '} ' + '.continue2 { ' + 'z-index: 99999; ' + 'max-width: 370px; ' + 'text-align: center; ' + 'position: absolute; ' + 'top: 10%; ' + 'left: 20px; ' + 'right: 20px;' + ' background-color: #fff; ' + 'border-radius: 8px; ' + '-moz-border-radius: 8px; ' + '-webkit-border-radius: 8px;  ' + 'padding: 20px;' + 'margin: 40px auto;' + '} ' + '.continue-buttons { ' + 'padding-top: 10px; ' + '} ' + '.continue-buttons div.order-btn { ' + 'display: inline-block; ' + '} ' + '.continue-buttons div.cont-btn { ' + 'display: inline-block; ' + '} ' + '.btn-orderBK { ' + 'background: linear-gradient(to top, #ff8900, #ffad00); ' + 'font-size: 14px; ' + 'color: #ffffff; ' + 'text-shadow: 0 -1px #ff6100; ' + 'border: none; ' + 'border-radius: 5px;' + '} ' + '.btnBK { ' + 'box-shadow: none; ' + 'padding: 0; ' + 'text-transform: none; ' + 'height: 30px; ' + 'width: 160px; ' + 'margin: 2px; ' + 'outline: none !important; ' + 'cursor: pointer; ' + 'font-family: "Conv_Cuprum", "Arial Narrow", Arial, sans-serif; ' + 'font-weight: normal; ' + 'line-height: 16px; ' + '} ' + '.btn-contBK { ' + 'box-shadow: none; ' + 'padding: 0; ' + 'background: linear-gradient(to top, #499a00, #73a32a); ' + 'font-size: 14px; ' + 'line-height: 16px;' + ' color: #ffffff; ' + 'text-shadow: 0 -1px #73a32a;' + ' border: none; ' + 'border-radius: 5px; ' + '}' + '</style>';
    document.getElementById('bk_iframe_cont').appendChild(contin2);
    document.getElementById('bk_iframe_cont').appendChild(contin)
}

function changeQuotes(text) {
    var el = document.createElement("div");
    el.innerHTML = text;
    for (var i = 0, l = el.childNodes.length; i < l; i++) {
        if (el.childNodes[i].hasChildNodes() && el.childNodes.length > 1) {
            el.childNodes[i].innerHTML = changeQuotes(el.childNodes[i].innerHTML)
        } else {
            el.childNodes[i].textContent = el.childNodes[i].textContent.replace(/\x27/g, '\x22').replace(/(\w)\x22(\w)/g, '$1\x27$2').replace(/(^)\x22(\s)/g, '$1»$2').replace(/(^|\s|\()"/g, "$1«").replace(/"(\;|\!|\?|\:|\.|\,|$|\)|\s)/g, "»$1")
        }
    }
    return el.innerHTML
}

function bk_frame_show() {
    document.body.style.cursor = 'wait';
    var bk_container = document.getElementsByClassName('bk_container');
    var partner_id = bk_container[0].getAttribute('partner');
    var products;
    var pr = [];
    var bk_name = '';
    var bk_price = '';
    var bk_image = '';
    var bk_quantity = '';
    var bk_description = '';
    var bk_articul = '';
    var bk_order_uid = '';
    var bk_uid_elem = document.getElementById('bk_order_uid');
    if (bk_uid_elem) bk_order_uid = bk_uid_elem.innerHTML;
    if (bk_uid_elem && bk_order_uid.length == 0) bk_order_uid = bk_uid_elem.value;
    if (bk_uid_elem && bk_order_uid.length != 0) {
        bk_order_uid = bk_order_uid.replace(/&nbsp;/gi, '').replace(/<[^>]+>/g, '').replace(/\s{2,}/g, ' ').trim();
        bk_order_uid = changeQuotes(bk_order_uid);
        bk_order_uid = bk_order_uid.replace(/"/g, ' "');
        bk_order_uid = changeQuotes(bk_order_uid)
    }
    if (bk_container[0].parentElement.className == 'bk_product') {
        products = bk_container[0].parentElement.childNodes;
        for (var i = 0; i < products.length; i++) {
            if (products[i].className != undefined) {
                if (products[i].querySelector('.bk_name') != null) {
                    var name_elem = products[i].querySelector('.bk_name');
                    bk_name = name_elem.innerHTML;
                    if (bk_name.length == 0) bk_name = name_elem.value;
                    if (bk_name.length == 0) bk_name = name_elem.getAttribute('src');
                    bk_name = bk_name.replace(/&nbsp;/gi, '').replace(/<[^>]+>/g, '').replace(/\s{2,}/g, ' ').trim();
                    bk_name = changeQuotes(bk_name);
                    bk_name = bk_name.replace(/"/g, ' "');
                    bk_name = changeQuotes(bk_name)
                }
                if (products[i].querySelector('.bk_price') != null) {
                    var price_elem = products[i].querySelector('.bk_price');
                    bk_price = price_elem.innerHTML;
                    if (bk_price.length == 0) bk_price = price_elem.value;
                    if (bk_price.length == 0) bk_price = price_elem.getAttribute('src');
                    bk_price = bk_price.replace(/\s+/g, '').replace(/<[^>]+>/g, '').replace(/[^-0-9\.\,]/gim, '');
                    bk_price = parseFloat(bk_price)
                }
                if (products[i].querySelector('.bk_quantity') != null) {
                    var quantity_elem = products[i].querySelector('.bk_quantity');
                    if (quantity_elem.nodeName.toLowerCase() != 'select') bk_quantity = quantity_elem.innerHTML;
                    else bk_quantity = quantity_elem.value;
                    if (bk_quantity.length == 0) bk_quantity = quantity_elem.value;
                    if (bk_quantity.length == 0) bk_quantity = quantity_elem.getAttribute('src');
                    bk_quantity = bk_quantity.replace(/<[^>]+>/g, '').replace(/[^0-9]/gim, '')
                }
                if (products[i].querySelector('.bk_image') != null) {
                    var image_elem = products[i].querySelector('.bk_image');
                    bk_image = image_elem.innerHTML;
                    if (bk_image.length == 0) bk_image = image_elem.value;
                    if (bk_image == 'undefined') bk_image = image_elem.getAttribute('src')
                }
                if (products[i].querySelector('.bk_description') != null) {
                    var description_elem = products[i].querySelector('.bk_description');
                    bk_description = description_elem.innerHTML;
                    if (bk_description.length == 0) bk_description = description_elem.value;
                    if (bk_description.length == 0) bk_description = description_elem.getAttribute('src')
                }
                if (products[i].querySelector('.bk_articul') != null) {
                    var articul_elem = products[i].querySelector('.bk_articul');
                    bk_articul = articul_elem.innerHTML;
                    if (bk_articul.length == 0) bk_articul = articul_elem.value;
                    if (bk_articul.length == 0) bk_articul = articul_elem.getAttribute('src')
                }
            }
        }
        pr[0] = {
            'bk_name': bk_name,
            'bk_price': bk_price,
            'bk_quantity': bk_quantity,
            'bk_image': bk_image,
            'bk_description': bk_description,
            'bk_articul': bk_articul,
            'errors': errors,
        }
    } else {
        products = document.getElementsByClassName('bk_product');
        var productsTotal = products.length;
        for (var i = 0; i < productsTotal; ++i) {
            var errors = [],
                product = products[i].getElementsByClassName('bk_name');
            if (product.length) {
                bk_name = product[0].innerHTML;
                if (bk_name.length == 0) bk_name = product[0].value;
                if (bk_name.length == 0) bk_name = product[0].getAttribute('src')
            } else errors[errors.length] = 'bk_name_null';
            bk_name = bk_name.replace(/&nbsp;/gi, '').replace(/<[^>]+>/g, '').replace(/\s{2,}/g, ' ').trim();
            bk_name = changeQuotes(bk_name);
            bk_name = bk_name.replace(/"/g, ' "');
            bk_name = changeQuotes(bk_name);
            product = products[i].getElementsByClassName('bk_price');
            if (product.length) {
                bk_price = product[0].innerHTML;
                if (bk_price.length == 0) bk_price = product[0].value;
                if (bk_price.length == 0) bk_price = product[0].getAttribute('src');
                bk_price = bk_price.replace(/\s+/g, '').replace(/<[^>]+>/g, '').replace(/[^-0-9\.\,]/gim, '');
                bk_price = parseFloat(bk_price)
            } else errors[errors.length] = 'bk_price_null';
            product = products[i].getElementsByClassName('bk_quantity');
            if (product.length) {
                var nodeName = product[0].nodeName;
                if (nodeName.toLowerCase() != 'select') bk_quantity = product[0].innerHTML;
                else bk_quantity = product[0].value;
                if (bk_quantity.length == 0) bk_quantity = product[0].value;
                if (bk_quantity.length == 0) bk_quantity = product[0].getAttribute('src');
                bk_quantity = bk_quantity.replace(/<[^>]+>/g, '').replace(/[^0-9]/gim, '')
            } else errors[errors.length] = 'bk_quantity_null';
            product = products[i].getElementsByClassName('bk_image');
            if (product.length) {
                bk_image = product[0].innerHTML;
                if (bk_image.length == 0) bk_image = product[0].value;
                if (bk_image == 'undefined') bk_image = product[0].getAttribute('src')
            } else errors[errors.length] = 'bk_image_null';
            product = products[i].getElementsByClassName('bk_description');
            if (product.length) {
                bk_description = product[0].innerHTML;
                if (bk_description.length == 0) bk_description = product[0].value;
                if (bk_description.length == 0) bk_description = product[0].getAttribute('src')
            } else errors[errors.length] = 'bk_description_null';
            product = products[i].getElementsByClassName('bk_articul');
            if (product.length) {
                bk_description = product[0].innerHTML;
                if (bk_articul.length == 0) bk_articul = product[0].value;
                if (bk_articul.length == 0) bk_articul = product[0].getAttribute('src')
            } else errors[errors.length] = 'bk_articul_null';
            pr[i] = {
                'bk_name': bk_name,
                'bk_price': bk_price,
                'bk_quantity': bk_quantity,
                'bk_image': bk_image,
                'bk_description': bk_description,
                'bk_articul': bk_articul,
                'errors': errors,
            }
        }
    }
    var inRHTML = document.body.innerHTML;
    pr = JSON.stringify(pr);
    pr = pr.replace(/\\"/g, '"');
    var json = 'pr=' + encodeURIComponent(pr) + '&url=' + encodeURIComponent(document.URL) + '&html=' + encodeURIComponent(inRHTML);
    if (bk_order_uid.length != 0) json = json + '&uid=' + bk_order_uid;
    var req = createRequestObject();
    req.open('POST', 'https://' + bkScriptSource + '/anketa/prepare/partner_id/' + partner_id + '/params/' + document.getElementById('bk_hash').value);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
        var status;
        var jsonin;
        if (req.readyState == 4) {
            if (req.status == 200) {
                jsonin = JSON.parse(req.responseText);
                if (jsonin.data == 'good') {
                    /*console.log('cheburek');*/
                    //document.getElementById('bk_hash').value = jsonin.hash;
                    document.getElementById('bk_frame').setAttribute('name', partner_id);
                    document.getElementById('bk_frame').setAttribute('src', 'https://' + bkScriptSource + '/anketa/getanketa/partner_id/' + partner_id + '/params/' + document.getElementById('bk_hash').value);
                    var divW = '821';
                    var offsetY = document.getElementsByClassName('bk_container')[0].offsetLeft;
                    var bk_iframe_cont = document.getElementById('bk_iframe_cont');
                    bk_iframe_cont.style.position = 'absolute';
                    bk_iframe_cont.style.margin = '40px auto';
                    bk_iframe_cont.style.left = '10px';
                    bk_iframe_cont.style.right = '10px';
                    bk_iframe_cont.style.maxWidth = divW + 'px';
                    bk_iframe_cont.style.top = window.pageYOffset + +40 + 'px';
                    bk_iframe_cont.style.zIndex = '99999';
                    bk_iframe_cont.style.backgroundColor = '#fff';
                    bk_iframe_cont.style.boxShadow = '0 0 500px 100px rgba(0,0,0,0.3)';
                    bk_iframe_cont.style.borderRadius = '10px';
                    bk_iframe_cont.style.display = '';
                    document.body.style.cursor = 'default';
                    if (!jsonin.single) setTimeout(showMess, 2000)
                } else {
                    document.body.style.cursor = 'default';
                    console.log(jsonin.data)
                }
            }
        }
    };
    req.send(json);
    return false
}