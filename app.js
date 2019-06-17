// START: CODE  
setTimeout(function start() {
    document.getElementById("main").outerHTML = `
    <div class="menu-container">
        <img src="./logo.svg" alt="logo">
        <ul class="nav-bar" id="routes">
            <li><a class="route_link active"></a></li>
            <li><a onclick="loadCustomers();" class="route_link">CUSTOMERS</a></li>
            <li><a onclick="loadProducts();" class="route_link">PRODUCTS</a></li>
            <li><a onclick="loadUsers();" class="route_link">USERS</a></li>
        </ul>
    </div>

    <div class="option">
        <div class="top-bar">
            <h2 id="title">Welcome</h2>
            <div id="buttonTopRight"></div>
        </div>
        <div class="container">
            <div id="dataTable"></div>
            <div id="loading"></div>
            <div id="addUserInputs" style="display: none;">
                <label for="new_code" class="inp">
                        Code<span class="required">&nbsp;*</span>
                        <input type="text" id="new_code" name="new_code">
                        <span class="border"></span>
                    </label>
                <label for="new_name" class="inp">
                        Name<span class="required">&nbsp;*</span>
                        <input type="text" id="new_name" name="new_name">
                        <span class="border"></span>
                    </label>
            </div>
        </div>
    </div>`;

    var elem = document.querySelector('#mainloader');
    elem.parentNode.removeChild(elem); // Remove app loader from the Dom
   
    //Text Color on active menu item
    var routes = document.getElementById("routes");
    var links = routes.getElementsByClassName("route_link");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}, 1000); // End app load



//CUSTOMERS  
function loadCustomers() {
    document.getElementById("addUserInputs").style.display = "none";
    document.getElementById("title").innerHTML = 'Customers';
    document.getElementById("dataTable").innerHTML = "";

    var button_div = document.getElementById("buttonTopRight");
    while (button_div.hasChildNodes()) {
        button_div.removeChild(button_div.firstChild);
    }

    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.json-generator.com/api/json/get/clGirwieiG?indent=2', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            document.getElementById("loading").innerHTML = ''; // Hide the image after the response from the server
            console.log('Success!');
            var mydata = JSON.parse(request.responseText);

            function addHeaders(table, keys) {
                var row = table.insertRow();
                for (var i = 0; i < keys.length; i++) {
                    var cell = row.insertCell();
                    cell.appendChild(document.createTextNode(keys[i]));
                }
            }

            var table = document.createElement('table');
            for (var i = 0; i < mydata.length; i++) {
                var child = mydata[i];
                if (i === 0) {
                    addHeaders(table, Object.keys(child));
                }
                var row = table.insertRow();


                Object.keys(child).forEach(function(k) {

                    var cell = row.insertCell();
                    cell.appendChild(document.createTextNode(child[k]));
                })
            }

            document.getElementById('dataTable').appendChild(table);

        } else {
            console.log('We reached our target server, but it returned an error!');

        }
    };
    request.onerror = function() {
        console.log('There was a connection error of some sort!');
    };
    document.getElementById("loading").innerHTML = '<div class="content"><div class="loadingClass"><div class="loading-bar"><span class="bar-animation"></span></div></div></div>';
    request.send();
}


//PRODUCTS
function loadProducts() {
    document.getElementById("addUserInputs").style.display = "none";
    document.getElementById("title").innerHTML = 'Products';
    document.getElementById("dataTable").innerHTML = "";

    //Clear top right button
    var button_div = document.getElementById("buttonTopRight");
    while (button_div.hasChildNodes()) {
        button_div.removeChild(button_div.firstChild);
    }

    //Create button Delete Product
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete";
    btn.onclick = function() { remR(); };
    btn.className = 'btn';
    document.getElementById("buttonTopRight").appendChild(btn);

    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.json-generator.com/api/json/get/cfuYARGbZu?indent=2', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            document.getElementById("loading").innerHTML = ''; // Hide the image after the response from the server
            console.log('Success!');
            var mydata = JSON.parse(request.responseText);

            //create table header
            function addHeaders(table, keys) {
                var row = table.insertRow();
                for (var i = -1; i < keys.length; i++) {
                    var cell = row.insertCell();
                    if (i != -1) { cell.appendChild(document.createTextNode(keys[i])); } // check if it's the 1st <td> of table              
                }
            }

            var table = document.createElement('table');
            table.setAttribute("id", "productsTable");
            for (var i = 0; i < mydata.length; i++) {

                var child = mydata[i];

                if (i === 0) {
                    addHeaders(table, Object.keys(child));
                }

                var row = table.insertRow();

                //Outer DIV for Checkbox
                var checkboxDIV = document.createElement('div');
                checkboxDIV.className = 'Checkbox';

                //Inner DIV in Checkbox
                var checkboxVisible = document.createElement('div');
                checkboxVisible.className = 'Checkbox-visible';

                //Input for Checkbox
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.value = "checkbox";
                checkbox.checked = false;

                //Append to Outer DIV
                checkboxDIV.appendChild(checkbox);
                checkboxDIV.appendChild(checkboxVisible);

                row.insertCell().appendChild(checkboxDIV);

                Object.keys(child).forEach(function(k) {
                    var cell = row.insertCell();
                    cell.appendChild(document.createTextNode(child[k]));
                })
            }

            document.getElementById('dataTable').appendChild(table);

        } else {
            console.log('We reached our target server, but it returned an error!');

        }
    };
    request.onerror = function() {
        console.log('There was a connection error of some sort!');
    };
    document.getElementById("loading").innerHTML = '<div class="content"><div class="loadingClass"><div class="loading-bar"><span class="bar-animation"></span></div></div></div>';
    request.send();
}


