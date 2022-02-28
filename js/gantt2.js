const selectGantt = document.querySelector('.gantt');
const prevGantt = document.querySelector('.gantt .slide_bottom .img1');
const nextGantt = document.querySelector('.gantt .slide_bottom .img2');
const ganttAppend = document.querySelector('.gantt .workloadrow1 > .col-md-12');
const tableprogAppend = document.querySelector('.gantt .workloadrow1 .tableprogian');
let gantIndex=0, monthNumber = 1, monthNumber2 = 0,year = 2021, projNameIndex=0, monthCount = 0;
const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

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

    card = selectGantt.querySelectorAll('.tableprogian .card');
    for(let i=0;i<projectData.length;i++)
    {
        for(let m=0;m<milestoneData[i].project.length;m++)
        {
            let div = document.createElement('div');
            div.setAttribute('class','Milestone');
            div.innerHTML=`
            <div class="position-relative">
                   <div class="vl"></div>
            </div>
            <div class="milestonediv1">
            <div
                class="gantpr22 progress-bar rounded-1 milestonediv11  gantpr fs-4 onhover" startDay="${milestoneData[i].project[m].startExactDay}" data-bs-toggle="collapse" href="#milestoneExample${m+j}" role="button" aria-expanded="false" aria-controls="collapseExample3">
                <span>Milestone-2</span>
            </div>
            </div>`
            card[i].appendChild(div);
        }
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
    calTimelineBar();
    calMilestoneBar();
    calTaskBar();
})
prevGantt.addEventListener('click',()=>
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
            let monthAppear = monthText.innerText.split(' ');
            let appearYear = +monthAppear[1];
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = projectData[i].penddate.substr(8,2);
            let projEndYear = projectData[i].penddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, projEndYear);
            endTimeline = +endTimeline;
            let projStartYear = projectData[i].pstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, projStartYear);
            prevYear = checkPrevYear(appearYear, projEndYear);
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
    for(let j=0;j<milestoneData.length;j++)
    {
        let milestone = ganttTimeline[j].closest('.first1').querySelectorAll('.collapse .milestonediv1 .milestonediv11');
        for(let i=0; i<milestone.length; i++)
        {
            let date1 = new Date(milestoneData[j].project[i].mstartdate.substr(0,10).toString());
            let date2 = new Date(milestoneData[j].project[i].menddate.substr(0,10).toString());
            let projStartDate = milestoneData[j].project[i].startExactDay.substr(3,3).toString();
            let getMonthIndex = getNumericMonth(projStartDate);
            let startYear = milestoneData[j].project[i].startMonth.substr(0,4);
            compareYear = +startYear;
            let startDate = Math.floor(date1.getTime()/(3600*24*1000));
            let endDate = Math.floor(date2.getTime()/(3600*24*1000));
            let daysCount = endDate - startDate;
            let monthAppear = monthText.innerText.split(' ');
            let appearYear = +monthAppear[1];
            let compareDate = new Date(`${appearYear}/01/01`);
            let endTimeline = milestoneData[j].project[i].menddate.substr(8,2);
            let mileEndYear = milestoneData[j].project[i].menddate.substr(0,4);
            endTimeline = getTimeline(endTimeline, appearYear, mileEndYear);
            endTimeline = +endTimeline;
            let mileStartYear = milestoneData[j].project[i].mstartdate.substr(0,4);
            getMonthName(getMonthIndex, appearYear, mileStartYear);
            prevYear = checkPrevYear(appearYear,mileEndYear);
            let mileStartDate = milestoneData[j].project[i].mstartdate.substr(8,2);
            let startMText = milestoneData[j].project[i].startExactDay.substr(3,4);
            let minusVal = milestoneData[j].project[i].startExactDay.substr(0,2);
            if(date1.getTime()<=compareDate.getTime())
            {
                if(appearYear>=compareYear && prevYear)
                {
                    if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                    || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                    {
                        daysCount = checkTargetDate2(date2,i,daysCount,appearYear);
                        showGantt2(daysCount,endTimeline,i,milestone,mobileWidth);
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
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='February 2021' || month1==='February 2022' || month1==='February 2023'
                    || month1==='February 2024' || month1==='February 2025' || month1==='February 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='March 2021' || month1==='March 2022' || month1==='March 2023'
                    || month1==='March 2024' || month1==='March 2025' || month1==='March 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='April 2021' || month1==='April 2022' || month1==='April 2023'
                    || month1==='April 2024' || month1==='April 2025' || month1==='April 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='May 2021' || month1==='May 2022' || month1==='May 2023'
                    || month1==='May 2024' || month1==='May 2025' || month1==='May 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='June 2021' || month1==='June 2022' || month1==='June 2023'
                    || month1==='June 2024' || month1==='June 2025' || month1==='June 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='July 2021' || month1==='July 2022' || month1==='July 2023'
                    || month1==='July 2024' || month1==='July 2025' || month1==='July 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='August 2021' || month1==='August 2022' || month1==='August 2023'
                    || month1==='August 2024' || month1==='August 2025' || month1==='August 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='September 2021' || month1==='September 2022' || month1==='September 2023'
                    || month1==='September 2024' || month1==='September 2025' || month1==='September 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='October 2021' || month1==='October 2022' || month1==='October 2023'
                    || month1==='October 2024' || month1==='October 2025' || month1==='October 2026')
                    {
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='November 2021' || month1==='November 2022' || month1==='November 2023'
                    || month1==='November 2024' || month1==='November 2025' || month1==='November 2026')
                    {           
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                    else if(month1==='December 2021' || month1==='December 2022' || month1==='December 2023'
                    || month1==='December 2024' || month1==='December 2025' || month1==='December 2026')
                    {                    
                        daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                        showAlternateGantt2(daysCount,endTimeline,i,milestone,mileStartDate,startMText,minusVal,mobileWidth);
                        daysCount = endDate-startDate;
                    }
                }
            }
            giveMilestonebG(i,j,daysCount,milestone);
        }
    }
}
calMilestoneBar();

