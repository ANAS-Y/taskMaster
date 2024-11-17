
  $(document).ready(function () {
    $('#register-form').on('submit', function (e) {
      e.preventDefault();

      const name = $('#name').val();
      const email = $('#email').val();
      const password = $('#password').val();

      $.ajax({
        url: 'http://localhost:5000/api/auth/register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name, email, password }),
        success: function (response) {
          alert('Registration successful! You can now log in.');
          window.location.href = 'login.html';
        },
        error: function (xhr) {
          const errorMessage = xhr.responseJSON?.message || 'Registration failed.';
          alert(errorMessage);
        },
      });
    });
  });

  $(document).ready(function () {
    $('#login-form').on('submit', function (e) {
      e.preventDefault();

      const email = $('#email').val();
      const password = $('#password').val();

      $.ajax({
        url: 'http://localhost:5000/api/auth/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email, password }),
        success: function (response) {
          // Store token in localStorage
          localStorage.setItem('token', response.token);
          alert('Login successful!');
          window.location.href = 'dashboard.html';
        },
        error: function (xhr) {
          const errorMessage = xhr.responseJSON?.message || 'Login failed.';
          alert(errorMessage);
        },
      });
    });
  });

  