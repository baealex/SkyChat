var item = function (q) {
    this.el = document.querySelector(q);
}

item.prototype.direct = function () {
    return this.el;
}

item.prototype.get = function (a) {
    return this.el.getAttribute(a);
}

item.prototype.on = function(e, f) {
    this.el.addEventListener(e, f);
}

item.prototype.html = function(h) {
    this.el.innerHTML = h;
}

item.prototype.text = function(t) {
    this.el.textContent = t;
}

item.prototype.val = function(t=undefined) {
    if(t == undefined)
        return this.el.value;
    this.el.value = t;
}

item.prototype.focus = function(t) {
    this.el.focus();
}

item.prototype.addClass = function (c) {
    this.el.classList.add(c)
}

item.prototype.removeClass = function (c) {
    this.el.classList.remove(c)
}

item.prototype.hasClass = function(c) {
    return this.el.classList.contains(c);
}

item.prototype.remove = function() {
    this.el.remove();
}

item.prototype.prepend = function (h) {
    this.el.insertAdjacentHTML("afterbegin", h);
}

item.prototype.append = function (h) {
    this.el.insertAdjacentHTML("beforeend", h);
}

var items = function (q) {
    this.els = document.querySelectorAll(q);
}

items.prototype.get = function () {
    return this.els;
}

items.prototype.on = function (e, f) {
    this.els.forEach(function (el) {
        el.addEventListener(e, f);
    });
}

function select(q) {
    return new item(q);
}

function selects(q) {
    return new items(q);
}