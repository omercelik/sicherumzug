var mobileMenu = document.getElementById('mobile-menu');
var faqButtons = document.querySelectorAll('[data-faq-toggle]');

function setBodyOverflow(hidden) {
  document.body.style.overflow = hidden ? 'hidden' : '';
}

window.mobileMenuToggle = function mobileMenuToggle() {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('hidden');
  var isHidden = mobileMenu.classList.contains('hidden');
  setBodyOverflow(!isHidden);

  // Focus management
  if (!isHidden) {
    var closeBtn = document.getElementById('mobile-menu-close');
    if (closeBtn) {
      setTimeout(function() { closeBtn.focus(); }, 50);
    }
  } else {
    var openBtn = document.getElementById('mobile-menu-open');
    if (openBtn) {
      openBtn.focus();
    }
  }
};

window.toggleSubMenu = function toggleSubMenu(btn, targetId) {
  if (arguments.length === 1 || typeof btn === 'string') {
    targetId = btn;
    btn = null;
  }
  var target = document.getElementById(targetId);
  if (!target) return;
  var isHidden = target.classList.toggle('hidden');
  if (btn) {
    btn.setAttribute('aria-expanded', !isHidden);
    var icon = btn.querySelector('.material-symbols-outlined');
    if (icon) {
      if (!isHidden) {
        icon.classList.add('rotate-180');
      } else {
        icon.classList.remove('rotate-180');
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function domReady() {
  mobileMenu = document.getElementById('mobile-menu');
  faqButtons = document.querySelectorAll('[data-faq-toggle]');

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', function handleEscapeKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenuToggle();
      }
    }
  });

  var yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  Array.prototype.forEach.call(faqButtons, function register(btn) {
    btn.addEventListener('click', function handleFaqToggle() {
      var answerId = btn.getAttribute('data-faq-toggle');
      var answer = document.getElementById(answerId);
      if (!answer) return;
      var isHidden = answer.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !isHidden);
      var icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        if (!isHidden) {
          icon.classList.add('rotate-180');
        } else {
          icon.classList.remove('rotate-180');
        }
      }
    });
  });

  var photosInput = document.getElementById('form-photos');
  var previewContainer = document.getElementById('file-preview-container');
  if (photosInput && previewContainer) {
    var selectedFiles = [];
    function updateInputAndRender() {
      var dt = new DataTransfer();
      selectedFiles.forEach(function(f) { dt.items.add(f); });
      photosInput.files = dt.files;
      if (selectedFiles.length === 0) photosInput.value = '';
      renderPreviews();
    }
    function renderPreviews() {
      previewContainer.innerHTML = '';

      var countIndicator = document.getElementById('file-count-indicator');
      if (selectedFiles.length > 0) {
        if (!countIndicator) {
          countIndicator = document.createElement('p');
          countIndicator.id = 'file-count-indicator';
          countIndicator.className = 'mt-2 text-xs font-bold text-primary transition-all duration-200';
          previewContainer.parentNode.insertBefore(countIndicator, previewContainer.nextSibling);
        }
        countIndicator.textContent = selectedFiles.length === 1
          ? '1 Foto ausgewählt'
          : selectedFiles.length + ' Fotos ausgewählt';
        countIndicator.style.display = 'block';
      } else {
        if (countIndicator) {
          countIndicator.style.display = 'none';
        }
      }

      selectedFiles.forEach(function(file, index) {
        var wrapper = document.createElement('div');
        wrapper.className = 'relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 group';

        var img = document.createElement('img');
        img.className = 'h-full w-full object-cover';
        img.alt = file.name;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 z-10';
        btn.setAttribute('aria-label', 'Foto entfernen');
        btn.innerHTML = '<span class="material-symbols-outlined !text-[14px] !leading-none !font-bold">close</span>';
        btn.addEventListener('click', function() {
          selectedFiles.splice(index, 1);
          updateInputAndRender();
        });

        wrapper.appendChild(img);
        wrapper.appendChild(btn);
        previewContainer.appendChild(wrapper);

        var r = new FileReader();
        r.onload = function(e) { img.src = e.target.result; };
        r.readAsDataURL(file);
      });
    }
    photosInput.addEventListener('change', function() {
      if (photosInput.files) {
        Array.prototype.forEach.call(photosInput.files, function(file) {
          if (file.type.startsWith('image/')) selectedFiles.push(file);
        });
        updateInputAndRender();
      }
    });
  }

  // Live validation for form fields
  var nameInp = document.getElementById('form-name');
  var postcodeInp = document.getElementById('form-postcode');
  var phoneInp = document.getElementById('form-phone');
  var emailInp = document.getElementById('form-email');

  function setFieldError(input, errorMsg) {
    if (!input) return;
    var errorId = input.id + '-error';
    var errorEl = document.getElementById(errorId);
    if (errorMsg) {
      input.classList.remove('border-gray-200', 'focus:border-primary-light', 'focus:ring-primary-light/30');
      input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/30');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'mt-1.5 text-xs text-red-600 font-bold flex items-center gap-1 transition-all duration-200';
        input.parentNode.appendChild(errorEl);
      }
      errorEl.innerHTML = '<span class="material-symbols-outlined !text-[14px] !leading-none !font-bold">warning</span><span>' + errorMsg + '</span>';
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
    } else {
      input.classList.add('border-gray-200', 'focus:border-primary-light', 'focus:ring-primary-light/30');
      input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/30');
      if (errorEl) {
        errorEl.remove();
      }
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  if (postcodeInp) {
    postcodeInp.addEventListener('input', function() {
      var val = postcodeInp.value;
      if (val && !/^[0-9]{4}$/.test(val)) {
        if (val.length === 4 || !/^[0-9]*$/.test(val)) {
          setFieldError(postcodeInp, 'PLZ muss aus genau 4 Ziffern bestehen.');
        }
      } else {
        setFieldError(postcodeInp, null);
      }
    });
    postcodeInp.addEventListener('blur', function() {
      var val = postcodeInp.value;
      if (!val) {
        setFieldError(postcodeInp, 'PLZ ist ein Pflichtfeld.');
      } else if (!/^[0-9]{4}$/.test(val)) {
        setFieldError(postcodeInp, 'Geben Sie eine gültige 4-stellige PLZ ein (z.B. 1010).');
      } else {
        setFieldError(postcodeInp, null);
      }
    });
  }

  if (phoneInp) {
    phoneInp.addEventListener('input', function() {
      var val = phoneInp.value;
      if (val && !/^[0-9\s\+\-\(\)]+$/.test(val)) {
        setFieldError(phoneInp, 'Ungültige Zeichen in der Telefonnummer.');
      } else {
        setFieldError(phoneInp, null);
      }
    });
    phoneInp.addEventListener('blur', function() {
      var val = phoneInp.value;
      if (!val) {
        setFieldError(phoneInp, 'Telefonnummer ist ein Pflichtfeld.');
      } else if (val.replace(/[^0-9]/g, '').length < 5) {
        setFieldError(phoneInp, 'Bitte geben Sie eine gültige Telefonnummer ein (mind. 5 Ziffern).');
      } else {
        setFieldError(phoneInp, null);
      }
    });
  }

  if (emailInp) {
    emailInp.addEventListener('input', function() {
      var val = emailInp.value;
      if (val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setFieldError(emailInp, null);
      }
    });
    emailInp.addEventListener('blur', function() {
      var val = emailInp.value;
      if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setFieldError(emailInp, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      } else {
        setFieldError(emailInp, null);
      }
    });
  }

  if (nameInp) {
    nameInp.addEventListener('input', function() {
      if (nameInp.value.trim()) {
        setFieldError(nameInp, null);
      }
    });
    nameInp.addEventListener('blur', function() {
      if (!nameInp.value.trim()) {
        setFieldError(nameInp, 'Name ist ein Pflichtfeld.');
      } else {
        setFieldError(nameInp, null);
      }
    });
  }

  // Submit loading state to prevent double submission
  var quoteForm = document.querySelector('form[action*="formspree.io"]');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function() {
      if (quoteForm.checkValidity && !quoteForm.checkValidity()) {
        return;
      }
      var submitBtn = quoteForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        submitBtn.innerHTML = '<span class="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span> Wird gesendet...';
      }
    });
  }
});