//USERS
function loadUsers() {
    document.getElementById("addUserInputs").style.display = "none";
    document.getElementById("title").innerHTML = 'Users';
    document.getElementById("dataTable").innerHTML = "";

    //Clear top right button
    var button_div = document.getElementById("buttonTopRight");
    while (button_div.hasChildNodes()) {
        button_div.removeChild(button_div.firstChild);
    }

    //Create button Add User
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Add New";
    btn.onclick = function() { addNewUser(); };
    btn.className = 'btn';
    document.getElementById("buttonTopRight").appendChild(btn);

    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.json-generator.com/api/json/get/bUKoqVniOG?indent=2', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            document.getElementById("loading").innerHTML = ''; // Hide the image after the response from the server
            console.log('Success!');
            var mydata = JSON.parse(request.responseText);

            function addHeaders(table, keys) {
                var row = table.insertRow();
                for (var i = 0; i < keys.length; i++) {
                    var cell = row.insertCell();
                    cell.appendChild(document.createTextNode(keys[i]));
                }
            }

            var table = document.createElement('table');
            table.setAttribute("id", "usersTable");
            for (var i = 0; i < mydata.length; i++) {

                var child = mydata[i];
                if (i === 0) {
                    addHeaders(table, Object.keys(child));
                }
                var row = table.insertRow();

                Object.keys(child).forEach(function(k) {

                    var cell = row.insertCell();
                    cell.appendChild(document.createTextNode(child[k]));
                })
            }

            document.getElementById('dataTable').appendChild(table);

        } else {
            console.log('We reached our target server, but it returned an error!');

        }
    };
    request.onerror = function() {
        console.log('There was a connection error of some sort!');
    };
    document.getElementById("loading").innerHTML = '<div class="content"><div class="loadingClass"><div class="loading-bar"><span class="bar-animation"></span></div></div></div>';
    request.send();
}


//HELPER FUNCTIONS

//Button Add User
function buttonAddUser() {
    //Clear top right button
    var button_div = document.getElementById("buttonTopRight");
    while (button_div.hasChildNodes()) {
        button_div.removeChild(button_div.firstChild);
    }
    //Render Button Add User
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Add New";
    btn.onclick = function() { addNewUser(); };
    btn.className = 'btn';
    document.getElementById("buttonTopRight").appendChild(btn);
}

//Button Create User
function buttonCreate() {
    //Clear top right button
    var button_div = document.getElementById("buttonTopRight");
    while (button_div.hasChildNodes()) {
        button_div.removeChild(button_div.firstChild);
    }
    //Render Button Create
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Create";
    btn.onclick = function() { addRow(); };
    btn.className = 'btn';
    document.getElementById("buttonTopRight").appendChild(btn);
}

//Remove Product Function
function remR() {
    var allRows = document.getElementById('productsTable').getElementsByTagName('tr');
    var root = allRows[0].parentNode;
    var allInp = root.getElementsByTagName('input');
    var checked = 0;

    for (var i = allInp.length - 1; i >= 0; i--) {
        if ((allInp[i].getAttribute('type') == 'checkbox') && (allInp[i].checked)) {
            checked++;
        }
    }

    var tableRef = document.getElementById('productsTable');
    var tbody = tableRef.querySelector("tbody");
    var checkedInput = document.querySelectorAll("input[type='checkbox']:checked");

    if (checked == 1) {
        if (confirm('Are you sure you want to delete this product?') == true) {
            checkedInput.forEach(input => tbody.removeChild(input.parentNode.parentNode.parentNode))
        }
    } else if (checked == 0) {
        alert('Please choose one product');
    } else if (checked > 1) {
        alert('Please choose only one product');
    }
}

//Add new row to Users table
function addRow() {

    buttonAddUser();

    var new_code = document.getElementById("new_code").value;
    var new_name = document.getElementById("new_name").value;

    if ((new_code == '') && (new_name == '')) {
        alert('All fields are required');
        buttonCreate();

    } else if (new_code == '') {
        alert('CODE IS REQUIRED');
        buttonCreate();
    } else if (new_name == '') {
        alert('NAME IS REQURED');
        buttonCreate();
    } else {
        var table = document.getElementById("usersTable");
        var table_len = table.rows.length;
        var row = table.insertRow(1).outerHTML = "<tr><td>" + new_code + "</td><td>" + new_name + "</td></tr>"

        document.getElementById("new_code").value = "";
        document.getElementById("new_name").value = "";

        document.getElementById("title").innerHTML = 'Users';
        document.getElementById("usersTable").style.display = "table";
        document.getElementById("addUserInputs").style.display = "none";
    }
}

//Show Add User Screen
function addNewUser() {
    document.getElementById("title").innerHTML = '';

    //Render Back Arrow
    var arrow = document.createElement("a");
    arrow.innerHTML = '<i class="arrow"></i>';
    arrow.onclick = function() { backFromAddUser(); };
    arrow.className = 'backIcon';
    document.getElementById("title").appendChild(arrow);

    //Add New User Title
    var addNew = document.createElement("span");
    addNew.innerHTML = 'Add new User';
    document.getElementById("title").appendChild(addNew);

    //Show Add New User Inputs
    document.getElementById("usersTable").style.display = "none";
    document.getElementById("addUserInputs").style.display = "block";

    buttonCreate();
}

//Back Arrow
function backFromAddUser() {
    document.getElementById("title").innerHTML = 'Users';
    document.getElementById("usersTable").style.display = "table";
    document.getElementById("addUserInputs").style.display = "none";

    buttonAddUser();
};


// END: CODE