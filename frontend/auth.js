document.getElementById('registrationFormSubmit').addEventListener('click', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const formData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    };
    console.log(formData)

    fetch('http://localhost:4002/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data)
                console.log("Authenticated")
                window.location.href = 'index.html';
            } else {
                if (data.message)
                    window.alert(data.message)
                if (data.errors)
                    window.alert(data.errors)
                console.log('Registration failed:', data);
            }
        })
        .catch(error => {
            console.error('ye Error h:', error);
        });
});

document.getElementById('button').addEventListener('click', async function (event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('loginpassword').value;

    const formData = {
        email,
        password
    };
    console.log(formData)

    fetch('http://localhost:4002/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data)
                console.log("Authenticated")
                window.location.href = 'index.html';
            } else {
                if (data.message === "User not found") {
                    window.alert("This email is not found. Please register first")
                }

                console.log('login failed:', data);
            }
        })
        .catch(error => {
            console.error('ye Error h:', error);
        });
})

document.getElementById('forgotpassword').addEventListener('click', async function (event){
    event.preventDefault();
    window.alert("your reset password link will be sent on the email entered here")
    const email = window.prompt("Enter email")


    const formData = {
        email
    };

    fetch('http://localhost:4002/api/password/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data)
                console.log("Authenticated")
                window.alert("mail sent")
            } else {
                console.log('failed:', data);
            }
        })
        .catch(error => {
            console.error('ye Error h:', error);
        });
})