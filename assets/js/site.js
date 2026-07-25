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

window.toggleSubMenu = function toggleSubMenu(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  target.classList.toggle('hidden');
};

document.addEventListener('DOMContentLoaded', function domReady() {
  mobileMenu = document.getElementById('mobile-menu');
  faqButtons = document.querySelectorAll('[data-faq-toggle]');

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', function handleEscapeKey(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenuToggle();
      }
    }
  });

  var yearTarget = document.getElementById('current-year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  // Handle Escape key to close mobile menu
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenuToggle();
      }
    }
  });

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

  var toggleDistrictsBtn = document.getElementById('toggle-districts');
  if (toggleDistrictsBtn) {
    toggleDistrictsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var allItems = document.querySelectorAll('#districts-list .district-item');
      var isExpanded = toggleDistrictsBtn.getAttribute('data-expanded') === 'true';

      Array.prototype.forEach.call(allItems, function(item, index) {
        if (index >= 5) {
          if (isExpanded) {
            item.classList.add('hidden');
          } else {
            item.classList.remove('hidden');
          }
        }
      });

      if (isExpanded) {
        toggleDistrictsBtn.textContent = 'Mehr anzeigen ↓';
        toggleDistrictsBtn.setAttribute('data-expanded', 'false');
        toggleDistrictsBtn.setAttribute('aria-expanded', 'false');
      } else {
        toggleDistrictsBtn.textContent = 'Weniger anzeigen ↑';
        toggleDistrictsBtn.setAttribute('data-expanded', 'true');
        toggleDistrictsBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  var photosInput = document.getElementById('form-photos');
  var previewContainer = document.getElementById('file-preview-container');
  if (photosInput && previewContainer) {
    var loadedFiles = [];
    function updateInputAndRender() {
      var dt = new DataTransfer();
      loadedFiles.forEach(function(f) { dt.items.add(f); });
      photosInput.files = dt.files;
      previewContainer.innerHTML = '';
      loadedFiles.forEach(function(file, idx) {
        var wrapper = document.createElement('div');
        wrapper.className = 'relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105';
        var img = document.createElement('img');
        img.className = 'h-full w-full object-cover';
        img.alt = file.name;
        wrapper.appendChild(img);
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors z-10 cursor-pointer';
        btn.innerHTML = '<span class="material-symbols-outlined text-sm font-bold" style="font-size: 14px;">close</span>';
        btn.setAttribute('aria-label', 'Foto entfernen: ' + file.name);
        btn.onclick = function() {
          loadedFiles.splice(idx, 1);
          updateInputAndRender();
        };
        wrapper.appendChild(btn);
        previewContainer.appendChild(wrapper);
        var r = new FileReader();
        r.onload = function(e) { img.src = e.target.result; };
        r.readAsDataURL(file);
      });
    }
    photosInput.addEventListener('change', function() {
      if (photosInput.files) {
        Array.prototype.forEach.call(photosInput.files, function(f) {
          if (f.type.startsWith('image/')) loadedFiles.push(f);
        });
        updateInputAndRender();
      }
    });
  }
});
