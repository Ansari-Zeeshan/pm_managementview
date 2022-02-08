
const showFilter = document.querySelector('.divfilter2 .top_up2 ul li:nth-child(2)');
const filterdiv = document.querySelector('.divfilter2 .top_up2 .filter_div');
const top_up = document.querySelector('.proj_filter .divfilter2 .top_up');
const filterImg = document.querySelector('.divfilter2 .top_up2 ul li:nth-child(2) img');
const topup2_overlay = document.querySelector('.proj_filter .divfilter2 .top_up2 .topup2_overlay');
const drop_overlay = document.querySelector('.proj_filter .divfilter2 .drop_overlay');
const milediv = document.querySelector('.proj_filter .divfilter2 .project1 .expand .border-bottom .divcon3 #tree_open');
const showMile = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone');
const milediv2 = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone p');
const showMile2 = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone .milehide');
const showFinalmile = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .main_mile');
const dflexVisible = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone > .d-flex');
const finalmile1 = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone  .milestone2');
const finalmile2 = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone .milestone2 div');
const finalmile3 = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone .milestone2 button');
const showTable = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .head1 span:first-child');
const addColumn = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .head11 button');
const addColumnicon = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .head11 button img');
const disableIcon = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .head11 .dropdown-menu .column a');
const dropmenu = document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .head9 .dropdown-menu');
let root = document.querySelector(':root');
let divfilter = document.querySelector('.divfilter2');
let tabnum = document.querySelectorAll('.divfilter2 .tab_content');
let mainul = document.querySelectorAll('.divfilter2 .top_up ul li');
let liIcon = document.querySelectorAll('.divfilter2 .top_up ul li img');
let plannedDiv = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .divcon4');
const editTitle = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 > .child-border .row h5');
let clickEdit = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .divcon10 div');
let showEdit = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit');
let chooseEdit = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit p');
let chooseEdit2 = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit input');
let addEdit = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit .btndiv');
let addEdit2 = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit .btndiv2');
let doneEdit = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit .btndiv2 .done');
let discardEdit = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit .btndiv2 .cancel');
let addLabel = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit .add_label .btn');
let calendar_data = document.querySelectorAll('.proj_filter .divfilter2 #rangePicker');
const subs_overlay = document.querySelector('.proj_filter .subscribe_overlay');
const showprojAdd = document.querySelectorAll('.proj_filter .divfilter2 .project1 .border-bottom .last_div');
let editText =document.querySelectorAll('.proj_filter #editText');
const open_Task =document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .main_mile .milestone3 #openTask');
const milestone4 =document.querySelector('.proj_filter .divfilter2 .project1 .projectcon1 .milestone4');
const open_taskName =milestone4.querySelector('.addtask_hide');
const open_taskAdded =milestone4.querySelector('.taskname_hide');
const addedTask =milestone4.querySelector('.task_added');
const open_SubTask =milestone4.querySelector('#addSubtask');
const open_SubtaskName =milestone4.querySelector('.addSubtask_hide');
const open_SubtaskAdded =milestone4.querySelector('.Subtaskname_hide');
const addedSubtask =milestone4.querySelector('.Subtask_added');
const overlay =document.querySelector('.myoverlay');
const addView_overlay =document.querySelector('.addview_overlay');
let statusColor, statusText, textVal, value,pageYedit,h5con,adjacentNode,fixedValue1=121,fixedValue2=121,fixedValue3=121; 

