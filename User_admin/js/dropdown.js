
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");

  searchBox.value = "";
  filterList("");

  if (optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

searchBox.addEventListener("keyup", function(e) {
  filterList(e.target.value);
});

const filterList = searchTerm => {
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






// var x, i, j, l, ll, selElmnt, a, b, c;
// /*look for any elements with the class "custom-select":*/
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//     selElmnt = x[i].getElementsByTagName("select")[0];
//     ll = selElmnt.length;
//     /*for each element, create a new DIV that will act as the selected item:*/
//     a = document.createElement("DIV");
//     a.setAttribute("class", "select-selected");
//     a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//     x[i].appendChild(a);
//     /*for each element, create a new DIV that will contain the option list:*/
//     b = document.createElement("DIV");
//     b.setAttribute("class", "select-items select-hide");
//     for (j = 1; j < ll; j++) {
//         /*for each option in the original select element,
//         create a new DIV that will act as an option item:*/
//         c = document.createElement("DIV");
//         c.innerHTML = selElmnt.options[j].innerHTML;
//         c.addEventListener("click", function (e) {
//             /*when an item is clicked, update the original select box,
//             and the selected item:*/
//             var y, i, k, s, h, sl, yl;
//             s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//             sl = s.length;
//             h = this.parentNode.previousSibling;
//             for (i = 0; i < sl; i++) {
//                 if (s.options[i].innerHTML == this.innerHTML) {
//                     s.selectedIndex = i;
//                     h.innerHTML = this.innerHTML;
//                     y = this.parentNode.getElementsByClassName("same-as-selected");
//                     yl = y.length;
//                     for (k = 0; k < yl; k++) {
//                         y[k].removeAttribute("class");
//                     }
//                     this.setAttribute("class", "same-as-selected");
//                     break;
//                 }
//             }
//             h.click();
//         });
//         b.appendChild(c);
//     }
//     x[i].appendChild(b);
//     a.addEventListener("click", function (e) {
//         /*when the select box is clicked, close any other select boxes,
//         and open/close the current select box:*/
//         e.stopPropagation();
//         closeAllSelect(this);
//         this.nextSibling.classList.toggle("select-hide");
//         this.classList.toggle("select-arrow-active");
//     });
// }

// function closeAllSelect(elmnt) {
//     /*a function that will close all select boxes in the document,
//     except the current select box:*/
//     var x, y, i, xl, yl, arrNo = [];
//     x = document.getElementsByClassName("select-items");
//     y = document.getElementsByClassName("select-selected");
//     xl = x.length;
//     yl = y.length;
//     for (i = 0; i < yl; i++) {
//         if (elmnt == y[i]) {
//             arrNo.push(i)
//         } else {
//             y[i].classList.remove("select-arrow-active");
//         }
//     }
//     for (i = 0; i < xl; i++) {
//         if (arrNo.indexOf(i)) {
//             x[i].classList.add("select-hide");
//         }
//     }
// }
// /*if the user clicks anywhere outside the select box,
// then close all select boxes:*/
// document.addEventListener("click", closeAllSelect);



















// function create_custom_dropdowns() {
//     $('select').each(function(i, select) {
//       if (!$(this).next().hasClass('dropdown')) {
//         $(this).after('<div class="dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
//         var dropdown = $(this).next();
//         var options = $(select).find('option');
//         var selected = $(this).find('option:selected');
//         dropdown.find('.current').html(selected.data('display-text') || selected.text());
//         options.each(function(j, o) {
//           var display = $(o).data('display-text') || '';
//           dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
//         });
//       }
//     });
//   }
  
//   // Event listeners
  
//   // Open/close
//   $(document).on('click', '.dropdown', function(event) {
//     $('.dropdown').not($(this)).removeClass('open');
//     $(this).toggleClass('open');
//     if ($(this).hasClass('open')) {
//       $(this).find('.option').attr('tabindex', 0);
//       $(this).find('.selected').focus();
//     } else {
//       $(this).find('.option').removeAttr('tabindex');
//       $(this).focus();
//     }
//   });
//   // Close when clicking outside
//   $(document).on('click', function(event) {
//     if ($(event.target).closest('.dropdown').length === 0) {
//       $('.dropdown').removeClass('open');
//       $('.dropdown .option').removeAttr('tabindex');
//     }
//     event.stopPropagation();
//   });
//   // Option click
//   $(document).on('click', '.dropdown .option', function(event) {
//     $(this).closest('.list').find('.selected').removeClass('selected');
//     $(this).addClass('selected');
//     var text = $(this).data('display-text') || $(this).text();
//     $(this).closest('.dropdown').find('.current').text(text);
//     $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
//   });
  
//   // Keyboard events
//   $(document).on('keydown', '.dropdown', function(event) {
//     var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
//     // Space or Enter
//     if (event.keyCode == 32 || event.keyCode == 13) {
//       if ($(this).hasClass('open')) {
//         focused_option.trigger('click');
//       } else {
//         $(this).trigger('click');
//       }
//       return false;
//       // Down
//     } else if (event.keyCode == 40) {
//       if (!$(this).hasClass('open')) {
//         $(this).trigger('click');
//       } else {
//         focused_option.next().focus();
//       }
//       return false;
//       // Up
//     } else if (event.keyCode == 38) {
//       if (!$(this).hasClass('open')) {
//         $(this).trigger('click');
//       } else {
//         var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
//         focused_option.prev().focus();
//       }
//       return false;
//     // Esc
//     } else if (event.keyCode == 27) {
//       if ($(this).hasClass('open')) {
//         $(this).trigger('click');
//       }
//       return false;
//     }
//   });
  
//   $(document).ready(function() {
//     create_custom_dropdowns();
//   });