(function ($) {
    "use strict";
     /*==================================================================    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================    [ Validate ]*/
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit',function(){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);

const firebaseConfig = {
    apiKey: "AIzaSyBqB_bEPfQFKD2Sg16pNmep5RjI1fm7Bk0",
    authDomain: "exode-a0a16.firebaseapp.com",
    projectId: "exode-a0a16",
    storageBucket: "exode-a0a16.appspot.com",
    messagingSenderId: "409347321227",
    appId: "1:409347321227:web:bd46c86dbeadd43d18938e"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var form = document.querySelector('#form')
var r_form = document.querySelector('#registerform')
var message = document.querySelector('#messageDiv');
var message_value = document.querySelector('.message');
var sign_out = document.querySelector('#signout')
var user = firebase.auth().currentUser;

// check if user is logged in or not
if (user) {
    if(window.location.pathname != '/index1.html') {
        window.location = 'index1.html';
    }
} else {
    if(window.location.pathname === '/index1.html') {
        window.location = 'index.html';
    }
}

// user login
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let email = form.username.value;
        let password = form.password.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location = 'index1.html';
        })
        .catch((error) => {
            message.style.display = 'block';
            message_value.innerText = error.message;
            setTimeout(function(){
                message.style.display = 'none';
            }, 3000);
        });
    })
}

// user register
if(r_form) {
    r_form.addEventListener('submit', function(e) {
        e.preventDefault();
        let email = r_form.username.value;
        let password = r_form.password.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location = 'index1.html';
        })
        .catch((error) => {
            message.style.display = 'block';
            message_value.innerText = error.message;
            setTimeout(function(){
                message.style.display = 'none';
            }, 3000);
        });
    })
}

// sign out  
if(sign_out) {
    sign_out.addEventListener('click', function(e) {
        firebase.auth().signOut().then(() => {
            window.location = 'index.html';
        }).catch((error) => {
        // An error happened.
        });
    })
}