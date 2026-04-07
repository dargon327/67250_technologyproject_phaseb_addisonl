function ActiveNav() {
  const navLinks = document.querySelectorAll('nav li a');
  navLinks.forEach(link => {
    if (window.location.href === link.href) {
      link.classList.add("active");
    }
  });
}
ActiveNav();


document.addEventListener('DOMContentLoaded', function () {
  var ticketForm = document.getElementById('ticket-form');
  if (!ticketForm) return; // exit if not on tickets page

  // ticket type prices 
  var prices = {
    'qty-adult-guest': 18.00,
    'qty-adult-member': 16.20,
    'qty-student-member': 13.50,
    'qty-child': 9.00
  };

  var qtyInputs = document.querySelectorAll('.ticket-qty-box input');
  var totalPrice = document.getElementById('total-price');

  // automatic price calculation 
  function updatePrice() {
    var total = 0;
    qtyInputs.forEach(function (input) {
      var qty = parseInt(input.value) || 0;
      var price = prices[input.id] || 0;
      total += price * qty;
    });
    totalPrice.textContent = '$' + total.toFixed(2);
  }

  qtyInputs.forEach(function (input) {
    input.addEventListener('input', updatePrice);
  });

  ticketForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(function (span) {
      span.textContent = '';
    });

    var isValid = true;

    var totalQty = 0;
    qtyInputs.forEach(function (input) {
      totalQty += parseInt(input.value) || 0;
    });
    if (totalQty < 1) {
      document.getElementById('ticket-qty-error').textContent = 'Please select at least one ticket.';
      isValid = false;
    }

    var visitDate = document.getElementById('visit-date');
    if (visitDate.value === '') {
      document.getElementById('visit-date-error').textContent = 'Please select a visit date.';
      isValid = false;
    }

    var email = document.getElementById('email');
    var emailValue = email.value.trim();
    var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/;
    if (emailValue === '') {
      document.getElementById('email-error').textContent = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email (e.g., name@gmail.com).';
      isValid = false;
    }

    var zipcode = document.getElementById('zipcode');
    var zipValue = zipcode.value.trim();
    var zipRegex = /^\d{5}$/;
    if (zipValue !== '' && !zipRegex.test(zipValue)) {
      document.getElementById('zipcode-error').textContent = 'Zip code must be exactly 5 numbered digits.';
      isValid = false;
    }

    if (isValid) {
      var labels = {
        'qty-adult-guest': 'Adult Guest',
        'qty-adult-member': 'Adult Member',
        'qty-student-member': 'Student Member',
        'qty-child': 'Child'
      };

      var summary = [];
      var total = 0;
      qtyInputs.forEach(function (input) {
        var qty = parseInt(input.value) || 0;
        if (qty > 0) {
          summary.push(qty + 'x ' + labels[input.id]);
          total += qty * prices[input.id];
        }
      });

      var params = new URLSearchParams();
      params.set('tickets', summary.join(', '));
      params.set('date', visitDate.value);
      params.set('qty', totalQty);
      params.set('email', emailValue);
      params.set('total', total.toFixed(2));

      window.location.href = 'checkout.html?' + params.toString();
    }
  });
});



document.addEventListener('DOMContentLoaded', function () {
  var confTotal = document.getElementById('conf-total');
  if (!confTotal) return; // exit if not on checkout page

  var params = new URLSearchParams(window.location.search);

  document.getElementById('conf-tickets').textContent = params.get('tickets') || 'N/A';
  document.getElementById('conf-date').textContent = params.get('date') || 'N/A';
  document.getElementById('conf-quantity').textContent = params.get('qty') || 'N/A';
  document.getElementById('conf-email').textContent = params.get('email') || 'N/A';
  confTotal.textContent = '$' + (params.get('total') || '0.00');
});

document.addEventListener('DOMContentLoaded', function () {
  var memForm = document.getElementById('membership-form');
  if (!memForm) return; // exit if not on membership page

  var memType = document.getElementById('mem-type');

  memForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var errorSpans = memForm.querySelectorAll('.error-msg');
    errorSpans.forEach(function (span) {
      span.textContent = '';
    });

    var isValid = true;

    var firstName = document.getElementById('mem-first-name');
    if (firstName.value.trim() === '') {
      document.getElementById('mem-first-name-error').textContent = 'First name is required.';
      isValid = false;
    }

    var lastName = document.getElementById('mem-last-name');
    if (lastName.value.trim() === '') {
      document.getElementById('mem-last-name-error').textContent = 'Last name is required.';
      isValid = false;
    }

    var email = document.getElementById('mem-email');
    var emailValue = email.value.trim();
    var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/;
    if (emailValue === '') {
      document.getElementById('mem-email-error').textContent = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      document.getElementById('mem-email-error').textContent = 'Please enter a valid email (e.g., name@gmail.com).';
      isValid = false;
    }

    if (memType.value === '') {
      document.getElementById('mem-type-error').textContent = 'Please select a membership tier.';
      isValid = false;
    }

    if (isValid) {
      alert('Application submitted! Welcome to MonoMuse, ' + firstName.value.trim() + '. A confirmation email will be sent to ' + emailValue + '.');
      memForm.reset();
    }
  });
});

$(document).ready(function () {
  $('.faq-answer').hide();

  $('.faq-question').click(function () {
    $(this).next('.faq-answer').slideToggle(300);
    $(this).toggleClass('faq-open');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var slides = document.querySelectorAll('.gallery-slide');
  var leftBtn = document.querySelector('.gallery-btn--left');
  var rightBtn = document.querySelector('.gallery-btn--right');
  var description = document.getElementById('gallery-description');

  if (!slides.length || !leftBtn || !rightBtn) return;

  var currentIndex = 0;

  function showSlide(index) {
    slides.forEach(function (slide) {
      slide.classList.remove('active');
    });
    slides[index].classList.add('active');

    if (description) {
      description.textContent = slides[index].getAttribute('data-description');
    }
  }

  rightBtn.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  leftBtn.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
});

// initialize leaflet map (only if map div exists on the page)
document.addEventListener('DOMContentLoaded', function () {
  var mapDiv = document.getElementById('map');
  if (!mapDiv || typeof L === 'undefined') return;

  // monomuse coordinates - 1060 morewood ave pittsburgh
  var lat = 40.4498;
  var lng = -79.9447;

  var map = L.map('map').setView([lat, lng], 16);

  // openstreetmap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  // marker with popup
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup('<strong>MonoMuse</strong><br>1060 Morewood Avenue<br>Pittsburgh, PA 15213')
    .openPopup();
});