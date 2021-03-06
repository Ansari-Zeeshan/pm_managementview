"use strict"
const selectGantt = document.querySelector('.gantt');
const prevGantt = document.querySelector('.gantt .slide_bottom .img1');
const nextGantt = document.querySelector('.gantt .slide_bottom .img2');
const ganttAppend = document.querySelector('.gantt .workloadrow1 > .col-md-12');
const tableprogAppend = document.querySelector('.gantt .workloadrow1 .tableprogian');
const selectData = document.querySelector('.gantt .thspace select');
let gantIndex = 0,
    monthNumber = +projectData[0].pstartdate.substr(5,2),
    monthNumber2 = +projectData[0].pstartdate.substr(5,2) - 1,
    year = +projectData[0].pstartdate.substr(0,4),
    projNameIndex = 0,
    monthCount = +projectData[0].pstartdate.substr(5,2) -1,
    selectInput = 'Days',
    nextMonInd = 0,
    monthYear = +projectData[0].pstartdate.substr(0,4),
    nextQuaInd = 0,
    quarterYear = +projectData[0].pstartdate.substr(0,4),
    yearlyYear = +projectData[0].pstartdate.substr(0,4),
    card,
    milesPDiv, showDate, monthText, yearText, projNameText, ganttTimeline, hoverProject2, hoverProject3, hoverProject4, firstDesc,
    MonthLength, month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12, val1, val2, val3,
    val4, val5, val6, val7, val8, val9, val10, val11, val12, UniMarLeft, UniRemWidth, miledataInd, UniProjind, UniMileind;
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];

(function createmulFirstDiv() {
    let j = 1;
    let pInd = 1;
    for (let i = 1; i < projectData.length + 1; i++) {
        let div1 = document.createElement('div1');
        div1.setAttribute('class', 'first1');
        div1.innerHTML = `
       <div class="firstext pname"><p>Project 01</p></div>
       <div class="collapsed" data-bs-toggle="collapse"
           href="#collapseExample${i}" role="button" aria-expanded="false"
           aria-controls="collapseExample">
            <div class="firstDesc fw-bold fs-5 mt-1 float-start"><p>Oct 25 - Oct 30 <span class="ml-1">5 Days</span><span class="mr-1 ml-1">|</span> 34%</p></div>
            <div class="gantpr gantpr1 timeline">
              
            </div>
       </div>
       <!-- hover popup -->
       <!-- // -->
       <!-- popdown collapse16-->
       <div class="collapse" id="collapseExample${i}">
           <div class="card card-body card-body-bg border-0 p-0">
        
           </div>
       </div>
       <!-- / -->
       `
        tableprogAppend.appendChild(div1);
    }

    milesPDiv = selectGantt.querySelectorAll('.gantt #benefits2 .first1');
    showDate = selectGantt.querySelectorAll('.gantt .tablegantt tr:nth-child(2) th');
    monthText = selectGantt.querySelector('.gantt .tablecal1 .thspace span');
    yearText = selectGantt.querySelector('.gantt .tablecal1 .thspace p');
    projNameText = selectGantt.querySelectorAll('#benefits2 .first1 .firstext p');
    ganttTimeline = selectGantt.querySelectorAll('.gantt #benefits2 .tableprogian .timeline');
    hoverProject2 = selectGantt.querySelectorAll('.gantt #benefits2 .tableprogian .pname');

    ganttTimeline.forEach((proj, ind) => {
        proj.addEventListener('click', (e) => {
            UniProjind = ind;
            let sDate = projectData[ind].pstartdate;
            let eDate = projectData[ind].penddate;
            card = selectGantt.querySelectorAll('.tableprogian .card');
            card[ind].innerHTML = "";
            let milestone = milestoneData[ind].project.length;
            if (milestone === null || milestone === 0 || milestone === undefined) {
                return;
            }
            for (let m = 0; m < milestone; m++) {
                let div = document.createElement('div');
                div.setAttribute('class', 'Milestone');
                div.innerHTML = `
                <div class="milestonediv1">
                <div class="firstext float-start"><p>${milestoneData[ind].project[m].taskname}</p></div>
                <div class="firstDesc fw-bold fs-5 mt-1 float-start"><p>Oct 25 - Oct 30 <span class="ml-1">5 Days</span><span class="mr-1 ml-1">|</span> 34%</p></div>
                    <div class="gantpr22 progress-bar rounded-1 milestonediv11 gantpr fs-4 onhover" data-bs-toggle="collapse" href="#milestoneExample${m+j}" role="button" aria-expanded="false" aria-controls="collapseExample3">
                        <span class="milebar_name">Milestone-2</span>
                    </div>
                </div>
                <div class="collapse alltask" id="milestoneExample${m+j}">
                   
                </div>
                `
                card[ind].appendChild(div);
            }
            let mileTimeline = e.target.closest('.first1').querySelectorAll('.Milestone .milestonediv11');
            hoverProject3 = selectGantt.querySelectorAll('.gantt #benefits2 .milestonediv1 .firstext p');
            calMilestoneBar(UniProjind,sDate,eDate);
            makingTooltip();

            mileTimeline.forEach((mile, mileind) => {
                mile.addEventListener('click', (e) => {            
                    UniMileind = mileind;
                    let alrTask = e.target.closest('.Milestone').querySelector('.alltask');
                    alrTask.innerHTML= "";
                    let len = taskData[UniProjind].milestone[mileind].task.length;
                    if (len === null || len === 0 || len === undefined) {
                        return;
                    }
                    for (let t = 0; t < len; t++) {
                        let div = document.createElement('div');
                        div.setAttribute('class', 'task');
                        div.innerHTML = `
                        <div class="milestonediv2 position-relative">
                        <div class="firstext float-start"><p>${taskData[UniProjind].milestone[mileind].task[t].taskname}</p></div>
                        <div class="firstDesc fw-bold fs-5 mt-1 float-start"><p>Oct 25 - Oct 30 <span class="ml-1">5 Days</span><span class="mr-1 ml-1 pie">|</span> 34%</p></div>
                            <div class="gantpr22 rounded-1 milestonediv22 gantpr bg-secondary fs-4 progress-bar" >
                                <span class="taskbar_name">Task-1</span>
                            </div>
                        </div>`
                        alrTask.appendChild(div);
                    }
                    hoverProject4 = selectGantt.querySelectorAll('.gantt #benefits2 .milestonediv2 .firstext p');
                    firstDesc = selectGantt.querySelectorAll('.gantt .milestonediv2 .firstDesc');
                    calTaskBar(mileind, ind);
                    makingTooltip();
                })
            })
        })
    })
}());

selectData.addEventListener('change', () => {
    selectInput = selectData.options[selectData.selectedIndex].value;
    switch (selectInput) {
        case 'Days': {
            let alltr = selectGantt.querySelectorAll('.tablegantt tr');
            monthText.classList.remove('white');
            for (let i = 1; i < alltr.length; i++) {
                let alltd = alltr[i].children;
                for (let j = 1; j < alltd.length; j++) {
                    if (j > 0 && j < 13) {
                        alltd[j].classList.remove('VDate');
                        alltd[j].classList.remove('VQuarter');
                        alltd[j].classList.remove('VYear');
                        alltd[j].style.width = "2.517vw";
                        if (alltd[j].classList.contains('deactive')) {
                            alltd[j].classList.remove('deactive');
                        }
                        continue;
                    }
                    alltd[j].classList.remove('deactive');
                }
            }
            assignDate();
            calTimelineBar();
            calMilestoneBar(UniProjind);
            calTaskBar(UniMileind, UniProjind);
            if (firstDesc === null || firstDesc === undefined) {
                break;
            } else {
                firstDesc.forEach((first) => {
                    first.classList.remove('translate0');
                })
                break;
            }
        }
        case 'Month': {
            let alltr = selectGantt.querySelectorAll('.tablegantt tr');
            for (let i = 1; i < alltr.length; i++) {
                let alltd = alltr[i].children;
                for (let j = 1; j < alltd.length; j++) {
                    if (alltd[j].classList.contains('VQuarter') || alltd[j].classList.contains('VYear')) {
                        alltd[j].classList.remove('VQuarter');
                        alltd[j].classList.remove('VYear');
                    }
                    if (j > 0 && j < 13) {
                        if (i == 1) {
                            alltd[j].classList.add('VDate');
                        }
                        alltd[j].classList.remove('deactive');
                        alltd[j].style.width = "6.575vw";
                        continue;
                    }
                    alltd[j].classList.add('deactive');
                }
            }
            assignMonth();
            calTimelineBar();
            calMilestoneBar(UniProjind);
            calTaskBar(UniMileind, UniProjind);
            if (firstDesc === null || firstDesc === undefined) {
                break;
            } else {
                firstDesc.forEach((first) => {
                    first.classList.add('translate0');
                })
                break;
            }
        }
        case 'Quarter': {
            let alltr = selectGantt.querySelectorAll('.tablegantt tr');
            for (let i = 1; i < alltr.length; i++) {
                let alltd = alltr[i].children;
                for (let j = 1; j < alltd.length; j++) {
                    if (alltd[j].classList.contains('VDate') || alltd[j].classList.contains('VYear')) {
                        alltd[j].classList.remove('VDate');
                        alltd[j].classList.remove('VYear');
                    }
                    if (j > 0 && j < 5) {
                        if (i == 1) {
                            alltd[j].classList.add('VQuarter');
                        }
                        alltd[j].classList.remove('deactive');
                        alltd[j].style.width = "19.725vw";
                        continue;
                    }
                    alltd[j].classList.add('deactive');
                }
            }
            assignQuarter();
            calTimelineBar();
            calMilestoneBar(UniProjind);
            calTaskBar(UniMileind, UniProjind);
            if (firstDesc === null || firstDesc === undefined) {
                break;
            } else {
                firstDesc.forEach((first) => {
                    first.classList.add('translate0');
                })
                break;
            }
        }
        case 'Year': {
            let alltr = selectGantt.querySelectorAll('.tablegantt tr');
            for (let i = 1; i < alltr.length; i++) {
                let alltd = alltr[i].children;
                for (let j = 1; j < alltd.length; j++) {
                    if (alltd[j].classList.contains('VDate') || alltd[j].classList.contains('VQuarter')) {
                        alltd[j].classList.remove('VDate');
                        alltd[j].classList.remove('VQuarter');
                    }
                    if (j > 0 && j < 3) {
                        if (i == 1) {
                            alltd[j].classList.add('VYear');
                        }
                        alltd[j].classList.remove('deactive');
                        alltd[j].style.width = "39.45vw";
                        continue;
                    }
                    alltd[j].classList.add('deactive');
                }
            }
            assignYear();
            calTimelineBar();
            calMilestoneBar(UniProjind);
            calTaskBar(UniMileind, UniProjind);
            if (firstDesc === null || firstDesc === undefined) {
                break;
            } else {
                firstDesc.forEach((first) => {
                    first.classList.add('translate0');
                })
                break;
            }
        }
    }
})

