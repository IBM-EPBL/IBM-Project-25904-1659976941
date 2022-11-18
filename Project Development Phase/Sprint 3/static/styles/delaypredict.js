function validateForm() {
    var fno = document.forms["flightForm"]["fno"].value;
    var month = document.forms["flightForm"]["month"].value;
    var daym = document.forms["flightForm"]["daym"].value;
    var dayw = document.forms["flightForm"]["dayw"].value;
    var org = document.forms["flightForm"]["org"].value;
    var dest = document.forms["flightForm"]["dest"].value;
    var sdt = document.forms["flightForm"]["sdt"].value; 
    var sat = document.forms["flightForm"]["sat"].value; 
    var adt = document.forms["flightForm"]["adt"].value; 
    if (fno == "" || fno == null || month == "" || month == null || daym == "" || daym == null || dayw == "" || dayw == null || org == "" || org == null || dest == "" || dest == null || sdt == "" || sdt == null || sat == "" || sat == null || adt == "" || adt == null) {
        alert("The given fields must be filled out");
        event.preventDefault();
    }
    if(month<1 || month>12)
    {
        alert("Enter a valid month");
        event.preventDefault();
    }
    if(month==2)
    {
        if(daym<1 || daym>=29)
        {
            alert("Enter a valid day of month");
            event.preventDefault();
        }
    }
    else if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)
    {
        if(daym<1 || daym>31)
        {
            alert("Enter a valid day of month");
            event.preventDefault();
        }
    }
    else if(month==4 || month==6 || month==9 || month==11)
    {
        if(daym<1 || daym>30)
        {
            alert("Enter a valid day of month");
            event.preventDefault();
        }
    }
    if(dayw<1 || dayw>7)
    {
        alert("Enter a valid day of week");
        event.preventDefault();
    }
    if(org==dest)
    {
        alert("Enter different origin and destination");
        event.preventDefault();
    }
    if(sdt<500 || sdt>2400)
    {
        alert("Enter a valid Departure time between 500 to 2400");
        event.preventDefault();
    }
    if(sat<500 || sat>2400)
    {
        alert("Enter a valid Arrival time between 500 to 2400");
        event.preventDefault();
    }
    if(sdt==sat)
    {
        alert("Departure and Arrival time must differ by atleast 1 hr");
        event.preventDefault();
    }
    if(adt<500 || adt>2400)
    {
        alert("Enter a valid Departure time between 500 to 2400");
        event.preventDefault();
    }
}
function checkValid(element)
{
    var obj = document.getElementById(element);
    var valid_obj = document.getElementById(element + "-valid");
    if(element=='month')
    {
        if(obj.value<1 || obj.value>12)
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";  
        }
        else {
            obj.style.borderColor = "#1C55A2";
            valid_obj.style.display = "none";
        }
    }
    if(element=='daym')
    {
        var monobj = document.getElementById('month');
        if(monobj.value==2)
        {
            if(obj.value<1 || obj.value>=29)
            {
                obj.style.borderColor = "rgb(255, 79, 47)"
                valid_obj.style.display = "block";  
            }
            else {
                obj.style.borderColor = "#1C55A2";
                valid_obj.style.display = "none";
            }
        }
        else if(monobj.value==1 || monobj.value==3 || monobj.value==5 || monobj.value==7 || monobj.value==8 || monobj.value==10 || monobj.value==12)
        {
            if(obj.value<1 || obj.value>31)
            {
                obj.style.borderColor = "rgb(255, 79, 47)"
                valid_obj.style.display = "block";  
            }
            else {
                obj.style.borderColor = "#1C55A2";
                valid_obj.style.display = "none";
            }
        }
        else if(monobj.value==4 || monobj.value==6 || monobj.value==9 || monobj.value==11)
        {
            if(obj.value<1 || obj.value>30)
            {
                obj.style.borderColor = "rgb(255, 79, 47)"
                valid_obj.style.display = "block";  
            }
            else {
                obj.style.borderColor = "#1C55A2";
                valid_obj.style.display = "none";
            }
        } 
        else
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";  
        }
    }
    if(element=='dayw')
    {
        if(obj.value<1 || obj.value>7)
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";  
        }
        else {
            obj.style.borderColor = "#1C55A2";
            valid_obj.style.display = "none";
        }
    }
    if(element=='dest')
    {
        var origin_obj = document.getElementById('org');
        if(obj.value==origin_obj.value)
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";  
        }
        else 
        {
            obj.style.borderColor = "#1C55A2";
            valid_obj.style.display = "none";
        }
    }
    if(element=='sdt')
    {
        if(obj.value<500 || obj.value>2400)
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";
        }
        else {
            obj.style.borderColor = "#1C55A2";
            valid_obj.style.display = "none";
        }
    }  
    if(element=='sat')  
    {
        if(obj.value<500 || obj.value>2400)
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";
        }
        else {
            obj.style.borderColor = "#1C55A2";
            valid_obj.style.display = "none";
        }
    }
    if(element=='adt')
    {
        if(obj.value<500 || obj.value>2400)
        {
            obj.style.borderColor = "rgb(255, 79, 47)"
            valid_obj.style.display = "block";
        }
        else {
            obj.style.borderColor = "#1C55A2";
            valid_obj.style.display = "none";
        }
    }
}

