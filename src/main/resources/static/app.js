$(document).ready(function() {

    $.getJSON('http://localhost:8084/api/employees', function(json) {
        var tr=[];
        for (var i = 0; i < json.length; i++) {
            tr.push('<tr>');
            tr.push('<td>' + json[i].emp_id + '</td>');
            tr.push('<td>' + json[i].firstName + '</td>');
            tr.push('<td>' + json[i].lastName + '</td>');
            tr.push('<td>' + json[i].email + '</td>');
            tr.push('<td><button class=\'edit\'>Edit</button>&nbsp;&nbsp;<button class=\'delete\' id=' + json[i].emp_id + '>Delete</button></td>');
            tr.push('</tr>');
        }
        $('table').append($(tr.join('')));
    });

    $(document).delegate('#addNew', 'click', function(event) {
    				event.preventDefault();

    		var firstName = $('#firstName').val();
    		var lastName  = $('#lastName').val();
    		var email = $('#email').val();


    		$.ajax({
    		type: "POST",
    		contentType: "application/json; charset=utf-8",
    		url: "http://localhost:8084/api/employees",
    		data: JSON.stringify({firstName:firstName, lastName: lastName, email: email}),
    		cache: false,
    		success: function(result) {
    			$("#msg").html( "<span style='color: green'>Company added successfully</span>" );
    			window.setTimeout(function(){location.reload()},1000)
    		},
            error: function(err) {
                $("#msg").html( "<span style='color: red'>Name is required</span>" );
    		}
    	});
    });

    $(document).delegate('.delete', 'click', function() {
    	if (confirm('Do you really want to delete record?')) {
    		var id = $(this).attr('id');
    		var parent = $(this).parent().parent();
    		$.ajax({
    			type: "DELETE",
    			url: "http://localhost:8084/api/employees/" + id,
    			cache: false,
    			success: function() {
    				parent.fadeOut('slow', function() {
    					$(this).remove();
    				});
    				location.reload(true)
    			},
    			error: function() {
    				$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
    					$(this).remove();
    				});
    			}
    		});
    	}
    });

    $(document).delegate('.edit', 'click', function() {
    	var parent = $(this).parent().parent();

    	var id = parent.children("td:nth-child(1)");
    	var firstName = parent.children("td:nth-child(2)");
    	var lastName = parent.children("td:nth-child(3)");
    	var email = parent.children("td:nth-child(4)");
    	var buttons = parent.children("td:nth-child(5)");

    	firstName.html("<input type='text' id='txtName' value='" + firstName.html() + "'/>");
    	lastName.html("<input type='text' id='txtName' value='" + lastName.html() + "'/>");
    	email.html("<input type='text' id='txtName' value='" + email.html() + "'/>");
    	buttons.html("<button id='save'>Save</button>&nbsp;&nbsp;<button class='delete' id='" + id.html() + "'>Delete</button>");
    	});

    	$(document).delegate('#save', 'click', function() {
    		var parent = $(this).parent().parent();

    		var id = parent.children("td:nth-child(1)");
    		var firstName = parent.children("td:nth-child(2)");
    		var lastName = parent.children("td:nth-child(3)");
    		var email = parent.children("td:nth-child(4)");
    		var buttons = parent.children("td:nth-child(5)");
    		console.log(firstName.children("input[type=text]").val())
    		$.ajax({
                    type: "PUT",
                    contentType: "application/json; charset=utf-8",
                    url: "http://localhost:8084/api/employees/"+id.html(),

                    data: JSON.stringify({ firstName : firstName.children("input[type=text]").val(),
                                          lastName : lastName.children("input[type=text]").val(),email : email.children("input[type=text]").val()}),
                    cache: false,
                    success: function() {
                        firstName.html(firstName.children("input[type=text]").val());
                        lastName.html(lastName.children("input[type=text]").val());
                        email.html(email.children("input[type=text]").val());
                        buttons.html("<button class='edit' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete' id='" + id.html() + "'>Delete</button>");
                    },
                    error: function() {
                    	$('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error updating record').fadeIn().fadeOut(4000, function() {
                    	$(this).remove();
                    	});
                    }
            });
        });

});