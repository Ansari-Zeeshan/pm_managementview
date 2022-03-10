const selectGantt = document.querySelector('.gantt');
const prevGantt = document.querySelector('.gantt .slide_bottom .img1');
const nextGantt = document.querySelector('.gantt .slide_bottom .img2');
const ganttAppend = document.querySelector('.gantt .workloadrow1 > .col-md-12');
const tableprogAppend = document.querySelector('.gantt .workloadrow1 .tableprogian');
const selectData = document.querySelector('.gantt .thspace select');
let gantIndex=0, monthNumber = 1, monthNumber2 = 0,year = 2021, projNameIndex=0, monthCount = 0, 
selectInput = 'Days', nextMonInd = 0, monthYear = 2021, nextQuaInd = 0, quarterYear = 2021;
const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const quarter = ['Q1','Q2','Q3','Q4'];

(function createmulFirstDiv()
{   
    let j=1;
    let pInd=1;
    for(i=1; i<projectData.length+1; i++)
    {
       let div1 = document.createElement('div1');
       div1.setAttribute('class','first1');
       div1.innerHTML=`
       <div class="firstext"><p>Project 01</p></div>
       <div class="collapsed" data-bs-toggle="collapse"
           href="#collapseExample${i}" role="button" aria-expanded="false"
           aria-controls="collapseExample">
           <div class="gantpr gantpr1 timeline" startDay="${projectData[i - pInd].startExactDay}"></div>
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

    let projInd = 0;
    card = selectGantt.querySelectorAll('.tableprogian .card');
    for(let i=0;i<projectData.length;i++)
    {
        let milestone = milestoneData[i].project.length;
        if(milestone === 0)
        {
            let diff = i - projInd;
            projInd = i - diff;
            continue;
        }
        for(let m=0;m<milestoneData[projInd].project.length;m++)
        {
            let div = document.createElement('div');
            div.setAttribute('class','Milestone');
            div.innerHTML=`
            <div class="position-relative">
                   <div class="vl"></div>
            </div>
            <div class="milestonediv1">
            <div
                class="gantpr22 progress-bar rounded-1 milestonediv11  gantpr fs-4 onhover" startDay="${milestoneData[projInd].project[m].startExactDay}" data-bs-toggle="collapse" href="#milestoneExample${m+j}" role="button" aria-expanded="false" aria-controls="collapseExample3">
                <span>Milestone-2</span>
            </div>
            </div>`
            card[projInd].appendChild(div);
        }
        projInd++;
    }

    milesPDiv = document.querySelectorAll('.gantt #benefits2 .first1');
    for(let p=0; p<projectData.length; p++)
    {
        mileAppend = milesPDiv[p].querySelectorAll('.card .Milestone');
        for(let i=0;i<mileAppend.length;i++)
        {
            let len = taskData[p].milestone[i].task.length;
            for(let t=0;t<len;t++)
            {
                let div = document.createElement('div');
                div.setAttribute('class','task');
                div.innerHTML=`
                <div class="milestonediv2 position-relative collapse" id="milestoneExample${i+j}">
                    <div class="gantpr22 rounded-1 milestonediv22 gantpr bg-secondary fs-4 progress-bar" startDay="${taskData[p].milestone[i].task[t].startExactDay}">
                        <span>Task-1</span>
                    </div>
                </div>`
                mileAppend[i].appendChild(div);
            }
        }
    }

    showDate = document.querySelectorAll('.gantt .tablegantt tr:nth-child(2) th');
    monthText = document.querySelector('.gantt .tablecal1 .thspace p');
    projNameText = document.querySelectorAll('#benefits2 .first1 .firstext');
    ganttTimeline = document.querySelectorAll('.gantt #benefits2 .tableprogian .timeline');
    hoverProject2 = document.querySelectorAll('.gantt #benefits2 .tableprogian .firstext');
}());

selectData.addEventListener('change',()=>
{
    selectInput = selectData.options[selectData.selectedIndex].value;
    let thfirst = selectGantt.querySelectorAll('#benefits2 .fixedvw');
    switch(selectInput)
    {
        case 'Days':
            {
                let alltr = selectGantt.querySelectorAll('.tablegantt tr');
                for(let i=1; i<alltr.length; i++)
                {
                    let alltd = alltr[i].children;
                    for(let j = 1; j<alltd.length; j++)
                    {
                        if(j > 0 && j<5)
                        {
                            alltd[j].classList.remove('VDate');
                            alltd[j].classList.remove('VQuarter');
                            alltd[j].style.width="2.517vw";
                            if(alltd[j].classList.contains('deactive'))
                            {
                                alltd[j].classList.remove('deactive');
                            }
                            continue;
                        }
                        alltd[j].classList.remove('deactive');
                    }
                }
                thfirst.forEach((thfirst)=>
                {
                    thfirst.style.width="10.125vw";
                })
                assignDate();
                calTimelineBar();
                calMilestoneBar();
                calTaskBar();
                break;
            }
        case 'Month':
            {
                let alltr = selectGantt.querySelectorAll('.tablegantt tr');
                for(let i=1; i<alltr.length; i++)
                {
                    let alltd = alltr[i].children;
                    for(let j = 1; j<alltd.length; j++)
                    {
                        if(alltd[j].classList.contains('VQuarter'))
                        {
                            alltd[j].classList.remove('VQuarter');
                        }
                        if(j>0 && j<5)
                        {
                            if(i==1)
                            {
                                alltd[j].classList.add('VDate');
                            }
                            alltd[j].classList.remove('deactive');
                            alltd[j].style.width="9.9vw";
                            continue;
                        }
                        alltd[j].classList.add('deactive');
                    }
                }
                thfirst.forEach((thfirst)=>
                {
                    thfirst.style.width="5vw";
                })
                assignMonth();
                calTimelineBar();
                calMilestoneBar();
                calTaskBar();
                break;
            }
        case 'Quarter':
            {
                let alltr = selectGantt.querySelectorAll('.tablegantt tr');
                for(let i=1; i<alltr.length; i++)
                {
                    let alltd = alltr[i].children;
                    for(let j = 1; j<alltd.length; j++)
                    {
                        if(alltd[j].classList.contains('VDate'))
                        {
                            alltd[j].classList.remove('VDate');
                        }
                        if(j>0 && j<3)
                        {
                            if(i==1)
                            {
                                alltd[j].classList.add('VQuarter');
                            }
                            alltd[j].style.width="19.725vw";
                            continue;
                        }
                        alltd[j].classList.add('deactive');
                    }
                }
                thfirst.forEach((thfirst)=>
                {
                    thfirst.style.width="5vw";
                })
                assignQuarter();
                calTimelineBar();
                calMilestoneBar();
                calTaskBar();
                break;
            }     
    }
})

function getMonthLength()
{
    MonthLength = new Date(year, monthNumber, 0).getDate();
};
getMonthLength();
function assignDate()
{
    monthText.innerText=`${month[monthCount]} ${year}`;
    showDate.forEach((show)=>
    {
        show.classList.remove('dateVirtual');
    })
    for(let i=1;i<MonthLength+1;i++)
    {
        let dayName = new Date(year, monthNumber2, i).toString().substr(0,3);
        showDate[i].classList.add('dateVirtual');
        showDate[i].innerHTML=`${dayName} <p>${i}</p>`;
    }
}
assignDate();
function assignMonth()
{
    let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
    let textSplit = monthText.innerText.split(' ');
    let appearMon = textSplit[0];
    let appearYear = textSplit[1];
    monthYear = appearYear;
    switch(appearMon)
    {
        case 'January':
            {
                nextMonInd = 0;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'February':
            {
                nextMonInd = 4;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'March':
            {
                nextMonInd = 8;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'April':
            {
                monthYear = +appearYear + 1;
                nextMonInd = 0;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'May':
            {
                monthYear = +appearYear + 1;
                nextMonInd = 4;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'June':
            {
                monthYear = +appearYear + 1;
                nextMonInd = 8;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'July':
            {
                monthYear = +appearYear + 2;
                nextMonInd = 0;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'August':
            {
                monthYear = +appearYear + 2;
                nextMonInd = 4;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'September':
            {
                monthYear = +appearYear + 2;
                nextMonInd = 8;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'October':
            {
                monthYear = +appearYear + 3;
                nextMonInd = 0;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'November':
            {
                monthYear = +appearYear + 3;
                nextMonInd = 4;
                loopMonthName(Mname, nextMonInd);
                break;
            }
        case 'December':
            {
                monthYear = +appearYear + 3;
                nextMonInd = 8;
                loopMonthName(Mname, nextMonInd);
                break;
            }                    
    }
}
function assignMonth2(Mname, Mnametext, monthIndex)
{
    switch(Mnametext)
    {
        case 'JANUARY':
            {
                loopMonthName(Mname, monthIndex);
                break;
            }
        case 'MAY':
            {
                loopMonthName(Mname, monthIndex);
                break;
            }
        case 'SEPTEMBER':
            {
                loopMonthName(Mname, monthIndex);
                break;
            }      
    }
}
function loopMonthName(Mname, monthIndex)
{
    let localMonInd = monthIndex;
    monthText.innerText=`${monthYear}`;
    for(let i=0;i<Mname.length; i++)
    {
        Mname[i].innerHTML = `<p>${month[localMonInd]}</p>`;
        localMonInd++;
    }
}
function assignQuarter()
{
    let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
    let textSplit = monthText.innerText.split(' ');
    let appearMon = textSplit[0]; 
    let appearYear = textSplit[1]; 
    quarterYear = appearYear;
    switch(appearMon)
    {
        case 'January':
            {
                nextQuaInd = 0;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'February':
            {
                nextQuaInd = 2;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'March':
            {
                appearYear = +appearYear + 1;
                nextQuaInd = 0;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'April':
            {
                appearYear = +appearYear + 1;
                nextQuaInd = 2;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'May':
            {
                appearYear = +appearYear + 2;
                nextQuaInd = 0;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'June':
            {
                appearYear = +appearYear + 2;
                nextQuaInd = 2;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'July':
            {
                appearYear = +appearYear + 3;
                nextQuaInd = 0;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'August':
            {
                appearYear = +appearYear + 3;
                nextQuaInd = 2;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'September':
            {
                appearYear = +appearYear + 4;
                nextQuaInd = 0;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'October':
            {
                appearYear = +appearYear + 4;
                nextQuaInd = 2;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'November':
            {
                appearYear = +appearYear + 5;
                nextQuaInd = 0;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }
        case 'December':
            {
                appearYear = +appearYear + 5;
                nextQuaInd = 2;
                loopQuarterName(Qname, nextQuaInd);
                break;
            }                    
    }
}
function assignQuarter2(Qname, Qnametext, quarterIndex)
{
    switch(Qnametext)
    {
        case 'Q1':
            {
                loopQuarterName(Qname, quarterIndex);
                break;
            }
        case 'Q2':
            {
                loopQuarterName(Qname, quarterIndex);
                break;
            }
        case 'Q3':
            {
                loopQuarterName(Qname, quarterIndex);
                break;
            }
        case 'Q4':
            {
                loopQuarterName(Qname, quarterIndex);
                break;
            }          
    }
}
function loopQuarterName(Qname, nextQuaInd)
{
    let localQuaInd = nextQuaInd;
    monthText.innerText=`${quarterYear}`;
    for(let i=0; i<Qname.length; i++)
    {
        Qname[i].innerHTML=`<p>${quarter[localQuaInd]}</p>`;
        localQuaInd++;
    }
}
function assignProjectName()
{
    for(let i=0; i<projectData.length; i++)
    {
        projNameText[projNameIndex].innerText=projectData[i].projectname;
        projNameIndex++;
    }
}
assignProjectName()

function assignMilestoneName()
{
    for(let i=0; i<projectData.length; i++)
    {
        let timeline = selectGantt.querySelectorAll('#benefits2 .tableprogian .timeline');
        let milestone = timeline[i].closest('.first1').querySelectorAll('.collapse .milestonediv1 span');
        for(let j=0;j<milestone.length;j++)
        {
            milestone[j].innerText = milestoneData[i].project[j].planned;
        }
    }
}
assignMilestoneName()

function assignTaskName()
{
    for(let i=0; i<projectData.length; i++)
    {
        milestone = milesPDiv[i].querySelectorAll('.card .Milestone');
        for(let j=0;j<milestone.length;j++)
        {
            let Task = milestone[j].querySelectorAll('.task span');
            for(k=0; k<Task.length; k++)
            {
                Task[k].innerText= taskData[i].milestone[j].task[k].planned;
            }
        }
    }
}
assignTaskName()

nextGantt.addEventListener('click',()=>
{
    switch(selectInput)
    {
        case 'Days':
            {
                monthCount++;
                monthNumber++;
                monthNumber2++;
                if(monthCount>11)
                {
                    monthCount=0;
                    year++;
                    monthNumber=1;
                    monthNumber2=0;
                }
                getMonthLength();
                assignDate();
                break;
            }
        case 'Month':
            {
                nextMonInd = nextMonInd + 4;
                if(nextMonInd >=12)
                {
                    monthYear++;
                    nextMonInd=0;
                }
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                let Mnametext = Mname[0].innerText;
                assignMonth2(Mname, Mnametext, nextMonInd);
                break;
            }
        case 'Quarter':
            {
                nextQuaInd = nextQuaInd + 2;
                if(nextQuaInd >=4)
                {
                    quarterYear++;
                    nextQuaInd=0;
                }
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let Qnametext = Qname[0].innerText;
                assignQuarter2(Qname, Qnametext, nextQuaInd);
                break;
            }        
    }
    calTimelineBar();
    calMilestoneBar();
    calTaskBar();
})
prevGantt.addEventListener('click',()=>
{
    switch(selectInput)
    {
        case 'Days':
            {
                monthCount--;
                monthNumber--;
                monthNumber2--;
                if(monthCount<0 && year>2021)
                {
                    monthCount=11;
                    year--;
                    monthNumber=12;
                    monthNumber2=11;
                }
                else if(monthCount<0 && year == 2021)
                {
                    monthCount=0;
                    monthNumber=1;
                    monthNumber2=0;
                    return false;
                }
                getMonthLength();
                assignDate();
                break;
            }
        case 'Month':
            {
                nextMonInd = nextMonInd - 4;
                if(nextMonInd<0 && monthYear>2021)
                {

                    monthYear--;
                    nextMonInd=8;
                }
                else if(nextMonInd<0 && year==2021)
                {
                    nextMonInd=0;
                    return false;
                }
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                let Mnametext = Mname[0].innerText;
                assignMonth2(Mname, Mnametext, nextMonInd);
                break;
            }  
        case 'Quarter':
            {
                nextQuaInd = nextQuaInd - 2;
                if(nextQuaInd <0 && quarterYear>2021)
                {
                    quarterYear--;
                    nextQuaInd=2;
                }
                else if(nextQuaInd<0 && year==2021)
                {
                    nextQuaInd=0;
                    return false;
                }
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let Qnametext = Qname[0].innerText;
                assignQuarter2(Qname, Qnametext, nextQuaInd);
                break;
            }      
    }
    calTimelineBar();
    calMilestoneBar();
    calTaskBar();
})
function calTimelineBar()
{
    let mobileWidth = body.clientWidth;
    let projTimeline = document.querySelectorAll('.gantt #benefits2 .tableprogian .timeline');
        for(let i=0;i<projectData.length;i++)
        {
            let date1 = new Date(projectData[i].pstartdate.substr(0,10).toString());
            let date2 = new Date(projectData[i].penddate.substr(0,10).toString());
            let projStartMonth = projectData[i].startExactDay.substr(3,3).toString();
            let getMonthIndex = getNumericMonth(projStartMonth);
            let startYear = projectData[i].startMonth.substr(0,4);
            compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate-startDate;
            monthAppear = getMonthAppear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = projectData[i].penddate.substr(8,2);
            let projEndYear = projectData[i].penddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, projEndYear);
            endTimeline = +endTimeline;
            let projStartYear = projectData[i].pstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, projStartYear);
            prevYear = checkPrevYear(appearYear, projEndYear, i);
            let projStartDate = projectData[i].pstartdate.substr(8,2);
            let startMText = projectData[i].startExactDay.substr(3,4);
            let minusVal = projectData[i].startExactDay.substr(0,2);
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate2(date2,i,daysCount,appearYear);
                        showGantt(daysCount,endTimeline,i,projTimeline,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='February 2021' || month1==='February 2022' || month1==='February 2023'
                    || month1==='February 2024' || month1==='February 2025' || month1==='February 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='March 2021' || month1==='March 2022' || month1==='March 2023'
                    || month1==='March 2024' || month1==='March 2025' || month1==='March 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='April 2021' || month1==='April 2022' || month1==='April 2023'
                    || month1==='April 2024' || month1==='April 2025' || month1==='April 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='May 2021' || month1==='May 2022' || month1==='May 2023'
                    || month1==='May 2024' || month1==='May 2025' || month1==='May 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='June 2021' || month1==='June 2022' || month1==='June 2023'
                    || month1==='June 2024' || month1==='June 2025' || month1==='June 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='July 2021' || month1==='July 2022' || month1==='July 2023'
                    || month1==='July 2024' || month1==='July 2025' || month1==='July 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='August 2021' || month1==='August 2022' || month1==='August 2023'
                    || month1==='August 2024' || month1==='August 2025' || month1==='August 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='September 2021' || month1==='September 2022' || month1==='September 2023'
                    || month1==='September 2024' || month1==='September 2025' || month1==='September 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='October 2021' || month1==='October 2022' || month1==='October 2023'
                    || month1==='October 2024' || month1==='October 2025' || month1==='October 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='November 2021' || month1==='November 2022' || month1==='November 2023'
                    || month1==='November 2024' || month1==='November 2025' || month1==='November 2026')
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='December 2021' || month1==='December 2022' || month1==='December 2023'
                    || month1==='December 2024' || month1==='December 2025' || month1==='December 2026')
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt(daysCount,endTimeline,i,projTimeline,projStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
            givebackground(i,daysCount,ganttTimeline);
        }
}
calTimelineBar();
function calMilestoneBar()
{
    let mobileWidth = body.clientWidth;       
    let projInd = 0;
    for(let j=0;j<milestoneData.length;j++)
    {
        let milestone = ganttTimeline[j].closest('.first1').querySelectorAll('.collapse .milestonediv1 .milestonediv11');
        if(milestone==null)
        {
            let diff = j - projInd;
            projInd = j - diff;
            continue;
        }
        for(let i=0; i<milestone.length; i++)
        {
            let date1 = new Date(milestoneData[projInd].project[i].mstartdate.substr(0,10).toString());
            let date2 = new Date(milestoneData[projInd].project[i].menddate.substr(0,10).toString());
            let projStartDate = milestoneData[projInd].project[i].startExactDay.substr(3,3).toString();
            let getMonthIndex = getNumericMonth(projStartDate);
            let startYear = milestoneData[projInd].project[i].startMonth.substr(0,4);
            compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate - startDate;
            monthAppear = getMonthAppear();
            let appearYear = +monthAppear;
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = milestoneData[projInd].project[i].menddate.substr(8,2);
            let mileEndYear = milestoneData[projInd].project[i].menddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
            endTimeline = +endTimeline;
            let mileStartYear = milestoneData[projInd].project[i].mstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, mileStartYear);
            prevYear = checkMilePrevYear(appearYear, mileEndYear, i, milestone);
            let mileStartDate = milestoneData[projInd].project[i].mstartdate.substr(8,2);
            let startMText = milestoneData[projInd].project[i].startExactDay.substr(3,4);
            let minusVal = milestoneData[projInd].project[i].startExactDay.substr(0,2);
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate2(date2,i,daysCount,appearYear);
                        showGantt2(daysCount,endTimeline,i,milestone,mobileWidth,projInd);
                        daysCount = endDate-startDate;
                    }
                }
            }
            else
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='February 2021' || month1==='February 2022' || month1==='February 2023'
                    || month1==='February 2024' || month1==='February 2025' || month1==='February 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='March 2021' || month1==='March 2022' || month1==='March 2023'
                    || month1==='March 2024' || month1==='March 2025' || month1==='March 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='April 2021' || month1==='April 2022' || month1==='April 2023'
                    || month1==='April 2024' || month1==='April 2025' || month1==='April 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='May 2021' || month1==='May 2022' || month1==='May 2023'
                    || month1==='May 2024' || month1==='May 2025' || month1==='May 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='June 2021' || month1==='June 2022' || month1==='June 2023'
                    || month1==='June 2024' || month1==='June 2025' || month1==='June 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='July 2021' || month1==='July 2022' || month1==='July 2023'
                    || month1==='July 2024' || month1==='July 2025' || month1==='July 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='August 2021' || month1==='August 2022' || month1==='August 2023'
                    || month1==='August 2024' || month1==='August 2025' || month1==='August 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='September 2021' || month1==='September 2022' || month1==='September 2023'
                    || month1==='September 2024' || month1==='September 2025' || month1==='September 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='October 2021' || month1==='October 2022' || month1==='October 2023'
                    || month1==='October 2024' || month1==='October 2025' || month1==='October 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='November 2021' || month1==='November 2022' || month1==='November 2023'
                    || month1==='November 2024' || month1==='November 2025' || month1==='November 2026')
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='December 2021' || month1==='December 2022' || month1==='December 2023'
                    || month1==='December 2024' || month1==='December 2025' || month1==='December 2026')
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth, projInd);
                        daysCount = endDate-startDate;
                    }
                }
            }
            giveMilestonebG(i,j,daysCount,milestone);
        }
        projInd++;
    }
}
calMilestoneBar();

function calTaskBar()
{
    let mobileWidth = body.clientWidth;
    let projInd = 0;       
    for(k=0;k<projectData.length;k++)
    {
        let milestone = milesPDiv[k].querySelectorAll('.card .Milestone');
        if(milestone===null)
        {
            let diff = k - projInd;
            projInd = k - diff;
            continue;
        }
        let mileInd = 0;       
        for(let j=0;j<milestone.length;j++)
        {
            let Task = milestone[j].querySelectorAll('.milestonediv22');
            if(Task===null)
            {
                let taskdiff = j - mileInd;
                mileInd = j - taskdiff;
                continue;
            }
            for(let i=0; i<Task.length; i++)
            {
                let date1 = new Date(taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(0,10).toString());
                let date2 = new Date(taskData[projInd].milestone[mileInd].task[i].tenddate.substr(0,10).toString());
                let projStartDate = taskData[projInd].milestone[mileInd].task[i].startExactDay.substr(3,3).toString();
                let getMonthIndex = getNumericMonth(projStartDate);
                let startYear = taskData[projInd].milestone[mileInd].task[i].startMonth.substr(0,4);
                compareYear = +startYear;
                let startDate = Math.floor(date1.getTime()/(3600*24*1000));
                let endDate = Math.floor(date2.getTime()/(3600*24*1000));
                let daysCount = endDate - startDate;
                monthAppear = getMonthAppear();
                let appearYear = +monthAppear;
                let compareDate = new Date(`${appearYear}/01/01`);
                let endTimeline = taskData[projInd].milestone[mileInd].task[i].tenddate.substr(8,2);
                let taskEndYear = taskData[projInd].milestone[mileInd].task[i].tenddate.substr(0,4);
                endTimeline = getTimeline(endTimeline, appearYear, taskEndYear);
                endTimeline = +endTimeline;
                let taskStartYear = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(0,4);
                getMonthName(getMonthIndex, appearYear, taskStartYear);
                prevYear = checkTaskPrevYear(appearYear,taskEndYear, i, Task);
                let taskStartDate = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(8,2);
                let startMText = taskData[projInd].milestone[mileInd].task[i].startExactDay.substr(3,4);
                let minusVal = taskData[projInd].milestone[mileInd].task[i].startExactDay.substr(0,2);
                if(date1.getTime()<=compareDate.getTime())
                {
                    if(appearYear>=compareYear && prevYear)
                    {
                        if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                        || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                        {
                            daysCount = checkTargetDate2(date2,i,daysCount,appearYear);
                            showGantt3(daysCount,endTimeline,i,Task,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                    }
                }
                else
                {
                    if(appearYear>=compareYear && prevYear)
                    {
                        if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                        || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='February 2021' || month1==='February 2022' || month1==='February 2023'
                        || month1==='February 2024' || month1==='February 2025' || month1==='February 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='March 2021' || month1==='March 2022' || month1==='March 2023'
                        || month1==='March 2024' || month1==='March 2025' || month1==='March 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='April 2021' || month1==='April 2022' || month1==='April 2023'
                        || month1==='April 2024' || month1==='April 2025' || month1==='April 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='May 2021' || month1==='May 2022' || month1==='May 2023'
                        || month1==='May 2024' || month1==='May 2025' || month1==='May 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='June 2021' || month1==='June 2022' || month1==='June 2023'
                        || month1==='June 2024' || month1==='June 2025' || month1==='June 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='July 2021' || month1==='July 2022' || month1==='July 2023'
                        || month1==='July 2024' || month1==='July 2025' || month1==='July 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='August 2021' || month1==='August 2022' || month1==='August 2023'
                        || month1==='August 2024' || month1==='August 2025' || month1==='August 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='September 2021' || month1==='September 2022' || month1==='September 2023'
                        || month1==='September 2024' || month1==='September 2025' || month1==='September 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='October 2021' || month1==='October 2022' || month1==='October 2023'
                        || month1==='October 2024' || month1==='October 2025' || month1==='October 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='November 2021' || month1==='November 2022' || month1==='November 2023'
                        || month1==='November 2024' || month1==='November 2025' || month1==='November 2026')
                        {           
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='December 2021' || month1==='December 2022' || month1==='December 2023'
                        || month1==='December 2024' || month1==='December 2025' || month1==='December 2026')
                        {                    
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth,projInd,mileInd);
                            daysCount = endDate-startDate;
                        }
                    }
                }
                // giveTaskbG(i,j,daysCount,milestone);
            }
            mileInd++;
        }
        projInd++;
    }
}
calTaskBar();

function showGantt(daysCount,endTimeline,i,ganttTimeline,mobileWidth)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = projectData[i].penddate.substr(5,2);
    switch(selectInput)
    {
        case 'Days':
            {
                switch(true){
                    case (daysCount<=30):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${daysCount * 2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>30 && daysCount<=58):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>58 && daysCount<=89):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block"; 
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month3)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>89 && daysCount<=119):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month4)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>119 && daysCount<=150):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month5)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>150 && daysCount<=180):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month6)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>180 && daysCount<=211):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month7)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>211 && daysCount<=242):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month8)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>242 && daysCount<=272):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month9)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>272 && daysCount<=303):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month10)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>303 && daysCount<=333):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                            || monthText.innerText===month10)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month11)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>333 && daysCount<=365):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                            || monthText.innerText===month10 || monthText.innerText===month11)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month12)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        break;  
                    }    
                }
                break;
            }
            case 'Month':
            {
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                switch(true){
                    case (daysCount<=119):
                    {
                        if(monthText1===month1)
                        {
                            let ganttWidth = getCommonWidth(i,Mname);
                            ganttTimeline[i].closest('.first1').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>119 && daysCount<=242):
                    {
                        if(monthText1===month1)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month5)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>242 && daysCount<=365):
                    {
                        if(monthText1===month1 || monthText1===month5)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block"; 
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month9)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }
            case 'Quarter':
            {
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let quarter1 = `${Qname[0].innerText}`;
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let quarterText1;
                if(quarter1==='Q1')
                {
                    quarterText1 = `january ${quarterYear}`;
                }
                else if(quarter1==='Q3')
                {
                    quarterText1 = `july ${quarterYear}`;
                }
                switch(true){
                    case (daysCount<=181):
                    {
                        if(quarterText1===month1)
                        {
                            let ganttWidth = getCommonWidth(i, Qname);
                            ganttTimeline[i].closest('.first1').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>181 && daysCount<=365):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(quarterText1===month7)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }
    }
}
function showAlternateGantt(daysCount,endTimeline,i,ganttTimeline,startTime,startMText,minusVal,mobileWidth)
{
    startTime = +startTime -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = projectData[i].penddate.substr(5,2);
    switch(selectInput)
    {
        case 'Days':
        {
            updateValue(startMText,minusVal);
            switch(true)
            {
                case (daysCount<=val1):
                {
                    if(monthText.innerText===month1)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(daysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,daysCount,ganttTimeline);               
                            }
                    }        
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;
                }
                case (daysCount>val1 && daysCount<=val2):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val2 && daysCount<=val3):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }  
                    }
                    else if(monthText.innerText===month2)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth);
                            }
                    }
                    else if(monthText.innerText===month3)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val3 && daysCount<=val4):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth);
                            }
                    }
                    else if(monthText.innerText===month4)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val4 && daysCount<=val5):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth);
                            }
                    }
                    else if(monthText.innerText===month5)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val5 && daysCount<=val6):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month6)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val6 && daysCount<=val7):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5 || monthText.innerText===month6)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month7)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val7 && daysCount<=val8):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month8)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val8 && daysCount<=val9):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                        || monthText.innerText===month8)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month9)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val9 && daysCount<=val10):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                        || monthText.innerText===month8 || monthText.innerText===month9)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month10)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val10 && daysCount<=val11):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                        || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month11)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val11 && daysCount<=val12):
                {
                    if(monthText.innerText===month1)
                    {
                        let localdaysCount=totWidth - startTime;
                        ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                        || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                        || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10
                        || monthText.innerText===month11)
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                        ganttTimeline[i].closest('.first1').style.display="block";
                            if(mobileWidth<700)
                            {
                                showinMobile4(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText.innerText===month12)
                    {
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    break;  
                }
            }
            break;
        }      
        case 'Month':
        {
            updateValue2(startMText,minusVal);
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            let monthText2 = `${Mname[1].innerText} ${monthYear}`.toLowerCase();
            let monthText3 = `${Mname[2].innerText} ${monthYear}`.toLowerCase();
            let monthText4 = `${Mname[3].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
            month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
            month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
            month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
            switch(true){
                case (daysCount<=val1):
                {
                    if(monthText1===month1 || monthText2===month1 || monthText3===month1 || monthText4===month1)
                    {
                        ganttTimeline[i].closest('.first1').style.display="block";
                        getPCoorrds(i, startTime, ganttTimeline, Mname);
                            if(mobileWidth<700)
                            {
                                showinMobile1(i,daysCount,ganttTimeline);
                            }
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;
                }      
                case (daysCount>val1 && daysCount<=val2):
                {
                    if(monthText1===month1 || monthText2===month1 || monthText3===month1 || monthText4===month1)
                    {
                        ganttTimeline[i].closest('.first1').style.display="block";
                        let startMonthIndex = projectData[i].pstartdate.substr(5,2);
                        let mulNum = +projectData[i].pstartdate.substr(8,2);
                        getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Mname);
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText1===month5 || monthText2===month4 || monthText3===month3 || monthText4===month2)
                    {
                        ganttTimeline[i].closest('.first1').style.display="block";
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val2 && daysCount<=val3):
                {
                    if((monthText1===month1 && monthText2===month2 && monthText3===month3 && monthText4===month4) 
                    || (monthText1===month5 && monthText2===month6 && monthText3===month7 && monthText4===month8))
                    {
                        ganttTimeline[i].closest('.first1').style.display="block";
                        let startMonthIndex = projectData[i].pstartdate.substr(5,2);
                        let mulNum = +projectData[i].pstartdate.substr(8,2);
                        getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Mname);
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText1===month9 && monthText2===month10 && monthText3===month11 && monthText4===month12)
                    {
                        ganttTimeline[i].closest('.first1').style.display="block";
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.first1').style.display="none";
                    }
                    break;  
                }
            }
            break;
        }  
        case 'Quarter':
            {
                updateValue3(startMText,minusVal);
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let quarter1 = `${Qname[0].innerText}`;
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let quarterText1;
                if(quarter1==='Q1')
                {
                    quarterText1 = `january ${quarterYear}`;
                }
                else if(quarter1==='Q3')
                {
                    quarterText1 = `july ${quarterYear}`;
                }
                switch(true){
                    case (daysCount<=val1):
                    {
                        if(quarterText1===month1)
                        {
                            getPCoorrds(i, startTime, ganttTimeline, Qname);
                            ganttTimeline[i].closest('.first1').style.display="block";
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>val1 && daysCount<=val2):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            let startMonthIndex = projectData[i].pstartdate.substr(5,2);
                            let mulNum = +projectData[i].pstartdate.substr(8,2);
                            getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Qname);
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(quarterText1===month7)
                        {
                            ganttTimeline[i].closest('.first1').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.first1').style.display="none";
                        }
                        break;  
                    }
                }
            break;
        }    
    }
}

