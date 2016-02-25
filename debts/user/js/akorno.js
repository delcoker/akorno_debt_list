/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
 header("Access-Control-Allow-Credentials: true");
 header("Access-Control-Allow-Headers: access_token");
 header("Cache-Control: no-cache, must-revalidate"); 
 */

//var phonegap = "https://50.63.128.135/~csashesi/class2015/kingston-coker/mobile_web/hw_tracker_teacher/";
var phonegap = "";

function add_student() {

    var stud_id = $("#stud_id").val();
    var stud_name = $("#stud_name").val();

    if (stud_id.length < 8) {
        alert("Please enter a valid I.D. number");
        return;
    }
//    alert(stud_name.length);

    if (stud_name.length < 1) {
        alert("Please enter a student name.");
        return;
    }

    if (stud_name.length < 5) {
        alert("Please enter a valid student name.");
        return;
    }

    if (getDetails2()) {
        return;
    }



    var u = phonegap + "php/action.php?cmd=4&stud_id=" + stud_id + "&name=" + stud_name;

//   prompt("URL", u);

    var r = syncAjax(u);

    if (r.result === 1) {
        alert(r.message);
    }
    else if (r.result === 0) {

    }
}

function check() {
    var student_id = $("#student_id").val();

//    prompt("URL", student_id);
    if (student_id.length > 7) {
        getDetails();
    }
}

function check2() {
    var stud_id = $("#stud_id").val();

//    prompt("URL", student_id);
    if (stud_id.length > 7) {
        getDetails2();
    }
}

function enter_ip() {
    var ip = $(".ip").val();
//    10.10.10.10
    if (ip.length > 10) {
        phonegap = "http://" + ip + "/akorno/debts/user/";
//        prompt("url" , phonegap);
    }
}

function submit() {


//    var u2 = phonegap + "..cashier/php/action.php?cmd=2&student_id=" + student_id + "&amount_paid=" + amount_paid + "&owe_more=" + owe_more;
//    var r2 = syncAjax(u2);
//    
//    window.location.href="";

    var student_id = $("#student_id").val();
    if (student_id.length < 8) {
        alert("Please enter a valid I.D. number");
        return;
    }


    var student_name = $("#student_name").val();
    var amount_owed = parseFloat($("#amount_owed").val());
    var amount_paid = parseFloat($("#pay_some").val());
    var owe_more = parseFloat($("#owe_more").val());


    if (owe_more > 0 && amount_paid > 0) {
        alert("You can not pay and owe simulatenously");
    }
    else if (amount_paid > 0) {
        if (amount_paid <= 0) {
            if (amount_paid === 0) {
                alert("No point in paying 0.00 GHC right?");
            }
            else
            {
                alert("Akorno can not pay you " + amount_paid + " GHC");
            }
            return;
        }

        if (amount_paid > amount_owed) {
            alert("Akorno is not willing to pay you more than they owe you.\nTransaction unsuccessful!");
            return;
        }

        var u = phonegap + "php/action.php?cmd=2&student_id=" + student_id + "&amount_paid=" + amount_paid + "&owe_more=" + owe_more;// + "&ass=" + ass;
//    var u = phonegap + "php/action.php?cmd=2&student_id=" + student_id + "&student_name=" + student_name + "&amount_owed=" + amount_owed + "&amount_paid=" + amount_paid + "&owe_more=" + owe_more;// + "&ass=" + ass;

//   prompt("URL", u);

        var r = syncAjax(u);

        if (r.result === 1) {
            alert(r.message + "\nAkorno just paid you " + amount_paid + " GHC");
            $("#amount_owed").val((amount_owed - amount_paid).toFixed(2));
//        $("#amount_paid").val(r.amount_paid);
//        $("#amount_owed").val(r.amount_owed);
        }
        else if (r.result === 0) {

        }
    }
    else if (owe_more > 0) {
        if (owe_more <= 0) {
            if (owe_more === 0) {
                alert("No point in paying 0.00 GHC right?");
            }
            else
            {
                alert("Akorno can not pay you " + owe_more + " GHC");
            }
            return;
        }

        if (owe_more > 20) {
            alert("Akorno is not willing to owe you that much.\nTransaction unsuccessful!");
            return;
        }

        var u = phonegap + "php/action.php?cmd=3&student_id=" + student_id + "&owe_more=" + owe_more;// + "&ass=" + ass;
//    var u = phonegap + "php/action.php?cmd=2&student_id=" + student_id + "&student_name=" + student_name + "&amount_owed=" + amount_owed + "&amount_paid=" + amount_paid + "&owe_more=" + owe_more;// + "&ass=" + ass;

//   prompt("URL", u);

        var r = syncAjax(u);

        if (r.result === 1) {
            var am = parseFloat(amount_owed) + parseFloat(owe_more);
            am = am.toFixed(2);
//            am = Math.round(am * 100)/100;
            alert(r.message + "\nAkorno just owed you " + owe_more + " GHC.\nAkorno now owes you " + am + " GHC.\n");

            $("#amount_owed").val(am);
            $("#student_id").val("");
            $("#owe_more").val("");
//        $("#amount_paid").val(r.amount_paid);
//        $("#amount_owed").val(r.amount_owed);
        }
        else if (r.result === 0) {
            alert(r.message);
        }
    }

    else if (amount_owed < 0) {

    }
    else if (amount_paid < 0) {

    }
}

function getDetails() {
    var student_id = $("#student_id").val();

    var b = phonegap + "php/action.php/?cmd=1&student_id=" + student_id;// + "&student_name=" + student_name + "&amount_owed=" + amount_owed + "&amount_paid=" + amount_paid + "&owe_more=" + owe_more;// 
    prompt("URL", b);

    var r = syncAjax(b);

    if (r.result === 1) {
        $("#student_name").val(r.student_name);
        $("#amount_owed").val((r.amount_owed - r.amount_paid).toFixed(2));
//        $("#amount_paid").val(r.amount_paid);
//        $("#amount_owed").val(r.amount_owed);
    }
    else if (r.result === -1) {
        var student_id = $("#student_id").val();
        $("#student_id").val(student_id.substring(0, 6));
        alert(r.message);
    }
    else if (r.result === 0) {
        var student_id = $("#student_id").val();
        $("#student_id").val(student_id.substring(0, 6));
        alert(r.message);
    }
}

function getDetails2() {
    var student_id = $("#stud_id").val();
    if (student_id.length < 8) {
        alert("Please enter a valid I.D. number");
        return;
    }
    var b = phonegap + "php/action.php/?cmd=1&student_id=" + student_id;

    var r = syncAjax(b);

    if (r.result === 1) {
        $("#stud_name").val(r.student_name);
        $("#stud_id").val(r.student_id);
        alert("A person with this I.D. already exists.\nPlease retry.");
        return true;
    }
    else if (r.result === -1) {
//        alert(r.message);
        return false;
    }
}

function syncAjax(u) {
    var obj = $.ajax({url: u, async: false});
    return $.parseJSON(obj.responseText);
}

function getFormattedDate(date1) {
    var date = new Date(date1);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}