const ImageDisable=[{disSrc: 'icons/ColorImage/assignees_disab.png',enabSrc: 'icons/Assigness.svg'},
{disSrc: 'icons/ColorImage/subitem_disab.png',enabSrc: 'icons/subitem.svg'},
{disSrc: 'icons/ColorImage/calendar_disab.png',enabSrc: 'icons/calender-blue.svg'},
{disSrc: 'icons/ColorImage/calendar_disab.png',enabSrc: 'icons/calender-blue.svg'},
{disSrc: 'icons/ColorImage/actualBudg_disab.png',enabSrc: 'icons/actual budget.svg'},
{disSrc: 'icons/ColorImage/actualBudg_disab.png',enabSrc: 'icons/actual budget.svg'},
{disSrc: 'icons/ColorImage/user_disab.png',enabSrc: 'icons/user.svg'},
{disSrc: 'icons/ColorImage/user_disab.png',enabSrc: 'icons/user.svg'},
{disSrc: 'icons/ColorImage/status_disab.png',enabSrc: 'icons/status.svg'},
{disSrc: 'icons/ColorImage/assignees_disab.png',enabSrc: 'icons/Assigness.svg'},
{disSrc: 'icons/ColorImage/subitem_disab.png',enabSrc: 'icons/subitem.svg'},
{disSrc: 'icons/ColorImage/calendar_disab.png',enabSrc: 'icons/calender-blue.svg'},
{disSrc: 'icons/ColorImage/calendar_disab.png',enabSrc: 'icons/calender-blue.svg'},
{disSrc: 'icons/ColorImage/actualBudg_disab.png',enabSrc: 'icons/actual budget.svg'},
{disSrc: 'icons/ColorImage/actualBudg_disab.png',enabSrc: 'icons/actual budget.svg'},
{disSrc: 'icons/ColorImage/user_disab.png',enabSrc: 'icons/user.svg'},
{disSrc: 'icons/ColorImage/user_disab.png',enabSrc: 'icons/user.svg'},
{disSrc: 'icons/ColorImage/status_disab.png',enabSrc: 'icons/status.svg'},
{disSrc: 'icons/ColorImage/assignees_disab.png',enabSrc: 'icons/Assigness.svg'},
{disSrc: 'icons/ColorImage/subitem_disab.png',enabSrc: 'icons/subitem.svg'},
{disSrc: 'icons/ColorImage/calendar_disab.png',enabSrc: 'icons/calender-blue.svg'},
{disSrc: 'icons/ColorImage/calendar_disab.png',enabSrc: 'icons/calender-blue.svg'},
{disSrc: 'icons/ColorImage/actualBudg_disab.png',enabSrc: 'icons/actual budget.svg'},
{disSrc: 'icons/ColorImage/actualBudg_disab.png',enabSrc: 'icons/actual budget.svg'},
{disSrc: 'icons/ColorImage/user_disab.png',enabSrc: 'icons/user.svg'},
{disSrc: 'icons/ColorImage/user_disab.png',enabSrc: 'icons/user.svg'},
{disSrc: 'icons/ColorImage/status_disab.png',enabSrc: 'icons/status.svg'}];

window.addEventListener('click', hideFilterdiv);
function hideFilterdiv(e) {
    if (e.target == overlay) {
        filterdiv.classList.remove('showfilter');
        showFilter.classList.remove('active');
        showEdit.forEach((showEdit) => {
            showEdit.classList.remove('active');
        });
        overlay.style.zIndex="6";
        overlay.classList.remove('active');
    }
    else if(e.target==addView_overlay)
    {
        mainul[mainul.length - 1].classList.remove('active');
        divfilter.querySelector('.addview').classList.remove('active');
        addView_overlay.classList.remove('active');
    }
    else if(e.target==topup2_overlay)
    {
        filterdiv.classList.remove('showfilter');
        showFilter.classList.remove('active');
        topup2_overlay.classList.remove('active');
        filterImg.src=`icons/filter.svg`;
        filterImg.style.cssText='width:14px; height:14px';
        if(e.clientX < 749)
        {
            top_up.style.zIndex='4';
        }
        else
        {
            top_up.style.zIndex='6';
        }
    }
    else if(e.target==drop_overlay)
    {
        addColumnicon.forEach((addIcon)=>
        {
            addIcon.innerText = "add";
        });
        drop_overlay.classList.remove('active');
    }
}

// window resize function
window.addEventListener('resize',()=>
{
    if(this.innerWidth < 849)
    {
       overlay.classList.remove('active');
    }
    else
    {
        top_up.style.zIndex='6';
    }
})


// Hide and Show filter Div
showFilter.addEventListener('click', (e) => {
    if (!filterdiv.classList.contains('showfilter')) {
        filterdiv.classList.add('showfilter');
        showFilter.classList.add('active');
        topup2_overlay.classList.add('active');
        filterImg.src=`icons/filter2.png`;
        filterImg.style.cssText='width:14px; height:10px';
        let xWidth = e.clientX;
        if(xWidth<749)
        {
            top_up.style.zIndex='3';
        }
        else
        {
            top_up.style.zIndex="6";
        }
    }
    else {
        filterdiv.classList.remove('showfilter');
        showFilter.classList.remove('active');
        topup2_overlay.classList.remove('active');
        filterImg.src=`icons/filter.svg`;
        filterImg.style.cssText='width:14px; height:14px';
    }
})