function showGantt2(daysCount,endTimeline,i,ganttTimeline,mobileWidth, projInd)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = milestoneData[projInd].project[i].menddate.substr(5,2);
    switch(selectInput)
    {
        case 'Days':
            {
                switch(true)
                {
                    case (daysCount<=30):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${daysCount * 2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>30 && daysCount<=58):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2)
                        { 
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>58 && daysCount<=89):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block"; 
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month3)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>89 && daysCount<=119):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month4)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>119 && daysCount<=150):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month5)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>150 && daysCount<=180):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month6)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>180 && daysCount<=211):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month7)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>211 && daysCount<=242):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month8)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>242 && daysCount<=272):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month9)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>272 && daysCount<=303):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month10)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>303 && daysCount<=333):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                            || monthText.innerText===month10)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month11)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>333 && daysCount<=365):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                            || monthText.innerText===month10 || monthText.innerText===month11)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month12)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        break;  
                    }    
                }
                break;
            }
            case 'Month':
            {
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let endMonthIndex = projectData[i].penddate.substr(5,2);
                switch(true){
                    case (daysCount<=119):
                    {
                        if(monthText1===month1)
                        {
                            let ganttWidth = getCommonWidth(i, Mname);
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>119 && daysCount<=242):
                    {
                        if(monthText1===month1)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month5)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>242 && daysCount<=365):
                    {
                        if(monthText1===month1 || monthText1===month5)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block"; 
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month9)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }
            case 'Quarter':
            {
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let quarter1 = `${Qname[0].innerText}`;
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let quarterText1;
                if(quarter1==='Q1')
                {
                    quarterText1 = `january ${quarterYear}`;
                }
                else if(quarter1==='Q3')
                {
                    quarterText1 = `july ${quarterYear}`;
                }
                switch(true){
                    case (daysCount<=181):
                    {
                        if(quarterText1===month1)
                        {
                            let ganttWidth = getCommonWidth(i, Qname);
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>181 && daysCount<=365):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw;`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(quarterText1===month7)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }
    }
}
function showAlternateGantt2(daysCount,endTimeline,i,ganttTimeline,startTime,startMText,minusVal,mobileWidth, projInd)
{
    startTime = +startTime -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    updateValue(startMText,minusVal);
    let endMonthIndex = milestoneData[projInd].project[i].menddate.substr(5,2);
    switch(selectInput)
    {
        case 'Days':
            {
                switch(true)
                {
                    case (daysCount<=val1):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(daysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,daysCount,ganttTimeline);               
                                }
                        }        
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;
                    }
                    case (daysCount>val1 && daysCount<=val2):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val2 && daysCount<=val3):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }  
                        }
                        else if(monthText.innerText===month2)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth);
                                }
                        }
                        else if(monthText.innerText===month3)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val3 && daysCount<=val4):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth);
                                }
                        }
                        else if(monthText.innerText===month4)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val4 && daysCount<=val5):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth);
                                }
                        }
                        else if(monthText.innerText===month5)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val5 && daysCount<=val6):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month6)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val6 && daysCount<=val7):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month7)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val7 && daysCount<=val8):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month8)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val8 && daysCount<=val9):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month9)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val9 && daysCount<=val10):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8 || monthText.innerText===month9)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month10)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val10 && daysCount<=val11):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month11)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val11 && daysCount<=val12):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10
                            || monthText.innerText===month11)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month12)
                        {
                            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        break;  
                    }
                }
                break;
            }
        case 'Month':
        {
            updateValue2(startMText,minusVal);
            let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
            let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
            let monthText2 = `${Mname[1].innerText} ${monthYear}`.toLowerCase();
            let monthText3 = `${Mname[2].innerText} ${monthYear}`.toLowerCase();
            let monthText4 = `${Mname[3].innerText} ${monthYear}`.toLowerCase();
            month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
            month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
            month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
            month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
            switch(true)
            {
                case (daysCount<=val1):
                {
                    if(monthText1===month1 || monthText2===month1 || monthText3===month1 || monthText4===month1)
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="block";
                        getMCoorrds(i, startTime, projInd, ganttTimeline, Mname);
                        getWireCoords(i, startTime, projInd, ganttTimeline);
                            if(mobileWidth<700)
                            {
                                showinMobile1(i,daysCount,ganttTimeline);
                            }
                    }
                    else
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="none";
                    }
                    break;
                }      
                case (daysCount>val1 && daysCount<=val2):
                {
                    if(monthText1===month1 || monthText2===month1 || monthText3===month1 || monthText4===month1)
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="block";
                        let startMonthIndex = milestoneData[projInd].project[i].mstartdate.substr(5,2);
                        let mulNum = +milestoneData[projInd].project[i].mstartdate.substr(8,2);
                        getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Mname);
                        getWireCoords(i, startTime, projInd, ganttTimeline);
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText1===month5 || monthText1===month4 || monthText1===month3 || monthText1===month2)
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="block";
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                    }
                    else
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="none";
                    }
                    break;  
                }
                case (daysCount>val2 && daysCount<=val3):
                {
                    if((monthText1===month1 && monthText2===month2 && monthText3===month3 && monthText4===month4) 
                    || (monthText1===month5 && monthText2===month6 && monthText3===month7 && monthText4===month8))
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="block";
                        let startMonthIndex = milestoneData[projInd].project[i].mstartdate.substr(5,2);
                        let mulNum = +milestoneData[projInd].project[i].mstartdate.substr(8,2);
                        getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Mname);
                        getWireCoords(i, startTime, projInd, ganttTimeline);
                            if(mobileWidth < 700)
                            {
                                showinMobile1(i,totWidth,ganttTimeline);
                            }
                    }
                    else if(monthText1===month9 && monthText2===month10 && monthText3===month11 && monthText4===month12)
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="block";
                        ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                        remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                    }
                    else
                    {
                        ganttTimeline[i].closest('.Milestone').style.display="none";
                    }
                    break;  
                }
            }
            break;
        }
        case 'Quarter':
            {
                updateValue3(startMText,minusVal);
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let quarter1 = `${Qname[0].innerText}`;
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let quarterText1;
                if(quarter1==='Q1')
                {
                    quarterText1 = `january ${quarterYear}`;
                }
                else if(quarter1==='Q3')
                {
                    quarterText1 = `july ${quarterYear}`;
                }
                switch(true){
                    case (daysCount<=val1):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            getMCoorrds(i, startTime, projInd, ganttTimeline, Qname);
                            getWireCoords(i, startTime, projInd, ganttTimeline);
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>val1 && daysCount<=val2):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            let startMonthIndex = projectData[i].pstartdate.substr(5,2);
                            let mulNum = +milestoneData[projInd].project[i].mstartdate.substr(8,2);
                            getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Qname);
                            getWireCoords(i, startTime, projInd, ganttTimeline);
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(quarterText1===month7)
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.Milestone').style.display="none";
                        }
                        break;  
                    }
                }
            break;
        }      
    }
}

function showGantt3(daysCount,endTimeline,i,ganttTimeline,mobileWidth,projInd,mileInd)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    let endMonthIndex = taskData[projInd].milestone[mileInd].task[i].tenddate.substr(5,2);
    switch(selectInput)
    {
        case 'Days':
            {
                switch(true){
                    case (daysCount<=30):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${daysCount * 2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>30 && daysCount<=58):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2)
                        { 
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>58 && daysCount<=89):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block"; 
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month3)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>89 && daysCount<=119):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month4)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>119 && daysCount<=150):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month5)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>150 && daysCount<=180):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month6)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>180 && daysCount<=211):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month7)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>211 && daysCount<=242):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month8)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>242 && daysCount<=272):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month9)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>272 && daysCount<=303):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month10)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>303 && daysCount<=333):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                            || monthText.innerText===month10)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month11)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        else 
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>333 && daysCount<=365):
                    {
                        if(monthText.innerText===month1 || monthText.innerText===month2 || monthText.innerText===month3
                            || monthText.innerText===month4 || monthText.innerText===month5 || monthText.innerText===month6
                            || monthText.innerText===month7 || monthText.innerText===month8 || monthText.innerText===month9
                            || monthText.innerText===month10 || monthText.innerText===month11)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month12)
                        {
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);      
                        }
                        break;  
                    }    
                }
                break;
            }
        case 'Month':
            {
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                switch(true){
                    case (daysCount<=119):
                    {
                        if(monthText1===month1)
                        {
                            let ganttWidth = getCommonWidth(i, Mname);
                            ganttTimeline[i].closest('.task').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>119 && daysCount<=242):
                    {
                        if(monthText1===month1)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month5)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>242 && daysCount<=365):
                    {
                        if(monthText1===month1 || monthText1===month5)
                        {
                            ganttTimeline[i].closest('.task').style.display="block"; 
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month9)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }
        case 'Quarter':
            {
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let quarter1 = `${Qname[0].innerText}`;
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let quarterText1;
                if(quarter1==='Q1')
                {
                    quarterText1 = `january ${quarterYear}`;
                }
                else if(quarter1==='Q3')
                {
                    quarterText1 = `july ${quarterYear}`;
                }
                switch(true){
                    case (daysCount<=181):
                    {
                        if(quarterText1===month1)
                        {
                            let ganttWidth = getCommonWidth(i, Qname);
                            ganttTimeline[i].closest('.task').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${ganttWidth.toFixed(5)}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>181 && daysCount<=365):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:78.9vw`;
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(quarterText1===month7)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }    
    }
}
function showAlternateGantt3(daysCount,endTimeline,i,ganttTimeline,startTime,startMText,minusVal,mobileWidth,projInd,mileInd)
{
    startTime = +startTime -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length;
    updateValue(startMText,minusVal);
    let endMonthIndex = taskData[projInd].milestone[mileInd].task[i].tenddate.substr(5,2);
    switch(selectInput)
    {
        case 'Days':
            {
                switch(true)
                {
                    case (daysCount<=val1):
                    {
                        if(monthText.innerText===month1)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(daysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,daysCount,ganttTimeline);               
                                }
                        }        
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;
                    }
                    case (daysCount>val1 && daysCount<=val2):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val2 && daysCount<=val3):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }  
                        }
                        else if(monthText.innerText===month2)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth);
                                }
                        }
                        else if(monthText.innerText===month3)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val3 && daysCount<=val4):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth);
                                }
                        }
                        else if(monthText.innerText===month4)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val4 && daysCount<=val5):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth);
                                }
                        }
                        else if(monthText.innerText===month5)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val5 && daysCount<=val6):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month6)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val6 && daysCount<=val7):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month7)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val7 && daysCount<=val8):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month8)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val8 && daysCount<=val9):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month9)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val9 && daysCount<=val10):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8 || monthText.innerText===month9)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month10)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val10 && daysCount<=val11):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month11)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val11 && daysCount<=val12):
                    {
                        if(monthText.innerText===month1)
                        {
                            let localdaysCount=totWidth - startTime;
                            ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.517)+10.125}vw; width:${(localdaysCount*2.517)}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.517)+10.125}vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                            || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                            || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10
                            || monthText.innerText===month11)
                        {
                            ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${totWidth *2.517}vw`;
                            ganttTimeline[i].closest('.task').style.display="block";
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:10.125vw`;
                                if(mobileWidth<700)
                                {
                                    showinMobile4(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText.innerText===month12)
                        {
                            // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3vw`;
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        break;  
                    }
                }
                break;
            }
        case 'Month':
            {
                updateValue2(startMText,minusVal);
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                let monthText1 = `${Mname[0].innerText} ${monthYear}`.toLowerCase();
                let monthText2 = `${Mname[1].innerText} ${monthYear}`.toLowerCase();
                let monthText3 = `${Mname[2].innerText} ${monthYear}`.toLowerCase();
                let monthText4 = `${Mname[3].innerText} ${monthYear}`.toLowerCase();
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                switch(true)
                {
                    case (daysCount<=val1):
                    {
                        if(monthText1===month1 || monthText2===month1 || monthText3===month1 || monthText4===month1)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            getTCoorrds(i, startTime, projInd, mileInd, ganttTimeline, Mname);
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>val1 && daysCount<=val2):
                    {
                        if(monthText1===month1 || monthText2===month1 || monthText3===month1 || monthText4===month1)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            let startMonthIndex = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(5,2);
                            let mulNum = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(8,2);
                            getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Mname);
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month5 || monthText1===month4 || monthText1===month3 || monthText1===month2)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                    case (daysCount>val2 && daysCount<=val3):
                    {
                        if((monthText1===month1 && monthText2===month2 && monthText3===month3 && monthText4===month4) 
                        || (monthText1===month5 && monthText2===month6 && monthText3===month7 && monthText4===month8))
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            let startMonthIndex = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(5,2);
                            let mulNum = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(8,2);
                            getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Mname);
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(monthText1===month9 && monthText2===month10 && monthText3===month11 && monthText4===month12)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex);
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                }
                break;
            }
        case 'Quarter':
            {
                updateValue3(startMText,minusVal);
                let Qname = selectGantt.querySelectorAll('.tablegantt tr th.VQuarter');
                let quarter1 = `${Qname[0].innerText}`;
                month1 = month1.toLowerCase(), month2 = month2.toLowerCase(), month3 = month3.toLowerCase(),
                month4 = month4.toLowerCase(), month5 = month5.toLowerCase(), month6 = month6.toLowerCase(),
                month7 = month7.toLowerCase(), month8 = month8.toLowerCase(), month9 = month9.toLowerCase(),
                month10 = month10.toLowerCase(), month11 = month11.toLowerCase(), month12 = month12.toLowerCase();
                let quarterText1;
                if(quarter1==='Q1')
                {
                    quarterText1 = `january ${quarterYear}`;
                }
                else if(quarter1==='Q3')
                {
                    quarterText1 = `july ${quarterYear}`;
                }
                switch(true){
                    case (daysCount<=val1):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            getTCoorrds(i, startTime, projInd, mileInd, ganttTimeline, Qname);
                                if(mobileWidth<700)
                                {
                                    showinMobile1(i,daysCount,ganttTimeline);
                                }
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;
                    }      
                    case (daysCount>val1 && daysCount<=val2):
                    {
                        if(quarterText1===month1)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            let startMonthIndex = projectData[i].pstartdate.substr(5,2);
                            let mulNum = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(8,2);
                            getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, Qname);
                                if(mobileWidth < 700)
                                {
                                    showinMobile1(i,totWidth,ganttTimeline);
                                }
                        }
                        else if(quarterText1===month7)
                        {
                            ganttTimeline[i].closest('.task').style.display="block";
                            remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i, endMonthIndex); 
                        }
                        else
                        {
                            ganttTimeline[i].closest('.task').style.display="none";
                        }
                        break;  
                    }
                }
            break;
        }          
    }   
}
function getNumericMonth(startDate)
{
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
        'Dec'].indexOf(startDate)).padStart(2, '0'))
}
function getMonthAppear()
{
    switch(selectInput)
    {
        case 'Days' :
        {
            let monthAppear = monthText.innerText.split(' ');
            return monthAppear[1];
        }
        case 'Month' :
        {
            let monthAppear = monthText.innerText;
            return monthAppear;
        }
        case 'Quarter' :
        {
            let monthAppear = monthText.innerText;
            return monthAppear;
        }
    }
    
}
function getTimeline(endTimeline,year2, endDate)
{
    {
        if(year2<endDate)
        {
            return endTimeline = 31;
        }
        else
        {
            return endTimeline;
        }
    }   
}
function checkPrevYear(year2,prevYear2,i)
{
    let booleanYear = true;
    if(year2>prevYear2)
    {
        ganttTimeline[i].closest('.first1').style.display="none";
        booleanYear=false;            
    }
    return booleanYear;
}
function checkMilePrevYear(year2,prevYear2,i,ganttTimeline)
{
    let booleanYear = true;
    if(year2>prevYear2)
    {
        ganttTimeline[i].closest('.Milestone').style.display="none";
        booleanYear=false;            
    }
    return booleanYear;
}
function checkTaskPrevYear(year2,prevYear2,i,ganttTimeline)
{
    let booleanYear = true;
    if(year2>prevYear2)
    {
        ganttTimeline[i].closest('.task').style.display="none";
        booleanYear=false;            
    }
    return booleanYear;
}
function checkTargetDate2(date2,i,daysCount,year2)
{
    let year1 = projectData[i].pstartdate.substr(0,4);
    if(year2>year1)
    {
        let currentDate= new Date(`${year2}/01/01`);
        let a = Math.floor(date2.getTime()/(3600*24*1000));
        let b = Math.floor(currentDate.getTime()/(3600*24*1000));
        daysCount = a - b;
        if(daysCount>365)
        {
            return daysCount=365;
        }
        else
        {
            return daysCount;
        } 
    }
    else
    {
        return daysCount;
    }
}
function checkTargetDate(date1,date2,daysCount, year2)
{
    date2 = new Date(date2);
    let TargetDate = new Date(`${year2}/12/31`);
    if(date2.getTime()>TargetDate.getTime())
    {
        var d1 = Math.floor(TargetDate.getTime()/(3600*24*1000));
        var d2 = Math.floor(date1.getTime()/(3600*24*1000));
        return daysCount = d1 - d2;
    }
    else
    {
        return daysCount;
    }
}
function getMonthName(monthIndex, year2, year1)
{
    let year = year2;
    if(year2>year1)
    {
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
    }
    else
    {
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
function updateYear(monthIndex, year)
{
    if(monthIndex > 11)
    {
        let newyear = +year;
        year = newyear + 1;
        return year;
    }
    else
    {
        return year;
    }
}
function checkMonthIndex(monthIndex)
{
    if(monthIndex>11)
    {
        return monthIndex = 0;
    }
    else
    {
        return +monthIndex;
    }
}
function updateValue(text,minusVal)
{
    switch(true)
    {
        case (text.includes('Jan')):
            {
                val1 = 30 - minusVal;
                val2 = val1 + 27;
                val3 = val2 + 30;
                val4 = val3 + 29;
                val5 = val4 + 30;
                val6 = val5 + 29;
                val7 = val6 + 30;
                val8 = val7 + 30;
                val9 = val8 + 29;
                val10 = val9 + 30;
                val11 = val10 + 29;
                val12 = 365;
                break;
            }
        case (text.includes('Feb')):
            {
                val1 = 27 - minusVal;
                val2 = val1 + 30;
                val3 = val2 + 29;
                val4 = val3 + 30;
                val5 = val4 + 29;
                val6 = val5 + 30;
                val7 = val6 + 30;
                val8 = val7 + 29;
                val9 = val8 + 30;
                val10 = val9 + 29;
                val11 = val10 + 30;
                break;
            }
        case (text.includes('Mar')):
            {
                val1 = 30 - minusVal;
                val2 = val1 + 29;
                val3 = val2 + 30;
                val4 = val3 + 29;
                val5 = val4 + 30;
                val6 = val5 + 30;
                val7 = val6 + 29;
                val8 = val7 + 30;
                val9 = val8 + 29;
                val10 = val9 + 30;
                break;
            }
        case (text.includes('Apr')):
            {
                val1 = 29 - minusVal;
                val2 = val1 + 30;
                val3 = val2 + 29;
                val4 = val3 + 30;
                val5 = val4 + 30;
                val6 = val5 + 29;
                val7 = val6 + 30;
                val8 = val7 + 29;
                val9 = val8 + 30;
                break;
            }
        case (text.includes('May')):
            {
                val1 = 30 - minusVal;
                val2 = val1 + 29;
                val3 = val2 + 30;
                val4 = val3 + 30;
                val5 = val4 + 29;
                val6 = val5 + 30;
                val7 = val6 + 29;
                val8 = val7 + 30;
                break;
            }
        case (text.includes('Jun')):
            {
                val1 = 29 - minusVal;
                val2 = val1 + 30;
                val3 = val2 + 30;
                val4 = val3 + 29;
                val5 = val4 + 30;
                val6 = val5 + 29;
                val7 = val6 + 30;
                break;
            }
        case (text.includes('Jul')):
            {
                val1 = 30 - minusVal;
                val2 = val1 + 30;
                val3 = val2 + 29;
                val4 = val3 + 30;
                val5 = val4 + 29;
                val6 = val5 + 30;
                break;
            }
        case (text.includes('Aug')):
            {
                val1 = 30 - minusVal;
                val2 = val1 + 29;
                val3 = val2 + 30;
                val4 = val3 + 29;
                val5 = val4 + 30;
                break;
            }
        case (text.includes('Sep')):
            {
                val1 = 29 - minusVal;
                val2 = val1 + 30;
                val3 = val2 + 29;
                val4 = val3 + 30;
                break;
            }
        case (text.includes('Oct')):
            {
                val1 = 30 - minusVal;
                val2 = val1 + 29;
                val3 = val2 + 30;
                break;
            }
        case (text.includes('Nov')):
            {
                val1 = 29 - minusVal;
                val2 = val1 + 30;
                break;
            }
        case (text.includes('Dec')):
            {
                val1 = 30 - minusVal;
                break;
            }                                            
    }
}
function updateValue2(text,minusVal)
{
    minusVal=+minusVal;
    switch(true)
    {
        case (text.includes('Jan')):
            {
                val1 = 119 - minusVal;
                val2 = val1 + 123;
                val3 = val2 + 122;
                break;
            }
        case (text.includes('Feb')):
            {
                val1 = 119 - (minusVal + 31);
                val2 = val1 + 123;
                val3 = val2 + 122;
                break;
            }
        case (text.includes('Mar')):
            {
                val1 = 119 - (minusVal + 59);
                val2 = val1 + 123;
                val3 = val2 + 122;
                break;
            }
        case (text.includes('Apr')):
            {
                val1 = 119 - (minusVal + 90);
                val2 = val1 + 123;
                val3 = val2 + 122;
                break;
            }
        case (text.includes('May')):
            {
                val1 = 123 - minusVal;
                val2 = val1 + 122;
                break;
            }
        case (text.includes('Jun')):
            {
                val1 = 123 - ( minusVal + 31);
                val2 = val1 + 122;
                break;
            }
        case (text.includes('Jul')):
            {
                val1 = 123 - (minusVal + 61);
                val2 = val1 + 122;
                break;
            }
        case (text.includes('Aug')):
            {
                val1 = 123 - (minusVal + 92);
                val2 = val1 + 122;
                break;
            }
        case (text.includes('Sep')):
            {
                val1 = 122 - minusVal;
                break;
            }
        case (text.includes('Oct')):
            {
                val1 = 122 - (minusVal + 30);
                break;
            }
        case (text.includes('Nov')):
            {
                val1 = 122 - (minusVal + 61);
                break;
            }
        case (text.includes('Dec')):
            {
                val1 = 122 - (minusVal + 91);
                break;
            }                                            
    }
}
function updateValue3(text,minusVal)
{
    minusVal=+minusVal;
    switch(true)
    {
        case (text.includes('Jan')):
            {
                val1 = 181 - minusVal;
                val2 = val1 + 184;
                break;
            }
        case (text.includes('Feb')):
            {
                val1 = 181 - (minusVal + 31);
                val2 = val1 + 184;
                break;
            }
        case (text.includes('Mar')):
            {
                val1 = 181 - (minusVal + 59);
                val2 = val1 + 184;
                break;
            }
        case (text.includes('Apr')):
            {
                val1 = 181 - (minusVal + 90);
                val2 = val1 + 184;
                break;
            }
        case (text.includes('May')):
            {
                val1 = 181 - (minusVal + 120);
                val2 = val1 + 184;
                break;
            }
        case (text.includes('Jun')):
            {
                val1 = 181 - ( minusVal + 151);
                val2 = val1 + 184;
                break;
            }
        case (text.includes('Jul')):
            {
                val1 = 184 - minusVal;
                break;
            }
        case (text.includes('Aug')):
            {
                val1 = 184 - (minusVal + 31);
                break;
            }
        case (text.includes('Sep')):
            {
                val1 = 184 - (minusVal + 62);
                break;
            }
        case (text.includes('Oct')):
            {
                val1 = 184 - (minusVal + 92);
                break;
            }
        case (text.includes('Nov')):
            {
                val1 = 184 - (minusVal + 123);
                break;
            }
        case (text.includes('Dec')):
            {
                val1 = 184 - (minusVal + 153);
                break;
            }                                            
    }
}
function getCommonWidth(i,VDname)
{
    let startMonthIndex = projectData[i].pstartdate.substr(5,2);
    let endMonthIndex = projectData[i].penddate.substr(5,2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endNum = +projectData[i].penddate.substr(8,2);

    switch(selectInput)
    {
        case 'Month':
            {
                switch(true)
                {
                    case (VDname[0].innerText === startMonthName):
                    {
                        if(endMonthName === VDname[0].innerText)
                        {
                            return endNum * 0.63629032258;    
                        }
                        else if(endMonthName === VDname[1].innerText)
                        {
                            return 19.725 + (endNum * (19.725/28));      
                        }
                        else if(endMonthName === VDname[2].innerText)
                        {
                            return 39.45 + (endNum * (19.725/31));     
                        }
                        else if(endMonthName === VDname[3].innerText)
                        {
                            return 59.175 + (endNum * (19.725/30));       
                        }
                        break;
                    }
                    default:
                        {
                            break;
                        }
                }
                break;
            }    
        case 'Quarter':
            {
                switch(true)
                {
                    case ((VDname[0].innerText === 'Q1') || (VDname[0].innerText === 'Q3')):
                    {
                        if(endMonthName === 'JANUARY')
                        {
                            return endNum * 0.424193548;    
                        }
                        else if(endMonthName === 'FEBRUARY')
                        {
                            return 13.15 + (endNum * (13.15/28));      
                        }
                        else if(endMonthName === 'MARCH')
                        {
                            return 26.3 + (endNum * (13.15/31));     
                        }
                        else if(endMonthName === 'APRIL')
                        {
                            return 39.45 + (endNum * (13.15/30));       
                        }
                        else if(endMonthName === 'MAY')
                        {
                            return 52.6 + (endNum * (13.15/31));       
                        }
                        else if(endMonthName === 'JUNE')
                        {
                            return 65.75 + (endNum * (13.15/30));       
                        }
                        break;
                    }
                    default:
                        {
                            break;
                        }
                }
                break;
            }
    }
}
function getPCoorrds(i, startTime, ganttTimeline, VDname)
{
    let startMonthIndex = projectData[i].pstartdate.substr(5,2);
    let endMonthIndex = projectData[i].penddate.substr(5,2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endNum = +projectData[i].penddate.substr(8,2);
    let minusNum = +projectData[i].pstartdate.substr(8,2);
    let factor1 = getFactor1(endMonthName);
    getCommonCoords(VDname, startMonthName, endMonthName, endNum, minusNum, startTime, i, factor1, ganttTimeline)
}
function getMCoorrds(i, startTime, projInd, ganttTimeline, VDname)
{
    let startMonthIndex = milestoneData[projInd].project[i].mstartdate.substr(5,2);
    let endMonthIndex = milestoneData[projInd].project[i].menddate.substr(5,2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endNum = +milestoneData[projInd].project[i].menddate.substr(8,2);
    let minusNum = +milestoneData[projInd].project[i].mstartdate.substr(8,2);
    getCommonCoords(VDname, startMonthName, endMonthName, endNum, minusNum, startTime, i, ganttTimeline)
}
function getTCoorrds(i, startTime, projInd, mileInd, ganttTimeline, VDname)
{
    let startMonthIndex = taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(5,2);
    let endMonthIndex = taskData[projInd].milestone[mileInd].task[i].tenddate.substr(5,2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let endMonthName = month[+endMonthIndex - 1].toUpperCase();
    let endNum = +taskData[projInd].milestone[mileInd].task[i].tenddate.substr(8,2);
    let minusNum = +taskData[projInd].milestone[mileInd].task[i].tstartdate.substr(8,2);
    getCommonCoords(VDname, startMonthName, endMonthName, endNum, minusNum, startTime, i, ganttTimeline)
}
function getFactor1(endMonthName)
{
    switch(selectInput)
    {
        case 'Month':
            {
                if(endMonthName==='JANUARY')
                {
                    return 19.725/31; 
                }
                else if(endMonthName==='FEBRUARY')
                {
                    return 19.725/28; 
                }
                else if(endMonthName==='MARCH')
                {
                    return 19.725/31; 
                }
                else if(endMonthName==='APRIL')
                {
                    return 19.725/30; 
                }
                else if(endMonthName==='MAY')
                {
                    return 19.725/31; 
                }
                else if(endMonthName==='JUNE')
                {
                    return 19.725/30; 
                }
                else if(endMonthName==='JULY')
                {
                    return 19.725/31; 
                }
                else if(endMonthName==='AUSGUST')
                {
                    return 19.725/31; 
                }
                else if(endMonthName==='SEPTEMBER')
                {
                    return 19.725/30; 
                }
                else if(endMonthName==='OCTOBER')
                {
                    return 19.725/31; 
                }
                else if(endMonthName==='NOVEMBER')
                {
                    return 19.725/30; 
                }
                else if(endMonthName==='DECEMBER')
                {
                    return 19.725/31; 
                }
                break;
            }
        case 'Quarter':
            {
                if(endMonthName==='JANUARY')
                {
                    return 13.15/31; 
                }
                else if(endMonthName==='FEBRUARY')
                {
                    return 13.15/28; 
                }
                else if(endMonthName==='MARCH')
                {
                    return 13.15/31; 
                }
                else if(endMonthName==='APRIL')
                {
                    return 13.15/30; 
                }
                else if(endMonthName==='MAY')
                {
                    return 13.15/31; 
                }
                else if(endMonthName==='JUNE')
                {
                    return 13.15/30; 
                }
                else if(endMonthName==='JULY')
                {
                    return 13.15/31; 
                }
                else if(endMonthName==='AUSGUST')
                {
                    return 13.15/31; 
                }
                else if(endMonthName==='SEPTEMBER')
                {
                    return 13.15/30; 
                }
                else if(endMonthName==='OCTOBER')
                {
                    return 13.15/31; 
                }
                else if(endMonthName==='NOVEMBER')
                {
                    return 13.15/30; 
                }
                else if(endMonthName==='DECEMBER')
                {
                    return 13.15/31; 
                }
                break;
            }    
    }
}
function getCommonCoords(VDname, startMonthName, endMonthName, endNum, minusNum, startTime, i, factor1, ganttTimeline)
{
    switch(selectInput)
    {
        case 'Month':
            {
                switch(true)
                {
                    case (VDname[0].innerText === startMonthName):
                    {
                        if(endMonthName === VDname[0].innerText)
                        {
                            let fval = 0;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === VDname[1].innerText)
                        {
                            let fval = 19.725;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === VDname[2].innerText)
                        {
                            let fval = 39.45;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === VDname[3].innerText)
                        {
                            let fval = 59.175;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);       
                        }
                        break;
                    }
                    case (VDname[1].innerText === startMonthName):
                    {
                        if(endMonthName === VDname[1].innerText)
                        {
                            let fval = 0;
                            let fval2 = 19.725;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === VDname[2].innerText)
                        {
                            let fval = 19.725;
                            let fval2 = 19.725;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === VDname[3].innerText)
                        {
                            let fval = 39.45;
                            let fval2 = 19.725;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        break;
                    }
                    case (VDname[2].innerText === startMonthName):
                    {
                        if(endMonthName === VDname[2].innerText)
                        {
                            let fval = 0;
                            let fval2 = 39.45;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === VDname[3].innerText)
                        {
                            let fval = 19.725;
                            let fval2 = 39.45;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        break;
                    }
                    case (VDname[3].innerText === startMonthName):
                    {
                        if(endMonthName === VDname[3].innerText)
                        {
                            let fval = 0;
                            let fval2 = 59.175;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        break;
                    }
                }
                break;
            }
        case 'Quarter':
            {
                switch(true)
                {
                    case ((VDname[0].innerText === 'Q1' && startMonthName === 'JANUARY')
                    || (VDname[0].innerText === 'Q3' && startMonthName === 'JULY')):
                    {
                        if(endMonthName === 'JANUARY' || endMonthName === 'JULY')
                        {
                            let fval = 0;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === 'FEBRUARY' || endMonthName === 'AUGUST')
                        {
                            let fval = 13.15;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'MARCH' || endMonthName === 'SEPTEMBER')
                        {
                            let fval = 26.3;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'APRIL' || endMonthName === 'OCTOBER')
                        {
                            let fval = 39.45;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);       
                        }
                        else if(endMonthName === 'MAY' || endMonthName === 'NOVEMBER')
                        {
                            let fval = 52.6;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);       
                        }
                        else if(endMonthName === 'JUNE' || endMonthName === 'DECEMBER')
                        {
                            let fval = 65.75;
                            let fval2 = 0;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);       
                        }
                        break;
                    }
                    case ((VDname[0].innerText === 'Q1' && startMonthName==='FEBRUARY') ||
                    (VDname[0].innerText === 'Q3' && startMonthName==='AUGUST')):
                    {
                        if(endMonthName === 'FEBRUARY' || endMonthName === 'AUGUST')
                        {
                            let fval = 0;
                            let fval2 = 13.15;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === 'MARCH' || endMonthName === 'SEPTEMBER')
                        {
                            let fval = 13.15;
                            let fval2 = 13.15;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'APRIL' || endMonthName === 'OCTOBER')
                        {
                            let fval = 26.3;
                            let fval2 = 13.15;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'MAY' || endMonthName === 'NOVEMBER')
                        {
                            let fval = 39.45;
                            let fval2 = 13.15;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'JUNE' || endMonthName === 'DECEMBER')
                        {
                            let fval = 52.6;
                            let fval2 = 13.15;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        break;
                    }
                    case ((VDname[0].innerText === 'Q1' && startMonthName==='MARCH') ||
                    (VDname[0].innerText === 'Q3' && startMonthName==='SEPTEMBER')):
                    {
                        if(endMonthName === 'MARCH' || endMonthName === 'SEPTEMBER')
                        {
                            let fval = 0;
                            let fval2 = 26.3;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === 'APRIL' || endMonthName === 'OCTOBER')
                        {
                            let fval = 13.15;
                            let fval2 = 26.3;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'MAY' || endMonthName === 'NOEMBER')
                        {
                            let fval = 26.3;
                            let fval2 = 26.3;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'JUNE' || endMonthName === 'DECEMBER')
                        {
                            let fval = 39.45;
                            let fval2 = 26.3;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        break;
                    }
                    case ((VDname[1].innerText === 'Q2' && startMonthName==='APRIL') ||
                    (VDname[1].innerText === 'Q4' && startMonthName==='OCTOBER')):
                    {
                        if(endMonthName === 'APRIL' || endMonthName === 'OCTOBER')
                        {
                            let fval = 0;
                            let fval2 = 39.45;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === 'MAY' || endMonthName === 'NOVEMBER')
                        {
                            let fval = 13.15;
                            let fval2 = 39.45;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        else if(endMonthName === 'JUNE' || endMonthName === 'DECEMBER')
                        {
                            let fval = 26.3;
                            let fval2 = 39.45;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        break;
                    }
                    case ((VDname[1].innerText === 'Q2' && startMonthName==='MAY') ||
                    (VDname[1].innerText === 'Q4' && startMonthName==='NOVEMBER')):
                    {
                        if(endMonthName === 'NOVEMBER')
                        {
                            let fval = 0;
                            let fval2 = 52.6;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        else if(endMonthName === 'DECEMBER')
                        {
                            let fval = 13.15;
                            let fval2 = 52.6;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);      
                        }
                        break;
                    }
                    case ((VDname[1].innerText === 'Q2' && startMonthName==='JUNE') ||
                    (VDname[1].innerText === 'Q4' && startMonthName==='DECEMBER')):
                    {
                        if(endMonthName === 'DECEMBER')
                        {
                            let fval = 0;
                            let fval2 = 65.75;
                            setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline);     
                        }
                        break;
                    }
                }     
                break;
            }    
    }
}
function setRemWidth(minusNum, endNum, i, startTime, fval, fval2, factor1, ganttTimeline)
{
    let remWidth = `${Math.abs((fval - (minusNum * factor1)) + (endNum * factor1))}`;
    remWidth = +remWidth;
    ganttTimeline[i].style.cssText=`margin-left:${(minusNum* factor1)+(10.125 + fval2)}vw; width:${(remWidth).toFixed(5)}vw`;
}
function getAnotherCoorrds(i, startTime, startMonthIndex, ganttTimeline, mulNum, VDname)
{
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    let factor2 = getfactor2();
    switch(selectInput)
    {
        case 'Month':
        {
            switch(true)
            {
                case (VDname[0].innerText === startMonthName):
                {
                    let fval = 19.725;
                    let fval2 = 59.175;
                    let fval3 = 10.125;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (VDname[1].innerText === startMonthName):
                {
                    let fval = 19.725;
                    let fval2 = 39.45;
                    let fval3 = 29.85;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (VDname[2].innerText === startMonthName):
                {
                    let fval = 19.725;
                    let fval2 = 19.725;
                    let fval3 = 49.575;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (VDname[3].innerText === startMonthName):
                {
                    let fval = 19.725;
                    let fval2 = 0;
                    let fval3 = 69.3;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
            }
            break;
        }
        case 'Quarter':
        {
            switch(true)
            {
                case (startMonthName === 'JANUARY'):
                {
                    let fval = 13.15;
                    let fval2 = 65.575;
                    let fval3 = 10.125;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (startMonthName === 'FEBRUARY'):
                {
                    let fval = 13.15;
                    let fval2 = 52.6;
                    let fval3 = 23.275;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (startMonthName === 'MARCH'):
                {
                    let fval = 13.15;
                    let fval2 = 39.45;
                    let fval3 = 36.425;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (startMonthName === 'APRIL'):
                {
                    let fval = 13.15;
                    let fval2 = 26.3;
                    let fval3 = 49.575;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (startMonthName === 'MAY'):
                {
                    let fval = 13.15;
                    let fval2 = 13.15;
                    let fval3 = 62.725;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
                case (startMonthName === 'JUNE'):
                {
                    let fval = 13.15;
                    let fval2 = 0;
                    let fval3 = 75.875;
                    setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2);
                    break;
                }
            }
            break;
        }
    }
}
function getfactor2(startMonthName)
{
    switch(selectInput)
    {
        case 'Month':
            {
                if(startMonthName==='JANUARY')
                {
                    return 19.725/31; 
                }
                else if(startMonthName==='FEBRUARY')
                {
                    return 19.725/28; 
                }
                else if(startMonthName==='MARCH')
                {
                    return 19.725/31; 
                }
                else if(startMonthName==='APRIL')
                {
                    return 19.725/30; 
                }
                else if(startMonthName==='MAY')
                {
                    return 19.725/31; 
                }
                else if(startMonthName==='JUNE')
                {
                    return 19.725/30; 
                }
                else if(startMonthName==='JULY')
                {
                    return 19.725/31; 
                }
                else if(startMonthName==='AUSGUST')
                {
                    return 19.725/31; 
                }
                else if(startMonthName==='SEPTEMBER')
                {
                    return 19.725/30; 
                }
                else if(startMonthName==='OCTOBER')
                {
                    return 19.725/31; 
                }
                else if(startMonthName==='NOVEMBER')
                {
                    return 19.725/30; 
                }
                else if(startMonthName==='DECEMBER')
                {
                    return 19.725/31; 
                }
                break;
            }
        case 'Quarter':
            {
                if(startMonthName==='JANUARY')
                {
                    return 13.15/31; 
                }
                else if(startMonthName==='FEBRUARY')
                {
                    return 13.15/28; 
                }
                else if(startMonthName==='MARCH')
                {
                    return 13.15/31; 
                }
                else if(startMonthName==='APRIL')
                {
                    return 13.15/30; 
                }
                else if(startMonthName==='MAY')
                {
                    return 13.15/31; 
                }
                else if(startMonthName==='JUNE')
                {
                    return 13.15/30; 
                }
                else if(startMonthName==='JULY')
                {
                    return 13.15/31; 
                }
                else if(startMonthName==='AUSGUST')
                {
                    return 13.15/31; 
                }
                else if(startMonthName==='SEPTEMBER')
                {
                    return 13.15/30; 
                }
                else if(startMonthName==='OCTOBER')
                {
                    return 13.15/31; 
                }
                else if(startMonthName==='NOVEMBER')
                {
                    return 13.15/30; 
                }
                else if(startMonthName==='DECEMBER')
                {
                    return 13.15/31; 
                }
                break;
            }    
    }
}
function setAnotherRemWidth(mulNum, ganttTimeline, i, fval, fval2, fval3, factor2)
{
    let remWidth = `${Math.abs((fval - (mulNum * factor2)) + fval2)}`;
    remWidth = +remWidth;
    ganttTimeline[i].style.cssText=`margin-left:${(mulNum* factor2)+fval3}vw; width:${(remWidth).toFixed(5)}vw`;
}
function getWireCoords(i, startTime, projInd, ganttTimeline)
{
    let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
    let startMonthIndex = +milestoneData[projInd].project[i].mstartdate.substr(5,2);
    let startMonthName = month[+startMonthIndex - 1].toUpperCase();
    switch(true)
    {
        case (Mname[0].innerText === startMonthName):
        {
            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime* 0.63629032258)+10.125}vw;`;
            break;
        }
        case (Mname[1].innerText === startMonthName):
        {
            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime* 0.63629032258)+29.85}vw;`;
            break;
        }
        case (Mname[2].innerText === startMonthName):
        {
            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime* 0.63629032258)+49.575}vw;`;
            break;
        }
        case (Mname[3].innerText === startMonthName):
        {
            ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime* 0.63629032258)+69.3}vw;`;
            break;
        }
    }
}

function remainDaysCount(endTimeline,ganttTimeline,mobileWidth,i,endMonthIndex)
{
    switch(selectInput)
    {
        case 'Days':
            {
                ganttTimeline[i].closest('.first1').style.display="block";
                ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${endTimeline * 2.517}vw`;
                if(mobileWidth<700)
                {
                    showinMobile3(i,endTimeline,ganttTimeline);
                }
                break;
            }
        case 'Month':
            {
                let Mname = selectGantt.querySelectorAll('.tablegantt tr th.VDate');
                let endMonthName = month[+endMonthIndex - 1].toUpperCase();
                switch(true)
                {
                    case (Mname[0].innerText === endMonthName):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * 0.636290323))
                        .toFixed(5)}vw`;
                        break;
                    }
                    case (Mname[1].innerText === endMonthName):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * 0.636290323)+19.725)
                        .toFixed(5)}vw`;
                        break;
                    }
                    case (Mname[2].innerText === endMonthName):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * 0.636290323)+39.45)
                        .toFixed(5)}vw`;
                        break;
                    }
                    case (Mname[3].innerText === endMonthName):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * 0.636290323)
                        + 59.175).toFixed(5)}vw`;
                        break;
                    }
                }
                break;
            }
        case 'Quarter':
            {
                let endMonthName = month[+endMonthIndex - 1].toUpperCase();
                switch(true)
                {
                    case (endMonthName === 'JULY'):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * (13.15/31)))
                        .toFixed(5)}vw`;
                        break;
                    }
                    case (endMonthName === 'AUGUST'):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * (13.15/31))+13.15)
                        .toFixed(5)}vw`;
                        break;
                    }
                    case (endMonthName === 'SEPTEMBER'):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * (13.15/30))+26.3)
                        .toFixed(5)}vw`;
                        break;
                    }
                    case (endMonthName === 'OCTOBER'):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * (13.15/31))
                        + 39.45).toFixed(5)}vw`;
                        break;
                    }
                    case (endMonthName === 'NOVEMBER'):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * (13.15/30))
                        + 52.6).toFixed(5)}vw`;
                        break;
                    }
                    case (endMonthName === 'DECEMBER'):
                    {
                        ganttTimeline[i].style.cssText=`margin-left:10.125vw; width:${((endTimeline * (13.15/31))
                        + 65.75).toFixed(5)}vw`;
                        break;
                    }
                }
                break;
            }        
    }
}
function showinMobile1(i,multiplyTerm,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:19.69vw; width:${multiplyTerm *8}vw`;
}
function showinMobile2(i,startTime, multiplyTerm,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:${(startTime*8)+19.69}vw; width:${multiplyTerm *8}vw`;
}
function showinMobile3(i,endTimeline,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:19.69vw; width:${endTimeline * 8}vw`;
}
function showinMobile4(i,multiplyTerm,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:19.69vw; width:${multiplyTerm *8}vw`;
}