function getMonthLength() {
    MonthLength = new Date(year, monthNumber, 0).getDate();
}
getMonthLength();

function assignDate() {
    monthText.innerText = `${month[monthCount]}`;
    yearText.innerText = `${year}`;
    showDate.forEach((show) => {
        show.classList.remove('dateVirtual');
    })
    for (let i = 1; i < MonthLength + 1; i++) {
        let dayName = new Date(year, monthNumber2, i).toString().substr(0, 3);
        showDate[i].classList.add('dateVirtual');
        showDate[i].innerHTML = `${dayName} <p>${i}</p>`;
    }
}
assignDate();

function assignMonth() {
    let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
    let appearYear = yearText.innerText;
    monthYear = appearYear;
    nextMonInd = 0;
    loopMonthName(Mname, nextMonInd);
}

function loopMonthName(Mname, monthIndex) {
    let localMonInd = monthIndex;
    monthText.classList.add('white');
    yearText.innerText = `${monthYear}`;
    for (let i = 0; i < Mname.length; i++) {
        Mname[i].innerHTML = `<p>${month[localMonInd]}</p>`;
        localMonInd++;
    }
}

function assignQuarter() {
    let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
    let appearYear = yearText.innerText;
    quarterYear = appearYear;
    nextQuaInd = 0;
    loopQuarterName(Qname, nextQuaInd);
}

function loopQuarterName(Qname, nextQuaInd) {
    let localQuaInd = nextQuaInd;
    monthText.classList.add('white');
    yearText.innerText = `${quarterYear}`;
    for (let i = 0; i < Qname.length; i++) {
        switch (i) {
            case 0: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Jan-Mar</span>`;
                localQuaInd++;
                break;
            }
            case 1: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Apr-Jun</span>`;
                localQuaInd++;
                break;
            }
            case 2: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Jul-Sep</span>`;
                localQuaInd++;
                break;
            }
            case 3: {
                Qname[i].innerHTML = `<p class="d-inline mr-1">${quarter[localQuaInd]}</p> <span>Oct-Dec</span>`;
                localQuaInd++;
                break;
            }
        }
    }
}

function assignYear() {
    let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear');
    let appearYear = yearText.innerText;
    yearlyYear = appearYear;
    let nextYearInd = 0;
    loopYearName(Yname, nextYearInd);
}

function loopYearName(Yname, nextYearInd) {
    let localYearInd = nextYearInd;
    monthText.classList.add('white');
    yearText.innerText = `${yearlyYear}`;
    for (let i = 0; i < Yname.length; i++) {
        switch (i) {
            case 0: {
                Yname[i].innerHTML = `<p>Jan-Jun</p>`;
                localYearInd++;
                break;
            }
            case 1: {
                Yname[i].innerHTML = `<p>Jul-Dec</p>`;
                localYearInd++;
                break;
            }
        }
    }
}

function assignProjectName() {
    for (let i = 0; i < projectData.length; i++) {
        projNameText[projNameIndex].innerText = projectData[i].projectname;
        projNameIndex++;
    }
}
assignProjectName()

function assignMilestoneName() {
    for (let i = 0; i < projectData.length; i++) {
        let timeline = selectGantt.querySelectorAll('#benefits2 .tableprogian .timeline');
        let mileName = timeline[i].closest('.first1').querySelectorAll('.Milestone .milestonediv1 .firstext');
        for (let k = 0; k < mileName.length; k++) {
            mileName[k].innerText = milestoneData[i].project[k].milestonename;
        }
    }
}
assignMilestoneName()

function assignTaskName() {
    for (let i = 0; i < projectData.length; i++) {
        let milestone = milesPDiv[i].querySelectorAll('.card .Milestone');
        for (let j = 0; j < milestone.length; j++) {
            let Task = milestone[j].querySelectorAll('.task span.taskbar_name');
            let taskName = milestone[j].querySelectorAll('.alltask .milestonediv2 .firstext');
            for (let k = 0; k < Task.length; k++) {
                Task[k].innerText = taskData[i].milestone[j].task[k].planned;
                taskName[k].innerText = taskData[i].milestone[j].task[k].taskname;
            }
        }
    }
}
assignTaskName()

nextGantt.addEventListener('click', () => {
    switch (selectInput) {
        case 'Days': {
            monthCount++;
            monthNumber++;
            monthNumber2++;
            if (monthCount > 11) {
                monthCount = 0;
                year++;
                monthNumber = 1;
                monthNumber2 = 0;
            }
            getMonthLength();
            assignDate();
            break;
        }
        case 'Month': {
            nextMonInd = 0;
            monthYear++;
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            loopMonthName(Mname, nextMonInd);
            break;
        }
        case 'Quarter': {
            nextQuaInd = 0;
            quarterYear++;
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
            loopQuarterName(Mname, nextQuaInd);
            break;
        }
        case 'Year': {
            let nextYearInd = 0;
            yearlyYear++;
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear');
            loopYearName(Yname, nextYearInd);
            break;
        }
    }
    calTimelineBar();
    calMilestoneBar(UniProjind);
    calTaskBar(UniMileind, UniProjind);
})
prevGantt.addEventListener('click', () => {
    switch (selectInput) {
        case 'Days': {
            monthCount--;
            monthNumber--;
            monthNumber2--;
            if (monthCount < 0 && year > 2010) {
                monthCount = 11;
                year--;
                monthNumber = 12;
                monthNumber2 = 11;
            } else if (monthCount < 0 && year == 2010) {
                monthCount = 0;
                monthNumber = 1;
                monthNumber2 = 0;
                return false;
            }
            getMonthLength();
            assignDate();
            break;
        }
        case 'Month': {
            nextMonInd = 0;
            if (monthYear > 2010) {
                monthYear--;
            } else if (monthYear == 2010) {
                return false;
            }
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            loopMonthName(Mname, nextMonInd);
            break;
        }
        case 'Quarter': {
            nextQuaInd = 0;
            if (quarterYear > 2010) {
                quarterYear--;
            } else if (quarterYear == 2010) {
                return false;
            }
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
            loopQuarterName(Qname, nextQuaInd);
            break;
        }
        case 'Year': {
            let nextYearInd = 0;
            if (yearlyYear > 2010) {
                yearlyYear--;
            } else if (yearlyYear == 2010) {
                return false;
            }
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear');
            loopYearName(Yname, nextYearInd);
            break;
        }
    }
    calTimelineBar();
    calMilestoneBar(UniProjind);
    calTaskBar(UniMileind, UniProjind);
})

function calTimelineBar() {
    let mobileWidth = body.clientWidth;
    let projTimeline = document.querySelectorAll('.gantt #benefits2 .tableprogian .timeline');
    for (let i = 0; i < projectData.length; i++) {
        let date1 = new Date(projectData[i].pstartdate.substr(0, 10).toString());
        let date2 = new Date(projectData[i].penddate.substr(0, 10).toString());
        let projStartInd = +projectData[i].pstartdate.substr(5, 2);
        let projStartMon = month[--projStartInd].substr(0, 3);
        let getMonthIndex = +getNumericMonth(projStartMon);
        let projStartYear = projectData[i].pstartdate.substr(0, 4);
        let compareYear = +projStartYear;
        let startDate = Math.floor(date1.getTime() / (3600 * 24 * 1000));
        let endDate = Math.floor(date2.getTime() / (3600 * 24 * 1000));
        let daysCount = endDate - startDate;
        let monthAppear = getMonthAppear();
        let appearYear = +monthAppear;
        let compareDate = new Date(`${appearYear}/01/01`);
        let endTimeline = projectData[i].penddate.substr(8, 2);
        let projEndYear = projectData[i].penddate.substr(0, 4);
        endTimeline = getTimeline(endTimeline, appearYear, projEndYear);
        endTimeline = +endTimeline;
        getMonthName(getMonthIndex, appearYear, projStartYear);
        let prevYear = checkPrevYear(appearYear, projEndYear, projStartYear, i, projTimeline);
        let projStartDate = projectData[i].pstartdate.substr(8, 2);
        let startMText = projStartMon;
        let minusVal = +projStartDate;
        if (date1.getTime() <= compareDate.getTime()) {
            if (appearYear >= compareYear && prevYear) {
                if (month1 === `January ${appearYear}`) {
                    daysCount = checkTargetDate2(date2, i, daysCount, appearYear, projStartYear);
                    showGantt(daysCount, endTimeline, i, projTimeline, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                }
            }
        } else {
            if (appearYear >= compareYear && prevYear) {
                if (month1 === `January ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `February ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `March ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `April ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `May ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `June ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `July ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `August ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `September ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `October ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `November ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `December ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt(daysCount, endTimeline, i, projTimeline, projStartDate, startMText, minusVal, mobileWidth, appearYear, projEndYear);
                    daysCount = endDate - startDate;
                }
            }
        }
        givebackground(i, daysCount, ganttTimeline);
    }
}
calTimelineBar();

function calMilestoneBar(j,sDate,eDate) {
    if (j === undefined) {
        return;
    }
    let mobileWidth = body.clientWidth;
    let milestone = ganttTimeline[j].closest('.first1').querySelectorAll('.Milestone .milestonediv11');
    for (let i = 0; i < milestone.length; i++) {
        if (milestoneData[j].project[i].pstartdate === null || milestoneData[j].project[i].penddate === null) {
            milestoneData[j].project[i].pstartdate = sDate;
            milestoneData[j].project[i].penddate = eDate;
          }
        let date1 = new Date(milestoneData[j].project[i].pstartdate.substr(0, 10).toString());
        let date2 = new Date(milestoneData[j].project[i].penddate.substr(0, 10).toString());
        let mileStartInd = +milestoneData[j].project[i].pstartdate.substr(5, 2);
        let mileStartMon = month[--mileStartInd].substr(0, 3);
        let getMonthIndex = +getNumericMonth(mileStartMon);
        let mileStartYear = milestoneData[j].project[i].pstartdate.substr(0, 4);
        let compareYear = +mileStartYear;
        let startDate = Math.floor(date1.getTime() / (3600 * 24 * 1000));
        let endDate = Math.floor(date2.getTime() / (3600 * 24 * 1000));
        let daysCount = endDate - startDate;
        let monthAppear = getMonthAppear();
        let appearYear = +monthAppear;
        let compareDate = new Date(`${appearYear}/01/01`);
        let endTimeline = milestoneData[j].project[i].penddate.substr(8, 2);
        let mileEndYear = milestoneData[j].project[i].penddate.substr(0, 4);
        endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
        endTimeline = +endTimeline;
        getMonthName(getMonthIndex, appearYear, mileStartYear);
        let prevYear = checkMilePrevYear(appearYear, mileEndYear, mileStartYear, i, milestone);
        let mileStartDate = milestoneData[j].project[i].pstartdate.substr(8, 2);
        let startMText = mileStartMon;
        let minusVal = +mileStartDate;
        if (date1.getTime() <= compareDate.getTime()) {
            if (appearYear >= compareYear && prevYear) {
                if (month1 === `January ${appearYear}`) {
                    daysCount = checkTargetDate2(date2, i, daysCount, appearYear, mileStartYear);
                    showGantt2(daysCount, endTimeline, i, milestone, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                }
            }
        } else {
            if (appearYear >= compareYear && prevYear) {
                if (month1 === `January ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `February ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `March ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `April ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `May ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `June ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `July ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `August ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `September ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `October ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `November ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `December ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt2(daysCount, endTimeline, i, milestone, mileStartDate, startMText, minusVal, mobileWidth, j, appearYear, mileEndYear);
                    daysCount = endDate - startDate;
                }
            }
        }
        giveMilestonebG(i, j, daysCount, milestone);
    }
}

function calTaskBar(j, k) {
    if (j === undefined || k === undefined) {
        return;
    }
    let mobileWidth = body.clientWidth;
    let milestone = milesPDiv[k].querySelectorAll('.card .Milestone');
    if (milestone === null) {
        return;
    }
    let Task = milestone[j].querySelectorAll('.alltask .milestonediv22');
    if (Task === null) {
        return;
    }
    for (let i = 0; i < Task.length; i++) {
        let date1 = new Date(taskData[k].milestone[j].task[i].pstartdate.substr(0, 10).toString());
        let date2 = new Date(taskData[k].milestone[j].task[i].penddate.substr(0, 10).toString());
        let taskStartInd = +taskData[k].milestone[j].task[i].pstartdate.substr(5, 2);
        let taskStartMon = month[--taskStartInd].substr(0, 3);
        let getMonthIndex = +getNumericMonth(taskStartMon);
        let taskStartYear = taskData[k].milestone[j].task[i].pstartdate.substr(0, 4);
        let compareYear = +taskStartYear;
        let startDate = Math.floor(date1.getTime() / (3600 * 24 * 1000));
        let endDate = Math.floor(date2.getTime() / (3600 * 24 * 1000));
        let daysCount = endDate - startDate;
        let monthAppear = getMonthAppear();
        let appearYear = +monthAppear;
        let compareDate = new Date(`${appearYear}/01/01`);
        let endTimeline = +taskData[k].milestone[j].task[i].penddate.substr(8, 2);
        let taskEndYear = taskData[k].milestone[j].task[i].penddate.substr(0, 4);
        endTimeline = getTimeline(endTimeline, appearYear, taskEndYear);
        endTimeline = +endTimeline;
        getMonthName(getMonthIndex, appearYear, taskStartYear);
        let prevYear = checkTaskPrevYear(appearYear, taskEndYear, taskStartYear, i, milestone);
        let taskStartDate = taskData[k].milestone[j].task[i].pstartdate.substr(8, 2);
        let startMText = taskStartMon;
        let minusVal = +taskStartDate;
        if (date1.getTime() <= compareDate.getTime()) {
            if (appearYear >= compareYear && prevYear) {
                if (month1 === `January ${appearYear}`) {
                    daysCount = checkTargetDate2(date2, i, daysCount, appearYear, taskStartYear);
                    showGantt3(daysCount, endTimeline, i, Task, taskStartDate, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                }
            }
        } else {
            if (appearYear >= compareYear && prevYear) {
                if (month1 === `January ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `February ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `March ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `April ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `May ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `June ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `July ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `August ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `September ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `October ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `November ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                } else if (month1 === `December ${appearYear}`) {
                    daysCount = checkTargetDate(date1, date2, daysCount, appearYear);
                    showAlternateGantt3(daysCount, endTimeline, i, Task, taskStartDate, startMText, minusVal, mobileWidth, k, j, appearYear, taskEndYear);
                    daysCount = endDate - startDate;
                }
            }
        }
        // giveTaskbG(i,j,daysCount,milestone);
    }
}

