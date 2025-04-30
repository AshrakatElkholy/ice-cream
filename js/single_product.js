const decrease = document.getElementById('decrease');
const increase = document.getElementById('increase');
const quantity = document.getElementById('quantity');

decrease.addEventListener('click', () => {
  if (parseInt(quantity.value) > 1) {
    quantity.value = parseInt(quantity.value) - 1;
  }
});

increase.addEventListener('click', () => {
  quantity.value = parseInt(quantity.value) + 1;
});