function givebackground(i,daysCount,ganttTimeline)
{
    ganttTimeline[i].style.backgroundColor=`${projectData[i].statusclass}`;
    ganttTimeline[i].innerText=`${projectData[i].planned} ${daysCount +1} days`;
    i++;
}
function giveMilestonebG(i,j,daysCount,ganttTimeline)
{
    ganttTimeline[i].style.backgroundColor=`${milestoneData[j].project[i].statusclass}`;
    ganttTimeline[i].innerText=`${milestoneData[j].project[i].planned} ${daysCount +1} days`;
    i++;
}

// showing project name on hover
(function makingTooltip()
{
    hoverProject2.forEach((hover)=>
    {
        let p = hover.innerHTML;
        if(p.length>25)
        {
            hover.setAttribute('data-bs-toggle','tooltip');
            hover.setAttribute('data-bs-placement','bottom');
            hover.setAttribute('title',`${p}`);
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
            })
        }
    })
}());

for(let i=0;i<ganttTimeline.length;i++)
{
    ['mouseover','mouseout'].forEach((e)=>
    {
        ganttTimeline[i].index=i;
        ganttTimeline[i].addEventListener(e,showTimelineTip);
    })
}
function showTimelineTip(e)
{
    if(e.type==="mouseover")
    {
       let projdataInd=this.index;
       let tip = e.target.closest('.gantt').querySelector('.timelinetooltip');
       let top=e.clientY;
       let left=e.clientX;
       tip.style.cssText=`top:${top}px; left:${left}px; display:block;`;
       let h4 = tip.querySelector('h4');
       let p1 = tip.querySelector('p:nth-child(2)');
       let p2 = tip.querySelector('p:nth-child(3)');
       let p3 = tip.querySelector('p:nth-child(4)');
       let p4 = tip.querySelector('p:nth-child(5)');
       let p5 = tip.querySelector('p:nth-child(6)');
       let p6 = tip.querySelector('p:nth-child(7)');
       h4.innerText=`Wireframe: ${projectData[projdataInd].startMonth}`;
       p1.innerText=`Duration: ${projectData[projdataInd].duration}`;
       p2.innerText=`Percentage Done: ${projectData[projdataInd].percentage}`;
       p3.innerText=`Status: ${projectData[projdataInd].statustext}`;
       p4.innerText=`Program Manager: ${projectData[projdataInd].programmanager}`;
       p5.innerText=`Domain Lead: ${projectData[projdataInd].domainlead}`;
       p6.innerText=`Technical Lead: ${projectData[projdataInd].technicallead}`;
    }
    else if(e.type==="mouseout")
    {
        let tip = e.target.closest('.gantt').querySelector('.timelinetooltip');
        tip.style.display="none";
    }
}

