// Get references to the modal and its components
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCloseBtn = document.querySelector('.modal__close');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// Get references to the gallery and its images
const gallery = document.querySelector('.gallery');
const images = document.querySelectorAll('.gallery__image');

// Function to open the modal with the selected image
function openModal(imgSrc, imgAlt, imgDesc) {
  modalImg.src = imgSrc;
  modalImg.alt = imgAlt;
  modalTitle.textContent = imgAlt;
  modalDescription.textContent = imgDesc;

  modal.classList.add('modal--open');
  modal.setAttribute('aria-hidden', 'false');

  // Set focus to the modal
  modal.setAttribute('tabindex', '0');
  modal.focus();
}

// Function to close the modal
function closeModal() {
  modal.classList.remove('modal--open');
  modal.setAttribute('aria-hidden', 'true');
  
  // Reset tabindex to prevent focus on hidden elements
  modal.setAttribute('tabindex', '-1');
  
  // Set focus back to the last active image
  const activeImage = gallery.querySelector('.gallery__image.active');
  if (activeImage) {
    activeImage.focus();
  }
}

// Function to handle keydown events for accessibility
function handleKeyDown(event) {
  const isEscKey = event.key === 'Escape' || event.key === 'Esc';
  const isTabKey = event.key === 'Tab';
  
  if (isEscKey) {
    closeModal();
    event.preventDefault(); // Prevent default behavior of Escape key
  }
  
  if (isTabKey && modal.classList.contains('modal--open')) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    } else if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();        
    }
  }
}

// Add event listeners to each image in the gallery
images.forEach((image, index) => {
  image.addEventListener('click', () => {
    const imgSrc = image.src;
    const imgAlt = image.alt;
    const imgDesc = image.nextElementSibling.textContent;
    
    openModal(imgSrc, imgAlt, imgDesc);
    
    // Mark the clicked image as active for focus management
    gallery.querySelectorAll('.gallery__image').forEach(item => {
      item.classList.remove('active');
    });
    image.parentElement.classList.add('active');

    // Set the alt text of modal image for accessibility
    modalImg.alt = imgAlt;
  });

  // Handle keyboard accessibility for gallery images
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const imgSrc = image.src;
      const imgAlt = image.alt;
      const imgDesc = image.nextElementSibling.textContent;
      
      openModal(imgSrc, imgAlt, imgDesc);
      
      // Mark the clicked image as active for focus management
      gallery.querySelectorAll('.gallery__image').forEach(item => {
        item.classList.remove('active');
      });
      image.parentElement.classList.add('active');
      
      // Set the alt text of modal image for accessibility
      modalImg.alt = imgAlt;
    }
  });
});

// Close modal when clicking on close button
modalCloseBtn.addEventListener('click', () => {
  closeModal();
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Handle keyboard events for accessibility
document.addEventListener('keydown', handleKeyDown);

// Close modal on pressing the Escape key
modal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Select the form and the list
const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
// Function to create a new list item
function createNewItem(itemName) {
  const newItem = document.createElement('li');
  newItem.classList.add('item');
  const itemContent = `
    <span class="item__name">${itemName}</span>
    <button class="item__deleteBtn">Delete</button>
  `;
  newItem.innerHTML = itemContent;
  itemList.appendChild(newItem);
  // Add event listener to the delete button
  const deleteBtn = newItem.querySelector('.item__deleteBtn');
  deleteBtn.addEventListener('click', function() {
    itemList.removeChild(newItem);
  });
}

// Add event listener to the form for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const newItemNameInput = document.getElementById('itemName');
  const newItemName = newItemNameInput.value.trim();

  if (newItemName === '') {
    alert('Please enter an item name.');
    return;
  }
  createNewItem(newItemName);
  // Clear the input field after adding the new item
  newItemNameInput.value = '';
});
