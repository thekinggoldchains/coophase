/**
* Template Name: Siimple
* Template URL: https://bootstrapmade.com/free-bootstrap-landing-page/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Mobile nav toggle
   */
  const toogleNav = function () {
    let navButton = select('.nav-toggle')
    navButton.classList.toggle('nav-toggle-active')
    navButton.querySelector('i').classList.toggle('bx-x')
    navButton.querySelector('i').classList.toggle('bx-menu')

    select('.nav-menu').classList.toggle('nav-menu-active')
  }
  on('click', '.nav-toggle', function (e) {
    toogleNav();
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.nav-menu .drop-down > a', function (e) {
    e.preventDefault()
    this.nextElementSibling.classList.toggle('drop-down-active')
    this.parentElement.classList.toggle('active')
  }, true)

  /**
   * Scrool links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      select('.nav-menu .active').classList.remove('active')
      this.parentElement.classList.toggle('active')
      toogleNav();
    }
  }, true)

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.sticky-top').addClass('shadow-sm bg-dark bg-opacity-50').css({ 'top': '0px', 'height': '45px' });
      $('.scrollto').removeClass('py-lg-4').css({ 'top': '0px', 'height': '45px' });
      $('.navbar-brand h2').addClass('text-white').removeClass('text-primary');
    } else {
      $('.sticky-top').removeClass('shadow-sm bg-dark bg-opacity-50').css({ 'top': '-100px', 'height': 'auto' });
      $('.scrollto').addClass('py-lg-4').css({ 'top': '0px', 'height': 'auto' });
      $('.navbar-brand h2').removeClass('text-white').addClass('text-primary');
    }
  });

  document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const templateParams = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      cidade_residencia: formData.get('cidade_residencia'),
      cidade: formData.get('cidade')
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('E-mail enviado com sucesso!');
      }, function(error) {
        console.log('FAILED...', error);
        alert('Falha ao enviar o e-mail.');
      });
  });

//  Substitua YOUR_USER_ID, YOUR_SERVICE_ID e YOUR_TEMPLATE_ID pelos valores que você obteve ao 
//   configurar o EmailJS. Esse código configurará seu formulário para enviar um e-mail quando o 
//   formulário for enviado.

})()