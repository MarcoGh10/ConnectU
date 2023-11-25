const openCreateEventPopupBtn = document.getElementById('openCreateEventPopup');
const createEventPopup = document.getElementById('createEventPopup');
const closeCreateEventPopupBtn = document.getElementById('closeCreateEventPopup');

// Deschiderea popup-ului la clic pe buton
openCreateEventPopupBtn.addEventListener('click', function() {
    createEventPopup.style.display = 'block';
});

// Închiderea popup-ului la clic pe butonul de închidere (X)
closeCreateEventPopupBtn.addEventListener('click', function() {
    createEventPopup.style.display = 'none';
});