function showGantt(daysCount, endTimeline, i, ganttTimeline, mobileWidth, appearYear, projEndYear) {
    let totWidth = selectGantt.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = +projectData[i].penddate.substr(5, 2);
    let dateText = `${monthText.innerText} ${yearText.innerText}`;
    let textAlign = ganttTimeline[i].previousElementSibling;
    let ganttSpan = ganttTimeline[i];
    let startMonName = +projectData[i].pstartdate.substr(5, 2);
    startMonName = month[startMonName - 1];
    let endMonName = month[+endMonthIndex - 1];
    let startDate = projectData[i].pstartdate.substr(8, 2);
    let per = projectData[i].percentage;
    switch (selectInput) {
        case 'Days': {
            switch (true) {
                case (daysCount <= 30): {
                    if (dateText === month1) {
                        let ganttWidth = (daysCount + 1) * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 30 && daysCount <= 58): {
                    if (dateText === month1) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 58 && daysCount <= 89): {
                    if (dateText === month1 || dateText === month2) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        anttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month3) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 89 && daysCount <= 119): {
                    if (dateText === month1 || dateText === month2 || dateText === month3) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month4) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 119 && daysCount <= 150): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month5) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 150 && daysCount <= 180): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month6) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 180 && daysCount <= 211): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month7) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 211 && daysCount <= 242): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month8) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 242 && daysCount <= 272): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month9) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 272 && daysCount <= 303): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month10) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 303 && daysCount <= 333): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9 ||
                        dateText === month10) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month11) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 333 && daysCount <= 365): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9 ||
                        dateText === month10 || dateText === month11) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month12) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate p');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Mname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${quarterYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Qname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear p');
            let quarter1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1.includes('JAN')) {
                quarterText1 = `january ${yearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Yname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function showAlternateGantt(daysCount, endTimeline, i, ganttTimeline, startTime, startMText, minusVal, mobileWidth, appearYear, projEndYear) {
    startTime = +startTime - 1;
    let totWidth = selectGantt.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = projectData[i].penddate.substr(5, 2);
    let dateText = `${monthText.innerText} ${yearText.innerText}`;
    let textAlign = ganttTimeline[i].previousElementSibling;
    let ganttSpan = ganttTimeline[i];
    let startMonName = +projectData[i].pstartdate.substr(5, 2);
    startMonName = month[startMonName - 1];
    let endMonName = month[+endMonthIndex - 1];
    let startDate = projectData[i].pstartdate.substr(8, 2);
    let per = projectData[i].percentage;
    switch (selectInput) {
        case 'Days': {
            updateValue(startMText, minusVal);
            switch (true) {
                case (daysCount <= val1): {
                    if (dateText === month1) {
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = (daysCount + 1) * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val1 && daysCount <= val2): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val2 && daysCount <= val3): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month3) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val3 && daysCount <= val4): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month4) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val4 && daysCount <= val5): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month5) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val5 && daysCount <= val6): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month6) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val6 && daysCount <= val7): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month7) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val7 && daysCount <= val8): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month8) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val8 && daysCount <= val9): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month9) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val9 && daysCount <= val10): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month10) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val10 && daysCount <= val11): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9 || dateText === month10) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month11) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val11 && daysCount <= val12): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9 || dateText === month10 ||
                        dateText === month11) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;

                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month12) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            let monthText2 = `${Mname[1].innerText} ${monthYear}`.toLowerCase();
            let monthText3 = `${Mname[2].innerText} ${monthYear}`.toLowerCase();
            let monthText4 = `${Mname[3].innerText} ${monthYear}`.toLowerCase();
            let monthText5 = `${Mname[4].innerText} ${monthYear}`.toLowerCase();
            let monthText6 = `${Mname[5].innerText} ${monthYear}`.toLowerCase();
            let monthText7 = `${Mname[6].innerText} ${monthYear}`.toLowerCase();
            let monthText8 = `${Mname[7].innerText} ${monthYear}`.toLowerCase();
            let monthText9 = `${Mname[8].innerText} ${monthYear}`.toLowerCase();
            let monthText10 = `${Mname[9].innerText} ${monthYear}`.toLowerCase();
            let monthText11 = `${Mname[10].innerText} ${monthYear}`.toLowerCase();
            let monthText12 = `${Mname[11].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1 || monthText2 === month1 || monthText3 === month1 || monthText4 === month1 ||
                        monthText5 === month1 || monthText6 === month1 || monthText7 === month1 || monthText8 === month1 ||
                        monthText9 === month1 || monthText10 === month1 || monthText11 === month1 || monthText12 === month1) {
                        let mulNum = +projectData[i].pstartdate.substr(8, 2);
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        getPCoorrds(i, mulNum, ganttTimeline, projEndYear, Mname);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1, quarterText2, quarterText3, quarterText4, quarterText5, quarterText6,
                quarterText7, quarterText8, quarterText9, quarterText10, quarterText11, quarterText12;
            const qArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${quarterYear}`;
                quarterText2 = `february ${quarterYear}`;
                quarterText3 = `march ${quarterYear}`;
                quarterText4 = `april ${quarterYear}`;
                quarterText5 = `may ${quarterYear}`;
                quarterText6 = `june ${quarterYear}`;
                quarterText7 = `july ${quarterYear}`;
                quarterText8 = `august ${quarterYear}`;
                quarterText9 = `september ${quarterYear}`;
                quarterText10 = `october ${quarterYear}`;
                quarterText11 = `november ${quarterYear}`;
                quarterText12 = `december ${quarterYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1 || quarterText2 === month1 || quarterText3 === month1 || quarterText4 === month1 ||
                        quarterText5 === month1 || quarterText6 === month1 || quarterText7 === month1 || quarterText8 === month1 ||
                        quarterText9 === month1 || quarterText10 === month1 || quarterText11 === month1 || quarterText12 === month1) {
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        let mulNum = +projectData[i].pstartdate.substr(8, 2);
                        getPCoorrds(i, mulNum, ganttTimeline, projEndYear, qArrName);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear p');
            let year1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let yearText1, yearText2, yearText3, yearText4, yearText5, yearText6,
                yearText7, yearText8, yearText9, yearText10, yearText11, yearText12;
            let yArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (year1 === 'JAN-JUN') {
                yearText1 = `january ${yearlyYear}`;
                yearText2 = `february ${yearlyYear}`;
                yearText3 = `march ${yearlyYear}`;
                yearText4 = `april ${yearlyYear}`;
                yearText5 = `may ${yearlyYear}`;
                yearText6 = `june ${yearlyYear}`;
                yearText7 = `july ${yearlyYear}`;
                yearText8 = `august ${yearlyYear}`;
                yearText9 = `september ${yearlyYear}`;
                yearText10 = `october ${yearlyYear}`;
                yearText11 = `november ${yearlyYear}`;
                yearText12 = `december ${yearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (yearText1 === month1 || yearText2 === month1 || yearText3 === month1 || yearText4 === month1 ||
                        yearText5 === month1 || yearText6 === month1 || yearText7 === month1 || yearText8 === month1 ||
                        yearText9 === month1 || yearText10 === month1 || yearText11 === month1 || yearText12 === month1) {
                        ganttTimeline[i].closest('.first1').style.display = "block";
                        let mulNum = +projectData[i].pstartdate.substr(8, 2);
                        getPCoorrds(i, mulNum, ganttTimeline, projEndYear, yArrName);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.first1').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function showGantt2(daysCount, endTimeline, i, ganttTimeline, mobileWidth, projInd, appearYear, projEndYear) {
    let totWidth = selectGantt.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = milestoneData[projInd].project[i].penddate.substr(5, 2);
    let dateText = `${monthText.innerText} ${yearText.innerText}`;
    let textAlign = ganttTimeline[i].previousElementSibling;
    let ganttSpan = ganttTimeline[i].closest('.milestonediv1').querySelector('.milestonediv11 span');
    let startMonName = +milestoneData[projInd].project[i].pstartdate.substr(5, 2);
    startMonName = month[startMonName - 1];
    let endMonName = month[+endMonthIndex - 1];
    let startDate = milestoneData[projInd].project[i].pstartdate.substr(8, 2);
    let per = milestoneData[projInd].project[i].percentage;
    switch (selectInput) {
        case 'Days': {
            switch (true) {
                case (daysCount <= 30): {
                    if (dateText === month1) {
                        let ganttWidth = (daysCount + 1) * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 30 && daysCount <= 58): {
                    if (dateText === month1) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 58 && daysCount <= 89): {
                    if (dateText === month1 || dateText === month2) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month3) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 89 && daysCount <= 119): {
                    if (dateText === month1 || dateText === month2 || dateText === month3) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month4) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 119 && daysCount <= 150): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month5) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 150 && daysCount <= 180): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month6) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 180 && daysCount <= 211): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month7) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 211 && daysCount <= 242): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month8) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 242 && daysCount <= 272): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month9) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 272 && daysCount <= 303): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month10) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 303 && daysCount <= 333): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9 ||
                        dateText === month10) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month11) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 333 && daysCount <= 365): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9 ||
                        dateText === month10 || dateText === month11) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month12) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
            let endMonthIndex = projectData[i].penddate.substr(5, 2);
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Mname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${quarterYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Qname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear p');
            let quarter1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1.includes('JAN')) {
                quarterText1 = `january ${yearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Yname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function showAlternateGantt2(daysCount, endTimeline, i, ganttTimeline, startTime, startMText, minusVal, mobileWidth, projInd, appearYear, projEndYear) {
    startTime = +startTime - 1;
    let totWidth = selectGantt.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    updateValue(startMText, minusVal);
    let endMonthIndex = milestoneData[projInd].project[i].penddate.substr(5, 2);
    let dateText = `${monthText.innerText} ${yearText.innerText}`;
    let textAlign = ganttTimeline[i].previousElementSibling;
    let ganttSpan = ganttTimeline[i].closest('.milestonediv1').querySelector('.milestonediv11 span');
    let startMonName = +milestoneData[projInd].project[i].pstartdate.substr(5, 2);
    startMonName = month[startMonName - 1];
    let endMonName = month[+endMonthIndex - 1];
    let startDate = milestoneData[projInd].project[i].pstartdate.substr(8, 2);
    let per = milestoneData[projInd].project[i].percentage;
    switch (selectInput) {
        case 'Days': {
            switch (true) {
                case (daysCount <= val1): {
                    if (dateText === month1) {
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = (daysCount + 1) * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val1 && daysCount <= val2): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val2 && daysCount <= val3): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month3) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val3 && daysCount <= val4): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month4) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val4 && daysCount <= val5): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month5) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val5 && daysCount <= val6): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month6) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val6 && daysCount <= val7): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month7) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val7 && daysCount <= val8): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month8) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val8 && daysCount <= val9): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month9) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val9 && daysCount <= val10): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month10) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val10 && daysCount <= val11): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9 || dateText === month10) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month11) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val11 && daysCount <= val12): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9 || dateText === month10 ||
                        dateText === month11) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${marLeft}vw`;
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month12) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    }
                    break;
                }
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            let monthText2 = `${Mname[1].innerText} ${monthYear}`.toLowerCase();
            let monthText3 = `${Mname[2].innerText} ${monthYear}`.toLowerCase();
            let monthText4 = `${Mname[3].innerText} ${monthYear}`.toLowerCase();
            let monthText5 = `${Mname[4].innerText} ${monthYear}`.toLowerCase();
            let monthText6 = `${Mname[5].innerText} ${monthYear}`.toLowerCase();
            let monthText7 = `${Mname[6].innerText} ${monthYear}`.toLowerCase();
            let monthText8 = `${Mname[7].innerText} ${monthYear}`.toLowerCase();
            let monthText9 = `${Mname[8].innerText} ${monthYear}`.toLowerCase();
            let monthText10 = `${Mname[9].innerText} ${monthYear}`.toLowerCase();
            let monthText11 = `${Mname[10].innerText} ${monthYear}`.toLowerCase();
            let monthText12 = `${Mname[11].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1 || monthText2 === month1 || monthText3 === month1 || monthText4 === month1 ||
                        monthText5 === month1 || monthText6 === month1 || monthText7 === month1 || monthText8 === month1 ||
                        monthText9 === month1 || monthText10 === month1 || monthText11 === month1 || monthText12 === month1) {
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        let mulNum = +milestoneData[projInd].project[i].pstartdate.substr(8, 2);
                        getMCoorrds(i, mulNum, projInd, ganttTimeline, projEndYear, Mname);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1, quarterText2, quarterText3, quarterText4, quarterText5, quarterText6,
                quarterText7, quarterText8, quarterText9, quarterText10, quarterText11, quarterText12;
            const qArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${quarterYear}`;
                quarterText2 = `february ${quarterYear}`;
                quarterText3 = `march ${quarterYear}`;
                quarterText4 = `april ${quarterYear}`;
                quarterText5 = `may ${quarterYear}`;
                quarterText6 = `june ${quarterYear}`;
                quarterText7 = `july ${quarterYear}`;
                quarterText8 = `august ${quarterYear}`;
                quarterText9 = `september ${quarterYear}`;
                quarterText10 = `october ${quarterYear}`;
                quarterText11 = `november ${quarterYear}`;
                quarterText12 = `december ${quarterYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1 || quarterText2 === month1 || quarterText3 === month1 || quarterText4 === month1 ||
                        quarterText5 === month1 || quarterText6 === month1 || quarterText7 === month1 || quarterText8 === month1 ||
                        quarterText9 === month1 || quarterText10 === month1 || quarterText11 === month1 || quarterText12 === month1) {
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        let mulNum = +milestoneData[projInd].project[i].pstartdate.substr(8, 2);
                        getMCoorrds(i, mulNum, projInd, ganttTimeline, projEndYear, qArrName);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear p');
            let year1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let yearText1, yearText2, yearText3, yearText4, yearText5, yearText6,
                yearText7, yearText8, yearText9, yearText10, yearText11, yearText12;
            let yArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (year1 === 'JAN-JUN') {
                yearText1 = `january ${yearlyYear}`;
                yearText2 = `february ${yearlyYear}`;
                yearText3 = `march ${yearlyYear}`;
                yearText4 = `april ${yearlyYear}`;
                yearText5 = `may ${yearlyYear}`;
                yearText6 = `june ${yearlyYear}`;
                yearText7 = `july ${yearlyYear}`;
                yearText8 = `august ${yearlyYear}`;
                yearText9 = `september ${yearlyYear}`;
                yearText10 = `october ${yearlyYear}`;
                yearText11 = `november ${yearlyYear}`;
                yearText12 = `december ${yearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (yearText1 === month1 || yearText2 === month1 || yearText3 === month1 || yearText4 === month1 ||
                        yearText5 === month1 || yearText6 === month1 || yearText7 === month1 || yearText8 === month1 ||
                        yearText9 === month1 || yearText10 === month1 || yearText11 === month1 || yearText12 === month1) {
                        ganttTimeline[i].closest('.Milestone').style.display = "block";
                        let mulNum = +milestoneData[projInd].project[i].pstartdate.substr(8, 2);
                        getMCoorrds(i, mulNum, projInd, ganttTimeline, projEndYear, yArrName);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.Milestone').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function showGantt3(daysCount, endTimeline, i, ganttTimeline, startTime, mobileWidth, projInd, mileInd, appearYear, projEndYear) {
    let totWidth = selectGantt.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = taskData[projInd].milestone[mileInd].task[i].penddate.substr(5, 2);
    let dateText = `${monthText.innerText} ${yearText.innerText}`;
    let textAlign = ganttTimeline[i].previousElementSibling;
    let ganttSpan = ganttTimeline[i].closest('.milestonediv2').querySelector('.milestonediv22 span');
    let startMonName = +taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(5, 2);
    startMonName = month[startMonName - 1];
    let endMonName = month[+endMonthIndex - 1];
    let startDate = taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(8, 2);
    let per = taskData[projInd].milestone[mileInd].task[i].percentage;
    switch (selectInput) {
        case 'Days': {
            switch (true) {
                case (daysCount <= 30): {
                    if (dateText === month1) {
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = (daysCount + 1) * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 30 && daysCount <= 58): {
                    if (dateText === month1) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 58 && daysCount <= 89): {
                    if (dateText === month1 || dateText === month2) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month3) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 89 && daysCount <= 119): {
                    if (dateText === month1 || dateText === month2 || dateText === month3) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month4) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 119 && daysCount <= 150): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month5) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 150 && daysCount <= 180): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month6) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 180 && daysCount <= 211): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month7) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 211 && daysCount <= 242): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month8) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 242 && daysCount <= 272): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month9) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 272 && daysCount <= 303): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month10) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 303 && daysCount <= 333): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9 ||
                        dateText === month10) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month11) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > 333 && daysCount <= 365): {
                    if (dateText === month1 || dateText === month2 || dateText === month3 ||
                        dateText === month4 || dateText === month5 || dateText === month6 ||
                        dateText === month7 || dateText === month8 || dateText === month9 ||
                        dateText === month10 || dateText === month11) {
                        let ganttWidth = totWidth * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile1(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month12) {
                        let ganttWidth = endTimeline * 2.517;
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    }
                    break;
                }
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Mname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.task').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${quarterYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Qname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.task').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear p');
            let quarter1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1;
            if (quarter1.includes('JAN')) {
                quarterText1 = `january ${yearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1) {
                        let ganttWidth = getCommonWidth(i, projEndYear, Yname, endMonthIndex, endTimeline);
                        alignCommonData(textAlign, ganttSpan, ganttWidth, startDate, startMonName,
                            endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].closest('.task').style.display = "block";
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function showAlternateGantt3(daysCount, endTimeline, i, ganttTimeline, startTime, startMText, minusVal, mobileWidth, projInd, mileInd, appearYear, projEndYear) {
    startTime = +startTime - 1;
    let totWidth = selectGantt.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    updateValue(startMText, minusVal);
    let endMonthIndex = taskData[projInd].milestone[mileInd].task[i].penddate.substr(5, 2);
    let dateText = `${monthText.innerText} ${yearText.innerText}`;
    let textAlign = ganttTimeline[i].previousElementSibling;
    let ganttSpan = ganttTimeline[i].closest('.milestonediv2').querySelector('.milestonediv22 span');
    let startMonName = +taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(5, 2);
    startMonName = month[startMonName - 1];
    let endMonName = month[+endMonthIndex - 1];
    let startDate = taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(8, 2);
    let per = taskData[projInd].milestone[mileInd].task[i].percentage;
    switch (selectInput) {
        case 'Days': {
            switch (true) {
                case (daysCount <= val1): {
                    if (dateText === month1) {
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = (daysCount + 1) * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val1 && daysCount <= val2): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val2 && daysCount <= val3): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month3) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val3 && daysCount <= val4): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month4) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val4 && daysCount <= val5): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth);
                        }
                    } else if (dateText === month5) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val5 && daysCount <= val6): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month6) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val6 && daysCount <= val7): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month7) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val7 && daysCount <= val8): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month8) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val8 && daysCount <= val9): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month9) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val9 && daysCount <= val10): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month10) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val10 && daysCount <= val11): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9 || dateText === month10) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month11) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
                case (daysCount > val11 && daysCount <= val12): {
                    if (dateText === month1) {
                        let localdaysCount = totWidth - startTime;
                        let marLeft = (startTime * 2.517) + 10.125;
                        let ganttWidth = localdaysCount * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:${marLeft}vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile2(i, startTime, localdaysCount, ganttTimeline);
                        }
                    } else if (dateText === month2 || dateText === month3 || dateText === month4 ||
                        dateText === month5 || dateText === month6 || dateText === month7 ||
                        dateText === month8 || dateText === month9 || dateText === month10 ||
                        dateText === month11) {
                        let marLeft = 10.125;
                        let ganttWidth = totWidth * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${ganttWidth}vw`;
                        ganttTimeline[i].closest('.task').style.display = "block";
                        if (mobileWidth < 700) {
                            showinMobile4(i, totWidth, ganttTimeline);
                        }
                    } else if (dateText === month12) {
                        let marLeft = 10.125;
                        let ganttWidth = endTimeline * 2.517;
                        alignAlterData(marLeft, ganttWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear);
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            let monthText2 = `${Mname[1].innerText} ${monthYear}`.toLowerCase();
            let monthText3 = `${Mname[2].innerText} ${monthYear}`.toLowerCase();
            let monthText4 = `${Mname[3].innerText} ${monthYear}`.toLowerCase();
            let monthText5 = `${Mname[4].innerText} ${monthYear}`.toLowerCase();
            let monthText6 = `${Mname[5].innerText} ${monthYear}`.toLowerCase();
            let monthText7 = `${Mname[6].innerText} ${monthYear}`.toLowerCase();
            let monthText8 = `${Mname[7].innerText} ${monthYear}`.toLowerCase();
            let monthText9 = `${Mname[8].innerText} ${monthYear}`.toLowerCase();
            let monthText10 = `${Mname[9].innerText} ${monthYear}`.toLowerCase();
            let monthText11 = `${Mname[10].innerText} ${monthYear}`.toLowerCase();
            let monthText12 = `${Mname[11].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase();
            switch (true) {
                case (daysCount <= 365): {
                    if (monthText1 === month1 || monthText2 === month1 || monthText3 === month1 || monthText4 === month1 ||
                        monthText5 === month1 || monthText6 === month1 || monthText7 === month1 || monthText8 === month1 ||
                        monthText9 === month1 || monthText10 === month1 || monthText11 === month1 || monthText12 === month1) {
                        ganttTimeline[i].closest('.task').style.display = "block";
                        let mulNum = taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(8, 2);
                        getTCoorrds(i, mulNum, projInd, mileInd, ganttTimeline, projEndYear, Mname);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter p');
            let quarter1 = `${Qname[0].innerText}`;
            month1 = month1.toLowerCase();
            let quarterText1, quarterText2, quarterText3, quarterText4, quarterText5, quarterText6,
                quarterText7, quarterText8, quarterText9, quarterText10, quarterText11, quarterText12;
            const qArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (quarter1 === 'Q1') {
                quarterText1 = `january ${quarterYear}`;
                quarterText2 = `february ${quarterYear}`;
                quarterText3 = `march ${quarterYear}`;
                quarterText4 = `april ${quarterYear}`;
                quarterText5 = `may ${quarterYear}`;
                quarterText6 = `june ${quarterYear}`;
                quarterText7 = `july ${quarterYear}`;
                quarterText8 = `august ${quarterYear}`;
                quarterText9 = `september ${quarterYear}`;
                quarterText10 = `october ${quarterYear}`;
                quarterText11 = `november ${quarterYear}`;
                quarterText12 = `december ${quarterYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (quarterText1 === month1 || quarterText2 === month1 || quarterText3 === month1 || quarterText4 === month1 ||
                        quarterText5 === month1 || quarterText6 === month1 || quarterText7 === month1 || quarterText8 === month1 ||
                        quarterText9 === month1 || quarterText10 === month1 || quarterText11 === month1 || quarterText12 === month1) {
                        ganttTimeline[i].closest('.task').style.display = "block";
                        let mulNum = taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(8, 2);
                        getTCoorrds(i, mulNum, projInd, mileInd, ganttTimeline, projEndYear, qArrName);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
        case 'Year': {
            let Yname = selectGantt.querySelectorAll('.tablegantt tr th.VYear p');
            let year1 = `${Yname[0].innerText}`;
            month1 = month1.toLowerCase();
            let yearText1, yearText2, yearText3, yearText4, yearText5, yearText6,
                yearText7, yearText8, yearText9, yearText10, yearText11, yearText12;
            let yArrName = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            if (year1 === 'JAN-JUN') {
                yearText1 = `january ${yearlyYear}`;
                yearText2 = `february ${yearlyYear}`;
                yearText3 = `march ${yearlyYear}`;
                yearText4 = `april ${yearlyYear}`;
                yearText5 = `may ${yearlyYear}`;
                yearText6 = `june ${yearlyYear}`;
                yearText7 = `july ${yearlyYear}`;
                yearText8 = `august ${yearlyYear}`;
                yearText9 = `september ${yearlyYear}`;
                yearText10 = `october ${yearlyYear}`;
                yearText11 = `november ${yearlyYear}`;
                yearText12 = `december ${yearlyYear}`;
            }
            switch (true) {
                case (daysCount <= 365): {
                    if (yearText1 === month1 || yearText2 === month1 || yearText3 === month1 || yearText4 === month1 ||
                        yearText5 === month1 || yearText6 === month1 || yearText7 === month1 || yearText8 === month1 ||
                        yearText9 === month1 || yearText10 === month1 || yearText11 === month1 || yearText12 === month1) {
                        ganttTimeline[i].closest('.task').style.display = "block";
                        let mulNum = taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(8, 2);
                        getTCoorrds(i, mulNum, projInd, mileInd, ganttTimeline, projEndYear, yArrName);
                        alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startDate,
                            startMonName, endTimeline, endMonName, daysCount, per);
                        if (mobileWidth < 700) {
                            showinMobile1(i, daysCount, ganttTimeline);
                        }
                    } else {
                        ganttTimeline[i].closest('.task').style.display = "none";
                    }
                    break;
                }
            }
            break;
        }
    }
}

function getNumericMonth(startDate) {
    return (String(['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ].indexOf(startDate)).padStart(2, '0'))
}

function getMonthAppear() {
    let monthAppear = yearText.innerText;
    return monthAppear;
}

function getTimeline(endTimeline, year2, endDate) {
    {
        if (year2 < endDate) {
            return endTimeline = 31;
        } else {
            return endTimeline;
        }
    }
}

function checkPrevYear(appearYear, projEndYear, projStartYear, i, ganttTimeline) {
    let booleanYear = true;
    if (appearYear > projEndYear || appearYear < projStartYear) {
        ganttTimeline[i].closest('.first1').style.display = "none";
        booleanYear = false;
    }
    return booleanYear;
}

function checkMilePrevYear(appearYear, projEndYear, projStartYear, i, ganttTimeline) {
    let booleanYear = true;
    if (appearYear > projEndYear || appearYear < projStartYear) {
        ganttTimeline[i].closest('.Milestone').style.display = "none";
        booleanYear = false;
    }
    return booleanYear;
}

function checkTaskPrevYear(appearYear, projEndYear, projStartYear, i, ganttTimeline) {
    let booleanYear = true;
    if (appearYear > projEndYear || appearYear < projStartYear) {
        ganttTimeline[i].closest('.task').style.display = "none";
        booleanYear = false;
    }
    return booleanYear;
}

function checkTargetDate2(date2, i, daysCount, year2, year1) {
    if (year2 > year1) {
        let currentDate = new Date(`${year2}/01/01`);
        let a = Math.floor(date2.getTime() / (3600 * 24 * 1000));
        let b = Math.floor(currentDate.getTime() / (3600 * 24 * 1000));
        daysCount = a - b;
        if (daysCount > 365) {
            return daysCount = 365;
        } else {
            return daysCount;
        }
    } else {
        return daysCount;
    }
}

function checkTargetDate(date1, date2, daysCount, year2) {
    date2 = new Date(date2);
    let TargetDate = new Date(`${year2}/12/31`);
    if (date2.getTime() > TargetDate.getTime()) {
        var d1 = Math.floor(TargetDate.getTime() / (3600 * 24 * 1000));
        var d2 = Math.floor(date1.getTime() / (3600 * 24 * 1000));
        return daysCount = d1 - d2;
    } else {
        return daysCount;
    }
}

function getMonthName(monthIndex, year2, year1) {
    let year = year2;
    if (year2 > year1) {
        monthIndex = 0;
        let monthName1 = month[monthIndex];
        month1 = `${monthName1} ${year}`;

        monthIndex++;
        let monthName2 = month[monthIndex];
        month2 = `${monthName2} ${year}`;

        monthIndex++;
        let monthName3 = month[monthIndex];
        month3 = `${monthName3} ${year}`;

        monthIndex++;
        let monthName4 = month[monthIndex];
        month4 = `${monthName4} ${year}`;

        monthIndex++;
        let monthName5 = month[monthIndex];
        month5 = `${monthName5} ${year}`;

        monthIndex++;
        let monthName6 = month[monthIndex];
        month6 = `${monthName6} ${year}`;

        monthIndex++;
        let monthName7 = month[monthIndex];
        month7 = `${monthName7} ${year}`;

        monthIndex++;
        let monthName8 = month[monthIndex];
        month8 = `${monthName8} ${year}`;

        monthIndex++;
        let monthName9 = month[monthIndex];
        month9 = `${monthName9} ${year}`;

        monthIndex++;
        let monthName10 = month[monthIndex];
        month10 = `${monthName10} ${year}`;

        monthIndex++;
        let monthName11 = month[monthIndex];
        month11 = `${monthName11} ${year}`;

        monthIndex++;
        let monthName12 = month[monthIndex];
        month12 = `${monthName12} ${year}`;
    } else {
        monthIndex = checkMonthIndex(monthIndex);
        let monthName1 = month[monthIndex];
        month1 = `${monthName1} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName2 = month[monthIndex];
        month2 = `${monthName2} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName3 = month[monthIndex];
        month3 = `${monthName3} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName4 = month[monthIndex];
        month4 = `${monthName4} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName5 = month[monthIndex];
        month5 = `${monthName5} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName6 = month[monthIndex];
        month6 = `${monthName6} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName7 = month[monthIndex];
        month7 = `${monthName7} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName8 = month[monthIndex];
        month8 = `${monthName8} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName9 = month[monthIndex];
        month9 = `${monthName9} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName10 = month[monthIndex];
        month10 = `${monthName10} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName11 = month[monthIndex];
        month11 = `${monthName11} ${year}`;

        monthIndex++;
        year = updateYear(monthIndex, year);
        monthIndex = checkMonthIndex(monthIndex);
        let monthName12 = month[monthIndex];
        month12 = `${monthName12} ${year}`;
    }
}

function updateYear(monthIndex, year) {
    if (monthIndex > 11) {
        let newyear = +year;
        year = newyear + 1;
        return year;
    } else {
        return year;
    }
}

function checkMonthIndex(monthIndex) {
    if (monthIndex > 11) {
        return monthIndex = 0;
    } else {
        return +monthIndex;
    }
}

function updateValue(text, minusVal) {
    switch (true) {
        case (text.includes('Jan')): {
            val1 = 31 - minusVal;
            val2 = val1 + 28;
            val3 = val2 + 31;
            val4 = val3 + 30;
            val5 = val4 + 31;
            val6 = val5 + 30;
            val7 = val6 + 31;
            val8 = val7 + 31;
            val9 = val8 + 30;
            val10 = val9 + 31;
            val11 = val10 + 30;
            val12 = 365;
            break;
        }
        case (text.includes('Feb')): {
            val1 = 28 - minusVal;
            val2 = val1 + 31;
            val3 = val2 + 30;
            val4 = val3 + 31;
            val5 = val4 + 30;
            val6 = val5 + 31;
            val7 = val6 + 31;
            val8 = val7 + 30;
            val9 = val8 + 31;
            val10 = val9 + 30;
            val11 = val10 + 31;
            break;
        }
        case (text.includes('Mar')): {
            val1 = 31 - minusVal;
            val2 = val1 + 30;
            val3 = val2 + 31;
            val4 = val3 + 30;
            val5 = val4 + 31;
            val6 = val5 + 31;
            val7 = val6 + 30;
            val8 = val7 + 31;
            val9 = val8 + 30;
            val10 = val9 + 31;
            break;
        }
        case (text.includes('Apr')): {
            val1 = 30 - minusVal;
            val2 = val1 + 31;
            val3 = val2 + 30;
            val4 = val3 + 31;
            val5 = val4 + 31;
            val6 = val5 + 30;
            val7 = val6 + 31;
            val8 = val7 + 30;
            val9 = val8 + 31;
            break;
        }
        case (text.includes('May')): {
            val1 = 31 - minusVal;
            val2 = val1 + 30;
            val3 = val2 + 31;
            val4 = val3 + 31;
            val5 = val4 + 30;
            val6 = val5 + 31;
            val7 = val6 + 30;
            val8 = val7 + 31;
            break;
        }
        case (text.includes('Jun')): {
            val1 = 30 - minusVal;
            val2 = val1 + 31;
            val3 = val2 + 31;
            val4 = val3 + 30;
            val5 = val4 + 31;
            val6 = val5 + 30;
            val7 = val6 + 31;
            break;
        }
        case (text.includes('Jul')): {
            val1 = 31 - minusVal;
            val2 = val1 + 31;
            val3 = val2 + 30;
            val4 = val3 + 31;
            val5 = val4 + 30;
            val6 = val5 + 31;
            break;
        }
        case (text.includes('Aug')): {
            val1 = 31 - minusVal;
            val2 = val1 + 30;
            val3 = val2 + 31;
            val4 = val3 + 30;
            val5 = val4 + 31;
            break;
        }
        case (text.includes('Sep')): {
            val1 = 30 - minusVal;
            val2 = val1 + 31;
            val3 = val2 + 30;
            val4 = val3 + 31;
            break;
        }
        case (text.includes('Oct')): {
            val1 = 31 - minusVal;
            val2 = val1 + 30;
            val3 = val2 + 31;
            break;
        }
        case (text.includes('Nov')): {
            val1 = 30 - minusVal;
            val2 = val1 + 31;
            break;
        }
        case (text.includes('Dec')): {
            val1 = 31 - minusVal;
            break;
        }
    }
}

function getCommonWidth(i, projEndYear, VDname, endMonthIndex, endTimeline) {
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    endMonthName = `${endMonthName} ${projEndYear}`
    let endNum = endTimeline;
    switch (selectInput) {
        case 'Month':
        case 'Quarter':
        case 'Year': {
            switch (true) {
                case (VDname[0].innerText === "JANUARY"):
                case (VDname[0].innerText === 'Q1'):
                case (VDname[0].innerText === 'JAN-JUN'): {
                    if (endMonthName === `JANUARY ${yearText.innerText}`) {
                        return endNum * (6.575 / 31);
                    } else if (endMonthName === `FEBRUARY ${yearText.innerText}`) {
                        return 6.575 + (endNum * (6.575 / 28));
                    } else if (endMonthName === `MARCH ${yearText.innerText}`) {
                        return 13.15 + (endNum * (6.575 / 31));
                    } else if (endMonthName === `APRIL ${yearText.innerText}`) {
                        return 19.725 + (endNum * (6.575 / 30));
                    } else if (endMonthName === `MAY ${yearText.innerText}`) {
                        return 26.3 + (endNum * (6.575 / 31));
                    } else if (endMonthName === `JUNE ${yearText.innerText}`) {
                        return 32.875 + (endNum * (6.575 / 30));
                    } else if (endMonthName === `JULY ${yearText.innerText}`) {
                        return 39.45 + (endNum * (6.575 / 31));
                    } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                        return 46.025 + (endNum * (6.575 / 31));
                    } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                        return 52.6 + (endNum * (6.575 / 30));
                    } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                        return 59.175 + (endNum * (6.575 / 31));
                    } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                        return 65.575 + (endNum * (6.575 / 30));
                    } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                        return 72.325 + (endNum * (6.575 / 31));
                    } else {
                        return 78.9;
                    }
                }
                default: {
                    break;
                }
            }
            break;
        }
    }
}

function alignCommonData(textAlign, ganttSpan, ganttWidth, startTime, startMonName,
    endTimeline, endMonName, daysCount, per) {
    if (ganttWidth < 16.5 && ganttWidth > 3) {
        textAlign.style.cssText = `margin-left: ${(ganttWidth +11.125)}vw; display: block;`;
        textAlign.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount + 1} Days</span></p>`;
        ganttSpan.innerHTML = `<p>${per}</p>`;
    } else if (ganttWidth < 3) {
        textAlign.style.cssText = `margin-left: ${(ganttWidth +11.125)}vw; display: block;`;
        textAlign.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount + 1} Days</span>
        <span class="mr-1 ml-1">|</span></p> ${per}`;
        ganttSpan.innerHTML = ``;
    } 
    else if(ganttWidth > 16.5) 
    {
        textAlign.style.cssText = `display: none;`;
        ganttSpan.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount + 1} Days</span>
        <span class="mr-1 ml-1">|</span> ${per}</p>`;
    }
}

function getPCoorrds(i, startTime, ganttTimeline, projEndYear, VDname) {
    let startMonthIndex = projectData[i].pstartdate.substr(5, 2);
    let endMonthIndex = projectData[i].penddate.substr(5, 2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endMonthYear = `${endMonthName} ${projEndYear}`;
    let endNum = +projectData[i].penddate.substr(8, 2);
    let minusNum = +projectData[i].pstartdate.substr(8, 2);
    let factor1 = getFactor1(endMonthName);
    getCommonCoords(VDname, startMonthName, endMonthYear, endNum, minusNum, startTime, i, factor1, ganttTimeline);
}

function getMCoorrds(i, startTime, projInd, ganttTimeline, projEndYear, VDname) {
    let startMonthIndex = milestoneData[projInd].project[i].pstartdate.substr(5, 2);
    let endMonthIndex = milestoneData[projInd].project[i].penddate.substr(5, 2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endMonthYear = `${endMonthName} ${projEndYear}`;
    let endNum = +milestoneData[projInd].project[i].penddate.substr(8, 2);
    let minusNum = +milestoneData[projInd].project[i].pstartdate.substr(8, 2);
    let factor1 = getFactor1(endMonthName);
    getCommonCoords(VDname, startMonthName, endMonthYear, endNum, minusNum, startTime, i, factor1, ganttTimeline);
}

function getTCoorrds(i, startTime, projInd, mileInd, ganttTimeline, projEndYear, VDname) {
    let startMonthIndex = taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(5, 2);
    let endMonthIndex = taskData[projInd].milestone[mileInd].task[i].penddate.substr(5, 2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endMonthYear = `${endMonthName} ${projEndYear}`;
    let endNum = +taskData[projInd].milestone[mileInd].task[i].penddate.substr(8, 2);
    let minusNum = +taskData[projInd].milestone[mileInd].task[i].pstartdate.substr(8, 2);
    let factor1 = getFactor1(endMonthName);
    getCommonCoords(VDname, startMonthName, endMonthYear, endNum, minusNum, startTime, i, factor1, ganttTimeline);
}

function getFactor1(endMonthName) {
    if (selectInput === 'Month' || selectInput === 'Quarter' || selectInput === 'Year') {
        if (endMonthName === 'JANUARY') {
            return 6.575 / 31;
        } else if (endMonthName === 'FEBRUARY') {
            return 6.575 / 28;
        } else if (endMonthName === 'MARCH') {
            return 6.575 / 31;
        } else if (endMonthName === 'APRIL') {
            return 6.575 / 30;
        } else if (endMonthName === 'MAY') {
            return 6.575 / 31;
        } else if (endMonthName === 'JUNE') {
            return 6.575 / 30;
        } else if (endMonthName === 'JULY') {
            return 6.575 / 31;
        } else if (endMonthName === 'AUGUST') {
            return 6.575 / 31;
        } else if (endMonthName === 'SEPTEMBER') {
            return 6.575 / 30;
        } else if (endMonthName === 'OCTOBER') {
            return 6.575 / 31;
        } else if (endMonthName === 'NOVEMBER') {
            return 6.575 / 30;
        } else if (endMonthName === 'DECEMBER') {
            return 6.575 / 31;
        }
    }
}

function getCommonCoords(VDname, startMonthName, endMonthName, endNum, minusNum, startTime, i, factor1, ganttTimeline) {
    switch (selectInput) {
        case 'Month':
        case 'Quarter':
        case 'Year': {
            if ((VDname[0] === 'Q1' && startMonthName === 'JANUARY') || VDname[0].innerText === startMonthName) {
                if (endMonthName === `JANUARY ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `FEBRUARY ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `MARCH ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `APRIL ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `MAY ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JUNE ${yearText.innerText}`) {
                    let fval = 32.878;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 39.45;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 46.025;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 52.6;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 59.175;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 65.575;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 72.325;
                    let fval2 = 0;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 72.325;
                    let fval2 = 0;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'FEBRUARY') || VDname[1].innerText === startMonthName) {
                if (endMonthName === `FEBRUARY ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `MARCH ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `APRIL ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `MAY ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JUNE ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 32.878;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 39.45;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 46.025;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 52.6;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 59.175;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 65.75;
                    let fval2 = 6.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 65.75;
                    let fval2 = 6.575;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'MARCH') || VDname[2].innerText === startMonthName) {
                if (endMonthName === `MARCH ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `APRIL ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `MAY ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JUNE ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 32.875;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 39.45;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 46.025;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 52.6;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 59.175;
                    let fval2 = 13.15;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 59.175;
                    let fval2 = 13.15;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'APRIL') || VDname[3].innerText === startMonthName) {
                if (endMonthName === `APRIL ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `MAY ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JUNE ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 32.878;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 39.45;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 46.025;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 52.6;
                    let fval2 = 19.725;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 52.6;
                    let fval2 = 19.725;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'MAY') || VDname[4].innerText === startMonthName) {
                if (endMonthName === `MAY ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JUNE ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 32.878;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 39.45;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 46.025;
                    let fval2 = 26.3;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 46.025;
                    let fval2 = 26.3;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'JUNE') || VDname[5].innerText === startMonthName) {
                if (endMonthName === `JUNE ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 32.878;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 39.45;
                    let fval2 = 32.878;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 39.45;
                    let fval2 = 32.878;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'JULY') || VDname[6].innerText === startMonthName) {
                if (endMonthName === `JULY ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 39.45;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 39.45;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 39.45;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 39.45;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 39.45;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 32.878;
                    let fval2 = 39.45;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 32.878;
                    let fval2 = 39.45;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'AUGUST') || VDname[7].innerText === startMonthName) {
                if (endMonthName === `AUGUST ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 46.025;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 46.025;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 46.025;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 46.025;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 26.3;
                    let fval2 = 46.025;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 26.3;
                    let fval2 = 46.025;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'SEPTEMBER') || VDname[8].innerText === startMonthName) {
                if (endMonthName === `SEPTEMBER ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 52.6;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 52.6;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 52.6;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 19.725;
                    let fval2 = 52.6;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 19.725;
                    let fval2 = 52.6;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'OCTOBER') || VDname[9].innerText === startMonthName) {
                if (endMonthName === `OCTOBER ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 59.175;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 59.175;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 13.15;
                    let fval2 = 59.175;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 13.15;
                    let fval2 = 59.175;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'NOVEMBER') || VDname[10].innerText === startMonthName) {
                if (endMonthName === `NOVEMBER ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 65.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 6.575;
                    let fval2 = 65.575;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 6.575;
                    let fval2 = 65.575;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            } else if ((VDname[0] === 'Q1' && startMonthName === 'DECEMBER') || VDname[11].innerText === startMonthName) {
                if (endMonthName === `DECEMBER ${yearText.innerText}`) {
                    let fval = 0;
                    let fval2 = 72.325;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                } else {
                    let fval = 0;
                    let fval2 = 72.325;
                    endNum = 31;
                    setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);
                }
                break;
            }
            break;
        }
    }
}

function setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline) {
    UniMarLeft = (minusNum * factor1) + (10.125 + fval2);
    UniRemWidth = `${Math.abs((fval - (minusNum * factor1)) + (endNum * factor1))}`;
    UniRemWidth = +UniRemWidth;
    ganttTimeline[i].style.cssText = `margin-left:${UniMarLeft}vw; width:${(UniRemWidth).toFixed(5)}vw`;
}

function alignAlterData(UniMarLeft, UniRemWidth, textAlign, ganttSpan, startTime,
    startMonName, endTimeline, endMonName, daysCount, per) {
    if (UniMarLeft < 69.3 && (UniRemWidth < 16.5 && UniRemWidth > 3)) {
        textAlign.style.cssText = `margin-left: ${(UniMarLeft) + (UniRemWidth +1)}vw; display: block;`;
        textAlign.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount +1} Days</span></p>`;
        ganttSpan.innerHTML = `<p>${per}</p>`;
    } else if (UniMarLeft < 69.3 && UniRemWidth < 3) {
        textAlign.style.cssText = `margin-left: ${(UniMarLeft) + (UniRemWidth +1)}vw; display: block;`;
        textAlign.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount +1} Days</span>
        <span class="mr-1 ml-1">|</span> ${per}</p>`;
        ganttSpan.innerHTML = ``;
    } else if (UniMarLeft > 69.3 && (UniRemWidth < 16.5 && UniRemWidth > 3)) {
        textAlign.style.cssText = `margin-left: ${UniMarLeft - 11.125}vw; display: block;`;
        textAlign.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount +1} Days</span></p>`;
        ganttSpan.innerHTML = `${per}`;
    } else if (UniMarLeft > 69.3 && UniRemWidth < 3) {
        textAlign.style.cssText = `margin-left: ${UniMarLeft - 14.8}vw; display: block;`;
        textAlign.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount +1} Days</span>
        <span class="mr-1 ml-1">|</span> ${per}</p>`;
        ganttSpan.innerHTML = ``;
    } else if (UniRemWidth > 16.5) {
        textAlign.style.cssText = `display: none;`;
        ganttSpan.innerHTML = `<p>${startMonName} ${startTime} - ${endMonName} ${endTimeline} <span class="ml-1">${daysCount +1} Days</span>
        <span class="mr-1 ml-1">|</span> ${per}</p>`;
    }
}

function remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex, appearYear, projEndYear) {
    switch (selectInput) {
        case 'Days': {
            ganttTimeline[i].closest('.first1').style.display = "block";
            ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${endTimeline * 2.517}vw`;
            if (mobileWidth < 700) {
                showinMobile3(i, endTimeline, ganttTimeline);
            }
            break;
        }
        case 'Month': {
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let endMonthName = month[+endMonthIndex - 1].toUpperCase();
            endMonthName = `${endMonthName} ${appearYear}`;
            let Mname1 = `${Mname[0].innerText} ${projEndYear}`;
            let Mname2 = `${Mname[1].innerText} ${projEndYear}`;
            let Mname3 = `${Mname[2].innerText} ${projEndYear}`;
            let Mname4 = `${Mname[3].innerText} ${projEndYear}`;
            switch (true) {
                case (Mname1 === endMonthName): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * 0.636290323))
                        .toFixed(5)}vw`;
                    break;
                }
                case (Mname2 === endMonthName): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * 0.636290323)+19.725)
                        .toFixed(5)}vw`;
                    break;
                }
                case (Mname3 === endMonthName): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * 0.636290323)+39.45)
                        .toFixed(5)}vw`;
                    break;
                }
                case (Mname4 === endMonthName): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * 0.636290323)
                        + 59.175).toFixed(5)}vw`;
                    break;
                }
                default: {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:78.9vw`;
                    break;
                }
            }
            break;
        }
        case 'Quarter': {
            let endMonthName = month[+endMonthIndex - 1].toUpperCase();
            endMonthName = `${endMonthName} ${appearYear}`;
            switch (true) {
                case (endMonthName === `JULY ${projEndYear}`): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * (13.15/31)))
                        .toFixed(5)}vw`;
                    break;
                }
                case (endMonthName === `AUGUST ${projEndYear}`): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * (13.15/31))+13.15)
                        .toFixed(5)}vw`;
                    break;
                }
                case (endMonthName === `SEPTEMBER ${projEndYear}`): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * (13.15/30))+26.3)
                        .toFixed(5)}vw`;
                    break;
                }
                case (endMonthName === `OCTOBER ${projEndYear}`): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * (13.15/31))
                        + 39.45).toFixed(5)}vw`;
                    break;
                }
                case (endMonthName === `NOVEMBER ${projEndYear}`): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * (13.15/30))
                        + 52.6).toFixed(5)}vw`;
                    break;
                }
                case (endMonthName === `DECEMBER ${projEndYear}`): {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:${((endTimeline * (13.15/31))
                        + 65.75).toFixed(5)}vw`;
                    break;
                }
                default: {
                    ganttTimeline[i].style.cssText = `margin-left:10.125vw; width:78.9vw`;
                    break;
                }
            }
            break;
        }
    }
}

