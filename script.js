// - Navbar menu
const navbarBurger = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('.navbar-menu');

navbarBurger.addEventListener('click', () => {
    navbarBurger.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
});


// - Products filtering
const categoryButtons = document.querySelectorAll('.category-button');
const productColumns = document.querySelectorAll('.product-column');

// เล่น Animation ที่กำหนดโดยใช้ if else ตรวจสอบ action
function filterAnimation(selectedCategory, action, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            productColumns.forEach((column) => {
                if (action === 'fade-out') {
                    column.classList.add('fade-out');
                }
                else if (action === 'hide-or-show') {
                    const columnCategory = column.dataset.category;
                    if (selectedCategory === columnCategory || selectedCategory === 'all') {
                        column.classList.remove('is-hidden');
                    }
                    else {
                        column.classList.add('is-hidden');
                    }
                }
                else if (action === 'fade-in') {
                    column.classList.remove('fade-out');
                }
            });
            resolve();
        }, delay);
    });
}

// ใช้ Filter สินค้า
async function onFilterClick(event) {
    // เปลี่ยนปุ่ม Active
    categoryButtons.forEach((button) => {
        button.classList.remove('is-dark');
    });
    event.target.classList.add('is-dark');

    // ดึงข้อมูล category
    const selectedCategory = event.target.dataset.category;

    // Animations
    await filterAnimation(selectedCategory, 'fade-out', 0);
    await filterAnimation(selectedCategory, 'hide-or-show', 500);
    await filterAnimation(selectedCategory, 'fade-in', 200);
}

// ใส่ Click event ให้กับปุ่มทุกปุ่ม
categoryButtons.forEach((button) => {
    button.addEventListener('click', onFilterClick);
});
