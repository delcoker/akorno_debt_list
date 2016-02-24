<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once("./adb.php");

class debt_class extends adb {

    function debt_class() {
        adb::adb();
    }

    /**
     * query all religion in the table and store the dataset in $this->result	
     * @return if successful true else false
     */
    function get_detail($student_id) {
        $query = "select * from akorno_debt_list where student_id = " . $student_id;
//        print($query);
        $res = $this->query($query);
        return $res;
    }

    function pay_some($student_id, $amount_paid) {

        // get student details
        $queryB = "select * from akorno_debt_list where student_id = " . $student_id;
        $resB = $this->query($queryB);
        $row = $this->fetch();
        $stud_name = $row['student_name'];
        $amt = $row['amount_paid'];
//        print($amt);
//        ==============================================another table===========================================================
        // document transaction
        $queryA = "Insert into akorno_debt_transaction_list(student_id, student_name, amount_paid) values('" . $student_id . "','$stud_name','$amount_paid')";

        $resA = $this->query($queryA);

//        ==========================================================================================================
        // add new amount to old amount
        $amount_paying = $amt + $amount_paid;
        $query2 = "update akorno_debt_list set amount_paid =" . $amount_paying . " where student_id = '" . $student_id . "'";

        $res2 = $this->query($query2);
        return $res2;
    }

    function owe_more($student_id, $amount_owed) {
        $query = "select * from akorno_debt_list where student_id = " . $student_id;
        $res = $this->query($query);
        $row = $this->fetch();
        $stud_name = $row['student_name'];
        $amt = $row['amount_owed'];


//        ==============================================another table===========================================================
        // document transaction
        $queryA = "Insert into akorno_debt_transaction_list(student_id, student_name, amount_owed) values('" . $student_id . "','$stud_name','$amount_owed')";
        $resA = $this->query($queryA);

//        ==========================================================================================================

        $new_amount_owed = $amt + $amount_owed;

        $query2 = "update akorno_debt_list set amount_owed =" . $new_amount_owed . " where student_id = '" . $student_id . "'";

        $res2 = $this->query($query2);
        return $res2;
    }

    function add_student($student_id, $name) {
        $query = "select * from akorno_debt_list where student_id = " . $student_id;
        $res = $this->query($query);
        

        $row = $this->fetch()['student_id'];

        if ($row) {
            return false;
        }

        $query2 = "insert into akorno_debt_list(student_id, student_name) values('$student_id', '$name')";
//        print $query2;
        return $this->query($query2);
    }

    /**
     * updates the record identified by id 
     */
    function update_info($info_id, $seatsLeft, $numOfPssngrsReserved, $numOfSeats, $numOfPssngrsBus, $longitude, $locationAddress, $latitude) {
        //write the SQL query and call $this->query()
        $query = "Update mw_info set seatsLeft = $seatsLeft
                                    ,   numOfPssngrsReserved = $numOfPssngrsReserved
                                    ,   numOfSeats = $numOfSeats
                                    ,   numOfPssngrsBus = $numOfPssngrsBus
                                    ,   longitude = $longitude, 
                                       locationAddress = $locationAddress, latitude = $latitude
                                    ,   date_modified = now()
                                     where  info_id = $info_id";
//        print $query;
//        print mysql_error();
        return $this->query($query);
    }

    function update_location($longitude, $latitude, $info_id) {
        //write the SQL query and call $this->query()
        $query = "Update mw_info set longitude = $longitude, 
                                       latitude = $latitude
                                    ,   date_modified = now()
                                     where  info_id = $info_id";
//        print $query;
//        print mysql_error();
        return $this->query($query);
    }

    function update_pass($seatsLeft, $numOfPssngrsReserved, $numOfPssngrsBus, $info_id) {
        $query = "Update mw_info set numOfPssngrsReserved = $numOfPssngrsReserved,   seatsleft = $seatsLeft
                                    ,   numOfPssngrsBus = $numOfPssngrsBus,   date_modified = now()
                                     where  info_id = $info_id";
//        print $query;
//        print mysql_error();
        return $this->query($query);
    }

    function update_pass_decrease() {
        
    }

}