function showinMobile1(i, multiplyTerm, ganttTimeline) {
    ganttTimeline[i].style.cssText = `margin-left:19.69vw; width:${multiplyTerm *8}vw`;
}

function showinMobile2(i, startTime, multiplyTerm, ganttTimeline) {
    ganttTimeline[i].style.cssText = `margin-left:${(startTime*8)+19.69}vw; width:${multiplyTerm *8}vw`;
}

function showinMobile3(i, endTimeline, ganttTimeline) {
    ganttTimeline[i].style.cssText = `margin-left:19.69vw; width:${endTimeline * 8}vw`;
}

function showinMobile4(i, multiplyTerm, ganttTimeline) {
    ganttTimeline[i].style.cssText = `margin-left:19.69vw; width:${multiplyTerm *8}vw`;
}

function givebackground(i, daysCount, ganttTimeline) {
    ganttTimeline[i].style.backgroundColor = `${projectData[i].statusclass}`;
    if (daysCount > 365) {
        ganttTimeline[i].innerHTML = `<p>${projectData[i].planned} <span class="ml-1">${daysCount +1}</span>
        <span class="mr-1 ml-1">|</span> ${projectData[i].percentage}</p>`;
    }
}

function giveMilestonebG(i, j, daysCount, ganttTimeline) {
    ganttTimeline[i].style.backgroundColor = `${milestoneData[j].project[i].statusclass}`;
    if (daysCount > 365) {
        ganttTimeline[i].innerHTML = `<p>${milestoneData[j].project[i].planned} <span class="ml-1">${daysCount +1}</span>
        <span class="mr-1 ml-1">|</span> ${milestoneData[j].project[i].percentage}</p>`;
    }
}