//appearing milestone tooltip
milesPDiv.forEach((parent,ind)=>
{
    parent.addEventListener('click',(e)=>
    {
        mileAppear = e.target.closest('.first1').querySelectorAll('.card .milestonediv11');
        for(let i=0;i<mileAppear.length;i++)
        {
            ['mouseover','mouseout','click'].forEach((e)=>
            {
                mileAppear[i].index=i;
                mileAppear[i].addEventListener(e,showMilestoneTip);
            })
        }
        function showMilestoneTip(e)
        {
            if(e.type==="mouseover")
            {
            miledataInd=this.index;
            let tip = e.target.closest('.gantt').querySelector('.milestonetooltip');
            let top=e.clientY;
            let left=e.clientX;
            tip.style.cssText=`top:${top}px; left:${left}px; display:block;`;
            let h4 = tip.querySelector('h4');
            let p1 = tip.querySelector('p:nth-child(2)');
            let p2 = tip.querySelector('p:nth-child(3)');
            let p3 = tip.querySelector('p:nth-child(4)');
            let p4 = tip.querySelector('p:nth-child(5)');
            let p5 = tip.querySelector('p:nth-child(6)');
            h4.innerText=`${milestoneData[ind].project[miledataInd].milestonename} ${milestoneData[ind].project[miledataInd].startExactDay}`;
            p1.innerText=`Duration: ${milestoneData[ind].project[miledataInd].duration}`;
            p2.innerText=`Percentage Done: ${milestoneData[ind].project[miledataInd].percentage}`;
            p3.innerText=`Status: ${milestoneData[ind].project[miledataInd].statustext}`;
            p4.innerText=`Total Tasks: ${milestoneData[ind].project[miledataInd].tasks_count}`;
            p5.innerText=`Tasks Completed: ${milestoneData[ind].project[miledataInd].tasks_done}`;
            }
            else if(e.type==="mouseout")
            {
                let tip = e.target.closest('.gantt').querySelector('.milestonetooltip');
                tip.style.display="none";
            }
            else if(e.type==="click")
            {
                let tip = e.target.closest('.Milestone').querySelectorAll('.task');
                for(let j=0; j<tip.length; j++)
                {
                    ['mouseover','mouseout'].forEach((e)=>
                    {
                        tip[j].tipind = j;
                        tip[j].addEventListener(e,taskTooltip);
                    })
                }
                function taskTooltip(e)
                {
                    if(e.type==='mouseover')
                    {
                        let taskDataInd = this.tipind;
                        let tip = e.target.closest('.gantt').querySelector('.tasktooltip');
                        let top=e.clientY;
                        let left=e.clientX;
                        tip.style.cssText=`top:${top}px; left:${left}px; display:block;`;
                        let h4 = tip.querySelector('h4');
                        let p1 = tip.querySelector('p:nth-child(2)');
                        let p2 = tip.querySelector('p:nth-child(3)');
                        let p3 = tip.querySelector('p:nth-child(4)');
                        h4.innerText=`${taskData[ind].milestone[miledataInd].task[taskDataInd].taskname} ${taskData[ind].milestone[miledataInd].task[taskDataInd].startExactDay}`;
                        p1.innerText=`Duration: ${taskData[ind].milestone[miledataInd].task[taskDataInd].duration}`;
                        p2.innerText=`Percentage Done: ${taskData[ind].milestone[miledataInd].task[taskDataInd].percentage}`;
                        p3.innerText=`Status: ${taskData[ind].milestone[miledataInd].task[taskDataInd].statustext}`;
                    }
                    else if(e.type==='mouseout')
                    {
                        let tip = e.target.closest('.gantt').querySelector('.tasktooltip');
                        tip.style.display="none";
                    }
                }
            }
        }
    })
})