// Milestone Expand/Collapse 
milediv.addEventListener('click', () => {
    if (!showMile.classList.contains('showmilestone')) {
        showMile.classList.add('showmilestone');
        root.style.setProperty("--rot", "90deg");
        dflexVisible.classList.add('visible');
    }
    else {
        showMile.classList.remove('showmilestone');
        showMile2.classList.remove('showmilestone2');
        showFinalmile.classList.remove('showmain_mile');
        root.style.setProperty("--rot", "0deg");
        dflexVisible.classList.remove('visible');
        milestone4.classList.remove('active');
        open_taskAdded.classList.remove('active');
        open_taskName.classList.remove('active');
        addedTask.classList.remove('active');
        open_SubtaskAdded.classList.remove('active');
        open_SubtaskName.classList.remove('active');
        addedSubtask.classList.remove('active');
    }
})

milediv2.addEventListener('click', () => {
    if (!showMile2.classList.contains('showmilestone2')) {
        showMile2.classList.add('showmilestone2');
    }
    else {
        showMile2.classList.remove('showmilestone2');
    }
})

finalmile1.addEventListener('click', () => {
    showFinal();
})

function showFinal() {
    if (!showFinalmile.classList.contains('showmain_mile')) {
        showFinalmile.classList.add('showmain_mile');
        showMile.classList.add('showmilestone');
        showMile2.classList.remove('showmilestone2');
    }
    else {
        showFinalmile.classList.remove('showmain_mile');
    }
}
open_Task.addEventListener('click', ()=>
{
    if(!milestone4.classList.contains('active') && !open_taskName.classList.contains('active'))
    {
        milestone4.classList.add('active');
        open_taskName.classList.add('active');
    }
})
open_taskName.addEventListener('click',function()
{
    if(milestone4.classList.contains('active') && this.classList.contains('active') && !open_taskAdded.classList.contains('active'))
    {
        this.classList.remove('active');
        open_taskAdded.classList.add('active');
    }
})
open_taskAdded.addEventListener('click',function()
{
    if(!open_taskName.classList.contains('active') && !addedTask.classList.contains('active') && this.classList.contains('active'))
    {
        this.classList.remove('active');
        open_taskName.classList.add('active')
        addedTask.classList.add('active')
    }
})
open_SubTask.addEventListener('click',()=>
{
    if(!open_SubtaskName.classList.contains('active'))
    {
        open_SubtaskName.classList.add('active');
    }
})
open_SubtaskName.addEventListener('click', function()
{
    if(this.classList.contains('active') && !open_SubtaskAdded.classList.contains('active'))
    {
        this.classList.remove('active');
        open_SubtaskAdded.classList.add('active');
    }
})
open_SubtaskAdded.addEventListener('click', function()
{
    if(!addedSubtask.classList.contains('active') && this.classList.contains('active') && 
    !open_SubtaskName.classList.contains('active'))
    {
        this.classList.remove('active');
        addedSubtask.classList.add('active')
        open_SubtaskName.classList.add('active')
    }
})

// Status Update Edit and Done
clickEdit.forEach((edit) => {
    edit.addEventListener('click', (e) => {
        showStatus(e);
    })
})
function showStatus(e)
{
    pageYedit = e.pageY;
    let closestAddedit = e.target.closest('.expand').querySelector('.addedit');
    statusColor = e.target;
    statusText = e.target;
    if (!closestAddedit.classList.contains('active')) {
        overlay.style.zIndex="1";
        closestAddedit.classList.add('active');
        overlay.classList.add('active');
        chooseEdit.forEach((choose) => {
            choose.addEventListener('click', (e) => {
                if (!choose.hasAttribute('contenteditable'))
                    choosedefault(e, statusColor, statusText, closestAddedit);
            })
        });
    }
}

function choosedefault(e, statusColor, statusText, closestAddedit) {
    let colorval = e.target.getAttribute('value');
    let target = e.target.getAttribute('text-target');
    let targettext = e.target.closest('.addedit').querySelector(target).innerText;
    statusColor.style.backgroundColor = `${colorval}`;
    statusText.innerText = `${targettext}`;
    closestAddedit.classList.remove('active');
    overlay.classList.remove('active');
}

addLabel.forEach((add,ind)=>
{
    add.addEventListener('click',(e)=>
    {
        addLabeldom(e,ind);
    })
})

