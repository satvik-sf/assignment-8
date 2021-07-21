"use strict";
function init() {
    setUpTime();
    showUsers();
}
var Role;
(function (Role) {
    Role[Role["SUPERADMIN"] = 0] = "SUPERADMIN";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["SUBSCRIBER"] = 2] = "SUBSCRIBER";
})(Role || (Role = {}));
;
var User = /** @class */ (function () {
    function User(fn, ln, email, phone, address, role) {
        this.first_name = fn;
        this.last_name = ln;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
    }
    return User;
}());
var users = [];
// console.log(typeof Role[0]);
for (var i = 1; i <= 10; i++) {
    // console.log(Role[0]);
    var u = new User(i.toString(), i.toString(), i.toString(), i.toString(), i.toString(), Role[i % 3]); // ??????
    users.push(u);
}
// for(let i=0;i<users.length;i++){
//     console.log(users[i].role);
// }
function showUsers() {
    var t = document.getElementById("users");
    // console.log(t);
    if (t) {
        t.remove();
    }
    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    var hEl = ["First Name", "Last Name", "Email", "Phone Number", "Role", "Address"];
    table.className = 'table table-hover';
    table.id = "users";
    for (var i = 0; i < hEl.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = hEl[i];
        tr.appendChild(th);
    }
    tr.appendChild(document.createElement("th"));
    tr.appendChild(document.createElement("th"));
    tr.appendChild(document.createElement("th"));
    tr.appendChild(document.createElement("th"));
    var _loop_1 = function (i) {
        tr = table.insertRow(-1);
        var c1 = tr.insertCell(-1);
        c1.innerHTML = users[i].first_name;
        var c2 = tr.insertCell(-1);
        c2.innerHTML = users[i].last_name;
        var c3 = tr.insertCell(-1);
        c3.innerHTML = users[i].email;
        var c4 = tr.insertCell(-1);
        c4.innerHTML = users[i].phone;
        var c5 = tr.insertCell(-1);
        c5.innerHTML = users[i].role.toString();
        var c6 = tr.insertCell(-1);
        c6.innerHTML = users[i].address;
        var cells = [];
        for (var j = 0, col = void 0; col = table.rows[i + 1].cells[j]; j++) {
            cells.push(col);
            // console.log(col);
        }
        var edit = document.createElement('button');
        edit.innerHTML = 'Edit';
        edit.className = 'btn btn-primary';
        edit.addEventListener('click', function () { editUser(i, cells); });
        var c7 = tr.insertCell(-1);
        c7.appendChild(edit);
        var del = document.createElement('button');
        del.innerHTML = 'Delete';
        del.className = 'btn btn-danger';
        del.addEventListener('click', function () { delUser(i); });
        var c8 = tr.insertCell(-1);
        c8.appendChild(del);
        var save = document.createElement('button');
        save.innerHTML = 'Save';
        save.className = 'btn btn-info';
        save.addEventListener('click', function () { saveUser(i, cells); });
        var c9 = tr.insertCell(-1);
        c9.appendChild(save);
        c9.style.display = 'none';
        cells.push(c9);
        var cancel = document.createElement('button');
        cancel.innerHTML = 'Cancel';
        cancel.className = 'btn btn-secondary';
        cancel.addEventListener('click', function () { cancelFn(cells); });
        var c10 = tr.insertCell(-1);
        c10.appendChild(cancel);
        c10.style.display = 'none';
        cells.push(c10);
    };
    for (var i = 0; i < users.length; i++) {
        _loop_1(i);
    }
    var container = document.getElementById("showData");
    document.getElementById("loadDataBtn").style.display = "none";
    container.appendChild(table);
}
function editUser(idx, cells) {
    // make row editable
    // .setAttribute("contenteditable", "false");
    for (var i = 0; i < cells.length - 2; i++) {
        // console.log(cells[i]);
        cells[i].setAttribute("contenteditable", "true");
    }
    // Show SAVE AND CANCEL BUTTON
    console.log(cells[cells.length - 1]);
    cells[cells.length - 1].style.display = 'inline-block';
    cells[cells.length - 2].style.display = 'inline-block';
    // showUsers();
}
function delUser(idx) {
    users.splice(idx, 1);
    showUsers();
}
function saveUser(idx, cells) {
    console.log(cells[4].innerHTML);
    var r;
    var x = cells[4].innerHTML;
    if (x === 'ADMIN')
        r = Role.ADMIN;
    if (x === 'SUPERADMIN')
        r = Role.SUPERADMIN;
    if (x === 'SUBSCRIBER')
        r = Role.SUBSCRIBER;
    console.log(r);
    var u = new User(cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML, cells[3].innerHTML, cells[5].innerHTML, r);
    users[idx] = u;
    showUsers();
}
function cancelFn(cells) {
    for (var i = 0; i < cells.length - 2; i++) {
        // console.log(cells[i]);
        cells[i].setAttribute("contenteditable", "false");
    }
    cells[cells.length - 1].style.display = 'none';
    cells[cells.length - 2].style.display = 'none';
    showUsers();
}
function setUpTime() {
    var time = document.getElementById("time");
    // console.log(time);
    time.innerHTML = new Date().toLocaleString();
    setInterval(function () {
        time.innerHTML = new Date().toLocaleString();
    }, 1000);
}
