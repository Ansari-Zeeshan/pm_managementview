const selected = document.querySelectorAll(".select-box .selected");
const optionsContainer = document.querySelectorAll(".select-box .options-container");
const searchBox = document.querySelectorAll(".select-box .search-box input");
const optionsList = document.querySelectorAll(".select-box .option");
const downOverlay = document.querySelector(".dropdown_overlay");
selected.forEach((selected,ind)=>
{
  selected.addEventListener("click", () => {
    optionsContainer[ind].classList.toggle("active");
    downOverlay.classList.add('active');
    searchBox[ind].value = "";
    filterList("");
  });
})
optionsList.forEach(o => {
  o.addEventListener("click", (e) => {
    e.target.closest('.select-box').querySelector('.selected').innerText= o.querySelector("label").innerText;
    e.target.closest('.options-container').classList.remove('active');
  });
});
searchBox.forEach((searchBox,ind)=>
{
  searchBox.addEventListener("keyup", function(e) {
    if (e.key === 'Escape') {
      optionsContainer[ind].classList.remove('active');
      return;
    }
    filterList(e.target.value);
  });
})
const filterList = (searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};

window.addEventListener('click',(e)=>
{
  if(e.target==downOverlay)
  {
    optionsContainer.forEach((option)=>
    {
      option.classList.remove('active');
    })
    downOverlay.classList.remove('active');
  }
})