function calTaskBar()
{
    let mobileWidth = body.clientWidth;       
    for(k=0;k<projectData.length;k++)
    {
        let milestone = milesPDiv[k].querySelectorAll('.card .Milestone');
        for(let j=0;j<milestone.length;j++)
        {
            let Task = milestone[j].querySelectorAll('.milestonediv22');
            for(let i=0; i<Task.length; i++)
            {
                let date1 = new Date(taskData[k].milestone[j].task[i].tstartdate.substr(0,10).toString());
                let date2 = new Date(taskData[k].milestone[j].task[i].tenddate.substr(0,10).toString());
                let projStartDate = taskData[k].milestone[j].task[i].startExactDay.substr(3,3).toString();
                let getMonthIndex = getNumericMonth(projStartDate);
                let startYear = taskData[k].milestone[j].task[i].startMonth.substr(0,4);
                compareYear = +startYear;
                let startDate = Math.floor(date1.getTime()/(3600*24*1000));
                let endDate = Math.floor(date2.getTime()/(3600*24*1000));
                let daysCount = endDate - startDate;
                let monthAppear = monthText.innerText.split(' ');
                let appearYear = +monthAppear[1];
                let compareDate = new Date(`${appearYear}/01/01`);
                let endTimeline = taskData[k].milestone[j].task[i].tenddate.substr(8,2);
                let taskEndYear = taskData[k].milestone[j].task[i].tenddate.substr(0,4);
                endTimeline = getTimeline(endTimeline, appearYear, taskEndYear);
                endTimeline = +endTimeline;
                let taskStartYear = taskData[k].milestone[j].task[i].tstartdate.substr(0,4);
                getMonthName(getMonthIndex, appearYear, taskStartYear);
                prevYear = checkPrevYear(appearYear,taskEndYear);
                let taskStartDate = taskData[k].milestone[j].task[i].tstartdate.substr(8,2);
                let startMText = taskData[k].milestone[j].task[i].startExactDay.substr(3,4);
                let minusVal = taskData[k].milestone[j].task[i].startExactDay.substr(0,2);
                if(date1.getTime()<=compareDate.getTime())
                {
                    if(appearYear>=compareYear && prevYear)
                    {
                        if(month1==='January 2021' || month1==='January 2022' || month1==='January 2023'
                        || month1==='January 2024' || month1==='January 2025' || month1==='January 2026')
                        {
                            daysCount = checkTargetDate2(date2,i,daysCount,appearYear);
                            showGantt3(daysCount,endTimeline,i,Task,mobileWidth);
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
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='February 2021' || month1==='February 2022' || month1==='February 2023'
                        || month1==='February 2024' || month1==='February 2025' || month1==='February 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='March 2021' || month1==='March 2022' || month1==='March 2023'
                        || month1==='March 2024' || month1==='March 2025' || month1==='March 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='April 2021' || month1==='April 2022' || month1==='April 2023'
                        || month1==='April 2024' || month1==='April 2025' || month1==='April 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='May 2021' || month1==='May 2022' || month1==='May 2023'
                        || month1==='May 2024' || month1==='May 2025' || month1==='May 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='June 2021' || month1==='June 2022' || month1==='June 2023'
                        || month1==='June 2024' || month1==='June 2025' || month1==='June 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='July 2021' || month1==='July 2022' || month1==='July 2023'
                        || month1==='July 2024' || month1==='July 2025' || month1==='July 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='August 2021' || month1==='August 2022' || month1==='August 2023'
                        || month1==='August 2024' || month1==='August 2025' || month1==='August 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='September 2021' || month1==='September 2022' || month1==='September 2023'
                        || month1==='September 2024' || month1==='September 2025' || month1==='September 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='October 2021' || month1==='October 2022' || month1==='October 2023'
                        || month1==='October 2024' || month1==='October 2025' || month1==='October 2026')
                        {
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='November 2021' || month1==='November 2022' || month1==='November 2023'
                        || month1==='November 2024' || month1==='November 2025' || month1==='November 2026')
                        {           
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                        else if(month1==='December 2021' || month1==='December 2022' || month1==='December 2023'
                        || month1==='December 2024' || month1==='December 2025' || month1==='December 2026')
                        {                    
                            daysCount = checkTargetDate(date1,date2,daysCount,appearYear);
                            showAlternateGantt3(daysCount,endTimeline,i,Task,taskStartDate,startMText,minusVal,mobileWidth);
                            daysCount = endDate-startDate;
                        }
                    }
                }
                // giveTaskbG(i,j,daysCount,milestone);
            }
        }
    }
}
calTaskBar();

function showGantt(daysCount,endTimeline,i,ganttTimeline,mobileWidth)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    switch(true){
        case (daysCount<=30):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${daysCount * 2.92}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i); 
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block"; 
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month3)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month4)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month5)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month6)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month7)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month8)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month9)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month10)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month11)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month12)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
            }
            break;  
        }    
    }
}
function showAlternateGantt(daysCount,endTimeline,i,ganttTimeline,startTime,startMText,minusVal,mobileWidth)
{
    startTime = +startTime -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    updateValue(startMText,minusVal);
    switch(true)
    {
        case (daysCount<=val1):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(daysCount*2.92)}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }  
            }
            else if(monthText.innerText===month2)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month3)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month4)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month5)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month6)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month7)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month8)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month9)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month10)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month11)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.first1').style.display="block";
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month12)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
            }
            break;  
        }
    }
}