// showing project name on hover
function makingTooltip() {
    hoverProject2.forEach((hover) => {
        let p = hover.innerHTML;
        getHoverProjName(p, hover);
    })
}
function makingTooltip() {
    hoverProject3.forEach((hover) => {
        let p = hover.innerHTML;
        getHoverProjName(p, hover);
    })
}
function makingTooltip3() {
    hoverProject4.forEach((hover) => {
        let p = hover.innerHTML;
        getHoverProjName(p, hover);
    })
}

function getHoverProjName(p, hover) {
    if (p.length > 17) {
        hover.setAttribute('data-bs-toggle', 'tooltip');
        hover.setAttribute('data-bs-placement', 'bottom');
        hover.setAttribute('title', `${p}`);
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }
}

for (let i = 0; i < ganttTimeline.length; i++) {
    ['mouseover', 'mouseout'].forEach((e) => {
        ganttTimeline[i].index = i;
        ganttTimeline[i].addEventListener(e, showTimelineTip);
    })
}

function showTimelineTip(e) {
    if (e.type === "mouseover") {
        let projdataInd = this.index;
        let tip = e.target.closest('.gantt').querySelector('.timelinetooltip');
        let top = e.clientY;
        let left = e.clientX;
        tip.style.cssText = `top:${top}px; left:${left}px; display:block;`;
        let h4 = tip.querySelector('h4');
        let p1 = tip.querySelector('p:nth-child(2)');
        let p2 = tip.querySelector('p:nth-child(3)');
        let p3 = tip.querySelector('p:nth-child(4)');
        let p4 = tip.querySelector('p:nth-child(5)');
        let p5 = tip.querySelector('p:nth-child(6)');
        let p6 = tip.querySelector('p:nth-child(7)');
        let startDate = projectData[projdataInd].pstartdate.substr(8, 2);
        let startMonName = projectData[projdataInd].planned.substr(0, 3);
        let startYear = projectData[projdataInd].pstartdate.substr(0, 4);
        let endDate = projectData[projdataInd].penddate.substr(8, 2);
        let endMonName = projectData[projdataInd].planned.substr(9, 3);
        let endYear = projectData[projdataInd].penddate.substr(0, 4);
        h4.innerText = `Wireframe: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
        p1.innerText = `Duration: ${projectData[projdataInd].duration}`;
        p2.innerText = `Percentage Done: ${projectData[projdataInd].percentage}`;
        p3.innerText = `Status: ${projectData[projdataInd].statustext}`;
        p4.innerText = `Program Manager: ${projectData[projdataInd].programmanager}`;
        p5.innerText = `Domain Lead: ${projectData[projdataInd].domainlead}`;
        p6.innerText = `Technical Lead: ${projectData[projdataInd].technicallead}`;
    } else if (e.type === "mouseout") {
        let tip = e.target.closest('.gantt').querySelector('.timelinetooltip');
        tip.style.display = "none";
    }
}

//appearing milestone tooltip
milesPDiv.forEach((parent, ind) => {
    parent.addEventListener('click', (e) => {
        let mileAppear = e.target.closest('.first1').querySelectorAll('.card .milestonediv11');
        for (let i = 0; i < mileAppear.length; i++) {
            ['mouseover', 'mouseout', 'click'].forEach((e) => {
                mileAppear[i].index = i;
                mileAppear[i].addEventListener(e, showMilestoneTip);
            })
        }

        function showMilestoneTip(e) {
            if (e.type === "mouseover") {
                miledataInd = this.index;
                let tip = e.target.closest('.gantt').querySelector('.milestonetooltip');
                let top = e.clientY;
                let left = e.clientX;
                tip.style.cssText = `top:${top}px; left:${left}px; display:block;`;
                let h4 = tip.querySelector('h4');
                let p1 = tip.querySelector('p:nth-child(2)');
                let p2 = tip.querySelector('p:nth-child(3)');
                let p3 = tip.querySelector('p:nth-child(4)');
                let p4 = tip.querySelector('p:nth-child(5)');
                let p5 = tip.querySelector('p:nth-child(6)');
                let startDate = milestoneData[ind].project[miledataInd].pstartdate.substr(8, 2);
                let startMonName = milestoneData[ind].project[miledataInd].planned.substr(0, 3);
                let startYear = milestoneData[ind].project[miledataInd].pstartdate.substr(0, 4);
                let endDate = milestoneData[ind].project[miledataInd].penddate.substr(8, 2);
                let endMonName = milestoneData[ind].project[miledataInd].planned.substr(9, 3);
                let endYear = milestoneData[ind].project[miledataInd].penddate.substr(0, 4);
                h4.innerText = `Wireframe: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
                p1.innerText = `Duration: ${milestoneData[ind].project[miledataInd].duration}`;
                p2.innerText = `Percentage Done: ${milestoneData[ind].project[miledataInd].percentage}`;
                p3.innerText = `Status: ${milestoneData[ind].project[miledataInd].statustext}`;
                p4.innerText = `Total Tasks: ${milestoneData[ind].project[miledataInd].tasks_count}`;
                p5.innerText = `Tasks Completed: ${milestoneData[ind].project[miledataInd].tasks_done}`;
            } else if (e.type === "mouseout") {
                let tip = e.target.closest('.gantt').querySelector('.milestonetooltip');
                tip.style.display = "none";
            } else if (e.type === "click") {
                let tip = e.target.closest('.Milestone').querySelectorAll('.task .milestonediv22');
                for (let j = 0; j < tip.length; j++) {
                    ['mouseover', 'mouseout'].forEach((e) => {
                        tip[j].tipind = j;
                        tip[j].addEventListener(e, taskTooltip);
                    })
                }

                function taskTooltip(e) {
                    if (e.type === 'mouseover') {
                        let taskDataInd = this.tipind;
                        let tip = e.target.closest('.gantt').querySelector('.tasktooltip');
                        let top = e.clientY;
                        let left = e.clientX;
                        tip.style.cssText = `top:${top}px; left:${left}px; display:block;`;
                        let h4 = tip.querySelector('h4');
                        let p1 = tip.querySelector('p:nth-child(2)');
                        let p2 = tip.querySelector('p:nth-child(3)');
                        let p3 = tip.querySelector('p:nth-child(4)');
                        let startDate = taskData[ind].milestone[miledataInd].task[taskDataInd].pstartdate.substr(8, 2);
                        let startMonName = taskData[ind].milestone[miledataInd].task[taskDataInd].planned.substr(0, 3);
                        let startYear = taskData[ind].milestone[miledataInd].task[taskDataInd].pstartdate.substr(0, 4);
                        let endDate = taskData[ind].milestone[miledataInd].task[taskDataInd].penddate.substr(8, 2);
                        let endMonName = taskData[ind].milestone[miledataInd].task[taskDataInd].planned.substr(9, 3);
                        let endYear = taskData[ind].milestone[miledataInd].task[taskDataInd].penddate.substr(0, 4);
                        h4.innerText = `Wireframe: ${startDate} ${startMonName} ${startYear} to ${endDate} ${endMonName} ${endYear}`;
                        p1.innerText = `Duration: ${taskData[ind].milestone[miledataInd].task[taskDataInd].duration}`;
                        p2.innerText = `Percentage Done: ${taskData[ind].milestone[miledataInd].task[taskDataInd].percentage}`;
                        p3.innerText = `Status: ${taskData[ind].milestone[miledataInd].task[taskDataInd].statustext}`;
                    } else if (e.type === 'mouseout') {
                        let tip = e.target.closest('.gantt').querySelector('.tasktooltip');
                        tip.style.display = "none";
                    }
                }
            }
        }
    })
})