function addLabeldom(e,ind)
{
    let targetAppend1 = e.target.closest('.right_div').querySelectorAll('input');
    let targetAppend2 = e.target.closest('.right_div').querySelectorAll('p');
    let input = document.createElement('input');
    input.setAttribute('type','color');
    input.setAttribute('value','');
    input.setAttribute('text-target','');
    let p = document.createElement('p');
    p.setAttribute('value','');
    p.setAttribute('text-target','');
    p.innerText="Name";
    switch(ind)
    {
        case 0:
            fixedValue1=fixedValue1+54;
            fixingTop(p,fixedValue1);
            break;
        case 1:
            fixedValue2=fixedValue2+54;
            fixingTop(p,fixedValue2);
            break;
        case 2:
            fixedValue3=fixedValue3+54;
            fixingTop(p,fixedValue3);
            break;    
    }
    targetAppend1[targetAppend1.length-1].insertAdjacentElement('afterend', input);
    targetAppend2[targetAppend2.length-1].insertAdjacentElement('afterend', p);
    targetAppend1 = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit input');
    targetAppend2 = document.querySelectorAll('.proj_filter .divfilter2 .project1 .projectcon1 .expand .addedit p');
    setUserchoice(targetAppend1, targetAppend2);
    input.setAttribute('text-target',`.${value}`);
    p.setAttribute('text-target',`.${textVal}`);
}
function fixingTop(p,fixedValue)
{
    p.style.cssText=`top: ${fixedValue}px; left:34%`;
}

addEdit.forEach((addEdit, ind) => {
    addEdit.addEventListener('click', (e) => {
        let activeCheck = e.target.parentNode;
        let colorInput = activeCheck.closest('.expand').querySelector('.addedit').querySelectorAll('input');
        let paraText = activeCheck.closest('.expand').querySelector('.addedit').querySelectorAll('p');
        let addLabelcheck = activeCheck.closest('.expand').querySelector('.add_label');
        if (activeCheck.classList.contains('active') && !addEdit2[ind].classList.contains('active') && 
        !addLabelcheck.classList.contains('active')) 
        {
            addEdit2[ind].classList.add('active');
            activeCheck.classList.remove('active');
            addLabelcheck.classList.add('active');
            setUserchoice(colorInput, paraText);
        }
    })
})

function setUserchoice(colorInput, paraText)
{
    colorInput.forEach((input) => {
        input.removeAttribute('disabled');
    })
    paraText.forEach((text) => {
        text.setAttribute('contenteditable', 'true');
        if (text.hasAttribute('contenteditable')) {
            paraText.forEach((text) => {
                text.addEventListener('input', (e) => {
                    textVal = e.target.innerText;
                    statusText.innerText = `${textVal}`;
                })
            })
            colorInput.forEach((input) => {
                input.addEventListener('input', (e) => {
                    value = e.target.value;
                    statusColor.style.backgroundColor = `${value}`;
                })
            })
        }
    })
}
doneEdit.forEach((doneEdit) => {
    doneEdit.addEventListener('click', (e) => {
        statusText.setAttribute('textval', `${textVal}`);
        statusColor.setAttribute('colorval', `${value}`);
        finalEdit(e);
    })
})
discardEdit.forEach((discardEdit) => {
    discardEdit.addEventListener('click', (e) => {
        let textVal = statusText.getAttribute('textval');
        let colorVal = statusColor.getAttribute('colorval');
        statusColor.style.backgroundColor = `${colorVal}`;
        statusText.innerText = `${textVal}`;
        finalEdit(e);
    })
})
function finalEdit(e) {
    let newbtndiv = e.target.closest('.addedit').querySelector('.btndiv');
    let newbtndiv2 = e.target.closest('.addedit').querySelector('.btndiv2');
    let targetAddedit = e.target.closest('.addedit');
    targetAddedit.classList.remove('active');
    let colorInput = e.target.closest('.expand').querySelector('.addedit').querySelectorAll('input');
    let paraText = e.target.closest('.expand').querySelector('.addedit').querySelectorAll('p');
    let addLabelcheck=e.target.closest('.addedit').querySelector('.add_label');

    colorInput.forEach((input) => {
        input.setAttribute('disabled', 'disabled');
    })
    paraText.forEach((text) => {
        text.removeAttribute('contenteditable');
    })
    addLabelcheck.classList.remove('active');
    newbtndiv2.classList.remove('active');
    newbtndiv.classList.add('active');
    overlay.classList.remove('active');
}

//edit Title
editTitle.forEach((title) => {
    title.addEventListener('dblclick', (e) => {
        for (let i = 0; i < editTitle.length; i++) {
            editTitle[i].removeAttribute('contenteditable');
        }
        let target = e.target;
        target.setAttribute('contenteditable', 'true');
    })
})
editText.forEach((edit)=>
{
    edit.addEventListener('click',(e)=>
    {
        e.stopPropagation();
        let targetEdit = e.target.closest('.d-flex').querySelector(':first-child');
        if(!targetEdit.hasAttribute('contenteditable'))
        {
            targetEdit.setAttribute('contenteditable','true');
        }
        else
        {
            targetEdit.removeAttribute('contenteditable');
        }
    })
})