function showGantt2(daysCount,endTimeline,i,ganttTimeline,mobileWidth)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    switch(true){
        case (daysCount<=30):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${daysCount * 2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2)
            { 
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i); 
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block"; 
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month3)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month4)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month5)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month6)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month7)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month8)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month9)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month10)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month11)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month12)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
            }
            break;  
        }    
    }
}
function showAlternateGantt2(daysCount,endTimeline,i,ganttTimeline,startTime,startMText,minusVal,mobileWidth)
{
    startTime = +startTime -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    updateValue(startMText,minusVal);
    switch(true)
    {
        case (daysCount<=val1):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(daysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }  
            }
            else if(monthText.innerText===month2)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month3)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month4)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month5)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month6)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month7)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month8)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month9)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month10)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month11)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.Milestone').style.display="block";
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month12)
            {
                ganttTimeline[i].closest('.Milestone').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
            }
            break;  
        }
    }
}
function showGantt3(daysCount,endTimeline,i,ganttTimeline,mobileWidth)
{
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    switch(true){
        case (daysCount<=30):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${daysCount * 2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2)
            { 
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i); 
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block"; 
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month3)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month4)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month5)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month6)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month7)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month8)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month9)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month10)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month11)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.milestonediv22').style.cssText=`margin-left:11.3%;`;
                    if(mobileWidth < 700)
                    {
                        showinMobile1(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month12)
            {
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);      
            }
            break;  
        }    
    }
}
function showAlternateGantt3(daysCount,endTimeline,i,ganttTimeline,startTime,startMText,minusVal,mobileWidth)
{
    startTime = +startTime -1;
    let totWidth = document.querySelectorAll('tr:nth-child(2) th.dateVirtual');
    totWidth = totWidth.length - 1;
    updateValue(startMText,minusVal);
    switch(true)
    {
        case (daysCount<=val1):
        {
            if(monthText.innerText===month1)
            {
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(daysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }  
            }
            else if(monthText.innerText===month2)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month3)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month4)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth);
                    }
            }
            else if(monthText.innerText===month5)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month6)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month7)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month8)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month9)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month10)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
                    if(mobileWidth<700)
                    {
                        showinMobile2(i,startTime,localdaysCount,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month2 || monthText.innerText===month3 || monthText.innerText===month4
                || monthText.innerText===month5 || monthText.innerText===month6 || monthText.innerText===month7
                || monthText.innerText===month8 || monthText.innerText===month9 || monthText.innerText===month10)
            {
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month11)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
                ganttTimeline[i].style.cssText=`margin-left:${(startTime*2.92)+11.3}%; width:${(localdaysCount*2.92)}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:${(startTime*2.92)+11.3}%`;
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
                ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${totWidth *2.92}%`;
                ganttTimeline[i].closest('.task').style.display="block";
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                    if(mobileWidth<700)
                    {
                        showinMobile4(i,totWidth,ganttTimeline);
                    }
            }
            else if(monthText.innerText===month12)
            {
                // ganttTimeline[i].closest('.task').querySelector('.vl').style.cssText=`margin-left:11.3%`;
                remainDaysCount(endTimeline, ganttTimeline, mobileWidth, i);
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
function getTimeline(endTimeline,year2, endDate)
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
function checkPrevYear(year2,prevYear2)
{
    let booleanYear = true;
    if(year2>prevYear2)
    {
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
function remainDaysCount(endTimeline,ganttTimeline,mobileWidth, i)
{
    ganttTimeline[i].closest('.first1').style.display="block";
    ganttTimeline[i].style.cssText=`margin-left:11.3%; width:${endTimeline * 2.83}%`;
    if(mobileWidth<700)
    {
        showinMobile3(i,endTimeline,ganttTimeline);
    }
}
function showinMobile1(i,multiplyTerm,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:23%; width:${multiplyTerm *9.59}%`;
}
function showinMobile2(i,startTime, multiplyTerm,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:${(startTime*9.59)+23}%; width:${multiplyTerm *9.59}%`;
}
function showinMobile3(i,endTimeline,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:23%; width:${endTimeline * 9.59}%`;
}
function showinMobile4(i,multiplyTerm,ganttTimeline)
{
    ganttTimeline[i].style.cssText=`margin-left:23%; width:${multiplyTerm *9.59}%`;
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

