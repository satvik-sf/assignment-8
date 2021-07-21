"use strict";
$(document).ready(function () {
    var edit = function () {
        var attribute = this.getAttribute("data-id");
        console.log(attribute);
        var save_btn = document.getElementById("save_button_" + attribute);
        console.log(save_btn);
        save_btn.style.display = 'inline-block';
        var cancel_btn = document.getElementById("cancel_button_" + attribute);
        console.log(cancel_btn);
        cancel_btn.style.display = 'inline-block';
        // console.log( $(`tr#${attribute} > td`));
        for (var i = 0; i < 6; i++) {
            $("tr#" + attribute + " > td")[i].setAttribute("contenteditable", "true");
        }
    };
    var edit_btns = document.getElementsByClassName("edit_button");
    Array.from(edit_btns).forEach(function (element) {
        element.addEventListener('click', edit);
    });
    var save = function () {
        var attribute = this.getAttribute("data-id");
        var x = {};
        x.first_name = $("tr#" + attribute + " > td")[0].innerText;
        x.last_name = $("tr#" + attribute + " > td")[1].innerText;
        x.email = $("tr#" + attribute + " > td")[2].innerText;
        x.address = $("tr#" + attribute + " > td")[3].innerText;
        x.phone = $("tr#" + attribute + " > td")[4].innerText;
        x.costumer_web = $("tr#" + attribute + " > td")[5].innerText;
        x.role_id = $("tr#" + attribute + " > td")[6].innerText;
        console.log(x);
        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(x),
            dataType: 'json',
            success: function (data) {
                console.log("update succeeded");
            },
            error: function () {
                console.log("update failed");
            },
            processData: false,
            type: 'POST',
            url: "/update/" + attribute
        });
    };
    var save_btns = document.getElementsByClassName("save_button");
    console.log(save_btns);
    Array.from(save_btns).forEach(function (element) {
        element.addEventListener('click', save);
    });
});