// Tabs and Pills the Data
mainul.forEach((val) => {
    val.addEventListener('click', (e) => {
        let li = e.target;
        if (!e.target.classList.contains('active')) {
            let target = e.target.getAttribute('data-target');
            if (target === '.addview') {
                showaddView(target, li);
                return;
            }
            showTabCon(target, li);
        }
    })
});
liIcon.forEach((val) => {
    val.addEventListener('click', (e) => {
        e.stopPropagation();
        let li = e.target.closest('li');
        if (!li.classList.contains('active')) {
            let target = li.getAttribute('data-target');
            if (target === '.addview') {
                showaddView(target, li);
                return;
            }
            showTabCon(target, li);
        }
    })
});

function showTabCon(target, li) {
    let removeactive = divfilter.querySelector('ul li.active');
    removeactive.classList.remove('active');
    for (let i = 0; i < tabnum.length; i++) {
        tabnum[i].classList.remove('active');
    }
    li.classList.add('active');
    divfilter.querySelector(target).classList.add('active');
}

function showaddView(target, li) {
    li.classList.add('active');
    divfilter.querySelector(target).classList.add('active');
    addView_overlay.classList.add('active');
}

// hide/show Main Table
showTable.forEach((expand) => {
    expand.addEventListener('click', (e) => {
        e.stopPropagation();
        let expand_div = e.target.closest('.projectcon1').querySelector('.expand');
        let img_rot = e.target;
        if (!expand_div.classList.contains('active')) {
            expand_div.classList.add('active');
            img_rot.style.transform="rotate(0deg)";
        }
        else {
            expand_div.classList.remove('active');
            img_rot.style.transform="rotate(180deg)";
        }
    })
})

// Enable/Disable Table Column 
addColumn.forEach((addColumn)=>
{
    addColumn.addEventListener('click',(e)=>
    {
        let target = e.target.closest('.head11').querySelector('button img');
        let dropmenu = e.target.closest('.head11').querySelector('.dropdown-menu');
        if (dropmenu.classList.contains('show')) {
            target.innerText = 'clear';
            drop_overlay.classList.add('active');
        }
        else {
            target.innerText = "add";
        }
    },true)
})
disableIcon.forEach((disable,ind)=>
{
    disable.addEventListener('click',(e)=>
    {
        e.preventDefault();
        e.stopPropagation();
        let targetDel = e.target.getAttribute('disable-data');
        let targetImg = e.target.querySelector('img');
        let nearestTarget = e.target.closest('.projectcon1').querySelectorAll(targetDel);
        // let nearestHead = e.target.closest('.head11').querySelector('.dropdown-menu');
        let nearestClear = e.target.closest('.head11').querySelector('button img');
        nearestTarget.forEach((removeNode)=>
        {
            if(!removeNode.classList.contains('disable'))
            {
                removeNode.classList.add('disable');
                targetImg.src = `${ImageDisable[ind].disSrc}`;
            }
            else
            {
                removeNode.classList.remove('disable');
                targetImg.src = `${ImageDisable[ind].enabSrc}`;
            }
        })
        nearestClear.innerText="add";
        // nearestHead.classList.remove('show');
    },true)
})

// hovering Data on Planned Date
function setSpan()
{
   plannedDiv.forEach((appendSpan)=>
   {
        let span = document.createElement('span');
        span.style.display="none";
        appendSpan.appendChild(span);
   })
}
setSpan();

calendar_data.forEach(data=>
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        data.addEventListener(e, hoverData);
    });
})

function hoverData(e)
{
    if(e.type==='mouseover')
    {
    let dateRange = e.target.value;
    let extractDate= dateRange.substr(4,8);
    let date1 = +extractDate.substr(0,2);
    let date2 = +extractDate.substr(4,6);
    let putDiv = e.target.closest('.plannedDate');
    let hideInput = putDiv.querySelector('input');
    let showSpan = putDiv.querySelector('span');
    showSpan.innerText=`${date2 - date1} Days`
    hideInput.style.display="none";
    showSpan.style.display="block";
    }
    else if(e.type==='mouseout')
    {
    let putDiv = e.target.closest('.plannedDate');
    let hideSpan = putDiv.querySelector('span');
    let showInput = putDiv.querySelector('input');
    hideSpan.style.display="none";
    showInput.style.display="block";
    }
}

$.datetimepicker.setDateFormatter('moment');

$(function(){
    $("[id='picker']").datetimepicker({
        timepicker: false,
        datepicker: true,
        format: 'MMM DD,YYYY'
    });
});

$('.h1fixed').scroll(function() {
    $(this).find('.mysticky').css('left', $(this).scrollLeft());
});        